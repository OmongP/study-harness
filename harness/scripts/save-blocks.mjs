#!/usr/bin/env node
// save-blocks.mjs — 에이전트 반환 블록을 경로 검사 후 그대로 저장한다 (R6 · R7 · R8)
//   node harness/scripts/save-blocks.mjs <run-id> <agent> <반환 텍스트 파일>
// 블록 형식:
//   === FILE: runs/<run-id>/<경로> ===
//   (내용)
//   === END FILE ===
// 규칙
//   1) 현재 단계(state.json 의 next) 폴더 안이어야 한다.
//   2) 에이전트별 반환 가능 경로 (R6): researcher 1-research/ · concept-designer 2-concept/(approval.md 제외)
//      · designer 3-design/(rules.yaml 제외) · rule-builder 3-design/rules.yaml 하나 · prototyper 4-prototype/ · verifier 없음
//   3) state.json · approval.md · approval-*.md · input/ · 5-review/ 는 저장하지 않는다.
//   4) 하나라도 거부되면 아무것도 저장하지 않는다. 내용은 한 글자도 바꾸지 않는다.
// 종료 코드: 0 저장 · 1 거부 · 2 사용법 오류

import fs from "node:fs";
import path from "node:path";
import { loadBase, runsDir, ROOT } from "./verify.mjs";

const AGENT_STAGE = {
  researcher: ["research"],
  "concept-designer": ["concept"],
  designer: ["design"],
  "rule-builder": ["design"],
  prototyper: ["prototype"],
};

export function parseBlocks(text) {
  const re = /^=== FILE: (.+?) ===\r?\n([\s\S]*?)\r?\n?=== END FILE ===$/gm;
  const out = [];
  let m;
  while ((m = re.exec(text))) out.push({ path: m[1].trim(), content: m[2].endsWith("\n") ? m[2] : m[2] + "\n" });
  return out;
}

export function checkBlock(base, state, id, agent, relFromRoot) {
  const runs = path.relative(ROOT, runsDir(base));
  const norm = path.posix.normalize(relFromRoot.replace(/\\/g, "/"));
  if (norm.includes("..") || path.isAbsolute(norm)) return "상대 경로만, .. 금지";
  const prefix = `${runs}/${id}/`;
  if (!norm.startsWith(prefix)) return `runs/${id}/ 밖의 경로`;
  const inner = norm.slice(prefix.length);
  const [dir, ...restParts] = inner.split("/");
  const baseName = path.posix.basename(inner);
  if (!AGENT_STAGE[agent]) return `${agent} 는 파일을 반환할 수 없는 에이전트`;
  if (baseName === "state.json" || /^approval(-.*)?\.md$/.test(baseName)) return `${baseName} 은(는) 저장하지 않음 (스크립트·사람 전용)`;
  if (dir === "input" || dir === base.gates.dir.review) return `${dir}/ 는 저장하지 않음`;
  if (!AGENT_STAGE[agent].includes(state.next)) return `지금 단계(${state.next})는 ${agent} 의 단계가 아님`;
  const allowedDir = base.gates.dir[state.next];
  if (dir !== allowedDir) return `지금 단계 폴더는 ${allowedDir}/ (요청: ${dir}/)`;
  if (!restParts.length) return "파일 이름 없음";
  const isRules = inner === `${base.gates.dir.design}/rules.yaml`;
  if (agent === "rule-builder" && !isRules) return "rule-builder 는 3-design/rules.yaml 만 반환";
  if (agent === "designer" && isRules) return "designer 는 rules.yaml 을 반환할 수 없음";
  return null;
}

function main([id, agent, file]) {
  if (!id || !agent || !file) {
    console.error("사용법: save-blocks.mjs <run-id> <agent> <반환 텍스트 파일>");
    return 2;
  }
  const base = loadBase();
  const sp = path.join(runsDir(base), id, "state.json");
  if (!fs.existsSync(sp)) {
    console.error(`runs/${id}/state.json 없음`);
    return 2;
  }
  const state = JSON.parse(fs.readFileSync(sp, "utf8"));
  if (state.blocked || state.done || state.next === "approval") {
    console.error(`지금은 저장할 수 없는 상태 (next=${state.next}${state.blocked ? ", 차단" : ""}${state.done ? ", 완료" : ""})`);
    return 1;
  }
  const blocks = parseBlocks(fs.readFileSync(path.resolve(file), "utf8"));
  if (!blocks.length) {
    console.error("=== FILE: … === 블록이 없습니다.");
    return 1;
  }
  const bad = blocks.map((b) => [b.path, checkBlock(base, state, id, agent, b.path)]).filter(([, e]) => e);
  if (bad.length) {
    console.error("거부 — 아무것도 저장하지 않았습니다:");
    for (const [p, e] of bad) console.error(`  ${p}: ${e}`);
    return 1;
  }
  for (const b of blocks) {
    const abs = path.join(ROOT, b.path);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, b.content);
    console.log(`저장: ${b.path}`);
  }
  return 0;
}

import { fileURLToPath } from "node:url";
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exit(main(process.argv.slice(2)));
