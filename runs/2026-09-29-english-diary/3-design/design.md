# design.md — 영어가 내 것이 되는 일기 (서비스별 디자인 기준)

> 실행: `2026-09-29-english-diary` · 작성: 3 디자인 ① (designer)
> 근거: `input/prd.md`, `2-concept/approval.md`(approved: yes, 채택 키스크린 review.html, 2026-09-29), `2-concept/screen-structure.md`, `2-concept/keyscreens/`(review.html · home.html · write.html), `harness/design-base.md`, `harness/guides/html-screen-guide.md`, `harness/rules-base.yaml`, 설계 자료 `docs/design.md`.
> 공통 기준(`design-base.md`)을 그대로 따르고, 이 문서는 **서비스에만 해당하는 값**(팔레트·폰트·컴포넌트·금지 사항·영역 이름)을 정한다. 공통 기준과 다른 값은 두지 않는다.
> 판정 SSOT는 이 문서가 아니라 `3-design/rules.yaml`이다. rule-builder는 아래 §2 색 값 목록과 §8 서비스 규칙을 읽어 `service`에 옮긴다.

## 1. 개요

- 성인이 혼자 쓰는 조용한 일기장 톤이다. 교실·게임·SNS 피드처럼 보이면 안 된다.
- 화면의 주인공은 **사용자가 직접 쓴 영어**다. AI 질문·교정 제안·이유는 보조이며, 원문보다 권위 있어 보이게 두지 않는다.
- 따뜻한 종이색 배경, 먹색 글자, 절제된 초록 강조, 최소한의 교정 표시만 쓴다. 시각적 풍부함은 사용자 사진이 맡는다.
- 쉬었다 돌아오는 것은 정상 사용이다(PRD 6.3). 성취는 날짜와 사실로만 보여준다(PRD 6.4).
- 채택 키스크린 `review.html`의 패턴(원문 카드 + 밑줄 표시, 수정 1개당 Correction Unit 1개, Reuse Notice, 저장 영역)이 전체 화면의 기준이다. `home.html`·`write.html`도 같은 토큰과 컴포넌트를 쓴다.

## 2. 색 토큰 (B4 허용 목록 — 이 9개 값만)

| 토큰 | 값 | 역할 |
|---|---|---|
| `paper` | `#FAF8F4` | 앱 기본 배경, 화면 루트·하단 고정 영역 배경 |
| `ink` | `#1C1B19` | 본문 글자, 아이콘, 사용자 원문 |
| `surface` | `#FFFFFF` | 카드, 시트, 입력칸, 보조 버튼 배경, 탭바 배경 |
| `line` | `#E6E2DA` | 1px 테두리, 구분선 |
| `ink-muted` | `#6B6760` | 보조 글자(caption·메타·보조 설명), 비선택 탭 |
| `accent` | `#2F5D50` | 주 버튼 배경, 선택 상태 테두리, 링크·강조 글자, 교정 제안 글자, 재사용 점선 밑줄 |
| `accent-soft` | `#E4EEEA` | Memory Comeback Card, Reuse Notice, 선택된 Choice Chip 배경, 넘기기 버튼 배경 |
| `mark-issue-soft` | `#FBF1DE` | 다듬어 볼 표현의 배경 표시 |
| `mark-issue` | `#C8891E` | 다듬어 볼 표현의 실선 밑줄(`border-bottom`) **전용** |

rule-builder용 값 목록 (`service.tokens.colors`):
`#FAF8F4`, `#1C1B19`, `#FFFFFF`, `#E6E2DA`, `#6B6760`, `#2F5D50`, `#E4EEEA`, `#FBF1DE`, `#C8891E`

색 사용 규칙:

- 위 9개 밖의 색 값은 쓰지 않는다. `docs/design.md`의 `danger(#B3412E)`는 이번 실행에서 **쓰지 않는다**. 오류·안내 상태는 `ink` 글자와 문구·아이콘으로 표현한다.
- **반투명 색을 쓰지 않는다.** 알파가 1 미만인 색(`rgba(…, 0.x)`, `#RRGGBBAA`, `opacity`로 만든 딤 배경)은 B4 위반이다. 시트 뒤 딤(scrim)을 쓰지 않고 `line` 테두리와 `surface`/`paper` 대비로 구분한다. `box-shadow`도 쓰지 않는다.
- 투명(`transparent`)은 "색 없음"으로 허용한다.
- `mark-issue`(#C8891E)는 글자색으로 쓰지 않는다. 흰 배경 대비가 4.5:1에 못 미친다.
- 빨간색·취소선·"틀림" 표시로 사용자 영어를 표시하지 않는다.
- 색만으로 의미를 전달하지 않는다. 밑줄 모양(실선/점선), 라벨 문구, `✓` 같은 기호, 구조를 함께 쓴다.
- 사용자 사진·사진 대체 이미지(`<img>` 안의 색)는 색 규칙 대상이 아니다. 사진 위에 글자를 얹으면 `data-on-image="true"`를 붙인다(되도록 얹지 않는다).

확인된 글자·배경 조합 (4.5:1 이상):

| 글자 | 배경 | 용도 |
|---|---|---|
| `ink` | `paper` / `surface` / `accent-soft` / `mark-issue-soft` | 본문·원문·표시된 표현 |
| `ink-muted` | `paper` / `surface` / `accent-soft` | caption·메타·보조 설명 |
| `accent` | `paper` / `surface` / `accent-soft` | 링크, 교정 제안, 카드 라벨 |
| `surface` | `accent` | 주 버튼 글자 |

위 표에 없는 조합(예: `ink-muted` 글자를 `mark-issue-soft` 위에 두기)은 쓰기 전에 대비를 확인한다.

## 3. 타이포그래피

폰트:

- UI·한국어: `Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif`
- 사용자가 쓴 영어(일기 원문·입력): `Newsreader, Georgia, serif`

글자체를 나누는 이유: 사용자 영어는 "내 글"로, AI 설명과 시스템 UI는 중립적으로 보이게 한다. 원문과 AI 제안은 색만이 아니라 **글자체·라벨·위치**로도 구분한다.

| 토큰 | 크기 | 굵기 | 줄 높이 | 용도 |
|---|---|---|---|---|
| `display` | 28px | 700 | 1.3 | 화면 핵심 한 문장 (필요할 때만) |
| `title` | 22px | 700 | 1.35 | 화면 제목 (`h1`) |
| `heading` | 18px | 600 | 1.4 | 섹션·카드 제목, AI 영어 질문, 회상 단서 |
| `body` | 16px | 400 | 1.6 | 기본 UI 글자, AI 이유 설명, 한국어 보조 설명 |
| `diary` | 18px | 400 | 1.75 | 사용자 영어 원문·입력 (Newsreader) |
| `diary-preview` | 16px | 400 | 1.6 | 목록·카드 안의 원문 미리보기 (Newsreader) |
| `label` | 14px | 600 | 1.4 | 짧은 컨트롤 라벨, Choice Chip, 탭, 카드 라벨 |
| `caption` | 13px | 400 | 1.5 | 날짜·메타·자동 저장 상태·범례 |

- 16px 미만은 `label` 14px, `caption` 13px 두 가지만 쓴다(B5). 12px·15px 같은 값은 쓰지 않는다.
- 설명 문장은 caption으로 쓰지 않는다. 설명은 `body` 16px 이상이다.
- 정보 텍스트에 줄 수 고정(`-webkit-line-clamp`, 고정 높이 + `overflow:hidden`)을 쓰지 않는다. 200% 확대에서도 줄바꿈된다. 미리보기가 길면 전체 기록(entry.html)으로 가는 링크를 둔다.
- 모두 대문자 강조, 장식 글꼴을 쓰지 않는다.

## 4. 레이아웃 · 모양

공통 기준(`design-base.md` 1·4·5절)을 그대로 따른다.

| 항목 | 값 |
|---|---|
| 화면 루트 | `<main data-screen="이름">` 파일당 1개, `width: 390px; height: 844px; overflow-y: auto; background: paper` |
| 간격 (padding · gap) | `4 / 8 / 12 / 16 / 20 / 24 / 32`만. 가운데 정렬 외에는 margin 대신 padding·gap으로 간격을 만든다 |
| 화면 좌우 여백 | `20px` |
| 섹션 사이 | `20` 또는 `24` |
| 카드 안쪽 여백 | `16` (목록 행은 `12`) |
| 모서리 | `0 / 8 / 12 / 16 / 999`만 |
| 터치 영역 | 모든 인터랙티브 요소 `44 × 44px` 이상 (`min-height: 44px`, 좁은 링크·뒤로 가기는 `min-width: 44px`) |

모서리 역할:

| 값 | 쓰는 곳 |
|---|---|
| `0` | 탭바·하단 고정 영역·구분선처럼 모서리 없는 요소 |
| `8` | 작은 유틸리티 면 (썸네일 옆 작은 표시 등) |
| `12` | 버튼, 입력칸, 사진 |
| `16` | 카드(원문 카드, Correction Unit, Comeback Card, Reuse Notice, 질문 카드, 기록 행), 시트 윗모서리 |
| `999` | Choice Chip, 출처 표시 알약 |

- 그림자·그라데이션을 쓰지 않는다. 면 구분은 `surface`/`paper` 대비와 `1px line` 테두리로 한다.
- 하단 고정 영역(주 버튼)은 `position: sticky; bottom: 0; background: paper; border-top: 1px solid line`.
- 사진은 콘텐츠다. 사진이 없으면 `surface` 면과 글자 단서로 대신하고, 없는 이미지를 지어내지 않는다.
- 아이콘은 단순한 기호(`‹`, `✓`, `↓`)만 쓴다. 장식용이면 `aria-hidden="true"`를 붙인다.
- 움직임은 상태 변화·이동 설명에만 쓴다. 축하 연출(색종이, 튀는 보상, 불꽃)은 쓰지 않는다.

## 5. 컴포넌트

키스크린에서 쓴 클래스 이름과 값을 전체 화면에서도 그대로 쓴다.

### 5.1 상단 바 `.topbar`
- `display:flex; justify-content:space-between; gap:8px; padding:8px 12px`.
- 뒤로 가기 `.back`: `<a href>` + `min-height:44px; min-width:44px; padding:8px`, 글자 `body` 600, `aria-label` 필수(예: "홈으로 돌아가기").
- 오른쪽에는 날짜(`caption`) 또는 자동 저장 상태(`caption`, `role="status"`).

### 5.2 버튼
| 종류 | 배경 | 글자 | 테두리 | 크기·모서리 |
|---|---|---|---|---|
| 주 `.btn-primary` | `accent` | `surface` 16px 600 | 없음 | `min-height:52px; padding:12px 20px; radius 12` |
| 보조 `.btn-secondary` | `surface` | `ink` 16px 600 | `1px line` | `min-height:44px; padding:8px 16px; radius 12` |
| 강조 외곽 `.btn-accent-outline` | `surface` | `accent` 16px 600 | `1px accent` | `min-height:44px; padding:8px 16px; radius 12` |
| 부드러운 `.btn-ghost` | `accent-soft` | `ink` 16px | 없음 | `min-height:44px; padding:8px 16px; radius 12` |
| 텍스트 링크 `.link` | 없음 | `accent` 14px 600, 밑줄 | 없음 | `min-height:44px; padding:8px 0` |

- 화면마다 눈에 띄는 주 버튼은 되도록 1개다.
- 화면 이동은 `<a href="다른화면.html">`로 한다(가이드 10절). 이동이 없는 동작만 `<button type="button">`으로 둔다.
- 모든 버튼·링크에 `data-ui-role="button"`(탭은 `tab`)을 붙인다.

### 5.3 Choice Chip `.chip` — 반영 / 내 표현 유지
- `radius 999; min-height:44px; padding:8px 16px; label 14px 600; background surface; border 1px line; color ink`.
- 선택 상태 `[aria-pressed="true"]`: `background accent-soft; border 1px accent; font-weight 700` + 앞에 `✓` 기호. 색만으로 선택을 알리지 않는다.
- Correction Unit 안의 선택지는 `data-choice="apply"` / `data-choice="keep"`. **`keep`에만 `data-default="true"`와 `aria-pressed="true"`**. 둘을 `role="group"`과 `aria-label`로 묶는다.
- 일괄 반영·전체 Rewrite 버튼은 두지 않는다.

### 5.4 원문 카드 `.original`
- `surface` 배경, `1px line`, `radius 16`, `padding 16`, `gap 8`.
- 라벨: "내가 쓴 글 · 원문 그대로 보관돼요"(`label`).
- 원문: `diary` 서체, `data-author="user"`, 처음 쓴 곳은 `data-original-id`, 다시 보여주는 곳은 같은 값의 `data-original-ref`. 글자는 한 글자도 바꾸지 않는다.
- 다듬어 볼 표현 `.mark`: `background mark-issue-soft; border-bottom 2px solid mark-issue`(실선).
- 스스로 다시 쓴 표현 `.reused`: `border-bottom 2px dotted accent`(점선).
- 범례 caption: "실선 밑줄: 다듬어 볼 수 있는 표현 · 점선 밑줄: 스스로 다시 쓴 표현".
- 취소선(`line-through`, `<s>`, `<del>`, `<strike>`)은 쓰지 않는다.

### 5.5 Correction Unit `.unit` (`data-ui-role="correction-unit"`)
- 순서 고정: 내 표현(user, `diary`, `.mark`) → `↓`(aria-hidden) → 자연스러운 표현(`data-author="ai" data-content-role="suggestion"`, `diary` 서체, `accent` 글자) → 이유(`data-author="ai" data-content-role="explanation"`, `body`) → 선택(5.3).
- `surface`, `1px line`, `radius 16`, `padding 16`, `gap 12`. 수정 1개당 카드 1개.
- 모든 제안에 이유가 있다. 제안이 원문보다 크거나 굵게 보이지 않는다.

### 5.6 Reuse Notice `.reuse`
- `accent-soft` 배경, `radius 16`, `padding 16`, `gap 8`. 라벨 "스스로 다시 쓴 표현"(`label`, `accent`).
- 다시 쓴 표현(`data-author="user"`, Newsreader 600), 사실 문장, 날짜 caption("9월 14일 처음 배움 · 9월 28일 스스로 씀"), Expression Journey 링크.
- 여러 개면 한 알림 안에 항목을 나눠 쌓는다. 축하 문구·아이콘은 쓰지 않는다.
- 전이 단서를 보고 쓴 답은 Reuse Notice에 넣지 않는다.

### 5.7 Memory Comeback Card `.comeback` (`data-area="comeback"`)
- `accent-soft` 배경, `radius 16`, `padding 16`, `gap 12`. 앱을 연 시점에 카드 1개만 둔다.
- 구성: 라벨 "다시 떠올려 볼 기억" → 사용자 사진(`radius 12`) → 날짜 caption("9월 28일의 기록에서") → 한국어 단서(`data-author="ai" data-content-role="cue"`, `heading`) → [영어로 떠올려 보기](`.btn-accent-outline` → recall.html) / [지금은 넘기기](`.btn-ghost`).
- 정답 영어, 남은 개수, 공백 일수, 스트릭은 넣지 않는다. 인사는 "다시 만나서 반가워요"처럼 쉰 기간을 말하지 않는다.

### 5.8 질문 카드 `.question`
- `surface`, `1px line`, `radius 16`, `padding 16`, `gap 8`.
- 영어 질문(`data-author="ai" data-content-role="question"`, `heading`) + 한국어 뜻(`question`, `body`, `ink-muted`) + [다른 질문 보기] 칩.
- 질문만 준다. 예시 문장·완성 답·추적 표현은 넣지 않는다.

### 5.9 영어 입력칸 `.input`
- `diary` 서체, `surface`, `1px accent`(쓰는 중) 또는 `1px line`, `radius 12`, `padding 16`, `min-height 180px`.
- `<textarea>` 또는 `role="textbox" contenteditable="true" data-interactive="true"`. `aria-labelledby`로 라벨 "내 영어로 쓰기"를 연결한다. `data-author="user"`.
- 아래 caption: "한 문장이어도 괜찮아요. 틀려도 그대로 두면 돼요."
- 상단에 자동 저장 상태 "✓ 자동 저장됨"(`caption`, `role="status" aria-live="polite"`).
- 쓰는 중에는 추적 표현 힌트를 보여주지 않는다.

### 5.10 Conversation UI (write-conversation.html)
- 캡처에서 읽은 말을 **중립 말풍선**으로 보여준다: 상대 말은 `surface` + `1px line`, 내 말 자리는 `accent-soft`. 모서리 `16`. 말풍선 원문(캡처 한국어)은 사용자 기록이므로 `data-author="user"`.
- 내 말풍선마다 아래에 영어 입력칸(5.9, `min-height` 은 `88px`까지 줄여도 된다)을 둔다.
- AI는 말풍선마다 영어 질문(`question`)만 줄 수 있다. 번역 답·대화 답변을 채우지 않는다.

### 5.11 출처 표시 `.source`
- "사진에서 시작" 같은 알약: `label`, `surface`, `1px line`, `radius 999`, `padding 4px 12px`. 누를 수 없는 표시다.

### 5.12 기록 행 `.record` (최근 기록 · 목록)
- `<a href>` 카드: `surface`, `1px line`, `radius 16`, `padding 12`, `gap 12`, `min-height 44`.
- 썸네일 64×64 `radius 12` + 날짜·출처 caption + 원문 미리보기(`diary-preview`, `data-author="user"`, 필요하면 `data-original-ref`).
- 미리보기는 원문을 바꾸지 않는다. 줄 수를 강제로 자르지 않는다.

### 5.13 시트 (start-sheet.html · save-expression.html)
- 별도 HTML 화면으로 만든다. 위쪽은 `paper` 배경 그대로 두고, 아래 시트는 `surface` + `border-top 1px line` + 윗모서리 `radius 16`(`16px 16px 0 0`)으로 구분한다. 딤·그림자는 쓰지 않는다.
- 시트 제목(`heading`) + 닫기(`<a href>` 44×44, `aria-label="닫기"`).
- **기록 시작 시트**: 사진 / 대화 캡처 / 손글씨 / 바로 쓰기 4개 선택지. 각각 44px 이상 `<a href>` 행(`surface`, `1px line`, `radius 12`, `padding 16`), 제목 `body` 600 + 한 줄 설명 `body`(`ink-muted`). 완성 일기를 만들어주는 선택지는 두지 않는다.
- **추적 표현 저장 시트**: 후보 표현(구 단위)을 Choice Chip 모양 체크 목록으로 보여준다. 기본은 아무것도 선택되지 않은 상태이고, 사용자가 고른다. 후보가 사용자 원문이면 `user`, 교정 제안에서 온 표현이면 `ai` + `suggestion`.

### 5.14 Expression Journey 목록
- 세로 목록. 각 항목 = 날짜 caption + 단계 이름(`label`: 처음 씀 / 교정 / 떠올림 / 스스로 씀) + 근거 문장(사용자 원문이면 `diary`·`user`).
- 연결선은 `line` 색 `2px` 세로 테두리(`border-left`)로 표현할 수 있다. 진행률·단계 수(예: "3/4")·완료 퍼센트는 쓰지 않는다.
- "떠올림"은 사용자가 떠올렸다고 직접 확인했을 때만 적는다. "스스로 씀"은 나중에 쓴 사용자 원문을 근거로 붙인다.

### 5.15 탭바 `.tabbar`
- 홈 / My English 2개. `sticky bottom:0; background surface; border-top 1px line; padding 4px 20px 8px; gap 8`.
- 탭 `.tab`: `<a href>`, `min-height 44`, `label` 14px, `ink-muted`. 현재 탭은 `aria-current="page"` + `accent` + 700 + 밑줄(색만으로 구분하지 않음). `data-ui-role="tab"`.

## 6. `data-area` 영역 이름

S1(AI 대필 금지) 검사 대상 영역. 아래 이름만 쓴다.

| `data-area` | 붙는 곳 | 화면 | 안에 둘 수 있는 AI 텍스트 |
|---|---|---|---|
| `write` | 영어 직접 작성 영역 (질문 카드 + 입력칸 전체) | write.html, write-conversation.html | `question` |
| `comeback` | Memory Comeback Card 전체 | home.html | `cue` |
| `recall` | 떠올려 쓰기 영역 (과거 사진 + 한국어 단서 + 입력칸) | recall.html | `cue`, `question` |
| `transfer-cue` | 전이 단서 영역 (다른 상황 제시 + 입력칸) | recall-check.html | `cue`, `question` |

- 위 4개 영역 안에서 `data-content-role`이 `completed_answer`, `diary_body`, `model_answer`인 요소는 0개여야 한다.
- 회상·전이 영역에는 **정답이 되는 영어 표현**을 `cue`·`question` 안에도 넣지 않는다. 단서는 한국어 또는 상황을 묻는 영어 질문으로만 쓴다.
- recall-check.html에서 "내가 전에 쓴 표현"(사용자 원문)은 `transfer-cue` 영역 **밖**에 둔다.

## 7. 메타데이터 적용 (가이드 3·7·8·17절)

- 화면 루트 `<main data-screen="…" data-author="system">`. 시스템 문구는 루트에서 `system`을 물려받는다.
- 사용자 글(원문, 입력, 대화 캡처 원문, 다시 쓴 표현)은 `data-author="user"`.
- AI 글은 반드시 `data-author="ai"` + `data-content-role`. 이번 서비스에서 쓰는 역할은 `question`, `cue`, `suggestion`, `explanation` 네 가지뿐이다. `completed_answer`·`diary_body`·`model_answer`는 쓰지 않는다.
- 원문 짝짓기 ID:

| ID | 원문 | `data-original-id` 위치 | `data-original-ref` 위치 |
|---|---|---|---|
| `d1` | `I drink with my company people yesterday. We talked a lot about our team trip. I'm looking forward to it.` | write.html 입력칸 | review.html 원문 카드, home.html 최근 기록, entry.html |
| 그 밖 | 대화 캡처 답, 회상 답 등 새 원문 | 처음 쓴 화면 | 다시 보여주는 화면 (글자 완전히 동일) |

- `data-original-ref` 텍스트는 원본과 정확히 같아야 한다. 강조는 `<span class="mark">`처럼 글자를 바꾸지 않는 감싸기로만 한다.

## 8. 서비스 금지 사항 → 판정 규칙 (rule-builder 입력)

| ID | 금지 사항 | 근거 | 검사 종류 · 값 제안 |
|---|---|---|---|
| **S1 ★** | AI 대필 금지: 작성·회상·전이 영역에 완성 답, 일기 본문, 모범 답안을 두지 않는다 | PRD 6.5, 3 EXPRESS·RECALL, 7 | `forbid_in_areas`, values `[completed_answer, diary_body, model_answer]`, areas `[write, comeback, recall, transfer-cue]`, critical |
| **S2 ★** | 원문 보존: 다시 보여주는 원문은 원본과 글자가 같고, 취소선이 없다 | PRD 6.1, 7 (자동 Rewrite 금지) | `original_preserved`, critical |
| **S3 ★** | 선택권 기본값: 모든 Correction Unit의 기본 선택은 "내 표현 유지" | PRD 6.2, 3 CORRECT | `default_choice`, unit_role `correction-unit`, expected `keep`, critical |
| S4 | 게임화 요소 금지: 스트릭, 공백 일수, 점수, 등급, 숙련도 단계, 진행률 바, 배지, 순위 | PRD 6.3, 6.4, 7 | `forbid_values`, values `[streak, score, level, progress_bar, badge, ranking, missed_day_count]` |

기계로 세지 않지만 지키는 금지 사항:

- 작성 중 추적 표현 힌트를 보여주지 않는다(PRD 5 Write, 7).
- 미완료 표현 개수, "N일 만이에요" 같은 공백 언급, 독촉 문구를 쓰지 않는다(PRD 6.3).
- 캐릭터·마스코트·이모지 일러스트·축하 연출을 쓰지 않는다(PRD 7). `✓`, `‹`, `↓`만 기능 기호로 쓴다.
- 빨간색·취소선·"틀림"·"오답" 표현을 쓰지 않는다.
- 공개 피드·팔로우·공유·순위를 만들지 않는다(PRD 7).
- 전이 단서를 보고 쓴 답을 Reuse(스스로 씀)로 표시하지 않는다(PRD 3 RECALL).
- 교정 요약에 개수·점수처럼 채점으로 읽히는 문구를 쓰지 않는다.

사람 확인 항목 (rule-builder `service.human_checks` 제안):

- 성인 톤: 캐릭터·일러스트·이모지 사용 여부와 전체 인상
- Reuse는 사용자가 새 일기에서 힌트 없이 스스로 쓴 경우만 인정하는지
- 회상·전이 단서에 정답 영어가 드러나지 않는지(문장 의미 확인)

## 9. 화면 목록과 패턴

`2-concept/screen-structure.md`의 12개 화면을 `3-design/screens/`에 만든다. 파일 이름은 같다.

| 화면 | `data-screen` | 핵심 패턴 | `data-area` |
|---|---|---|---|
| home.html | `home` | 인사(title) · Comeback Card 1개 · 오늘 기록하기(주 버튼 → start-sheet) · 최근 기록 · 탭바 | `comeback` |
| start-sheet.html | `start-sheet` | 기록 시작 시트 4개 선택지 → write / capture-confirm | — |
| capture-confirm.html | `capture-confirm` | 캡처·손글씨 인식 결과(사용자 기록, `user`)에서 쓸 부분 고르기 → write-conversation / write | — |
| write.html | `write` | 출처 알약 · 사진 · 질문 카드 · 입력칸 · 자동 저장 · 주 버튼 → review | `write` |
| write-conversation.html | `write-conversation` | 중립 말풍선 + 말마다 입력칸 → review | `write` |
| review.html | `review` | 원문 카드 · Reuse Notice · Correction Unit · 저장 영역 → save-expression / home / expression-journey | — |
| save-expression.html | `save-expression` | 추적 표현 저장 시트, 사용자가 고름 → home | — |
| recall.html | `recall` | 과거 사진 · 한국어 단서 · 입력칸 → recall-check | `recall` |
| recall-check.html | `recall-check` | 내가 쓴 답과 전에 쓴 표현을 나란히(점수 없음) · 필요하면 전이 단서 · → home | `transfer-cue` |
| entry.html | `entry` | 지난 일기 원문(원문 카드) + 교정 기록 | — |
| my-english.html | `my-english` | "스스로 다시 쓴 표현" · "모아 둔 표현"(최신순) · 항목 → expression-journey · 탭바 | — |
| expression-journey.html | `expression-journey` | 날짜별 사실 목록(5.14) | — |

- 모든 화면은 같은 `<style>` 기본값(키스크린 `review.html` 8~12행과 같은 기본 선언)과 §3 글자 클래스로 시작한다.
- 날짜 예시는 PRD 흐름과 맞춘다: 9월 14일 looking forward to 처음 배움 → 9월 28일 회식 일기(`d1`)·교정 → 10월 2일 돌아와 떠올림.
- 화면 사이 이동은 `screen-structure.md`의 F1~F12 흐름을 모두 `<a href>`로 잇는다.
