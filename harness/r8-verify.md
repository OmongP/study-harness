# R8 검증과 리뷰 — 확정

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
