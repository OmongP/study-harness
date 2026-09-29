# R7 오케스트레이터 — 확정

### 역할 한눈에

| 누가 | 역할 | 하는 일 |
|---|---|---|
| CLAUDE.md + run-harness 스킬 (메인 세션) | 지휘자 | 누구를 언제 호출할지 결정, 반환 블록 저장, verify.mjs 실행 |
| verify.mjs | 상태·판정 스크립트 | init/status/Gate/reopen/unblock, state.json의 유일한 기록자, 판정 결과 파일 작성 |
| Maker Agents | 제작자 | 각자 자기 폴더만 작성 |
| rule-builder | 규칙 컴파일러 | 판정 기준 rules.yaml 생성 |
| verifier | 심사자 | 규칙을 바꾸거나 결과물을 수정하지 않고 PASS/FAIL만 판정 |
| Omong | 유일한 사람 승인자 | approval.md 직접 작성(정해진 승인 지점 1곳) + 자동 재시도 한도 초과 시 판단(비상 정지) |

### 오케스트레이터 = CLAUDE.md를 읽는 메인 세션

| 한다 | 하지 않는다 |
|---|---|
| `verify.mjs init`으로 run 생성 (폴더·`input/prd.md` 복사·state.json) | 결과물 제작 (Maker 몫) |
| 에이전트를 순서대로 호출 | 규칙 작성 (rule-builder 몫) |
| 반환 블록을 수정 없이 현재 단계 경로에 저장 | 블록 내용 수정, 산출물 직접 작성 |
| `verify.mjs` **종료 코드만** 보고 다음 행동 결정 | 판정 (verifier 몫), 판정 결과를 해석으로 뒤집기 |
| — | `state.json`·`approval.md` 쓰기, `harness/` 수정, 사용자 대신 승인 판단 |

### 저장 권한 강제 — PreToolUse 훅

- `.claude/agents/`에 에이전트 6개 정의: researcher, concept-designer, designer, rule-builder, prototyper, verifier
- `guard-write` (Write|Edit|MultiEdit, 프로젝트 훅):
  - `agent_type`이 있는 호출(서브에이전트)의 runs/ 쓰기를 전부 차단한다.
  - 오케스트레이터는 state.json의 현재 단계 폴더에만 쓸 수 있다.
  - `state.json`, `approval.md`, `5-review/`는 누구의 쓰기든 차단한다.
- `guard-review` (Agent|Task): 승인 대기 중에는 Maker 에이전트 호출을 막는다.
- `guard-verifier-bash` (verifier frontmatter): `node harness/scripts/verify.mjs <명령> <run-id>` 형태만 실행을 허용한다.
- 한계: Bash로 쓰는 파일은 훅이 보지 못한다 → runs/에는 Bash로 쓰지 않는다.
- R4 폴더 구조에 추가: `harness/scripts/`, `.claude/agents/`, `.claude/skills/run-harness/`, `.claude/settings.json`(훅 등록)

### 컨펌 잠금

- 승인 판정 통과 시 `2-concept/screen-structure.md`와 `2-concept/keyscreens/`의 해시를 state.json에 기록한다.
- 3 디자인·5 검수 판정 때 해시를 다시 확인한다. 다르면 승인이 무효가 되고, approval.md는 `approval-stale-<n>.md`로 보관된 뒤 승인 대기로 돌아간다.

### CLAUDE.md

- 짧은 라우팅만: 자연어 요청 → `run-harness` 스킬 호출, 파일 역할 표, 핵심 금지 사항
- 실제 실행 절차(파이프라인, 블록 저장, 종료 코드별 행동, 보고 형식)는 `.claude/skills/run-harness/SKILL.md`
- `harness/r2-purpose.md` ~ `harness/r8-verify.md`나 에이전트 정의에 있는 세부 내용은 옮겨 쓰지 않고 경로만 가리킨다.

### 전이 규칙

- 전이는 `verify.mjs`가 판정하고 state.json에 기록한다. 오케스트레이터는 종료 코드만 본다:
  `0` 통과 · `1` 실패(복귀) 또는 승인 대기 · `2` 사용법·전제 오류 · `3` 🛑 차단(재시도 한도 도달)
- 복귀 단계(`gates.return_to`)와 재시도 한도(`gates.max_attempts: 3`)는 `harness/rules-base.yaml`의 `gates` 섹션에서 관리한다.
- `unblock`은 사용자가 명시적으로 요청할 때만 실행한다.

```
단계 완료
 → Gate가 있는 단계(1·3·5)면 verifier 호출
    → PASS: state를 pass로 바꾸고 다음 단계로
    → FAIL: retries +1 → R3의 복귀 지점으로
         → 같은 복귀 지점에서 3번째 실패: awaiting_approval, 사용자에게 보고하고 정지
 → 2 컨셉 끝: awaiting_approval, 키스크린을 보여주고 사용자가 approval.md를 작성하기를 기다림
```

**★ Critical Gate(S1~S3) 실패 시**

1. 즉시 FAIL로 기록한다.
2. 리포트 최상단에 먼저 표시한다.
3. R3의 실패 유형별 복귀 단계로 돌아가 수정한다.
4. 일반 Gate와 똑같이 재시도 횟수에 포함한다.
5. Critical 위반이 1개라도 남아 있으면 다음 단계로 진행하지 않는다.
6. 같은 복귀 지점에서 3번째 실패하면 `awaiting_approval`로 바꾸고, 사용자에게 보고한 뒤 정지한다.

### 진행 보고

- 단계가 넘어갈 때마다 사용자에게 한두 줄로 보고한다. 예: "1 리서치 PASS (레퍼런스 12개). 2 컨셉 시작."
