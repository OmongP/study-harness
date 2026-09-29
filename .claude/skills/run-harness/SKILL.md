---
name: run-harness
description: "UI 설계 하네스 실행(오케스트레이터). PRD 하나를 받아 1 리서치 → 2 컨셉(+👤 컨펌) → 3 디자인 → 4 프로토타입 → 5 검수까지 게이트를 통과시킨다. 중단된 실행은 state.json 기준으로 이어서 한다. '새 PRD로 하네스 돌려줘', '이어서 해줘', '지금 어디까지 했어?', '검수만 다시 해줘', 'approval.md 썼어', '컨펌 받았어', '막힌 거 풀어줘' 같은 요청이 오면 반드시 이 스킬을 사용한다."
---

# run-harness — UI 설계 하네스 오케스트레이터

메인 세션이 이 절차를 직접 수행합니다. 제작은 Maker 에이전트, 규칙은 rule-builder, 판정은 verifier가 합니다.
설계 근거: `harness/r2-purpose.md` ~ `harness/r8-verify.md` (SSOT). `harness/archive/`는 참조하지 않습니다.

## 0. 시작 전 확인 (R8)

- 첫 실행 전: `cd harness && npm test` 가 **전부 PASS**여야 합니다. 하나라도 FAIL이면 실행하지 않고 사용자에게 보고합니다.
- 처음 받은 환경이면 `cd harness && npm install` 을 먼저 실행합니다.

## 1. 시작과 재개

**새 실행** — "새 PRD로 하네스 돌려줘" + PRD 경로
1. run-id를 정합니다: `YYYY-MM-DD-서비스명` (영문 소문자·숫자·하이픈). 사용자에게 확인받습니다.
2. `node harness/scripts/verify.mjs init <run-id> --prd <PRD 경로>`
3. 2번 루프로.

**재개** — "이어서 해줘"
1. `node harness/scripts/verify.mjs status <run-id>` 결과를 보여줍니다.
2. 종료 코드 3(🛑 차단)이면 아무것도 진행하지 않고 6번 보고.
3. 종료 코드 1(⏳ 승인 대기)이면 4번 안내.
4. 현재 단계의 산출물이 이미 폴더에 있으면 에이전트를 부르기 전에 verifier부터 부릅니다. 통과하면 다음 단계로 갑니다. `pass` 단계는 다시 만들지 않습니다.

**상태만** — "지금 어디까지 했어?" → `status` 결과만 보여주고 아무것도 진행하지 않습니다.

## 2. 단계 루프

`state.json`의 `next`에 따라 반복합니다. 매 판정 뒤 `status`로 다시 확인합니다.

| next | 부를 에이전트 | 이어서 |
|---|---|---|
| `research` | researcher | verifier → `research` |
| `concept` | concept-designer | verifier → `concept` (제출 확인) → ⏳ 승인 대기 |
| `approval` | 👤 사람 | 4번 |
| `design` | ① designer (mode=design-md) → ② rule-builder → ③ designer (mode=screens) | verifier → `design` (중간 Gate) |
| `prototype` | prototyper | verifier → `prototype` (제출 확인) |
| `review` | — | verifier → `review` (최종 Gate) |

에이전트에게 전달할 것: `run-id`, (designer는 `mode`), 복귀로 다시 부를 때는 마지막 실패 사유와 리포트 경로(`5-review/gate-1.md` · `gate-3.md` · `report.md`) 또는 반려 코멘트, 그리고
"파일은 직접 쓰지 말고 `=== FILE: runs/<run-id>/<경로> ===` … `=== END FILE ===` 블록으로 반환할 것".

## 3. 반환 블록 저장 (에이전트가 끝난 직후, verifier 전)

1. 에이전트 응답을 **한 글자도 바꾸지 않고** `.harness-inbox/<run-id>-<agent>.txt` 에 저장합니다 (runs/ 밖).
2. `node harness/scripts/save-blocks.mjs <run-id> <agent> .harness-inbox/<run-id>-<agent>.txt`
   - 에이전트별 반환 경로, 현재 단계 폴더, 금지 파일(state.json · approval.md · 5-review/ · input/)을 검사합니다. 하나라도 거부되면 아무것도 저장하지 않습니다.
   - 종료 코드 1: 거부 사유를 그대로 같은 에이전트에게 전달해 다시 반환받습니다. 사용자에게 한 줄 보고합니다.
3. 저장한 파일 목록을 한 줄로 보고한 뒤 다음으로 갑니다.
4. 산출물 내용을 직접 쓰거나 고치지 않습니다. 고칠 일은 해당 에이전트에게 다시 맡깁니다.

## 4. 👤 사람 승인 (2 컨셉 끝, 유일한 승인 지점)

1. concept 제출 확인이 통과하면 멈추고 알립니다:
   - 키스크린 파일 목록 (`runs/<run-id>/2-concept/keyscreens/`), 화면 구조 요약
   - "`harness/templates/approval.md` 양식으로 `runs/<run-id>/2-concept/approval.md` 를 직접 작성해 주세요."
2. **오케스트레이터와 에이전트는 approval.md를 쓰지 않습니다.** 사용자가 채팅으로만 "승인"이라고 하면 파일 작성을 안내합니다.
3. "approval.md 썼어" / "컨펌 받았어" → verifier → `approval`
   - 승인(0) → 컨펌 잠금 기록 → 3 디자인
   - 반려(1, ↩️) → `approval-rejected-<n>.md` 보관 → 2 컨셉으로. concept-designer에게 반려 코멘트를 전달합니다.
   - 대기(1, ⏳) → 사유를 그대로 전달합니다.
4. 컨펌 잠금: 승인 뒤 `screen-structure.md`·`keyscreens/`가 바뀌면 design·review 판정에서 승인이 무효(⏳)가 되고 `approval-stale-<n>.md`로 보관됩니다. 사용자에게 다시 승인받도록 안내합니다.

## 5. 판정 결과에 따른 행동 — 종료 코드만 본다

| 종료 코드 | 의미 | 행동 |
|---|---|---|
| 0 | ✅ 통과 | 한 줄 보고 후 다음 단계 (예: "1 리서치 PASS. 2 컨셉 시작.") |
| 1 | ❌ 실패 / ⏳ 승인 대기 / ↩️ 반려 | 실패면 위반과 복귀 단계를 보고하고, 복귀 단계의 에이전트를 실패 사유와 함께 다시 부름 (사용자 확인 없이 재시도). ★ Critical이 있으면 먼저 보고. 승인 대기·반려는 4번 |
| 2 | 사용법·전제 오류 | 멈추고 오류를 그대로 보고 |
| 3 | 🛑 차단 (같은 복귀 지점 3번째 실패) | 즉시 멈추고 6번 보고. 스스로 재시도하거나 unblock 하지 않음 |

- ★ Critical 위반이 1개라도 남아 있으면 다음 단계로 가지 않습니다 (스크립트가 통과시키지 않음).
- 판정을 해석으로 뒤집지 않습니다.

## 6. 🛑 차단 보고 형식

```
🛑 하네스 정지 — <gate> 3회 실패
실행: runs/<run-id>
실패 이력: (status 의 마지막 실패들)
반복된 원인: (공통 위반 규칙)
선택지: ① 산출물 수정 후 "막힌 거 풀어줘"(unblock) ② 기준(rules) 조정 — harness/ 변경은 사용자 승인 후 ③ 이 실행 중단
```

## 7. 그 밖의 요청

- "검수만 다시 해줘" → 사용자 동의를 받아 `verify.mjs reopen <run-id> --from review` → verifier → `review`
- 완료된 실행을 고치기 → 사용자 동의를 받아 `verify.mjs reopen <run-id> --from <gate>` (산출물 유지)
- "막힌 거 풀어줘" → 사용자가 명시적으로 요청한 경우에만 `verify.mjs unblock <run-id>`

## 8. 완료

`review` 통과(state.json `done: true`) 시 보고:
- `runs/<run-id>/5-review/report.md` 요약과 사람 확인 항목
- 완료 기준 (R2): PRD 흐름 누락 0 / 서비스 금지 위반 0 / 디자인 위반 0 / 사람 승인 기록 1
- 첫 실행이면: `1-research/references.md`와 `docs/references.md`(기준선) 비교 요약 (R8)
- 개선점은 사용자가 말한 것을 `harness/r8-verify.md`의 "R8 리뷰 로그"에 기록 (사용자 승인 후)

## 9. 금지

- 반환 블록 내용을 고치거나 산출물을 직접 작성하기
- `state.json` · `approval.md` · `5-review/` · `input/` · `harness/` 직접 수정 (harness/ 변경은 사용자 승인 후 별도 작업으로만)
- runs/ 에 Bash로 파일 쓰기 (verify.mjs · save-blocks.mjs 실행은 예외)
- 훅에 막힌 작업을 다른 방법으로 우회하기 — 사용자에게 보고합니다
- 게이트 건너뛰기, verifier 대신 직접 판정 명령 실행하기
