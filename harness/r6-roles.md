# R6 역할 — 확정

### 역할 3종

| 구분 | 에이전트 | 하는 일 | 하지 않는 일 |
|---|---|---|---|
| **Maker** | researcher / concept-designer / designer / prototyper | 단계 결과물을 만든다 | 규칙 작성, 판정 |
| **Rule Builder** | rule-builder | 실행별 `rules.yaml`을 만든다 | 결과물 제작, 판정 |
| **Judge** | verifier | `rules.yaml`로 결과물을 판정하고 결과를 반환한다 | 결과물 수정, 규칙 수정 |

### 산출물 저장 방식 — 반환 블록

- 모든 에이전트는 파일을 직접 쓰지 않는다 (Write·Edit 도구 없음).
- 결과는 `=== FILE: runs/<run-id>/<경로> ===` … `=== END FILE ===` 블록으로 반환한다.
- 오케스트레이터는 블록 내용을 한 글자도 고치지 않고, 허용된 현재 단계 경로에만 그대로 저장한다. 경로가 허용 밖이면 저장하지 않고 사용자에게 보고한다.

### 에이전트별 반환 가능 경로 (1개)

모든 경로는 `runs/<run-id>/` 기준이다.

| 에이전트 | 단계 | 반환할 수 있는 경로 | 읽기만 |
|---|---|---|---|
| `researcher` | 1 리서치 | `1-research/` | `input/prd.md`, `harness/design-base.md` |
| `concept-designer` | 2 컨셉 | `2-concept/` (`approval.md` 제외) | `1-research/`, `input/prd.md` |
| `designer` | 3 디자인 | `3-design/` (`rules.yaml` 제외) | `2-concept/`(승인된 것), `harness/design-base.md`, `3-design/rules.yaml` |
| `rule-builder` | 3 디자인 | `3-design/rules.yaml` 한 파일 | `harness/rules-base.yaml`, `input/prd.md`, `3-design/design.md` |
| `prototyper` | 4 프로토타입 | `4-prototype/` | `3-design/`, `input/prd.md` |
| `verifier` | 1·3단계 중간 Gate, 5 검수 | 없음 — `verify.mjs` 실행만 | **전부 읽기 전용** |

- 어떤 에이전트의 블록도 저장하지 않는 곳: `input/`, `harness/`, `state.json`, `2-concept/approval.md`, `5-review/`.
- 블록 저장 시 에이전트별로 검사한다: designer 블록에 `rules.yaml`이 있으면 거부하고, rule-builder 블록은 `3-design/rules.yaml` 하나만 허용한다.
- `rules.yaml`은 rule-builder만 쓴다. designer와 verifier 모두 수정할 수 없다.

### 3 디자인 단계 내부 순서 (고정)

1. `designer` — 서비스별 `3-design/design.md` 작성
2. `rule-builder` — `rules-base.yaml` + `input/prd.md` + `3-design/design.md` → `3-design/rules.yaml` 생성
3. `designer` — 확정된 `rules.yaml`을 읽고 `3-design/screens/` 전체 화면 제작
4. `verifier` — 3단계 중간 Gate → `5-review/gate-3.md`

### verifier 결과 파일

| 파일 (verify.mjs가 씀) | 언제 |
|---|---|
| `5-review/gate-1.md` | 1 리서치 끝 |
| `5-review/gate-3.md` | 3 디자인 끝 |
| `5-review/report.md` | 5 검수 (최종) |

**report.md 작성 순서**

1. ★ Critical (S1~S3) — 실패가 있으면 맨 위에 표시
2. PRD·서비스 묶음 (B8, S1~S4)
3. 디자인 규칙 묶음 (B1~B7)
4. 사람 확인 항목 (성인 톤, Reuse 조건, 레퍼런스 무드)
5. 다음 행동 — 복귀할 단계, 남은 재시도 횟수

위반 한 건 = 한 줄: `화면 / 요소 / 값 / 기대값 / 규칙 번호`

### 자연어 트리거

| 이렇게 말하면 | 이렇게 동작 |
|---|---|
| "새 PRD로 하네스 돌려줘" + PRD 경로 | run 폴더 생성, `input/prd.md` 복사, 1 리서치 시작 |
| "이어서 해줘" | `state.json`을 읽고 `pass`가 아닌 첫 단계부터 재개 |
| "approval.md 썼어" / "컨펌 받았어" | 승인 대기 상태일 때만. verifier가 approval 판정 → 승인이면 3 디자인, 반려면 2 컨셉으로 복귀. 오케스트레이터는 approval.md를 쓰지 않고, 사용자가 채팅으로만 말하면 파일 작성을 안내한다 |
| "막힌 거 풀어줘" | 사용자가 명시적으로 요청할 때만 `verify.mjs unblock` |
| "검수만 다시 해줘" | 5 검수만 다시 실행. 다른 단계는 건드리지 않음 |
| "지금 어디까지 했어?" | `state.json` 요약 (단계별 상태, 재시도 횟수, 멈춘 이유) |
