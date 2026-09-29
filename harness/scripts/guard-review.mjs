#!/usr/bin/env node
// guard-review.mjs — PreToolUse 훅 (Agent|Task) — 승인 대기 중 Maker 에이전트 호출 차단 (R7)
// Maker(R6) = researcher · concept-designer · designer · prototyper
// 어떤 실행이든 사람 승인 대기(next=approval) 또는 차단(3회 실패) 상태면 막는다.
// 차단: exit 2 + stderr 사유. 통과: exit 0.

import fs from "node:fs";
import path from "node:path";
import { loadBase, runsDir } from "./verify.mjs";

const MAKERS = ["researcher", "concept-designer", "designer", "prototyper"];

let input;
try {
  input = JSON.parse(fs.readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const agent = String(input?.tool_input?.subagent_type ?? "");
if (!MAKERS.includes(agent)) process.exit(0);

const RUNS = runsDir(loadBase());
if (!fs.existsSync(RUNS)) process.exit(0);
const waiting = [];
for (const id of fs.readdirSync(RUNS)) {
  const p = path.join(RUNS, id, "state.json");
  if (!fs.existsSync(p)) continue;
  try {
    const s = JSON.parse(fs.readFileSync(p, "utf8"));
    if (s.next === "approval") waiting.push(`${id}(사람 승인 대기)`);
    else if (s.blocked) waiting.push(`${id}(차단: ${s.blocked.gate})`);
  } catch {
    // 읽지 못하는 state.json 은 건너뛴다
  }
}
if (waiting.length) {
  process.stderr.write(`[harness guard-review] 사람 판단 대기 중: ${waiting.join(", ")} — ${agent} 를 부르지 않습니다.\n`);
  process.exit(2);
}
process.exit(0);
