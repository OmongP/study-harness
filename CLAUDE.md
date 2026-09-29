# UI 설계 하네스

PRD 하나를 받아 **1 리서치 → 2 컨셉(+👤 컨펌) → 3 디자인 → 4 프로토타입 → 5 검수** 순서로
핵심 사용자 흐름과 MVP 화면을 설계하고 검수하는 하네스입니다.

## 자연어 요청 라우팅 (필수)

아래 요청은 슬래시 명령이 없어도 **`run-harness` 스킬을 불러와 그 절차대로** 진행합니다.

- "새 PRD로 하네스 돌려줘" + PRD 경로
- "이어서 해줘", "지금 어디까지 했어?", "검수만 다시 해줘"
- "approval.md 썼어", "컨펌 받았어"
- "막힌 거 풀어줘" (unblock — 이 말이 있을 때만)

## 파일 역할

| 파일 | 역할 | 수정 |
|---|---|---|
| `harness/r2-purpose.md` ~ `harness/r8-verify.md` | 하네스 설계 SSOT (R2~R8 결정) | 사람 |
| `harness/design-base.md` | 공통 디자인 기준 | 사람 |
| `harness/guides/html-screen-guide.md` | HTML 화면 구현 형식 (판정 스크립트와 같은 정의) | 사람 |
| `harness/rules-base.yaml` | 공통 규칙 + `gates`(순서·복귀·max_attempts) | 사람 |
| `harness/templates/` | 단계별 산출물 양식 (`{{…}}` 남으면 FAIL) | 사람 |
| `harness/scripts/verify.mjs` | init·status·Gate·reopen·unblock, 상태 전이 | — |
| `runs/<run-id>/input/prd.md` | 이번 실행 입력 (원본 복사) | 없음 |
| `runs/<run-id>/3-design/rules.yaml` | 이번 실행 **판정 SSOT** | rule-builder 반환 → 저장 |
| `runs/<run-id>/state.json` | 진행 상태 | **스크립트만** |
| `runs/<run-id>/2-concept/approval.md` | 컨셉 컨펌 (유일한 사람 승인) | **사람만** |
| `runs/<run-id>/5-review/` | 판정 결과 | **스크립트만** |
| `docs/` | 설계 자료 (story-service·story-work·첫 사례 PRD·design.md·references 기준선) | 사람 |
| `harness/archive/` | 이전 인터뷰 기록 보존 — 실행 중 참조하지 않음 | — |

## 에이전트

작업 에이전트는 파일을 쓰지 않고 `=== FILE: … ===` 블록으로 반환합니다.
오케스트레이터(메인 세션)는 내용을 고치지 않고 현재 단계 폴더에만 저장합니다.

| 에이전트 | 단계 | 반환 경로 |
|---|---|---|
| `researcher` | 1 | `1-research/` |
| `concept-designer` | 2 | `2-concept/` (approval.md 제외) |
| `designer` | 3 | `3-design/` (rules.yaml 제외) |
| `rule-builder` | 3 | `3-design/rules.yaml` 하나 |
| `prototyper` | 4 | `4-prototype/` |
| `verifier` | 1·3·5 Gate | 없음 — `verify.mjs` 실행만 |

## 핵심 금지

- 반환 블록 내용을 고치거나, 산출물을 직접 작성하지 않는다.
- `state.json`·`approval.md`·`5-review/`·`harness/`를 직접 수정하지 않는다.
- 다음 행동은 `verify.mjs` 종료 코드로만 정한다. 판정을 해석으로 뒤집지 않는다.
- 훅에 막히면 우회하지 말고 사용자에게 보고한다. runs/에는 Bash로 쓰지 않는다.

처음 받은 환경에서는 `cd harness && npm install`을 한 번 실행합니다.
