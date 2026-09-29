# R4 산출물 — 확정

**폴더 구조**

```
study-harness/
├─ docs/                  ← 하네스 설계 자료 (그대로 유지)
│  └─ prd.md, design.md, story-service.md, story-work.md, references.md
├─ harness/               ← 고정
│  ├─ r2-purpose.md ~ r8-verify.md  ← 라운드별 설계 SSOT (원본 harness.md는 harness/archive/)
│  ├─ design-base.md      ← 공통 디자인 기준 (사람·에이전트가 읽음)
│  ├─ rules-base.yaml     ← R5에서 design-base.md로부터 추출
│  └─ templates/          ← 단계별 산출물 형식
└─ runs/<run-id>/         ← 실행 1회 = 폴더 1개
```

- run-id: `YYYY-MM-DD-서비스명` (예: `2026-09-29-english-diary`)
- 생성 시점: `harness/` 폴더 생성, `harness.md`의 라운드별 파일 분리, `design-base.md` 분리는 R8까지 인터뷰를 마치고 CLAUDE.md 초안이 승인된 뒤 한꺼번에 한다.

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
