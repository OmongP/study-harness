# harness.md — UI 설계 하네스 (TO-BE) · 초안

> 상태: **초안.** 라운드마다 질문 → Omong 확인 → 승인 순서로 해당 섹션만 확정한다. 확정되지 않은 섹션은 "미정"으로 둔다.
> 재료: story-service.md (R1-A, 판정 기준) · story-work.md (R1-B, 작업 흐름) · prd.md (입력) · design.md (영어일기 서비스 기준)

| 라운드 | 상태 |
|---|---|
| R0 준비물 확인 | 통과 (2026-09-29) |
| R1-A / R1-B | 확정 — story-service.md / story-work.md |
| R2 목적 | **확정 (2026-09-29)** |
| R3 파이프라인 | **확정 (2026-09-29)** |
| R4 산출물 | **확정 (2026-09-29)** |
| R5 게이트 | **확정 (2026-09-29)** |
| R6 역할 | **확정 (2026-09-29)** |
| R7 오케스트레이터 | **확정 (2026-09-29)** |
| R8 검증과 리뷰 | **확정 (2026-09-29)** |

## R2 목적 — 확정

| 항목 | 내용 |
|---|---|
| 매번 새로 들어오는 입력 | `prd.md` |
| 실행 중 생성되는 서비스별 산출물 | 서비스별 `design.md` — PRD와 함께 입력되는 문서가 아니라, 하네스 실행 중 컨셉 승인 이후 생성된다 |
| 고정되는 것 | `design-base.md` + 작업 방식 + 공통 Gate 구조 |
| 사용자 | Omong 1명. 하네스를 실행하고, 사람이 판단해야 하는 컨셉 승인 지점에서 직접 승인한다 |
| 1회 실행 범위 | PRD 하나를 받아 핵심 사용자 흐름과 MVP 화면을 설계하고 검수까지 마친다 |
| 첫 번째 입력 사례 | 영어일기 PRD (`docs/prd.md`) |
| 재사용 목표 | 다른 서비스 PRD가 들어와도 같은 하네스로 돌린다 |

**완료 기준 (한 문장)**

> 실행 폴더에 인터랙티브 프로토타입과 검수 결과가 있고, 검수 결과가 **PRD 사용자 흐름 누락 0개 / 서비스 금지 조건 위반 0개 / 디자인 규칙 위반 0개 / 사람 승인 기록 1개**이면 완료다.

- "PRD 사용자 흐름 누락"은 PRD에 적힌 흐름 단계를 목록으로 만든 뒤, 프로토타입에서 이어지지 않는 단계의 개수로 센다.

**뒤 라운드로 넘기는 메모 (결정 아님)**

- design.md는 공통 기준(`design-base.md`)과 서비스별 기준(`design.md`)으로 나눈다. 파일 위치는 R4에서, `rules.yaml` 추출과 기계·사람 Gate 분리는 R5에서 정한다.
- 영어일기 `docs/design.md`는 그때까지 원본 그대로 유지한다.

## R3 파이프라인 — 확정

**5단계**

`prd.md 입력 → 1 리서치 → 2 컨셉 → 👤 승인 → 3 디자인 → 4 프로토타입 → 5 검수`

| 단계 | 하는 일 | AS-IS |
|---|---|---|
| 1 리서치 | 레퍼런스 수집 + 분석·반영 요소 정리 | S1, S2 |
| 2 컨셉 | 화면 구조 설계 + 키스크린 2~3개 → 👤 사람 승인 | S3, S4, S5 |
| 3 디자인 | 승인된 컨셉을 기준으로 서비스별 `design.md` 생성 + 전체 화면 디자인 | S6 |
| 4 프로토타입 | PRD의 주요 사용자 흐름에 맞춰 인터랙션 연결 | (신규) |
| 5 검수 | PRD·서비스 조건·디자인 규칙을 한 번에 판정하고, 결과를 두 묶음으로 나눠 보여줌 | S7 + (신규) PRD 대조 |

**단계별 입출력** (파일 이름과 위치는 R4에서 정함)

| 단계 | 입력 | 출력 |
|---|---|---|
| 1 리서치 | `prd.md`, `design-base.md` | 레퍼런스 선별본 + 반영 요소 |
| 2 컨셉 | 1의 출력, `prd.md` | 화면 구조 문서, 키스크린 2~3개, 승인 기록 |
| 3 디자인 | 2의 출력(승인된 것만), `design-base.md` | 서비스별 `design.md`, 전체 화면 |
| 4 프로토타입 | 3의 전체 화면, `prd.md`의 사용자 흐름 | 인터랙티브 프로토타입 |
| 5 검수 | 4의 프로토타입, `prd.md`, `design-base.md`, 서비스별 `design.md` | 검수 결과 (PRD·서비스 묶음 / 디자인 규칙 묶음) |

**되돌아가는 지점** (재시도 횟수는 R5에서 정함)

| 실패 종류 | 되돌아갈 곳 |
|---|---|
| 디자인 규칙 위반 (토큰·간격·접근성) | 3 디자인 |
| 서비스 금지 조건 위반 (예: AI 대필, 원문 대체) | 3 디자인 |
| PRD 흐름 누락 — 화면은 있는데 연결이 끊긴 경우 | 4 프로토타입 |
| PRD 흐름 누락 — 화면 자체가 없는 경우 | 2 컨셉 (구조를 고치므로 👤 재승인) |
| 👤 컨셉 반려 | 2 컨셉 (레퍼런스 무드가 문제면 1 리서치) |

## R4 산출물 — 확정

**폴더 구조**

```
study-harness/
├─ docs/                  ← 하네스 설계 자료 (그대로 유지)
│  └─ prd.md, design.md, story-service.md, story-work.md, references.md
├─ harness/               ← 고정
│  ├─ harness.md          ← docs/에서 옮김
│  ├─ design-base.md      ← 공통 디자인 기준 (사람·에이전트가 읽음)
│  ├─ rules-base.yaml     ← R5에서 design-base.md로부터 추출
│  └─ templates/          ← 단계별 산출물 형식
└─ runs/<run-id>/         ← 실행 1회 = 폴더 1개
```

- run-id: `YYYY-MM-DD-서비스명` (예: `2026-09-29-english-diary`)
- 생성 시점: `harness/` 폴더 생성, `harness.md` 이동, `design-base.md` 분리는 R8까지 인터뷰를 마치고 CLAUDE.md 초안이 승인된 뒤 한꺼번에 한다.

**기준 문서 4종의 관계**

| 파일 | 위치 | 성격 | 누가 읽나 |
|---|---|---|---|
| `design-base.md` | `harness/` | 고정. 서비스에 종속되지 않는 공통 디자인 기준 | 사람 · 에이전트 |
| `rules-base.yaml` | `harness/` | 고정. design-base.md 중 기계가 판정할 수 있는 공통 규칙 | 스크립트 |
| 서비스별 `design.md` | `runs/<run-id>/3-design/` | 실행마다. 이번 PRD에서 확정된 디자인 기준 | 사람 · 에이전트 |
| 실행별 `rules.yaml` | `runs/<run-id>/3-design/` | 실행마다. 공통 Gate + 이번 서비스 Gate를 합친 **최종 판정 SSOT** | 스크립트 |

- `design-base.md`는 현재 영어일기 `docs/design.md`에서 서비스에 종속되지 않는 공통 기준을 분리해 만든다.
  예: 기준 프레임, 간격 단위, 모서리·터치 영역 규칙, 글자 크기 하한, 대비, "토큰은 정해진 역할에서만"
- `docs/design.md` 원본은 수정하지 않는다.
- R5에서는 design-base.md를 새로 만들지 않는다. design-base.md에서 기계 판정 가능한 규칙을 추출해 `rules-base.yaml`을 만든다.

**단계별 파일** (모두 `runs/<run-id>/` 아래)

| 단계 | 파일 |
|---|---|
| 입력 | `input/prd.md` — 실행 시 원본 PRD를 복사. 수정 금지 |
| 1 리서치 | `1-research/references.md` |
| 2 컨셉 | `2-concept/screen-structure.md`, `2-concept/keyscreens/` (2~3개), `2-concept/approval.md` |
| 3 디자인 | `3-design/design.md`, `3-design/rules.yaml`, `3-design/screens/` |
| 4 프로토타입 | `4-prototype/` (흐름 연결본 + `flows.md`: PRD 흐름 목록과 연결된 화면) |
| 5 검수 | `5-review/report.md` (PRD·서비스 묶음 / 디자인 규칙 묶음) |

**규칙 SSOT**

- 판정자가 읽는 규칙 파일은 `runs/<run-id>/3-design/rules.yaml` 1개다.
- 공통 부분: `harness/rules-base.yaml`을 수정 없이 복사한다.
- 서비스 부분: 3단계에서 서비스별 `design.md`와 `input/prd.md`를 보고 추가한다.
- 무엇을 어떻게 추출할지는 R5에서 정한다.

**상태 저장과 재개**

- 진행 상태: `runs/<run-id>/state.json`
- 상태값: `pending` / `running` / `awaiting_approval` / `pass` / `fail`
- 재개: state.json을 읽고 `pass`가 아닌 첫 단계부터 다시 시작한다.
- `pass`인 단계의 파일은 재개할 때 다시 생성하지 않는다.

```json
{
  "run_id": "2026-09-29-english-diary",
  "current_stage": 3,
  "stages": { "1": "pass", "2": "pass", "3": "running", "4": "pending", "5": "pending" },
  "approval": "2-concept/approval.md",
  "retries": { "3": 1 }
}
```

## R5 게이트 — 확정

### 화면 요소 메타데이터 (판정의 전제)

3 디자인에서 만드는 모든 화면 요소는 아래 속성을 가진다. 기계 Gate는 이 값을 센다.

| 속성 | 붙는 대상 | 값 |
|---|---|---|
| `author` | 모든 텍스트 요소 | `user` / `ai` / `system` |
| `content_role` | `author: ai`인 텍스트 | `question` / `explanation` / `suggestion` / `cue` / `completed_answer` / `diary_body` / `model_answer` |
| `ui_role` | 시스템이 제공하는 UI 요소 | 예: `button`, `card`, `streak`, `score`, `level`, `progress_bar`, `badge`, `ranking`, `missed_day_count` |

- 메타데이터 누락도 실패로 센다: `content_role`이 없는 `author: ai` 텍스트 = 0개.

### 공통 Gate — `harness/rules-base.yaml`

| # | 조건 | 셀 수 있는 형태 |
|---|---|---|
| B1 | 기준 프레임 | 390×844가 아닌 화면 프레임 = 0개 |
| B2 | 간격 | {4, 8, 12, 16, 20, 24, 32} 밖의 간격 값 = 0개 |
| B3 | 모서리 | {8, 12, 16, 999} 밖의 radius 값 = 0개 |
| B4 | 색 하드코딩 | 서비스별 design.md 토큰 목록에 없는 색 값 = 0개 |
| B5 | 글자 크기 | 16 미만 텍스트 중 `caption`(13)·`label`(14) 역할이 아닌 것 = 0개 |
| B6 | 터치 영역 | 44×44 미만 인터랙티브 요소 = 0개 |
| B7 | 대비 | 글자·배경 대비 4.5:1 미만 = 0개 |
| B8 | PRD 흐름 | PRD 흐름 단계 중 프로토타입에서 이어지지 않는 것 = 0개 |

- PRD에 없는 화면은 세지 않는다. PRD에 명시되지 않은 보조 화면·상태가 필요할 수 있다.

### 서비스 Gate — 영어일기 (실행별 `rules.yaml`에 추가)

| # | 조건 | 셀 수 있는 형태 | 출처 |
|---|---|---|---|
| **S1 ★** | AI 대필 금지 | Write·Comeback·전이 단서 영역에서 `content_role` ∈ {`completed_answer`, `diary_body`, `model_answer`}인 요소 = 0개 | R1-A N1 |
| **S2 ★** | 원문 보존 | Review 화면에서 사용자 원문 텍스트가 입력 원문과 다른 경우 = 0개, 원문에 취소선 = 0개 | R1-A N2 |
| **S3 ★** | 선택권 기본값 | 기본 선택이 "내 표현 유지"가 아닌 Correction Unit = 0개 | R1-A N2 |
| S4 | 게임화 요소 | `ui_role` ∈ {`streak`, `score`, `level`, `progress_bar`, `badge`, `ranking`, `missed_day_count`}인 요소 = 0개. `author: user` 텍스트는 검사하지 않음 | design.md §9 |

### 사람 확인 항목 (기계 Gate 아님)

5 검수 리포트에 "사람 확인" 칸으로 표시한다. 판정을 막지는 않는다.

| 항목 | 이유 |
|---|---|
| 성인 톤 (캐릭터·일러스트·이모지 사용 여부와 전체 인상) | 기계로 명확히 정의하기 어려움 |
| Reuse는 사용자가 새 일기에서 스스로 쓴 경우만 인정 | 정적 화면으로 판정 불가 |
| 레퍼런스 무드가 서비스 방향과 맞는지 | 실행별 리서치 기준으로 판단 |

### 사람 승인 — 1곳

- 위치: 2 컨셉 끝 (AS-IS S5와 같은 자리)
- 기록: `2-concept/approval.md` — `approved: yes/no`, 채택 키스크린, 날짜, 코멘트
- `approved: yes`가 없으면 3 디자인을 시작하지 않는다. `state.json`은 `awaiting_approval`에서 멈춘다.

### Gate 위치와 실패 처리

| 위치 | Gate | 실패 시 |
|---|---|---|
| 1 리서치 끝 | R1: 레퍼런스 ≥ 10개 / 빈 분석 항목(가져올 것·피할 것·대응 화면·무드 태그) = 0개 / PRD 섹션이나 화면과 연결되지 않은 반영 요소 = 0개 (반영 요소 ≥ 1개) | 1 리서치 다시 |
| 3 디자인 끝 (중간) | B2~B7 + S1~S4 + 메타데이터 누락 0개 | 3 디자인 다시 |
| 5 검수 (최종) | 실행별 `rules.yaml` 전체 (B1~B8, S1~S4) | R3의 복귀 지점으로 |

- 무드 방향은 고정 비율로 판정하지 않는다. 해당 실행의 `1-research/references.md` 상단에 "리서치 기준"으로 적고, 사람 확인 항목으로 본다.
- 재시도: 같은 단계로 되돌아가는 건 최대 2번. 3번째 실패하면 멈추고 `awaiting_approval`로 사람에게 넘긴다.
- ★ Critical(S1~S3) 중 하나라도 실패하면 다른 결과와 상관없이 즉시 FAIL. 리포트 맨 위에 먼저 표시한다.
- `story-work.md` G1 초안의 `손글씨/편안함 ≥ 30%`는 이 R5로 대체한다. story-work.md는 AS-IS 기록이라 수정하지 않는다.

## R6 역할 — 확정

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

## R7 오케스트레이터 — 확정

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
- `harness.md`나 에이전트 정의에 있는 세부 내용은 옮겨 쓰지 않고 경로만 가리킨다.

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

## R8 검증과 리뷰 — 확정

### v1 목표

생성 → 기계 검증 → 실패 시 복귀 → 재검증까지 하네스 전체가 실제로 동작하는지 확인한다.
Figma 자동화는 v1 목표가 아니다.

### 화면 형식 — HTML/CSS

- 키스크린과 전체 화면: 화면 1개 = 390×844 기준 HTML 파일 1개
- 기계 판정이 필요한 요소에는 메타데이터 속성을 붙인다: `data-author`, `data-content-role`, `data-ui-role`
- 프로토타입: 화면 HTML을 링크로 연결해 브라우저에서 PRD 주요 흐름을 직접 눌러볼 수 있게 한다.

**Figma에 종속되지 않는 판정 구조**

```
화면(HTML) → [추출기] → elements.json → [판정 스크립트 + rules.yaml] → 결과
```

- `harness/scripts/extract_html.*`: HTML에서 요소별 크기·간격·radius·색·글자 크기·대비·메타데이터를 뽑아 `elements.json`으로 만든다.
- `harness/scripts/verify.mjs`: `elements.json`과 `rules.yaml`만 읽어 판정한다(화면 형식을 모른다). init/status/reopen/unblock과 상태 전이도 함께 맡는다.
- `harness/scripts/save-blocks.mjs`: 큰 반환 블록을 guard-write와 같은 경로 규칙으로 검사한 뒤 그대로 저장한다. 하나라도 거부되면 아무것도 저장하지 않는다.
- 스크립트 언어: Node.js (`.mjs`)
- **v1 이후 확장 (범위에서 제외하지 않음):** Figma MCP 기반 출력·검증. `extract_figma.*`가 같은 형식의 `elements.json`을 만들면 규칙과 판정 스크립트를 바꾸지 않고 교체하거나 추가할 수 있다.

### 필수 검증 1 — 규칙별 PASS/FAIL fixture 테스트

- 위치: `harness/scripts/tests/`
- 규칙(B1~B8, S1~S4, R1 리서치 Gate)마다 fixture 2개: 통과 샘플 1개 + 그 규칙만 딱 1번 어긴 위반 샘플 1개
- ★ S1~S3는 위반 샘플 필수 (예: Write 화면에 `data-content-role="model_answer"`)
- 템플릿 미치환 `{{…}}` 검사도 fixture에 포함: 자리표시가 남은 산출물은 FAIL
- 모든 fixture가 예상 결과와 일치해야 판정 스크립트를 신뢰한다. 하나라도 어긋나면 첫 실행을 시작하지 않는다.

### 필수 검증 2 — 저장 권한 테스트

| 시험 | 기대 |
|---|---|
| 서브에이전트 6개가 각각 runs/에 Write 시도 | 6칸 모두 차단 |
| 오케스트레이터가 현재 단계 폴더에 저장 / 다른 단계 폴더에 저장 | 통과 / 차단 |
| 오케스트레이터가 `state.json`·`approval.md`·`5-review/`에 쓰기 | 3칸 모두 차단 |
| 승인 대기 중 Maker 에이전트 호출 | 차단 |
| verifier가 `verify.mjs` 실행 / 다른 Bash 명령 실행 | 통과 / 차단 |
| 승인 후 `keyscreens/` 파일 변경 → 3 디자인 판정 | 승인 무효 (종료 코드 1, approval-stale 보관) |

→ 총 15칸, 모두 기대대로여야 첫 실행을 시작한다.

- 근거 (공식 문서 확인, 2026-09-29): PreToolUse 훅 입력의 `agent_type`은 서브에이전트 호출에만 있다. 에이전트 frontmatter에 훅을 걸 수 있다. 훅은 exit 2 또는 `permissionDecision: "deny"`로 차단한다.
- 참고 구현: figmatutor2/harness (서브에이전트 직접 쓰기 문제로 반환 블록 방식 채택, 2026-09-26)

### 첫 실제 실행

- run: `runs/2026-09-29-english-diary/` — 영어일기 PRD를 입력으로 처음부터 끝까지
- 성공 기준: R2 완료 기준 (PRD 흐름 누락 0 / 서비스 금지 위반 0 / 디자인 위반 0 / 사람 승인 기록 1)
- 기준선 비교: `1-research/references.md`를 `docs/references.md`와 나란히 비교한다.
  `docs/references.md`는 입력으로 쓰지 않고 결과 비교용 기준선으로만 쓴다.

### 리뷰

- 첫 실행 후 Omong이 `report.md`, 사람 확인 항목, 재시도 기록을 보고 개선점을 말한다.
- 개선점은 이 파일 맨 아래 "R8 리뷰 로그"에 날짜별로 쌓는다.
- `harness/` 파일(규칙, 에이전트 정의, 스크립트) 변경은 Omong 승인 후에만 한다. 실행 중인 에이전트는 수정하지 않는다.
- 같은 규칙이 2번 이상 결과물 문제 없이 실패하면, 규칙 자체를 다시 볼 후보로 표시한다.

## R8 리뷰 로그

(첫 실행 후 기록)
