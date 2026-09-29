# R5 게이트 — 확정

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
| B3 | 모서리 | {0, 8, 12, 16, 999} 밖의 radius 값 = 0개 (`0` 추가: 2026-09-29 Omong 승인 — 모서리 없는 요소 허용) |
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
