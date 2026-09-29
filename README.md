# study-harness — UI 설계 하네스

PRD 하나를 받아 **1 리서치 → 2 컨셉(+👤 컨펌) → 3 디자인 → 4 프로토타입 → 5 검수** 순서로
핵심 사용자 흐름과 MVP 화면을 설계하고, 단계마다 스크립트 게이트로 판정하는 Claude Code 하네스입니다.

## 폴더 구성

| 경로 | 용도 |
|---|---|
| `.claude/agents/` | 단계별 작업 에이전트 정의 — researcher · concept-designer · designer · rule-builder · prototyper · verifier |
| `.claude/skills/run-harness/` | 오케스트레이터 절차 (시작·재개·게이트·승인·차단 처리) |
| `.claude/settings.json` | 훅 설정 — 에이전트의 직접 쓰기·금지 파일 수정을 막는 가드 |
| `docs/` | 설계 자료 — 첫 사례 PRD, 서비스·작업 스토리, `design.md`, 리서치 기준선 `references.md` |
| `harness/r2-purpose.md` ~ `r8-verify.md` | 하네스 설계 SSOT (R2~R8 결정 기록) |
| `harness/design-base.md` · `guides/` | 공통 디자인 기준과 HTML 화면 구현 형식 |
| `harness/rules-base.yaml` | 공통 판정 규칙과 게이트 순서·복귀·최대 시도 횟수 |
| `harness/templates/` | 단계별 산출물 양식 (`{{…}}`가 남으면 FAIL) |
| `harness/scripts/` | `verify.mjs`(init·status·게이트 판정·reopen·unblock), `save-blocks.mjs`(반환 블록 저장), 가드 훅, 테스트 |
| `runs/<run-id>/` | 실행별 산출물 — `input/` PRD 사본, `1-research` ~ `4-prototype` 단계 결과, `5-review/` 판정 리포트, `state.json` 진행 상태 |

## 사용법

```bash
cd harness && npm install && npm test
```

테스트가 모두 통과하면 Claude Code에서 요청합니다.

- `새 PRD로 하네스 돌려줘 docs/prd.md` — 새 실행
- `이어서 해줘` · `지금 어디까지 했어?` — 재개·상태 확인
- `approval.md 썼어` — 2 컨셉 뒤 사람 승인 반영 (`runs/<run-id>/2-concept/approval.md`는 사람만 작성)

자세한 규칙은 [CLAUDE.md](CLAUDE.md)를 보세요.
