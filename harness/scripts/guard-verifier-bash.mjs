#!/usr/bin/env node
// guard-verifier-bash.mjs — PreToolUse 훅 (verifier frontmatter, Bash) — verifier 는 verify.mjs 판정만 실행 (R7)
// 허용:  node harness/scripts/verify.mjs <research|concept|approval|design|prototype|review|status> <run-id>
//        (앞에 `cd <경로> && ` 가 붙은 형태 포함)
// 차단: exit 2 + stderr 사유.

import fs from "node:fs";

let input;
try {
  input = JSON.parse(fs.readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const cmd = String(input?.tool_input?.command ?? "").trim();
const re = /^(cd\s+("[^"]+"|'[^']+'|[^\s;&|]+)\s*&&\s*)?node\s+("[^"]*"|\S*\/)?harness\/scripts\/verify\.mjs"?\s+(research|concept|approval|design|prototype|review|status)\s+\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/;
if (!re.test(cmd)) {
  process.stderr.write(
    `[harness guard-verifier-bash] verifier 는 'node harness/scripts/verify.mjs <gate|status> <run-id>' 만 실행할 수 있습니다. 파일 확인은 Read/Grep 을 쓰세요. (요청: ${cmd.slice(0, 120)})\n`,
  );
  process.exit(2);
}
process.exit(0);
