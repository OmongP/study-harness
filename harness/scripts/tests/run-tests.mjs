#!/usr/bin/env node
// run-tests.mjs — R8 필수 검증
//   1) 규칙별 PASS/FAIL fixture 테스트 (판정 스크립트 신뢰성)
//   2) 저장 권한 15칸 테스트 (훅·잠금 강제)
// 모두 PASS 여야 첫 실제 실행을 시작한다. 종료 코드: 0 전부 통과 · 1 하나라도 실패
//
// 주의: 2)는 훅 스크립트에 Claude Code 와 같은 형식의 입력(JSON)을 넣어 시험한다.
//       실제 서브에이전트 호출로 확인하는 것은 첫 실행 세션에서 한다.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { loadBase, checkScreens, checkFlows, checkResearch, findPlaceholders } from "../verify.mjs";
import { extractDir } from "../extract_html.mjs";
import { SERVICE, SCREEN_FIXTURES, RESEARCH_FIXTURES, PLACEHOLDER_FIXTURES, PASS_WRITE } from "./fixtures.mjs";

const SCRIPTS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = loadBase();
const results = [];
const record = (group, name, ok, detail = "") => {
  results.push({ group, name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  [${group}] ${name}${detail ? ` — ${detail}` : ""}`);
};
const tmp = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `harness-${p}-`));
const expectOne = (V, f) => {
  const mine = V.filter((x) => x.rule === f.rule);
  if (!f.rule) return [V.length === 0, V.length ? V.map((x) => `${x.rule}:${x.element}:${x.value}`).join(" | ") : ""];
  let ok = mine.length === 1 && V.length === 1;
  if (ok && f.critical !== undefined) ok = mine[0].critical === f.critical;
  if (ok && f.ret) ok = mine[0].ret === f.ret;
  return [ok, `${f.rule} ${mine.length}건 / 전체 ${V.length}건${V.length ? " — " + V.map((x) => `${x.rule}:${x.value}`).join(" | ") : ""}`];
};

// ───────── 1) fixture 테스트 ─────────
console.log("\n== 1. 규칙별 PASS/FAIL fixture ==");
for (const f of SCREEN_FIXTURES) {
  const dir = tmp("fx");
  for (const [n, c] of Object.entries(f.files)) fs.writeFileSync(path.join(dir, n), c);
  const data = await extractDir(dir, base);
  const V = [...checkScreens(data, base, SERVICE, base.gate_checks.review), ...checkFlows(f.files["flows.md"], data, base)];
  const [ok, detail] = expectOne(V, f);
  record("fixture", f.name, ok, ok ? "" : detail);
}
for (const f of RESEARCH_FIXTURES) {
  const V = checkResearch(f.text, base);
  const mine = V.filter((x) => x.rule === "R1");
  const ok = f.rule ? mine.length === 1 && V.length === 1 : V.length === 0;
  record("fixture", f.name, ok, ok ? "" : V.map((x) => `${x.title}:${x.value}`).join(" | "));
}
for (const f of PLACEHOLDER_FIXTURES) {
  const V = findPlaceholders(f.text, base, "flows.md");
  const ok = f.rule ? V.length === 1 : V.length === 0;
  record("fixture", `자리표시 ${f.name}`, ok);
}

// ───────── 2) 저장 권한 15칸 ─────────
console.log("\n== 2. 저장 권한 15칸 ==");
const ROOT = tmp("root");
const ID = "2026-09-29-fixture";
const RUN = path.join(ROOT, "runs", ID);
const env = { ...process.env, HARNESS_ROOT: ROOT };
const writeState = (next, extra = {}) => {
  fs.mkdirSync(RUN, { recursive: true });
  fs.writeFileSync(path.join(RUN, "state.json"), JSON.stringify({ run_id: ID, next, stages: { 1: "running", 2: "pending", 3: "pending", 4: "pending", 5: "pending" }, retries: {}, blocked: null, done: false, approval_lock: null, history: [], ...extra }, null, 2));
};
const hook = (script, input) => spawnSync("node", [path.join(SCRIPTS, script)], { input: JSON.stringify(input), env, encoding: "utf8" });
const writeInput = (rel, agent) => ({ tool_name: "Write", cwd: ROOT, tool_input: { file_path: path.join(RUN, rel), content: "x" }, ...(agent ? { agent_type: agent, agent_id: "a1" } : {}) });

writeState("research");
const AGENTS = ["researcher", "concept-designer", "designer", "rule-builder", "prototyper", "verifier"];
for (const a of AGENTS) {
  const r = hook("guard-write.mjs", writeInput("1-research/references.md", a));
  record("권한", `서브에이전트 ${a} → runs/ Write 차단`, r.status === 2, r.status === 2 ? "" : `exit ${r.status}`);
}
let r = hook("guard-write.mjs", writeInput("1-research/references.md"));
record("권한", "오케스트레이터 → 현재 단계 폴더 저장 통과", r.status === 0, r.stderr.trim());
r = hook("guard-write.mjs", writeInput("3-design/design.md"));
record("권한", "오케스트레이터 → 다른 단계 폴더 저장 차단", r.status === 2);
for (const rel of ["state.json", "2-concept/approval.md", "5-review/report.md"]) {
  r = hook("guard-write.mjs", writeInput(rel));
  record("권한", `오케스트레이터 → ${rel} 차단`, r.status === 2);
}
writeState("approval");
r = hook("guard-review.mjs", { tool_name: "Agent", tool_input: { subagent_type: "designer", prompt: "x" } });
record("권한", "승인 대기 중 Maker(designer) 호출 차단", r.status === 2);
r = hook("guard-verifier-bash.mjs", { tool_name: "Bash", tool_input: { command: `node harness/scripts/verify.mjs research ${ID}` } });
record("권한", "verifier → verify.mjs 실행 통과", r.status === 0, r.stderr.trim());
r = hook("guard-verifier-bash.mjs", { tool_name: "Bash", tool_input: { command: "rm -rf runs" } });
record("권한", "verifier → 다른 Bash 명령 차단", r.status === 2);

// 15) 컨펌 잠금: 승인 → keyscreens 변경 → design 판정 → 승인 무효
{
  const c = path.join(RUN, "2-concept");
  fs.mkdirSync(path.join(c, "keyscreens"), { recursive: true });
  fs.writeFileSync(path.join(c, "screen-structure.md"), "# 화면 구조 — fixture\n");
  fs.writeFileSync(path.join(c, "keyscreens", "write.html"), PASS_WRITE());
  fs.writeFileSync(path.join(c, "keyscreens", "review.html"), PASS_WRITE({ screenName: "review" }));
  fs.writeFileSync(path.join(c, "approval.md"), "# 컨셉 승인 — fixture\n\n- approved: yes\n- 채택 키스크린: write.html\n- 날짜: 2026-09-29\n\n## 코멘트\n");
  writeState("approval", { stages: { 1: "pass", 2: "awaiting_approval", 3: "pending", 4: "pending", 5: "pending" } });
  const run = (...a) => spawnSync("node", [path.join(SCRIPTS, "verify.mjs"), ...a], { env, encoding: "utf8" });
  const a1 = run("approval", ID);
  fs.appendFileSync(path.join(c, "keyscreens", "write.html"), "<!-- changed after approval -->\n");
  const d1 = run("design", ID);
  const st = JSON.parse(fs.readFileSync(path.join(RUN, "state.json"), "utf8"));
  const ok = a1.status === 0 && d1.status === 1 && fs.existsSync(path.join(c, "approval-stale-1.md")) && !fs.existsSync(path.join(c, "approval.md")) && st.next === "approval";
  record("권한", "승인 후 keyscreens 변경 → 승인 무효 (approval-stale 보관)", ok, ok ? "" : `approval exit ${a1.status}, design exit ${d1.status}: ${d1.stdout.trim()} ${d1.stderr.trim()}`);
}

// ───────── 추가: save-blocks 에이전트별 검사 (R6) ─────────
console.log("\n== 추가. save-blocks 에이전트별 검사 ==");
{
  writeState("design", { stages: { 1: "pass", 2: "pass", 3: "running", 4: "pending", 5: "pending" } });
  const inbox = tmp("inbox");
  const blk = (p) => `=== FILE: runs/${ID}/${p} ===\nx: 1\n=== END FILE ===\n`;
  const save = (agent, p) => {
    const f = path.join(inbox, `${agent}.txt`);
    fs.writeFileSync(f, blk(p));
    return spawnSync("node", [path.join(SCRIPTS, "save-blocks.mjs"), ID, agent, f], { env, encoding: "utf8" });
  };
  record("추가", "designer 블록에 rules.yaml → 거부", save("designer", "3-design/rules.yaml").status === 1);
  record("추가", "rule-builder 블록 rules.yaml → 저장", save("rule-builder", "3-design/rules.yaml").status === 0);
  record("추가", "rule-builder 블록 design.md → 거부", save("rule-builder", "3-design/design.md").status === 1);
  record("추가", "designer 블록 approval.md → 거부", save("designer", "2-concept/approval.md").status === 1);
}

fs.rmSync(ROOT, { recursive: true, force: true });
const fail = results.filter((x) => !x.ok);
const perm = results.filter((x) => x.group === "권한");
console.log(`\n결과: fixture ${results.filter((x) => x.group === "fixture" && x.ok).length}/${results.filter((x) => x.group === "fixture").length} · 권한 ${perm.filter((x) => x.ok).length}/${perm.length} · 추가 ${results.filter((x) => x.group === "추가" && x.ok).length}/${results.filter((x) => x.group === "추가").length}`);
console.log(fail.length ? `❌ 실패 ${fail.length}건` : "✅ 전부 통과");
process.exit(fail.length ? 1 : 0);
