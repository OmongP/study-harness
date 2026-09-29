#!/usr/bin/env node
// guard-write.mjs — PreToolUse 훅 (Write|Edit|MultiEdit|NotebookEdit) — 저장 권한 강제 (R7)
// 규칙
//   1) runs/ 밖의 경로는 관여하지 않는다.
//   2) 서브에이전트(입력에 agent_type 있음)의 runs/ 쓰기는 전부 차단한다 — 산출물은 반환 블록으로.
//   3) state.json · 5-review/(스크립트 전용), approval.md · approval-*.md(사람 전용), input/(원본 복사본) 는 차단한다.
//   4) 3-design/rules.yaml 은 save-blocks.mjs(rule-builder 블록 검사)로만 저장한다.
//   5) 오케스트레이터는 state.json 의 현재 단계 폴더에만 쓸 수 있다.
// 차단: exit 2 + stderr 사유. 통과: exit 0.
// 한계: Bash 로 쓰는 파일은 이 훅이 보지 못한다 → runs/ 에는 Bash 로 쓰지 않는다 (스크립트 제외).

import fs from "node:fs";
import path from "node:path";
import { loadBase, runsDir, ROOT } from "./verify.mjs";

const deny = (msg) => {
  process.stderr.write(`[harness guard-write] ${msg}\n`);
  process.exit(2);
};

let input;
try {
  input = JSON.parse(fs.readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const filePath = input?.tool_input?.file_path ?? input?.tool_input?.notebook_path;
if (!filePath) process.exit(0);

const base = loadBase();
const RUNS = runsDir(base);
const abs = path.resolve(input.cwd ?? ROOT, filePath);
const rel = path.relative(RUNS, abs);
if (rel.startsWith("..") || path.isAbsolute(rel)) process.exit(0); // 1)

if (input.agent_type) deny(`서브에이전트(${input.agent_type})는 runs/ 에 파일을 쓰지 않습니다. === FILE: … === 블록으로 반환하세요.`); // 2)

const [id, dir, ...rest] = rel.split(path.sep);
const name = path.basename(abs);
if (name === "state.json") deny("state.json 은 verify.mjs 만 씁니다."); // 3)
if (/^approval(-.*)?\.md$/.test(name)) deny("approval.md 는 사람이 직접 작성합니다 (유일한 사람 승인 지점)."); // 3)
if (dir === base.gates.dir.review) deny(`${dir}/ 는 verify.mjs 만 씁니다.`); // 3)
if (dir === "input") deny("input/ 은 원본 PRD 복사본이라 수정할 수 없습니다."); // 3)
if (dir === base.gates.dir.design && rest.join("/") === "rules.yaml") deny("rules.yaml 은 save-blocks.mjs 로 rule-builder 블록만 저장합니다."); // 4)

const sp = path.join(RUNS, id, "state.json");
if (!fs.existsSync(sp)) deny(`runs/${id} 에 state.json 이 없습니다. verify.mjs init 으로 먼저 만드세요.`);
const s = JSON.parse(fs.readFileSync(sp, "utf8"));
if (s.done) deny(`runs/${id} 는 완료된 실행입니다. 사용자 동의 후 reopen 하세요.`);
if (s.blocked) deny(`runs/${id} 는 차단 상태입니다. 사용자 판단을 기다리세요.`);
if (s.next === "approval") deny("사람 승인 대기 중에는 runs/ 에 저장할 산출물이 없습니다.");
const allowed = base.gates.dir[s.next];
if (dir !== allowed) deny(`지금 단계는 ${s.next} 입니다. runs/${id}/${allowed}/ 에만 저장할 수 있습니다 (요청: ${dir}/).`); // 5)
process.exit(0);
