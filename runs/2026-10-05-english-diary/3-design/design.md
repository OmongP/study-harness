# design.md — 영어가 내 것이 되는 일기 (서비스별 디자인 기준)

> **키스크린 대비 비주얼 변경 안내: 승인된 `2-concept/keyscreens/`는 바꾸지 않았습니다. 이 판은 사용자가 Figma에서 확정한 "디자인 v2"(DesignHarnessSetup, 페이지 "Mockups (design v2)")와 하루냥(R6·R7) 비주얼(줄노트, 파스텔 연두 편지 카드, 말풍선 질문 알약, 연회색 알약 버튼, 조용한 강아지 장식)을 따르기 때문에 색·버튼·질문 영역·제목 크기가 키스크린과 다릅니다. 구조·흐름·§8 규칙은 키스크린과 같습니다.**

> 실행: `2026-10-05-english-diary` · 작성: 3 디자인 ① (designer, 재실행 — 하루냥 비주얼 + Figma 디자인 v2 반영)
> 근거: `input/prd.md`, `2-concept/approval.md`(approved: yes, 채택 키스크린 review.html, 2026-10-05), `2-concept/screen-structure.md`, `2-concept/keyscreens/`, `1-research/references.md`(R1~R15, RP-1~RP-8, 특히 R6·R7 하루냥), Figma "Mockups (design v2)", `harness/design-base.md`, `harness/guides/html-screen-guide.md`, `harness/rules-base.yaml`.
> 공통 기준(`design-base.md`)을 그대로 따릅니다. 이 문서에는 **이 서비스에만 해당하는 값**(팔레트·폰트·컴포넌트·금지 사항·영역 이름)만 적습니다.
> 판정 SSOT는 `3-design/rules.yaml`입니다. rule-builder는 §2 색 값 목록과 §8 서비스 규칙을 읽어 `service`로 옮깁니다.
> 이전 판에서 바뀐 점: 색 토큰 2개 추가(`letter`, `fill-soft`)와 `accent-soft` 값 변경, 줄노트(§4.1), 모든 버튼 알약 모양, 보조 버튼은 테두리 없는 연회색(§5.2), 질문 말풍선 알약(§5.9), 편지 카드(§5.6·§5.7), 카드 안쪽 여백 20, 제목·단서 크기 확대(§3), 강아지 장식(§5.22), capture-confirm 구성(§5.23), My English 분할 탭과 텍스트 정렬 버튼(§5.17).

## 1. 개요

- 이 앱은 성인이 혼자 쓰는 조용한 기록장입니다(무드: 차분함 · 개인 기록 · 사실 중심 · 담백함). 교실·게임·SNS 피드처럼 보이면 안 됩니다.
- 하루냥(R6·R7)에서는 **종이·편지 느낌**을 가져왔습니다. 줄 그어진 작성 영역, 밝고 따뜻한 연두 편지 카드, 가운데 놓인 질문 말풍선, 테두리 없는 연회색 알약 버튼입니다. 강아지 캐릭터는 §5.22 규칙 안에서 조용한 장식으로만 씁니다. 감정 이모지와 감성 연출은 쓰지 않습니다.
- 화면의 주인공은 **사용자가 직접 쓴 영어**입니다. AI 질문·교정 제안·이유는 보조이고, 원문보다 권위 있어 보이면 안 됩니다.
- 쉬었다가 돌아오는 것도 정상 사용입니다(PRD 6.3). 성취는 날짜와 사실로만 보여 줍니다(PRD 6.4).
- 채택 키스크린 `review.html`의 구조를 전체 화면의 기준으로 삼습니다: 사진+원문 카드와 밑줄 표시, 본문과 분리된 '교정 제안' 영역, 수정 1개당 Correction Unit 1개, Reuse Notice, 저장 영역. 비주얼 값은 이 문서를 따릅니다.
- 화면마다 채워진 주 버튼(`.btn-primary`)은 1개만 둡니다(RP-1).

## 2. 색 토큰 (B4 허용 목록 — 이 11개 값만)

| 토큰 | 값 | 역할 |
|---|---|---|
| `paper` | `#FAF8F4` | 앱 기본 배경, 화면 루트·하단 고정 영역 배경 |
| `ink` | `#1C1B19` | 본문 글자, 아이콘 선, 사용자 원문 |
| `surface` | `#FFFFFF` | 카드, 시트, 입력칸, 질문 말풍선 알약, 분할 탭 선택 칸, 탭바·맥락 띠, 줄노트 바탕, 주 버튼 글자 |
| `line` | `#E6E2DA` | 1px 테두리, 구분선, 줄노트 가로줄, 가림 막대, 사진 자리표시 면 |
| `ink-muted` | `#6B6760` | 보조 글자(caption·메타·placeholder), 비선택 탭·분할 탭 칸, 정렬 버튼, 비활성 버튼 글자 |
| `accent` | `#2F5D50` | 주 버튼 배경, 쓰는 중 입력칸·선택 칩 테두리, 링크·강조 글자, 교정 제안 글자, 편지 카드 라벨, 재사용 점선 밑줄 |
| `accent-soft` | `#DEE8E4` | 선택된 Choice Chip 배경 (선택 상태 전용) |
| `letter` | `#E4ECD1` | 파스텔 연두 편지 면: Memory Comeback Card, Reuse Notice, 내 말풍선, capture-confirm의 내 말 카드 |
| `fill-soft` | `#EFECE6` | 연회색 알약 면: 보조 버튼, 도구 버튼, 비선택 Choice Chip, '다른 질문' 버튼, 비활성 버튼, 아이콘 칸, 분할 탭 트랙 |
| `mark-issue-soft` | `#FBF1DE` | 다듬어 볼 표현의 배경 표시 |
| `mark-issue` | `#C8891E` | 다듬어 볼 표현의 실선 밑줄(`border-bottom`) **전용** |

rule-builder용 값 목록 (`service.tokens.colors`):
`#FAF8F4`, `#1C1B19`, `#FFFFFF`, `#E6E2DA`, `#6B6760`, `#2F5D50`, `#DEE8E4`, `#E4ECD1`, `#EFECE6`, `#FBF1DE`, `#C8891E`

색 사용 규칙:

- 위 11개 밖의 색 값은 쓰지 않습니다. 빨간 오류색(`danger` 등)도 쓰지 않습니다. 안내 상태는 `ink` 글자와 문구로 표현합니다.
- **반투명 색을 쓰지 않습니다.** `rgba(…, 0.x)`, `#RRGGBBAA`, `opacity`로 만든 딤·흐림은 B4 위반입니다(B4는 알파가 1 미만인 색을 모두 위반으로 셉니다). 시트 뒤의 딤은 CSS 반투명으로 만들지 않고, **미리 딤 처리해 둔 화면 이미지 `<img>`로만** 깝니다(`<img>` 안의 색은 B4·B7이 세지 않습니다, §5.14 참고). `box-shadow`와 `filter: blur`도 쓰지 않습니다.
- `transparent`는 배경의 "색 없음"으로만 씁니다. 테두리를 숨길 때는 `border: 0`을 쓰거나, 면과 같은 토큰 색으로 테두리를 칠합니다.
- `mark-issue`(#C8891E)는 글자색으로 쓰지 않습니다(흰 배경 대비가 4.5:1 미만입니다).
- `letter`·`fill-soft`·`accent-soft`·`line`(면으로 쓸 때)은 **면 색 전용**입니다. 글자색으로 쓰지 않습니다.
- **`ink-muted` 글자를 `accent-soft`(#DEE8E4) 위에 두지 않습니다.** 대비가 4.49:1이라 4.5:1에 못 미칩니다. 선택된 칩 안의 글자는 `ink`만 씁니다.
- **`ink-muted` 글자를 `line`(#E6E2DA) 위에 두지 않습니다.** 대비가 4.35:1입니다. 사진 자리표시 안의 caption은 `ink`로 씁니다(§5.4).
- 빨간색, 취소선, "틀림" 표시로 사용자 영어를 표시하지 않습니다.
- 색만으로 의미를 전달하지 않습니다. 밑줄 모양(실선/점선), 라벨 문구, `✓` 기호, 굵기, 면, 구조를 함께 씁니다.
- 사용자 사진, 강아지 장식 이미지, 아이콘 이미지(`<img>` 안의 색)는 B4 검사 대상이 아닙니다. 그래도 선 아이콘(§5.13)은 `ink`·`accent`·`ink-muted` 값으로만 그립니다. 사진 위에 글자를 얹으면 `data-on-image="true"`를 붙입니다(되도록 얹지 않습니다).

확인된 글자·배경 조합 (WCAG 상대 휘도 기준, 4.5:1 이상만 사용):

| 글자 | 배경 | 대비 | 용도 |
|---|---|---|---|
| `ink` | `surface` | 17.2:1 | 원문·입력·카드 본문·질문 알약·분할 탭 선택 칸 |
| `ink` | `paper` | 16.2:1 | 화면 본문 |
| `ink` | `letter` | 14.11:1 | Comeback 단서, Reuse 문장, 내 말풍선·내 말 카드 |
| `ink` | `fill-soft` | 14.6:1 | 보조·도구·칩·'다른 질문' 버튼 글자 |
| `ink` | `accent-soft` | 13.74:1 | 선택된 칩 글자 |
| `ink` | `mark-issue-soft` | 15.4:1 | 표시된 표현 |
| `ink` | `line` | 13.3:1 | 사진 자리표시 caption |
| `ink-muted` | `surface` | 5.6:1 | caption·placeholder·보조 설명 |
| `ink-muted` | `paper` | 5.3:1 | caption·메타·정렬 버튼 |
| `ink-muted` | `letter` | 4.61:1 | 편지 카드 안 날짜·안내 caption |
| `ink-muted` | `fill-soft` | 4.8:1 | 비활성 버튼 글자, 분할 탭 비선택 칸 |
| `accent` | `surface` | 7.5:1 | 링크, 교정 제안, 강조 외곽 버튼 글자 |
| `accent` | `paper` | 7.1:1 | 링크, 선택된 탭 |
| `accent` | `letter` | 6.14:1 | 편지 카드 라벨·링크 |
| `accent` | `fill-soft` | 6.4:1 | (알약 버튼 안 강조 글자, 필요할 때만) |
| `accent` | `accent-soft` | 5.98:1 | 선택 상태 라벨(필요할 때만) |
| `surface` | `accent` | 7.5:1 | 주 버튼 글자 |

- 위 표에 없는 조합은 쓰지 않습니다. 금지 예: `ink-muted`/`accent-soft`(4.49), `ink-muted`/`line`(4.35), `ink-muted`/`mark-issue-soft`.
- 줄노트(§4.1) 위 글자의 배경은 `background-color: surface`로 판정됩니다(가이드 15절). 가로줄은 각 줄 상자의 맨 아래 1px에만 그어서 글자 획과 겹치지 않게 합니다.

## 3. 타이포그래피

폰트:

- UI·한국어: `Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif`
- 사용자가 쓴 영어(일기 원문·입력·표현 카드의 구): `Newsreader, Georgia, serif`
- Figma의 손글씨체(메모먼트꾹꾹체)는 라이선스상 웹에 넣을 수 없습니다. HTML에서는 **Pretendard를 그대로 쓰고 크기만 Figma에 맞춥니다**(아래 매핑 표). `@font-face`로 손글씨체를 불러오지 않습니다.

Figma 손글씨 → HTML 매핑:

| Figma 자리 (손글씨체) | HTML 클래스 | 크기 | 굵기 | 줄 높이 | 색 |
|---|---|---|---|---|---|
| 화면 제목 (`h1`) | `.title` | 24px | 700 | 1.75 (42px) | `ink` |
| 섹션 제목 (`h2`: "교정 제안", "최근 기록", 시트 제목 등) | `.section-title` | 24px | 700 | 1.75 (42px) | `ink` |
| 회상 단서 (`cue`) | `.cue` | 20px | 600 | 1.6 | `ink` |
| 편지 카드 라벨 ("다시 떠올려 볼 기억", "스스로 다시 쓴 표현") | `.letter-label` | 16px | 600 | 1.5 | `accent` |

- B5는 16px 미만만 13/14로 제한합니다. 24·20·16은 모두 허용됩니다.

나머지 스케일:

| 토큰 / 클래스 | 크기 | 굵기 | 줄 높이 | 용도 |
|---|---|---|---|---|
| `heading` `.heading` | 18px | 600 | 1.4 | 카드 제목, AI 영어 질문(말풍선 알약), 대기 상태 첫 줄 |
| `body` | 16px | 400 | 1.6 | 기본 UI 글자, AI 이유 설명, 빈 상태 안내 |
| `body-muted` `.body-muted` | 16px | 400 | 1.6 | `ink-muted` 색의 보조 설명(질문의 한국어 뜻, 시트 선택지 설명, 대기 상태 둘째 줄) |
| `diary` `.diary` | 18px | 400 | 1.75 | 사용자 영어 원문 — 줄노트 밖 (Newsreader) |
| `diary-ruled` `.ruled` | 18px | 400 | **32px** (고정) | 줄노트 위의 원문·입력 (Newsreader) |
| `diary-preview` `.diary-preview` | 16px | 400 | 1.6 | 목록·카드 안의 원문 미리보기 (Newsreader) |
| `label` `.label` | 14px | 600 | 1.4 | 짧은 컨트롤 라벨, Choice Chip, 도구 버튼, '다른 질문', 탭, 정렬 버튼, 날짜 그룹 헤더 |
| `label-strong` `.label-strong` | 14px | 700 | 1.4 | 분할 탭 선택 칸, 선택된 칩 |
| `label-regular` `.label-regular` | 14px | 400 | 1.4 | 분할 탭 비선택 칸, 비선택 탭 |
| `caption` `.caption` | 13px | 400 | 1.5 | 날짜·메타·자동 저장 상태·글자 수·나만 보기·범례 |

- 16px보다 작은 글자는 14px(label 계열)과 13px(caption) 두 가지만 씁니다(B5). `input`·`button`·`textarea`는 `font: inherit`을 준 뒤 크기를 따로 적습니다.
- 설명 문장은 `body` 16px 이상으로 씁니다. 한 줄 메타 안내만 caption으로 씁니다(예: Comeback Card 잠금 안내, 홈 주 버튼 아래 입력 소스 안내).
- 정보 텍스트의 줄 수를 고정하지 않습니다(`-webkit-line-clamp`, 고정 높이 + `overflow:hidden` 금지). 200%로 확대해도 줄바꿈되어야 합니다.
- 모두 대문자, 장식 글꼴, 손글씨 웹폰트는 쓰지 않습니다.

## 4. 레이아웃 · 모양

공통 기준(`design-base.md` 1·4·5절)을 따릅니다.

| 항목 | 값 |
|---|---|
| 화면 루트 | `<main data-screen="이름" data-author="system">` 파일당 1개, `width: 390px; height: 844px; overflow-y: auto; background: paper; display:flex; flex-direction:column` |
| 간격 (padding · gap) | `4 / 8 / 12 / 16 / 20 / 24 / 32`만. 가운데 정렬 외에는 margin 대신 padding·gap으로 간격을 줍니다(`margin-top:auto`로 하단에 미는 것은 허용) |
| 화면 좌우 여백 | `20px` (상단 바만 `12px` + 뒤로 가기 안쪽 `8px`) |
| 섹션 사이 | `16`(Write) · `20`(Review) · `24`(Home) |
| 카드 안쪽 여백 | `20` — 큰 카드(원문 카드, Correction Unit, Comeback Card, Reuse Notice, 잠금 영역, 빈 상태, capture-confirm 대화 상대 카드). `16` — 시트, 입력칸, 읽어 온 말 카드. `12` — 목록 행·표현 카드 |
| 모서리 | `0 / 8 / 12 / 16 / 999`만 (B3) |
| 터치 영역 | 모든 인터랙티브 요소 `44 × 44px` 이상. 주 버튼은 `52px` |

모서리 역할:

| 값 | 쓰는 곳 |
|---|---|
| `0` | 탭바, 하단 고정 영역, 맥락 띠, 구분선 |
| `8` | 잠금 영역의 가림 막대 |
| `12` | 입력칸, 검색 바, 사진·사진 자리표시, 썸네일, 시트 선택지 행, 아이콘 칸 |
| `16` | 모든 카드, 대화 말풍선, 시트(네 모서리) |
| `999` | **모든 버튼**(주·보조·강조 외곽·도구), Choice Chip, 출처 알약, 질문 말풍선 알약, '다른 질문' 버튼, 분할 탭 트랙과 칸 |

- 20·24·32 같은 모서리 값은 쓰지 않습니다. 카드를 크고 둥글게 보이게 하려면 모서리 16에 안쪽 여백 20을 줍니다.
- 그림자는 쓰지 않습니다. 면은 색 대비와 `1px line` 테두리로 구분합니다.
- 그라데이션은 쓰지 않습니다. **예외는 §4.1 줄노트 패턴 하나**입니다. 이 패턴은 두 토큰 색을 경계에서 딱 끊어(hard stop) 가로줄을 긋는 것이라, 색이 섞이지 않습니다.
- 하단 고정 영역 `.bottom`: `position: sticky; bottom: 0; margin-top: auto; display:flex; flex-direction:column; gap:8px; padding: 8px 20px 20px; background: paper; border-top: 1px solid line`.
- 글자로 쓰는 기능 기호는 `‹`, `✓`, `↓` 세 개뿐입니다. 그 밖의 아이콘은 §5.13의 선 아이콘 이미지로 넣습니다.
- 움직임은 상태 변화와 이동을 설명할 때만 씁니다. 축하 연출(색종이, 튀는 보상, 불꽃)은 쓰지 않습니다.

### 4.1 줄노트 패턴 `.ruled`

사용자 영어가 놓이는 곳에만 씁니다: 영어 입력칸(§5.10), 원문 카드의 원문 본문(§5.4), entry.html 원문. AI 글, 교정 제안, 목록 미리보기에는 쓰지 않습니다. 줄노트가 있으면 사용자 글이라는 단서가 됩니다.

```css
.ruled {
  font-family: Newsreader, Georgia, serif;
  font-size: 18px;
  line-height: 32px;
  background-color: #FFFFFF;            /* surface — B7 대비 판정 배경 */
  background-image: repeating-linear-gradient(
    to bottom,
    #FFFFFF 0px, #FFFFFF 31px,          /* surface */
    #E6E2DA 31px, #E6E2DA 32px          /* line — 줄 상자 맨 아래 1px */
  );
  background-origin: content-box;
  background-attachment: local;
}
```

- 줄 간격 32px은 `line-height`와 같아야 합니다. 하나를 바꾸면 다른 하나도 같이 바꿉니다.
- 줄은 `surface`·`line` 두 불투명 토큰으로만 긋습니다. 섞이는 구간을 두지 않고, 세로 마진선도 넣지 않습니다.
- 줄노트 블록의 세로 padding은 `16`(입력칸) 또는 `0`(원문 카드 안 본문 블록)으로 둡니다.

## 5. 컴포넌트

키스크린의 클래스 이름은 전체 화면에서도 그대로 씁니다. 모든 화면은 키스크린 `review.html` 8~19행의 기본 선언(`*` 리셋, `body`, `[data-screen]`, `a`, `button`, `img`, 글자 클래스)으로 시작하고, 색·모서리·버튼 값은 이 절을 따릅니다.

### 5.1 상단 바 `.topbar`
- `display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 12px`.
- 뒤로 가기 `.back`: `<a href>`, `min-height:44px; min-width:44px; padding:8px`, 글자 16px 600, `‹ 이전화면이름`. `aria-label`이 반드시 있어야 합니다.
- 오른쪽에 날짜 caption을 둡니다. 작성 화면(write · write-conversation · recall)에는 자동 저장 상태(§5.10)도 함께 둡니다.

### 5.2 버튼 (모두 알약)
| 종류 | 배경 | 글자 | 테두리 | 크기·모서리 |
|---|---|---|---|---|
| 주 `.btn-primary` | `accent` | `surface` 16px 600 | 없음 | `min-height:52px; padding:12px 24px; radius 999` |
| 보조 `.btn-secondary` | `fill-soft` | `ink` 16px 600 | 없음 | `min-height:44px; padding:8px 20px; radius 999` |
| 강조 외곽 `.btn-accent-outline` | `surface` | `accent` 16px 600 | `1px accent` | `min-height:44px; padding:8px 20px; radius 999` — `letter` 면 위(Comeback Card)에서만 |
| 비활성 `.btn-disabled` | `fill-soft` | `ink-muted` 16px 600 | 없음 | 위와 같음 + `disabled`/`aria-disabled="true"` |
| 텍스트 링크 `.link` | 없음 | `accent` 14px 600, 밑줄(offset 4px) | 없음 | `min-height:44px; padding:8px 0; align-self:flex-start` |
| 텍스트 버튼 `.btn-text` | 없음 | `ink-muted` 14px 600 + 선 아이콘 | 없음 | `min-height:44px; padding:8px 0` (정렬 버튼 §5.17) |
| 도구 `.tool` | `fill-soft` | `ink` 14px 600 | 없음 | `min-height:44px; padding:8px 16px; radius 999` |

- 화면마다 주 버튼은 1개만 둡니다. `.btn-ghost`는 쓰지 않습니다.
- 다른 화면으로 가는 버튼은 `<a href>`로 만들고, 이동하지 않는 동작만 `<button type="button">`으로 만듭니다.
- 모든 버튼·링크에 `data-ui-role="button"`을 붙입니다. 탭은 `tab`, 누르는 카드는 `card`입니다.
- 글자 수가 모자란다고 주 버튼을 비활성화하지 않고, 이를 막는 툴팁도 두지 않습니다(R2 피할 것).

### 5.3 Choice Chip `.chip`
- **쓰는 곳은 세 군데뿐입니다**: Correction Unit의 반영/내 표현 유지, 추적 표현 저장 시트, capture-confirm의 "영어로 쓸 말" 고르기. My English의 구분·정렬에는 쓰지 않습니다(§5.17).
- 비선택: `radius 999; min-height:44px; padding:8px 16px; label 14px 600; background fill-soft; border 1px solid #EFECE6(면과 같은 색); color ink`.
- 선택 `[aria-pressed="true"]`: `background accent-soft; border 1px solid accent; label-strong 700; color ink` + 앞에 `<span aria-hidden="true">✓&nbsp;</span>`. 글자는 `ink`만 씁니다(§2 금지 조합).
- Correction Unit에서는 `data-choice="apply"`(반영)와 `data-choice="keep"`(내 표현 유지)를 씁니다. **`data-default="true"`와 `aria-pressed="true"`는 `keep`에만 붙입니다.** 두 칩을 `.choices role="group"` + `aria-label`로 묶습니다.
- 일괄 반영, 전체 Rewrite, "교정된 일기" 전체 전환 토글은 두지 않습니다.

### 5.4 원문 카드 `.original` (Review · Entry)
- `surface` 배경, `1px line`, `radius 16`, `padding 20`, `gap 12`.
- 순서: 라벨 "내가 쓴 글 · 원문 그대로 보관돼요"(`label`) → 사진 → 원문 본문(`.ruled`, `data-author="user"`, `data-original-ref`) → 범례 caption.
- **사진 자리표시** `.photo-ph`: 지금은 실제 사진 대신 이것을 둡니다. 폭 100%, 높이 120px(Comeback은 160px), `background line`, `radius 12`, 가운데에 caption(`ink` 13px, 예: "그날 사진 · 회식 자리"). 자리표시 안 caption은 `ink-muted`로 쓰지 않습니다(4.35:1). 실제 사진을 넣는 경우에는 `<img>`에 의미 있는 `alt`를 붙입니다.
- 사진과 원문은 **한 카드 안에** 둡니다(R3). 대화 캡처 기록은 사진 대신 출처 알약(§5.12)을 둡니다.
- 원문은 한 글자도 바꾸지 않습니다. 처음 쓴 곳에는 `data-original-id`, 다시 보여 주는 곳에는 같은 값의 `data-original-ref`를 붙입니다.
- `.mark`: `background mark-issue-soft; border-bottom 2px solid mark-issue`(실선). `.reused`: `border-bottom 2px dotted accent`(점선).
- 범례 caption: "실선 밑줄: 다듬어 볼 수 있는 표현 · 점선 밑줄: 스스로 다시 쓴 표현".
- 취소선(`line-through`, `<s>`, `<del>`, `<strike>`)은 쓰지 않습니다.

### 5.5 '교정 제안' 영역 `.units` + Correction Unit `.unit` (`data-ui-role="correction-unit"`)
- 원문 카드와 **따로 떨어진 섹션**으로 둡니다(R7): `<section class="units" aria-labelledby>` + `h2.section-title` "교정 제안", 카드 사이 `gap 12`. 순서는 원문 카드 → Reuse Notice → 교정 제안 → 저장 영역입니다.
- `.unit`: `surface`, `1px line`, `radius 16`, `padding 20`, `gap 12`. 줄노트는 쓰지 않습니다. 수정 1개당 카드 1개를 두고 `aria-label="첫 번째 교정 제안"`처럼 이름을 붙입니다.
- 카드 안 순서는 고정입니다(`.unit-row` = flex column, gap 4, 각 행 위에 caption 라벨):
  1. "내 표현" — `diary`, `user`, `.mark`
  2. `↓`(caption, `aria-hidden="true"`)
  3. "자연스러운 표현" — `diary` + `.suggest`(`accent`), `data-author="ai" data-content-role="suggestion"`
  4. "이유" — `body`, `data-author="ai" data-content-role="explanation"`
  5. 선택(§5.3)
- 제안은 원문보다 크거나 굵게 보이면 안 됩니다(18px 400). 교정 요약에 개수·점수를 쓰지 않습니다. 강아지 장식은 두지 않습니다.

### 5.6 Reuse Notice `.reuse` (편지 카드)
- `letter` 배경, 테두리 없음, `radius 16`, `padding 20`, `gap 8`, `data-ui-role="card"`. 라벨 "스스로 다시 쓴 표현"(`.letter-label` 16px 600 `accent`).
- 구성: 다시 쓴 표현(`.phrase`, `user`, Newsreader 600) + 사실 문장(`body`) + 날짜 caption(`ink-muted`, 4.61:1) + `.link` "이 표현의 Expression Journey 보기"(→ expression-journey.html).
- 축하 문구, 아이콘, 편지지 장식, **강아지 장식은 넣지 않습니다**(성취 자리).
- 전이 단서를 보고 쓴 답과 회상 화면에서 쓴 답은 여기에 넣지 않습니다.

### 5.7 Memory Comeback Card `.comeback` (`data-area="comeback"`, 편지 카드)
- `letter` 배경, 테두리 없음, `radius 16`, `padding 20`, `gap 12`, `data-ui-role="card"`. 홈에 카드 1개만 둡니다.
- 순서: 라벨 "다시 떠올려 볼 기억"(`.letter-label`) → 사진 자리표시(160px) → 날짜 caption → 한국어 단서(`.cue` 20px 600, `data-author="ai" data-content-role="cue"`) → **버튼 하나** [떠올려 쓰기 시작](`.btn-accent-outline` → recall.html) → caption "전에 쓴 내 표현은 다시 쓴 뒤에 열어 볼 수 있어요."
- 두 번째 버튼, 정답 영어, 할당량, 공백 일수, 스트릭은 넣지 않습니다. 채워진 주 버튼도 쓰지 않습니다.

### 5.8 이전 표현 잠금 영역 `.locked` (recall.html)
- 회상 답을 쓰기 전에는 이전 표현을 보여 주지 않습니다(RP-5, R11). 이 영역은 `data-area="recall"` **밖**에 둡니다.
- `surface`, `1px line`, `radius 16`, `padding 20`, `gap 12`, `aria-labelledby`.
- 구성: 머리 줄(`display:flex; align-items:center; gap 8` = 강아지 장식 puppy-sit 40px(§5.22) + 라벨 "전에 쓴 내 표현"(`label`)) → 가림 막대 `.veil`(`aria-hidden="true"`, `background line; height 12px; radius 8`, 폭 100%/80%/60%) → 안내 caption.
- 실제 문장을 넣고 흐리게 처리하지 않습니다. 가림은 막대로만 표현합니다.
- 열기 버튼 "전에 쓴 내 표현 열기":
  - 쓰기 전: `<button type="button" class="btn-disabled" aria-disabled="true" disabled>` + caption "영어로 다시 쓴 뒤에 열 수 있어요."
  - 쓴 뒤(정적 화면의 기준 상태): `<a class="btn-primary" href="recall-check.html" data-ui-role="button">`. recall.html에서 주 버튼은 이것 하나입니다.
- '정답 확인', 'AI 풀이 보기' 같은 문구는 쓰지 않습니다.

### 5.9 질문 말풍선 알약 `.question` (R6, 질문만)
- 감싸는 영역 `.question`은 카드가 아닙니다: `display:flex; flex-direction:column; align-items:center; text-align:center; gap 8; padding 8px 0`.
- 위에서 아래로:
  1. 안내 caption("사진을 보고 떠올려 봐요")
  2. 질문 줄 `.q-row`(`display:flex; align-items:center; gap 8`): 강아지 장식 puppy-head-calm 56px(write.html만, §5.22) + **말풍선 알약** `.q-bubble`(`surface`, `1px line`, `radius 999`, `padding 12px 24px`, 영어 질문 하나, `heading` 18px 600 `ink`, `data-author="ai" data-content-role="question"`, `lang="en"`). 질문이 길면 줄바꿈하고, 줄 수를 자르지 않습니다.
  3. 한국어 뜻(`.body-muted`, `data-author="ai" data-content-role="question"`)
  4. **'다른 질문' 버튼** `.q-refresh`: `<button type="button" data-ui-role="button" aria-label="다른 질문으로 바꾸기">` 안에 새로고침 선 아이콘(20×20, `alt=""`)과 보이는 라벨 "다른 질문"(`label`)을 함께 넣습니다. `fill-soft`, 테두리 없음, `radius 999`, `min-height 44; min-width 44; padding 8px 16px; inline-flex; gap 8`.
- 말풍선에 꼬리, 화자 이름, 캐릭터 얼굴을 붙이지 않습니다. 강아지는 알약 **바깥**에 놓인 장식이고, 질문을 강아지가 하는 말처럼 표시하지 않습니다(R6 피할 것).
- 질문은 한 번에 하나만 둡니다. **예시 문장, 완성 답, 추적 표현, 모범 placeholder는 넣지 않습니다.**
- write-conversation.html의 말풍선별 질문도 같은 `.q-bubble`을 가운데 정렬로 씁니다(강아지 없음).

### 5.10 영어 입력칸 `.input` + 자동 저장 · 글자 수 · 나만 보기
- `.input-wrap`(`gap 8`): 라벨 "내 영어로 쓰기"(`label`, `id`) → 입력칸 → 글자 수.
- 입력칸: `.ruled` + 테두리 `1px accent`(쓰는 중) 또는 `1px line`, `radius 12`, `padding 16`, `min-height 192px`(6줄). 대화 말풍선 아래 입력칸은 `96px`(3줄)입니다. `role="textbox" contenteditable="true" aria-multiline="true" data-interactive="true"` 또는 `<textarea>`(`font: inherit; font-size:18px; line-height:32px; resize:none`)로 만들고, `aria-labelledby`, `data-author="user"`, `lang="en"`을 붙입니다.
- placeholder는 한국어 안내만 씁니다(`ink-muted`). 영어 예문은 넣지 않습니다.
- 글자 수 `.count-row`: 오른쪽 정렬 caption "105자". 기준이나 경고는 붙이지 않습니다.
- 자동 저장 `.saved`: caption "자동 저장됨 · 오후 9:12", `role="status" aria-live="polite"`, `padding 8`. 저장 경고는 두지 않습니다(RP-8).
- 나만 보기 `.meta-row`(`flex; justify-content:space-between; gap 8`): 왼쪽에 출처 알약, 오른쪽에 caption "나만 보기 · 비공개 기록". 공유 토글은 없습니다.
- 쓰는 동안에는 추적 표현 힌트를 보여 주지 않습니다.

### 5.11 하단 도구 줄 `.tools` (write.html)
- `.bottom` 안, 주 버튼 위에 둡니다. `role="group" aria-label="첨부 도구"`, `flex; gap 8`.
- `.tool` 2개: "사진 바꾸기", "텍스트 스캔". 그 아래에 주 버튼 "다 썼어요 · 교정 보기"(→ review.html)를 둡니다.

### 5.12 출처 알약 `.source`
- 문구는 "사진에서 시작" / "대화 캡처에서 시작" / "텍스트 스캔에서 시작" / "바로 쓰기" 중 하나입니다. `label`, `surface`, `1px line`, `radius 999`, `padding 4px 12px`. 누를 수 없는 표시라서 버튼과 구분되게 흰 면에 테두리를 둡니다.

### 5.13 선 아이콘 `.icon`
- 아이콘은 텍스트 라벨과 **함께만** 씁니다(R9). `<img alt="" aria-hidden="true">`, data-URI SVG 선 아이콘(채움 없음). 선 색은 `%231C1B19` / `%232F5D50` / `%236B6760` 중 하나입니다.
  - 기록 시작 4종(24×24): 사진, 대화 캡처, 텍스트 스캔, 바로 쓰기
  - 새로고침(20×20): '다른 질문' 전용
  - 아래 꺾쇠 ⌄(16×16, 선 `ink-muted`): 정렬 버튼 전용(§5.17). 글자 `⌄`가 아니라 이미지로 넣습니다.
- 아이콘 칸 `.src-icon-box`: `40×40`, `fill-soft`, 테두리 없음, `radius 12`. 이모지 아이콘은 쓰지 않습니다.

### 5.14 기록 시작 시트 · 저장 시트 `.sheet` (Figma v2 31:3472 Start Sheet · 33:3520 Save Sheet)
- 별도 HTML 화면입니다. **딤 처리된 뒤 화면 위에 시트가 떠 있는 모양**입니다(UIbowl 워크온 "어디에 글을 쓸까요?" 참고, 사용자 결정).
- 화면 루트: `position:relative; height:844px; overflow:hidden; background paper`.
- **뒤 화면(딤)** `.backdrop`: CSS 반투명으로 만들지 않고, 미리 딤 처리해 둔 화면 이미지로만 깝니다(§2). 마크업 순서는 `.backdrop` → `.sheet`입니다(시트가 위에 그려지므로 z-index는 쓰지 않습니다).
  - start-sheet.html: `<a class="backdrop" href="home.html" aria-label="시트 닫기" data-ui-role="button"><img src="../../../../docs/assets/start-sheet-backdrop.png" alt="" aria-hidden="true" width="390" height="844"></a>`
  - save-expression.html: `<a class="backdrop" href="review.html" aria-label="시트 닫기" data-ui-role="button"><img src="../../../../docs/assets/save-sheet-backdrop.png" alt="" aria-hidden="true" width="390" height="844"></a>`
  - `.backdrop { position:absolute; inset:0; display:block }`. 4-prototype/*.html에서는 경로를 `../../../docs/assets/…`로 씁니다.
  - 이미지(390×844)는 Figma에서 내보낸 Home / Review 화면에 `ink` 40% 딤을 미리 입힌 것입니다. 이미지 안의 글자는 장식이라 `data-author`를 붙이지 않습니다. `<img>` 안의 색은 B4·B7이 세지 않습니다.
- **시트** `.sheet`: `position:absolute; left:16px; right:16px; bottom:16px`(폭 358), `surface`, 네 변 모두 `border 1px solid line`, `border-radius 16`, `padding 20px 16px 16px`, `display:flex; flex-direction:column`. 그림자는 쓰지 않습니다.
- 시트 머리(`flex; align-items:center; gap 8`): 제목(`.section-title`) + 닫기 버튼(`<a href="home.html">`, 44×44, `aria-label="닫기"`, `fill-soft` 알약, 글자 "닫기"). start-sheet.html에서는 제목 왼쪽에 puppy-head-curious 44px를 둡니다(§5.22).
- **기록 시작 시트**(시트 `gap 4`): 선택지 4개 — 사진 / 대화 캡처 / 텍스트 스캔 / 바로 쓰기. 각 행은 **테두리와 배경이 없는 목록 행**입니다(카드 안에 카드를 넣지 않습니다): `<a href>`, `display:flex; align-items:center; gap 12; padding 12px 4px; min-height 64`. 아이콘 칸(`fill-soft`, `radius 12`, 44×44) + [제목 `body` 600 + 설명 `.body-muted`]로 구성합니다. 사진·바로 쓰기는 write.html로, 대화 캡처·텍스트 스캔은 capture-confirm.html로 이동합니다. 업셀이나 완성 일기를 만들어 주는 선택지는 두지 않습니다.
- **추적 표현 저장 시트**(시트 `gap 12`): 안내 `body` "다시 써 보고 싶은 표현을 골라요" → caption "교정 제안에서" + 칩 체크 목록(§5.3, `ai`+`suggestion`) → caption "내가 쓴 글에서" + 칩 체크 목록(§5.3, `user`). 처음에는 **아무것도 선택되지 않은 상태**입니다. 주 버튼 "고른 표현 저장하기"(→ home.html). 저장 완료 자리에 강아지는 두지 않습니다.

### 5.15 Conversation UI (write-conversation.html)
- 맥락 띠 `.context`: `position: sticky; top:0; surface; border-bottom 1px line; radius 0; padding 12px 20px; gap 4`. 내용은 "지수와의 대화"(`body` 600)와 caption "10월 2일 카카오톡 캡처 · 내 말만 영어로 써요"입니다.
- 말풍선 `.bubble`: `radius 16`, `padding 12px 16px`, 최대 폭 85%. 상대 말 `.bubble-them`은 `surface` + `1px line`, 왼쪽 정렬입니다. 내 말 `.bubble-me`는 `letter`, 테두리 없음, 오른쪽 정렬입니다. 캡처에서 읽은 원문은 `data-author="user"`로 글자 그대로 둡니다.
- 내 말풍선마다 아래에 줄노트 입력칸을 둡니다(96px, 라벨 "이 말을 내 영어로", `data-original-id="c1"`…).
- AI는 질문 알약만 줄 수 있습니다. 답변 도움 버튼은 두지 않습니다(R15). 주 버튼 "다 썼어요 · 교정 보기"(→ review.html).

### 5.16 기록 행 `.record` (Home 최근 기록)
- `<a href="entry.html" data-ui-role="card" aria-label="9월 28일 기록 열기">`: `surface`, `1px line`, `radius 16`, `padding 12`, `gap 12`, `min-height 44`.
- 썸네일 자리표시 64×64(`line` 면, `radius 12`, 글자 없음, `aria-hidden="true"`) + `.meta`(caption + `diary-preview`, `user`, 필요하면 `data-original-ref`). 줄 수를 자르지 않습니다.

### 5.17 My English 목록 (my-english.html · my-english-empty.html)
- **검색 바** `.search`: `<input type="search" aria-label="표현 검색">`, `font: inherit; 16px; min-height 44; padding 8px 16px; surface; 1px line; radius 12; ink`, placeholder "표현 검색"(`ink-muted`).
- **구분 — 분할 탭(segmented control)** `.segment`: 칩이 아닙니다.
  - 트랙: `role="group" aria-label="표현 구분"`(또는 `role="tablist"`), `display:flex; width:100%; background fill-soft; radius 999; padding 4; gap 4`.
  - 칸 2개 "저장한 표현" / "스스로 다시 쓴 표현": `<button type="button" data-ui-role="button">`(tablist라면 `role="tab"` + `data-ui-role="tab"`), `flex:1; min-height 44; radius 999; padding 8px 12px`, 가운데 정렬.
  - 선택 칸: `background surface; border 1px solid line; label-strong(14px 700) ink` + `aria-pressed="true"`(tab이면 `aria-selected="true"`).
  - 비선택 칸: `background transparent; border 1px solid #EFECE6`(트랙과 같은 색이라 보이지 않음, 크기 유지용); `label-regular(14px 400) ink-muted`, 트랙 위 대비 4.8:1.
  - ✓ 기호와 개수는 쓰지 않습니다. 선택 여부는 면과 굵기로 구분합니다.
- **정렬 — 텍스트 버튼** `.sort.btn-text`: 목록 위 오른쪽 정렬, `<button type="button" data-ui-role="button" aria-label="정렬: 최신순">`. 글자 "최신순"(`label` 14px 600, `ink-muted`, 배경 `paper` 위 5.3:1) + 아래 꺾쇠 선 아이콘 16px(§5.13), `inline-flex; align-items:center; gap 4; min-height 44; padding 8px 0`. 배경·알약·테두리는 없습니다.
- **날짜 그룹 헤더** `.group-head`: `h2`, `label`, `ink-muted`, 예: "10월 2일 금요일". 헤더와 카드 사이 `gap 8`, 그룹 사이 `gap 20`.
- **표현 카드** `.expr`: `<a href="expression-journey.html" data-ui-role="card">`, `surface`, `1px line`, `radius 16`, `padding 12px 16px`, `gap 4`, `min-height 44`. 구 단위 표현(`diary` 18px; 사용자 원문에서 온 구는 `user`, 교정 제안에서 저장한 구는 `ai`+`suggestion`) + 사실 caption. 스스로 다시 쓴 표현에는 `.reused` 점선과 caption 문구를 함께 붙입니다.
- 진행률, 퍼센트, 랭킹, 숙련도, "N개 남음"은 쓰지 않습니다.
- **빈 상태** `.empty`(my-english-empty.html): `surface`, `1px line`, `radius 16`, `padding 20`, `flex column; align-items:center; gap 12`. 카드 안 위쪽에 puppy-sit 96px(§5.22)을 두고, 그 아래 `body` 한 문장 "교정 보기에서 다시 써 보고 싶은 표현을 저장하면 여기에 모여요."만 둡니다. 큰 "0"이나 독촉 문구는 쓰지 않습니다.

### 5.18 Expression Journey 타임라인
- 상단: 표현(`diary` 600, `lang="en"`) + caption "처음 쓴 날부터 스스로 쓴 날까지의 기록".
- `<ol class="journey">`에 `border-left: 2px solid line`을 주고, 각 단계 `.step`은 `padding 0 0 20px 16px; gap 8`로 둡니다.
- 단계마다 날짜 caption + 단계 이름(`label`: 처음 씀 / 교정 / 떠올림 / 스스로 씀) + 근거 원문 발췌 또는 사실 문장을 둡니다. 필요하면 `.link`(→ entry.html)를 답니다.
- 경과 시간, 간격 수치, 진행률, 단계 수, 완료 표시는 쓰지 않습니다. 일어난 단계만 보여 줍니다. **강아지 장식은 두지 않습니다**(성취 자리).

### 5.19 Review 진입 대기 상태 `.pending` (review-pending.html)
- 화면 가운데(`flex:1; justify-content:center; align-items:center; padding 0 20px; gap 4`)에 puppy-walk 120px(§5.22)을 두고, 그 아래 `role="status" aria-live="polite"`로 두 줄을 씁니다: `heading` "일기 저장 중", `.body-muted` "교정을 준비하고 있어요".
- 그 아래에 `.link` "교정 보기로 넘어가기"(→ review.html)를 둡니다.
- 진행률 바, 퍼센트, 회전 표시, 저장 경고는 두지 않습니다. 강아지 그림은 진행 상황에 따라 바뀌지 않습니다.

### 5.20 탭바 `.tabbar`
- 탭은 홈 / My English 두 개입니다. `position:sticky; bottom:0; margin-top:auto; display:flex; gap 8; padding 4px 20px 8px; surface; border-top 1px line`.
- `.tab`: `<a href>`, `flex:1`, `min-height 44`, `label-regular` `ink-muted`. 현재 탭은 `aria-current="page"` + `accent` + 700 + 밑줄로 표시합니다. `data-ui-role="tab"`.
- 탭바는 home.html, my-english.html, my-english-empty.html에만 둡니다.

### 5.21 저장 영역 (review.html 하단)
- `.bottom` 안에 주 버튼 "표현 저장하기"(→ save-expression.html)와 보조 버튼 "저장 없이 마치기"(→ home.html)를 둡니다. 공유하기·이미지 저장 버튼은 두지 않습니다(PRD 7).

### 5.22 강아지 장식 `.puppy` (사용자 결정 — PRD 7 해석)
- PRD 7은 "캐릭터…를 **중심으로 학습 동기를 설계하지 않는다**"입니다. 그래서 캐릭터는 허용하되, **조용히 놓이는 장식**으로만 씁니다.
  - 감정 반응, 보상, 칭찬, 독촉을 하지 않고, 진행에 따라 모습이 바뀌지 않습니다. 화면마다 포즈 하나로 고정합니다.
  - 말을 하지 않습니다. 말풍선, 화자 이름, 대사가 없습니다.
  - **성취·판정 자리에는 두지 않습니다**: Reuse Notice, Expression Journey, 교정 결과(review.html의 원문 카드·교정 제안), 저장 완료, recall-check.html.
- 마크업: `<img class="puppy" src="../../../../docs/assets/puppy-<pose>.png" alt="" aria-hidden="true" width="N" height="N">`. 4-prototype/*.html에서는 `../../../docs/assets/puppy-<pose>.png`를 씁니다. `object-fit: contain`. 사진처럼 B4 검사 대상이 아닌 장식 이미지입니다. 누를 수 없고, 글자를 얹지 않습니다.
- 포즈와 위치(이 목록에 없는 곳에는 두지 않습니다):

| 화면 | 파일 | 크기 | 위치 |
|---|---|---|---|
| home.html | `puppy-wave.png` | 72px | 인사 제목 오른쪽 (`.greet` = `flex; align-items:center; justify-content:space-between; gap 12`) |
| start-sheet.html | `puppy-head-curious.png` | 44px | 시트 제목 왼쪽 |
| write.html | `puppy-head-calm.png` | 56px | 질문 알약 왼쪽 (`.q-row`), `data-area="write"` 안이지만 텍스트가 아니라 장식 |
| review-pending.html | `puppy-walk.png` | 120px | 대기 문구 위 |
| recall.html | `puppy-sit.png` | 40px | 잠금 카드 라벨 왼쪽 |
| my-english-empty.html | `puppy-sit.png` | 96px | 빈 상태 카드 안 위쪽 |

### 5.23 캡처 확인 (capture-confirm.html, Figma v2)
- 상단 바(뒤로 → start-sheet) → `.meta-row`(출처 알약 "대화 캡처에서 시작" + caption "나만 보기 · 비공개 기록") → 제목 `h1.title` "읽어 온 내용을 확인해요".
- **대화 상대 카드**: `surface`, `1px line`, `radius 16`, `padding 20`, `flex; align-items:center; justify-content:space-between; gap 12`. 이름 "지수"(`body` 600, `data-author="user"`)와 보조 연회색 알약 "다른 사람으로 바꾸기"(`<button type="button">`)를 둡니다.
- **"읽어 온 말" 목록**: `h2.section-title` "읽어 온 말" + 목록(`gap 8`). 캡처에서 읽은 글자는 모두 `data-author="user"`로 그대로 둡니다.
  - 상대 말 카드: `surface`, `1px line`, `radius 16`, `padding 16`, 왼쪽 정렬.
  - 내 말 카드: `letter`, 테두리 없음, `radius 16`, `padding 16`, `gap 8`, 오른쪽 정렬. 아래에 선택된 칩 "✓ 영어로 쓸 말"(§5.3, `aria-pressed="true"`, `accent-soft` + `1px accent` + 700, 글자 `ink`)을 둡니다. 사용자가 눌러서 뺄 수 있습니다.
- 하단 `.bottom`: 주 버튼 "이 내용으로 쓰기 시작"(→ write-conversation.html) + 보조 연회색 알약 "말풍선 없이 한 편으로 쓰기"(→ write.html).
- AI가 번역이나 답을 채워 넣는 요소는 두지 않습니다. 강아지 장식도 없습니다.

## 6. `data-area` 영역 이름

S1(AI 대필 금지) 검사 대상 영역입니다. 아래 이름만 씁니다.

| `data-area` | 붙는 곳 | 화면 | 안에 둘 수 있는 AI 텍스트 |
|---|---|---|---|
| `write` | 영어 직접 작성 영역 (메타 줄 + 사진 + 질문 알약 + 입력칸 / 말풍선 + 입력칸 전체) | write.html, write-conversation.html | `question` |
| `comeback` | Memory Comeback Card 전체 | home.html | `cue` |
| `recall` | 떠올려 쓰기 영역 (사진 + 한국어 단서 + 입력칸) | recall.html | `cue`, `question` |
| `transfer-cue` | 전이 단서 영역 (다른 상황 + 입력칸) | recall-check.html | `cue`, `question` |

- 위 4개 영역 안에는 `data-content-role`이 `completed_answer`, `diary_body`, `model_answer`인 요소가 하나도 없어야 합니다.
- 회상·전이 영역의 `cue`·`question`에도 정답이 되는 영어 표현을 넣지 않습니다.
- recall.html 잠금 영역과 recall-check.html의 "전에 쓴 내 표현"은 `recall`·`transfer-cue` 영역 **밖**에 둡니다. 맥락 띠와 `.bottom`은 `write` 영역 밖에 둡니다.

## 7. 메타데이터 적용 (가이드 3·7·8·17절)

- 화면 루트: `<main data-screen="…" data-author="system" aria-label="…">`.
- 사용자 글(원문, 입력, 캡처에서 읽은 말과 이름, 다시 쓴 표현, 사용자 원문에서 고른 구)에는 `data-author="user"`를 붙입니다.
- AI 글에는 반드시 `data-author="ai"`와 `data-content-role`을 함께 붙입니다. 역할은 `question`, `cue`, `suggestion`, `explanation` 넷만 씁니다.
- '다른 질문' 라벨 같은 버튼 문구는 시스템 UI이므로 루트의 `system`을 물려받습니다. 강아지 이미지는 `alt=""` 장식이라 텍스트가 없습니다.
- 원문 짝짓기 ID:

| ID | 원문 | `data-original-id` 위치 | `data-original-ref` 위치 |
|---|---|---|---|
| `d1` | `I drink with my company people yesterday. We talked a lot about our team trip. I'm looking forward to it.` | write.html 입력칸 | review.html 원문 카드, home.html 최근 기록, entry.html, recall-check.html, expression-journey.html(스스로 씀) |
| `c1`, `c2` … | 대화 캡처에서 내 말마다 쓴 영어 | write-conversation.html 입력칸 | (다시 보여 주는 화면이 있으면 그곳) |
| `r1` | `I had drinks with my coworkers. We talked about our team trip.` | recall.html 입력칸 | recall-check.html |
| `t1` | `I had drinks with my old friends last Saturday.` | recall-check.html 전이 입력칸 | — |

- `data-original-ref`의 텍스트는 원본과 정확히 같아야 합니다. 강조는 `.mark`·`.reused`처럼 글자를 바꾸지 않는 감싸기로만 합니다.
- 9월 14일 원문(`I walked along the river with my friend. I look forward to go camping this weekend.`)은 ID 없이 쓰되, 보여 주는 곳마다 글자를 똑같이 씁니다.

## 8. 서비스 금지 사항 → 판정 규칙 (rule-builder 입력)

| ID | 금지 사항 | 근거 | 검사 종류 · 값 제안 |
|---|---|---|---|
| **S1 ★** | AI 대필 금지: 작성·회상·전이 영역에 완성 답, 일기 본문, 모범 답안을 두지 않는다 | PRD 6.5, 3 EXPRESS·RECALL, 7 | `forbid_in_areas`, values `[completed_answer, diary_body, model_answer]`, areas `[write, comeback, recall, transfer-cue]`, critical |
| **S2 ★** | 원문 보존: 다시 보여 주는 원문은 원본과 글자가 같고 취소선이 없다 | PRD 6.1, 7 | `original_preserved`, critical |
| **S3 ★** | 선택권 기본값: 모든 Correction Unit의 기본 선택은 "내 표현 유지"다 | PRD 6.2, 3 CORRECT | `default_choice`, unit_role `correction-unit`, expected `keep`, critical |
| S4 | 게임화 요소 금지: 스트릭, 공백 일수, 점수, 등급, 숙련도, 진행률 바, 배지, 순위 | PRD 6.3, 6.4, 7 | `forbid_values`, values `[streak, score, level, progress_bar, badge, ranking, missed_day_count]` |

기계로 세지 않지만 지키는 금지 사항:

- 작성 중에는 추적 표현 힌트를 보여 주지 않습니다.
- 공백·간격 언급, 미완료 개수, 카운트다운, 독촉 문구를 쓰지 않습니다(PRD 6.3, R1·R14).
- Comeback Card에 두 번째 버튼, 할당량, 정답 영어를 두지 않습니다(RP-5).
- 회상 전에 이전 표현을 보여 주지 않고, 판정 표시('정답'·'오답'·체크)를 쓰지 않습니다(RP-5, R11).
- 저장 경고, 글자 수 차단 툴팁을 쓰지 않습니다(RP-8, R2).
- **캐릭터(강아지)는 §5.22 규칙 안의 장식으로만 씁니다.** 학습 동기의 중심이 되지 않게 감정 반응, 보상, 칭찬, 독촉, 진행에 따른 변화, 대사를 주지 않습니다. 성취·판정 자리(Reuse Notice, Expression Journey, 교정 결과, 저장 완료, recall-check)와 §5.22 목록 밖의 위치에는 두지 않습니다(PRD 7 해석, 사용자 결정).
- 감정 이모지, 축하 연출은 쓰지 않습니다. 기능 기호는 `✓`, `‹`, `↓`만 글자로 쓰고, 그 밖의 아이콘은 §5.13 선 아이콘만 씁니다.
- 줄노트 말고는 그라데이션을 쓰지 않습니다. 줄노트도 불투명 토큰 두 색을 경계에서 끊어서만 그립니다.
- 빨간색, 취소선, "틀림"·"오답", 교정본 전체 전환 토글을 쓰지 않습니다.
- 공개 피드, 공유, 순위, 업셀을 넣지 않습니다(R7의 공유하기·이미지 저장 버튼 포함).
- 대화 화면에 AI 답변 도움 버튼을 두지 않습니다(R15).
- 전이 단서를 보고 쓴 답을 Reuse로 표시하지 않습니다.
- 교정 요약에 개수나 점수를 쓰지 않습니다.

사람 확인 항목 (rule-builder `service.human_checks` 제안):

- 성인 톤: 전체 인상이 조용한 기록장이고 아동용·게임형 캐릭터 앱처럼 보이지 않는지
- 강아지 장식이 §5.22의 6곳에만 있고, 감정 반응·보상·칭찬·독촉·진행 변화·대사가 없으며, 성취·판정 자리(Reuse Notice, Expression Journey, 교정 결과, 저장 완료, recall-check)에 없는지
- 질문 말풍선 알약이 강아지의 대사처럼 보이지 않고(꼬리·화자 없음), 질문 하나만 있고 예문이 없는지
- 줄노트 가로줄이 글자 줄과 맞고 획을 가로지르지 않는지, 부드러운 그라데이션이나 반투명 없이 토큰 색으로만 그려졌는지(B4는 background-image를 세지 않으므로 사람이 확인)
- 회상·전이 단서에 정답이 되는 영어 표현이 드러나지 않는지
- recall.html에서 이전 표현이 다시 쓰기 전에 보이지 않고, 사용자가 직접 눌러야 열리는지
- Reuse는 새 일기에서 힌트 없이 쓴 경우에만 표시되는지
- 작성 화면에 추적 표현 힌트나 AI 답변 도움이 없는지
- 공백·간격 언급, 미완료 개수, 독촉, 저장 경고가 없는지
- 빨간색·"틀림"·"오답", 교정 요약의 개수·점수, 교정본 전환 토글이 없는지
- 공개 피드·공유·업셀이 없는지
- 일괄 반영 버튼이 없고, 제안이 원문보다 권위 있어 보이지 않는지
- 아이콘이 항상 텍스트 라벨과 함께 있는지
- My English의 분할 탭과 정렬 텍스트 버튼이 Choice Chip과 다르게 보이는지
- 시트 뒤 딤 이미지가 실제 Home·Review 화면과 맞는지 (이미지라 기계 판정 밖)

## 9. 화면 목록과 패턴

`2-concept/screen-structure.md`의 12개 화면에 상태 화면 2개를 더해 14개를 `3-design/screens/`에 만듭니다. 키스크린과 흐름 표는 바꾸지 않습니다.

| 화면 | `data-screen` | 핵심 패턴 (위→아래) | `data-area` |
|---|---|---|---|
| home.html | `home` | 날짜 caption · 인사 `title`("다시 만나서 반가워요") + puppy-wave 72 · Comeback Card(`letter`, 버튼 하나 → recall) · 주 버튼 '오늘 기록하기'(→ start-sheet) + 입력 소스 caption · `section-title` "최근 기록" + 기록 행(→ entry) · 탭바 | `comeback` |
| start-sheet.html | `start-sheet` | 딤 처리된 Home 이미지 배경(`.backdrop` → home) · 떠 있는 시트(좌우·아래 16, 네 모서리 16, 1px line): puppy-head-curious 44 + 시트 제목 "무엇으로 시작할까요?" · 닫기 · 테두리·배경 없는 아이콘+라벨 목록 행 4개 | — |
| capture-confirm.html | `capture-confirm` | §5.23: 출처 알약+나만 보기 · 제목 · 대화 상대 카드(지수 + 연회색 '다른 사람으로 바꾸기') · "읽어 온 말"(상대 surface / 내 말 letter + ✓ 영어로 쓸 말) · 주 '이 내용으로 쓰기 시작'(→ write-conversation) + 보조 '말풍선 없이 한 편으로 쓰기'(→ write) | — |
| write.html | `write` | 상단 바(뒤로 · 날짜 · 자동 저장) · 출처 알약 + 나만 보기 · 사진 자리표시 · puppy-head-calm 56 + 질문 알약 + 한국어 뜻 + '다른 질문' · 줄노트 입력칸 + 글자 수 · `.bottom`(도구 줄 + 주 버튼 → review) | `write` |
| write-conversation.html | `write-conversation` | 상단 바 · sticky 맥락 띠 · 상대(흰)/내(`letter`) 말풍선 + 줄노트 입력칸 · 주 버튼 → review | `write` |
| review-pending.html *(상태)* | `review-pending` | puppy-walk 120 · "일기 저장 중 / 교정을 준비하고 있어요" · 링크 → review | — |
| review.html | `review` | 상단 바 · 제목 "교정 보기" + 안내 · 원문 카드(사진 자리표시+줄노트 원문+범례) · Reuse Notice(`letter`) · '교정 제안' · 저장 영역(주 → save-expression, 보조 → home). 강아지 없음 | — |
| save-expression.html | `save-expression` | 딤 처리된 Review 이미지 배경(`.backdrop` → review) · 떠 있는 저장 시트(좌우·아래 16, 네 모서리 16, 1px line): 안내 · "교정 제안에서" 칩 · "내가 쓴 글에서" 칩, 처음에는 선택 없음 · 주 버튼 → home. 강아지 없음 | — |
| recall.html | `recall` | 상단 바 · 사진 자리표시 · 날짜 · 한국어 단서(`.cue` 20) · 줄노트 입력칸(r1) · 잠금 영역(puppy-sit 40 + 라벨 · 가림 막대 · 주 버튼 → recall-check) | `recall` |
| recall-check.html | `recall-check` | 방금 쓴 문장(r1) · 직접 연 전에 쓴 내 표현(d1) · 판정 없음 · 링크(→ entry) · 전이 단서 영역(t1) · 주 버튼 "기록하고 홈으로" → home. 강아지 없음 | `transfer-cue` |
| entry.html | `entry` | 상단 바 · 날짜 제목 · 원문 카드(줄노트 d1) · 내가 고른 교정 기록. 강아지 없음 | — |
| my-english.html | `my-english` | 제목 · 검색 바 · 분할 탭(저장한 표현 / 스스로 다시 쓴 표현) · 오른쪽 '최신순 ⌄' 텍스트 버튼 · 날짜 그룹 · 표현 카드(→ expression-journey) · 탭바 | — |
| my-english-empty.html *(상태)* | `my-english-empty` | my-english와 같은 머리 + 빈 상태 카드(puppy-sit 96 + 한 문장) · 탭바 | — |
| expression-journey.html | `expression-journey` | 상단 바(뒤로 → my-english) · 표현 제목 · 세로 타임라인. 강아지 없음 | — |

- 날짜 예시: 9월 14일 처음 씀·교정 → 9월 21일 떠올림 → 9월 28일 `d1`에서 스스로 씀 → 10월 2일 `r1`·`t1`, 지수와의 대화 캡처.
- F1~F12를 모두 `<a href>`로 잇습니다. write·write-conversation의 주 버튼은 review.html로 바로 연결합니다(F2·F5). capture-confirm은 주 버튼으로 write-conversation, 보조 버튼으로 write에 연결합니다. 상태 화면 2개는 흐름 밖에 따로 두지만, 같은 Gate 규칙을 지킵니다.
- 정적 화면 하나에는 상태 하나만 그립니다. recall.html은 다 쓴 뒤 상태, my-english.html은 목록이 있는 상태입니다.
