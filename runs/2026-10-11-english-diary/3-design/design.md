# design.md — 영어가 내 것이 되는 일기 (서비스별 디자인 기준)

> **키스크린 대비 비주얼 변경 안내: 승인된 `2-concept/keyscreens/`는 바꾸지 않았습니다. 이 판은 사용자가 Figma에서 확정한 "디자인 v2"(파일 cPEb0XbsRiQONO0Sjr1oZJ, 페이지 "Mockups (design v2)")를 HTML로 **똑같이** 옮기는 것을 목표로 합니다(사용자 결정: "HTML을 Figma와 똑같이", 충돌 시 "Figma 그대로"). 색·버튼·질문 영역·제목 크기·문구가 키스크린과 다를 수 있습니다. 구조·흐름·§8 규칙은 키스크린과 같습니다.**

> 실행: `2026-10-11-english-diary` · 작성: 3 디자인 ① (designer — Figma 디자인 v2 정밀 반영)
> 근거: `input/prd.md`, `2-concept/approval.md`(approved: yes, 채택 키스크린 review.html, 2026-10-11), `2-concept/screen-structure.md`, `2-concept/keyscreens/`, `1-research/references.md`, Figma v2 사양 덤프(`.harness-inbox/figma-v2-spec.txt`, 화면 14개), 이전 실행 `runs/2026-10-05-english-diary/3-design/design.md`, `harness/design-base.md`, `harness/guides/html-screen-guide.md`, `harness/rules-base.yaml`.
> 공통 기준(`design-base.md`)을 그대로 따릅니다. 이 문서에는 **이 서비스에만 해당하는 값**(팔레트·폰트·컴포넌트·금지 사항·영역 이름)만 적습니다.
> 판정 SSOT는 `3-design/rules.yaml`입니다. rule-builder는 §2 색 값 목록과 §8 서비스 규칙을 읽어 `service`로 옮깁니다.
> **문구의 기준은 Figma 사양입니다.** 화면의 모든 글자는 §5·§9에 적은 Figma 문자열과 같아야 합니다. Figma 문자열 안의 연속 공백은 HTML에서 공백 하나로 씁니다.
> 이전 판(2026-10-05)에서 바뀐 점: `accent-soft` 값 `#E4EEEA`와 역할 확대(편지 카드 면), `letter`는 대화 화면의 내 말풍선 전용, 실제 사진 `<img>`(회색 자리표시 폐지), 원문 밑줄을 `ink` 글자 밑줄(실선/점선)로 변경, 강조 배경 표시 폐지, 강아지 위치 변경(recall은 head-curious), 시작 시트 행 치수, 리뷰 대기 화면 상단 바 제거, 대화 화면 질문 알약 제거, 저장 시트·리뷰 하단·캡처 확인 문구 변경, `.bottom` 위 테두리는 write.html만, §10 Figma 대응표 추가.

## 1. 개요

- 이 앱은 성인이 혼자 쓰는 조용한 기록장입니다(무드: 차분함 · 개인 기록 · 사실 중심 · 담백함). 교실·게임·SNS 피드처럼 보이면 안 됩니다.
- 종이·편지 느낌을 냅니다. 줄 그어진 작성 영역, 연한 초록 편지 카드(`accent-soft`), 가운데 놓인 질문 말풍선 알약, 테두리 없는 연회색 알약 버튼을 씁니다. 강아지 캐릭터는 §5.22 규칙 안에서 조용한 장식으로만 씁니다. 감정 이모지와 감성 연출은 쓰지 않습니다.
- 화면의 주인공은 **사용자가 직접 쓴 영어**입니다. AI 질문·교정 제안·이유는 보조이고, 원문보다 권위 있어 보이면 안 됩니다.
- 쉬었다가 돌아오는 것도 정상 사용입니다(PRD 6.3). 성취는 날짜와 사실로만 보여 줍니다(PRD 6.4).
- 채택 키스크린 `review.html`의 구조를 전체 화면의 기준으로 삼습니다: 사진+원문 카드와 밑줄 표시, 본문과 분리된 '교정 제안' 영역, 수정 1개당 Correction Unit 1개, Reuse Notice, 저장 영역. 비주얼 값과 문구는 이 문서(=Figma v2)를 따릅니다.
- 화면마다 채워진 주 버튼(`.btn-primary`)은 1개만 둡니다(RP-1).

## 2. 색 토큰 (B4 허용 목록 — 이 11개 값만)

값은 Figma 변수 값과 같습니다.

| 토큰 | 값 | 역할 |
|---|---|---|
| `paper` | `#FAF8F4` | 앱 기본 배경, 화면 루트·하단 고정 영역 배경 |
| `ink` | `#1C1B19` | 본문 글자, 아이콘 선, 사용자 원문, **원문 밑줄(실선·점선)** |
| `surface` | `#FFFFFF` | 카드, 시트, 입력칸, 검색 바, 질문 말풍선 알약, 출처 알약, 분할 탭 선택 칸, 탭바·맥락 띠, 줄노트 바탕, 강조 외곽 버튼 면, 주 버튼 글자 |
| `line` | `#E6E2DA` | 1px 테두리, 구분선, 줄노트 가로줄, 타임라인 세로선, 가림 막대, 사진이 뜨기 전 바탕 |
| `ink-muted` | `#6B6760` | 보조 글자(caption·메타·placeholder·설명), 비선택 탭·분할 탭 칸, 정렬 버튼, 날짜 그룹 헤더, 비활성 버튼 글자 |
| `accent` | `#2F5D50` | 주 버튼 배경, 쓰는 중 입력칸 테두리, 선택 칩 테두리, 강조 외곽 버튼 테두리·글자, 링크, 교정 제안 글자, 편지 카드 라벨 |
| `accent-soft` | `#E4EEEA` | **편지 카드 면**: Memory Comeback Card, Reuse Notice, capture-confirm의 "나" 말 카드 · **선택된 Choice Chip 배경** |
| `letter` | `#E4ECD1` | write-conversation.html의 **내 말풍선 면 전용** (Figma의 원색 `#EAF3D3` 말풍선도 이 토큰으로 씁니다) |
| `fill-soft` | `#EFECE6` | 연회색 알약 면: 보조 버튼, 도구 버튼, 비선택 Choice Chip, 닫기 버튼, '다른 질문' 버튼, 비활성 버튼, 아이콘 칸, 분할 탭 트랙 |
| `mark-issue-soft` | `#FBF1DE` | 값 목록에만 남겨 둡니다. **이 판의 화면에서는 쓰지 않습니다**(Figma v2는 배경 표시를 쓰지 않음) |
| `mark-issue` | `#C8891E` | 값 목록에만 남겨 둡니다. **이 판의 화면에서는 쓰지 않습니다**(밑줄은 `ink`로 그음). 글자색으로는 절대 쓰지 않습니다 |

rule-builder용 값 목록 (`service.tokens.colors`):
`#FAF8F4`, `#1C1B19`, `#FFFFFF`, `#E6E2DA`, `#6B6760`, `#2F5D50`, `#E4EEEA`, `#E4ECD1`, `#EFECE6`, `#FBF1DE`, `#C8891E`

색 사용 규칙:

- 위 11개 밖의 색 값은 쓰지 않습니다. Figma에 토큰 밖 원색이 있으면(`#EAF3D3`) 가장 가까운 토큰(`letter`)으로 씁니다. 빨간 오류색(`danger` 등)도 쓰지 않습니다. 안내 상태는 `ink` 글자와 문구로 표현합니다.
- **반투명 색을 쓰지 않습니다.** `rgba(…, 0.x)`, `#RRGGBBAA`, `opacity`로 만든 딤·흐림은 B4 위반입니다(B4는 알파가 1 미만인 색을 모두 위반으로 셉니다). Figma 시트 뒤의 Dim(`ink` 40%)은 CSS로 만들지 않고, **미리 딤 처리해 둔 화면 이미지 `<img>`로만** 깝니다(§5.14). `box-shadow`와 `filter: blur`도 쓰지 않습니다.
- `transparent`는 배경의 "색 없음"으로만 씁니다. 테두리를 숨길 때는 `border: 0`을 쓰거나, 면과 같은 토큰 색으로 테두리를 칠합니다.
- `accent-soft`·`letter`·`fill-soft`·`line`(면으로 쓸 때)은 **면 색 전용**입니다. 글자색으로 쓰지 않습니다.
- **`ink-muted` 글자를 `line`(#E6E2DA) 위에 두지 않습니다.** 대비가 4.35:1입니다.
- 빨간색, 취소선, "틀림" 표시로 사용자 영어를 표시하지 않습니다.
- 색만으로 의미를 전달하지 않습니다. 밑줄 모양(실선/점선), 라벨 문구, `✓` 기호, 굵기, 면, 구조를 함께 씁니다.
- 사용자 사진, 강아지 장식 이미지, 딤 배경 이미지, 아이콘 이미지(`<img>` 안의 색)는 B4 검사 대상이 아닙니다. 그래도 선 아이콘(§5.13)은 `ink`·`accent`·`ink-muted` 값으로만 그립니다. 사진 위에는 글자를 얹지 않습니다(얹어야 하면 `data-on-image="true"`).

확인된 글자·배경 조합 (WCAG 상대 휘도 기준, 4.5:1 이상만 사용):

| 글자 | 배경 | 대비 | 용도 |
|---|---|---|---|
| `ink` | `surface` | 17.2:1 | 원문·입력·카드 본문·질문 알약·분할 탭 선택 칸 |
| `ink` | `paper` | 16.2:1 | 화면 본문·제목 |
| `ink` | `accent-soft` | 14.52:1 | Comeback 단서, Reuse 문장, "나" 말 카드 본문, 선택된 칩 글자 |
| `ink` | `letter` | 14.11:1 | 내 말풍선(write-conversation) |
| `ink` | `fill-soft` | 14.6:1 | 보조·도구·칩·닫기·'다른 질문' 버튼 글자 |
| `ink-muted` | `surface` | 5.6:1 | caption·placeholder·보조 설명 |
| `ink-muted` | `paper` | 5.3:1 | caption·메타·정렬 버튼·날짜 그룹 헤더 |
| `ink-muted` | `accent-soft` | 4.74:1 | 편지 카드 안 날짜·안내 caption, "나" 화자 caption |
| `ink-muted` | `fill-soft` | 4.8:1 | 비활성 버튼 글자, 분할 탭 비선택 칸 |
| `accent` | `surface` | 7.5:1 | 링크, 교정 제안, 강조 외곽 버튼 글자 |
| `accent` | `paper` | 7.1:1 | 링크, 선택된 탭 |
| `accent` | `accent-soft` | 6.32:1 | 편지 카드 라벨("다시 떠올려 볼 기억", "스스로 다시 쓴 표현")·링크 |
| `accent` | `fill-soft` | 6.4:1 | (알약 버튼 안 강조 글자, 필요할 때만) |
| `surface` | `accent` | 7.5:1 | 주 버튼 글자 |

- 위 표에 없는 조합은 쓰지 않습니다. 금지 예: `ink-muted`/`line`(4.35), `ink-muted`/`mark-issue-soft`, `mark-issue` 글자(모든 배경).
- 줄노트(§4.1) 위 글자의 배경은 `background-color: surface`로 판정됩니다(가이드 15절). 가로줄은 각 줄 상자의 맨 아래 1px에만 그어서 글자 획·밑줄과 겹치지 않게 합니다.

## 3. 타이포그래피

폰트:

- UI·한국어: `Pretendard, -apple-system, "Apple SD Gothic Neo", sans-serif`
- 사용자가 쓴 영어(일기 원문·입력·표현 카드의 구·교정 제안 구): `Newsreader, Georgia, serif`
- Figma의 손글씨체(MemomentKkukkukk, 메모먼트꾹꾹체)는 라이선스상 웹에 넣을 수 없습니다. HTML에서는 **Pretendard로 대신하고 크기·줄 높이만 Figma에 맞춥니다**(아래 매핑 표). `@font-face`로 손글씨체를 불러오지 않습니다.

Figma 손글씨(MEM) → HTML 매핑:

| Figma 자리 (MEM-Regular 24/175%) | HTML 클래스 | 크기 | 굵기 | 줄 높이 | 색 |
|---|---|---|---|---|---|
| 화면 제목 (`h1`: "다시 만나서 반가워요", "교정 보기", "My English", "두 문장을 나란히 봐요", "읽어 온 내용을 확인해요", "9월 28일 월요일", 대기 문구 "일기 저장 중") | `.title` | 24px | 700 | 42px | `ink` |
| 섹션·시트 제목 (`h2`: "최근 기록", "교정 제안", "읽어 온 말", "다른 상황에서도 써 볼까요?", "내가 고른 교정 기록", "무엇으로 시작할까요?", "다시 쓸 표현 저장") | `.section-title` | 24px | 700 | 42px | `ink` |

Figma Pretendard 자리는 Figma 굵기를 그대로 따릅니다:

| 토큰 / 클래스 | 크기 | 굵기 | 줄 높이 | 용도 (Figma 근거) |
|---|---|---|---|---|
| `.cue` | 20px | 400 | 1.6 (32px) | Home Comeback 단서 (Pre-Regular 20/160%, `ink`) |
| `.letter-label` | 16px | 400 | 1.4 (22px) | 편지 카드 라벨 "다시 떠올려 볼 기억" · "스스로 다시 쓴 표현" (Pre-Regular 16/140%, `accent`) |
| `.heading` | 18px | 600 | 32px | 질문 말풍선 알약 안 영어 질문 (Pre-SemiBold 18, 알약 높이 88 = 12+64+12) |
| `body` | 16px | 400 | 1.6 (26px) | 기본 UI 글자, 안내 문장, AI 이유 설명, recall 단서, 빈 상태 안내, 말풍선·말 카드 본문 |
| `.body-strong` | 16px | 600 | 1.6 | 시트 선택지 제목, 상대 이름 "지수", 맥락 띠 제목, entry 선택 결과 문장 |
| `.body-muted` | 16px | 400 | 1.6 | `ink-muted` 보조 설명(질문의 한국어 뜻, 시트 선택지 설명, 대기 상태 둘째 줄, 검색 placeholder) |
| `.diary` | 18px | 400 | **32px** | 사용자 영어·교정 제안 구 — 줄노트 밖 (Newsreader). Figma 한 줄 높이 32 |
| `.ruled` | 18px | 400 | **32px** (고정) | 줄노트 위의 원문·입력 (Newsreader) |
| `.diary-preview` | 16px | 400 | 1.6 | Home 기록 행의 원문 미리보기 (Newsreader 16/160%) |
| `.label` | 14px | 600 | 20px | 카드 라벨("내가 쓴 글 · 원문 그대로 보관돼요", "대화 상대", "전에 쓴 내 표현", "방금 쓴 문장"), 입력칸 라벨, Choice Chip, 도구·닫기 버튼, '다른 질문', 출처 알약, 정렬 버튼, 날짜 그룹 헤더, 타임라인 단계 이름, 링크 |
| `.label-strong` | 14px | 700 | 20px | 분할 탭 선택 칸(Pre-Bold 14), 선택된 칩 |
| `.label-regular` | 14px | 400 | 20px | 분할 탭 비선택 칸, 비선택 탭 |
| `.caption` | 13px | 400 | 1.5 (20px) | 날짜·메타·자동 저장 상태·글자 수·나만 보기·범례·화자 이름 caption·`↓` |

- 16px보다 작은 글자는 14px(label 계열)과 13px(caption) 두 가지만 씁니다(B5). 24·20·18·16은 모두 허용됩니다. `input`·`button`·`textarea`는 `font: inherit`을 준 뒤 크기를 따로 적습니다.
- 정보 텍스트의 줄 수를 고정하지 않습니다(`-webkit-line-clamp`, 고정 높이 + `overflow:hidden` 금지). 200%로 확대해도 줄바꿈되어야 합니다.
- 모두 대문자, 장식 글꼴, 손글씨 웹폰트는 쓰지 않습니다.

## 4. 레이아웃 · 모양

공통 기준(`design-base.md` 1·4·5절)을 따릅니다.

| 항목 | 값 |
|---|---|
| 화면 루트 | `<main data-screen="이름" data-author="system">` 파일당 1개, `width: 390px; height: 844px; overflow-y: auto; background: paper; display:flex; flex-direction:column`. Figma 프레임이 844보다 길면(Home 1157, Review 1772 등) 루트 안에서 세로 스크롤합니다 |
| 간격 (padding · gap) | `0 / 4 / 8 / 12 / 16 / 20 / 24 / 32`만. 가운데 정렬 외에는 margin 대신 padding·gap으로 간격을 줍니다(`margin-top:auto`로 하단에 미는 것은 허용) |
| 화면 좌우 여백 | `20px` (상단 바만 `12px` + 뒤로 가기 안쪽 `8px`) |
| 본문 영역 기본 | `display:flex; flex-direction:column; padding: 8px 20px 24px; gap 20` (Review·Recall·Recall-check·Entry·Capture-confirm·My English). Home은 `16px 20px 24px; gap 24`, Write는 `8px 20px 24px; gap 16`, 대화 화면은 `16px 20px 24px; gap 16`, Journey는 `8px 20px 24px; gap 24` |
| 카드 안쪽 여백 | `20` — 큰 카드(원문 카드, Correction Unit, Comeback Card, Reuse Notice, 잠금 카드, 빈 상태, 대화 상대 카드, recall-check 두 카드). `20px 16px 16px` — 시트. `16` — 입력칸. `12px 16px` — 말 카드, 말풍선, 표현 카드. `12` — 기록 행 |
| 모서리 | `0 / 8 / 12 / 16 / 999`만 (B3) |
| 터치 영역 | 모든 인터랙티브 요소 `44 × 44px` 이상. 주 버튼은 `52px` |

Figma 값 중 허용 목록 밖의 값과 대응 값:

| Figma | 위치 | HTML |
|---|---|---|
| padding `10/0/10/0` | My English 분할 탭 칸 | `8px 0` + `min-height:44px` (가운데 정렬로 높이 44 유지) |
| 원색 `#EAF3D3` | 대화 화면 두 번째 내 말풍선 | `letter` `#E4ECD1` |
| Dim `ink` 40% (반투명) | 시트 뒤 | 미리 딤 처리한 PNG `<img>` (§5.14) |
| 폰트 MemomentKkukkukk | 제목 | Pretendard 24/42 700 (§3) |

모서리 역할:

| 값 | 쓰는 곳 |
|---|---|
| `0` | 탭바, 하단 고정 영역, 맥락 띠, 구분선 |
| `8` | 잠금 영역의 가림 막대 |
| `12` | 입력칸, 검색 바, 사진, 썸네일, 시트 선택지 행, 아이콘 칸 |
| `16` | 모든 카드, 대화 말풍선, 말 카드, 시트(네 모서리) |
| `999` | **모든 버튼**(주·보조·강조 외곽·도구·닫기), Choice Chip, 출처 알약, 질문 말풍선 알약, '다른 질문' 버튼, 분할 탭 트랙과 칸 |

- 그림자는 쓰지 않습니다. 면은 색 대비와 `1px line` 테두리로 구분합니다.
- 그라데이션은 쓰지 않습니다. **예외는 §4.1 줄노트 패턴 하나**입니다(두 토큰 색을 경계에서 딱 끊음).
- 하단 고정 영역 `.bottom`: `position: sticky; bottom: 0; margin-top: auto; display:flex; flex-direction:column; gap:8px; padding: 8px 20px 20px; background: paper`. **위 테두리는 Figma대로 write.html에만** 둡니다(`.bottom.with-line { border-top: 1px solid line }`). review·write-conversation·capture-confirm·recall-check의 `.bottom`에는 테두리가 없습니다.
- 글자로 쓰는 기능 기호는 `‹`, `✓`, `↓` 세 개뿐입니다. 그 밖의 아이콘은 §5.13의 선 아이콘 이미지로 넣습니다.
- 움직임은 상태 변화와 이동을 설명할 때만 씁니다. 축하 연출(색종이, 튀는 보상, 불꽃)은 쓰지 않습니다.

### 4.1 줄노트 패턴 `.ruled`

사용자 영어가 놓이는 곳에만 씁니다: 영어 입력칸(§5.10), 원문 카드의 원문 본문(§5.4), recall-check의 두 문장 블록. AI 글, 교정 제안, 목록 미리보기, 타임라인 발췌에는 쓰지 않습니다.

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

- 줄 간격 32px은 `line-height`와 같아야 합니다.
- 줄은 `surface`·`line` 두 불투명 토큰으로만 긋습니다. 세로 마진선은 넣지 않습니다.
- 세로 padding은 `16`(입력칸) 또는 `0`(카드 안 본문 블록)입니다. 입력칸 높이: 6줄 `224px`(16+192+16, write·recall), 3줄 `128px`(16+96+16, 대화 c1·전이 t1).

### 4.2 원문 밑줄 (Figma: 글자 밑줄, `ink`)

Figma v2는 배경 표시 없이 글자 밑줄만 씁니다. `<span>`으로 감싸고 `text-decoration`으로 긋습니다(글자를 바꾸지 않으므로 S2 글자 비교가 그대로 맞습니다).

```css
.mark   { text-decoration-line: underline; text-decoration-style: solid;  text-decoration-color: #1C1B19; text-decoration-thickness: 1px; text-underline-offset: 4px; }
.reused { text-decoration-line: underline; text-decoration-style: dotted; text-decoration-color: #1C1B19; text-decoration-thickness: 1px; text-underline-offset: 4px; }
```

- `.mark`(실선) = 다듬어 볼 표현: `drink with`, `company people`. `.reused`(점선) = 스스로 다시 쓴 표현: `looking forward to`.
- 배경색, `border-bottom`, `mark-issue`·`mark-issue-soft`는 쓰지 않습니다.
- 쓰는 곳(Figma 기준): review.html 원문 카드(실선 2 + 점선 1), expression-journey.html '스스로 씀' 원문(점선 1), my-english.html "looking forward to" 카드(점선). **entry.html·recall-check.html·home.html 원문과 Correction Unit의 "내 표현" 구에는 밑줄이 없습니다**(Figma에 없음).

## 5. 컴포넌트

키스크린의 클래스 이름은 전체 화면에서도 그대로 씁니다. 모든 화면은 키스크린 `review.html`의 기본 선언(`*` 리셋, `body`, `[data-screen]`, `a`, `button`, `img`, 글자 클래스)으로 시작하고, 색·모서리·버튼 값은 이 절을 따릅니다.

### 5.1 상단 바 `.topbar`
- `display:flex; align-items:center; justify-content:space-between; gap:8px; padding:8px 12px` (높이 60).
- 뒤로 가기 `.back`: `<a href>`, `min-height:44px; min-width:44px; padding:8px`, 글자 16px 600 `ink`. `aria-label`이 반드시 있어야 합니다. 문구는 화면별로 Figma 그대로: "‹ 홈"(write·recall·entry), "‹ 확인"(write-conversation → capture-confirm), "‹ 시작"(capture-confirm → start-sheet), "‹ 쓰기"(review → write), "‹ 떠올리기"(recall-check → recall), "‹ My English"(expression-journey → my-english).
- 날짜 caption은 `padding 8` 상자 안에 둡니다. 작성 화면(write · write-conversation · recall)은 그 오른쪽에 자동 저장 상태(§5.10)를 둡니다. expression-journey·entry 상단 바에는 뒤로 가기만 있습니다.
- **review-pending.html에는 상단 바가 없습니다**(Figma). home·my-english·my-english-empty는 상단 바 대신 머리 영역(§5.20)을 둡니다.

### 5.2 버튼 (모두 알약)
| 종류 | 배경 | 글자 | 테두리 | 크기·모서리 |
|---|---|---|---|---|
| 주 `.btn-primary` | `accent` | `surface` 16px 600 | 없음 | `min-height:52px; padding:12px 24px; radius 999` |
| 보조 `.btn-secondary` | `fill-soft` | `ink` 16px 600 | 없음 | `min-height:44px; padding:8px 20px; radius 999` |
| 강조 외곽 `.btn-accent-outline` | `surface` | `accent` 16px 600 | `1px accent` | `min-height:44px; padding:8px 20px; radius 999` — Comeback Card에서만 |
| 비활성 `.btn-disabled` | `fill-soft` | `ink-muted` 16px 600 | 없음 | 위와 같음 + `disabled`/`aria-disabled="true"` |
| 텍스트 링크 `.link` | 없음 | `accent` 14px 600, 실선 밑줄(`accent`, offset 4px) | 없음 | `min-height:44px; padding:8px 0; align-self:flex-start` |
| 텍스트 버튼 `.btn-text` | 없음 | `ink-muted` 14px 600 + 선 아이콘 | 없음 | `min-height:44px` (정렬 버튼 §5.17) |
| 도구·닫기 `.tool` (Figma Chip/Default) | `fill-soft` | `ink` 14px 600 | 없음 | `min-height:44px; padding:8px 16px; radius 999` |

- 화면마다 주 버튼은 1개만 둡니다. `.btn-ghost`는 쓰지 않습니다.
- 다른 화면으로 가는 버튼은 `<a href>`로 만들고, 이동하지 않는 동작만 `<button type="button">`으로 만듭니다.
- 모든 버튼·링크에 `data-ui-role="button"`을 붙입니다. 탭은 `tab`, 누르는 카드는 `card`입니다.
- 글자 수가 모자란다고 주 버튼을 비활성화하지 않습니다(R2 피할 것).

### 5.3 Choice Chip `.chip` (Figma Chip/Default · Chip/Selected)
- **쓰는 곳은 세 군데뿐입니다**: Correction Unit의 반영/내 표현 유지, 추적 표현 저장 시트, capture-confirm의 "영어로 쓸 말". My English의 구분·정렬에는 쓰지 않습니다(§5.17).
- 비선택(Chip/Default): `radius 999; min-height:44px; padding:8px 16px; label 14px 600; background fill-soft; border 1px solid #EFECE6(면과 같은 색); color ink`.
- 선택 `[aria-pressed="true"]`(Chip/Selected): `background accent-soft; border 1px solid accent; label-strong 700; color ink` + 글자 앞 `<span aria-hidden="true">✓&nbsp;</span>`(Figma 문구 "✓ 내 표현 유지", "✓ 영어로 쓸 말").
- Correction Unit에서는 `data-choice="apply"`(반영)와 `data-choice="keep"`(내 표현 유지)를 씁니다. **`data-default="true"`와 `aria-pressed="true"`는 `keep`에만 붙입니다.** 두 칩을 `.choices role="group"` + `aria-label`로 묶고 `flex; gap 8`.
- 일괄 반영, 전체 Rewrite, "교정된 일기" 전체 전환 토글은 두지 않습니다.

### 5.4 원문 카드 `.original` (Review · Entry) 와 사진 `.photo`
- `.original`: `surface` 배경, `1px line`, `radius 16`, `padding 20`, `gap 12`.
- 순서: 라벨 "내가 쓴 글 · 원문 그대로 보관돼요"(`label` 600 `ink`) → 사진(높이 120) → 원문 본문(`.ruled`, padding 0, `data-author="user"`, `data-original-ref="d1"`) → (review.html만) 범례 caption "실선 밑줄: 다듬어 볼 수 있는 표현 · 점선 밑줄: 스스로 다시 쓴 표현".
- review.html 원문은 §4.2 밑줄 3개를 둡니다. **entry.html 원문은 밑줄과 범례가 없습니다**(Figma 34:3732).
- **사진 `.photo`** — 회색 자리표시(`.photo-ph`)는 쓰지 않습니다. Figma 사진 칸은 실제 이미지입니다:
  - `<img class="photo" src="…" alt="…" width="350" height="180">`, `display:block; width:100%; height:<칸 높이>px; object-fit: cover; border-radius: 12px; background-color: #E6E2DA`(뜨기 전 바탕 = `line`).
  - 파일: `photo-drinks.jpg`(Figma IMG:00391d, IMG:1c6cf0) · `photo-river.jpg`(IMG:6f74d0). 경로는 3-design/screens에서 `../../../../docs/assets/<파일>`, 4-prototype에서 `../../../docs/assets/<파일>`.
  - 높이: Home Comeback `180`, Write `180`, Review·Recall·Entry `120`, Home 기록 행 썸네일 `64×64`.
  - `alt`(의미 있게): photo-drinks.jpg 큰 사진 = "회사 사람들과 저녁에 잔을 부딪치는 사진", 썸네일 = "9월 28일 회식 사진". photo-river.jpg 썸네일 = "9월 14일 강가에서 찍은 물속 돌 사진".
  - 사진 위에 글자를 얹지 않습니다.
- 사진과 원문은 **한 카드 안에** 둡니다(R3).
- 원문은 한 글자도 바꾸지 않습니다. 처음 쓴 곳에는 `data-original-id`, 다시 보여 주는 곳에는 같은 값의 `data-original-ref`를 붙입니다.
- 취소선(`line-through`, `<s>`, `<del>`, `<strike>`)은 쓰지 않습니다.

### 5.5 '교정 제안' 영역 `.units` + Correction Unit `.unit` (`data-ui-role="correction-unit"`, review.html)
- 원문 카드와 **따로 떨어진 섹션**: `<section class="units" aria-labelledby>`(`flex column; gap 12`) + `h2.section-title` "교정 제안". 화면 순서는 머리(제목+안내) → 원문 카드 → Reuse Notice → 교정 제안 → `.bottom`입니다.
- `.unit`: `surface`, `1px line`, `radius 16`, `padding 20`, `gap 12`. 줄노트는 쓰지 않습니다. 수정 1개당 카드 1개, `aria-label="첫 번째 교정 제안"`처럼 이름을 붙입니다.
- 카드 안 순서는 고정입니다(`.unit-row` = flex column, gap 4, 각 행 위에 caption 라벨):
  1. caption "내 표현" + `.diary` `ink`, `data-author="user"` — **밑줄 없음**(Figma)
  2. caption `↓`(`aria-hidden="true"`)
  3. caption "자연스러운 표현" + `.diary` `accent`, `data-author="ai" data-content-role="suggestion"`
  4. caption "이유" + `body` `ink`, `data-author="ai" data-content-role="explanation"`
  5. 선택 칩 줄(§5.3): Chip/Default "반영" + Chip/Selected "✓ 내 표현 유지"
- 카드 내용(Figma):
  - 1: "drink with" → "had drinks with" / "어제 일이라 과거형(had)이 필요해요. 함께 술자리를 가졌다는 뜻은 have drinks with로 자주 말해요."
  - 2: "company people" → "coworkers" / "company people은 영어에서 잘 쓰지 않는 조합이에요. 같은 회사에서 함께 일하는 사람은 coworkers라고 해요."
- 제안은 원문보다 크거나 굵게 보이면 안 됩니다(18px 400). 개수·점수를 쓰지 않습니다. 강아지 장식은 두지 않습니다.

### 5.6 Reuse Notice `.reuse` (편지 카드, review.html)
- `accent-soft` 배경, 테두리 없음, `radius 16`, `padding 20`, `gap 8`, `data-ui-role="card"`.
- 구성(Figma): 라벨 "스스로 다시 쓴 표현"(`.letter-label` 16px 400 `accent`) → 문장 `body` "looking forward to를 이번엔 힌트 없이 직접 썼어요."(앞의 `looking forward to`는 `<span class="phrase" data-author="user" lang="en">`, Newsreader 16px 600 `ink`) → 날짜 caption "9월 14일 처음 배움 · 9월 28일 스스로 씀"(`ink-muted`, 4.74:1) → `.link` "이 표현의 Expression Journey 보기"(→ expression-journey.html).
- 축하 문구, 아이콘, 편지지 장식, **강아지 장식은 넣지 않습니다**(성취 자리).
- 전이 단서를 보고 쓴 답과 회상 화면에서 쓴 답은 여기에 넣지 않습니다.

### 5.7 Memory Comeback Card `.comeback` (`data-area="comeback"`, 편지 카드, home.html)
- `accent-soft` 배경, 테두리 없음, `radius 16`, `padding 20`, `gap 12`, `data-ui-role="card"`. 홈에 카드 1개만 둡니다.
- 순서(Figma): 라벨 "다시 떠올려 볼 기억"(`.letter-label` 16px 400 `accent`) → 사진(photo-drinks.jpg, 높이 180) → caption "9월 28일의 기록에서" → 단서 `.cue`(20px 400 `ink`, `data-author="ai" data-content-role="cue"`) "회사 사람들과 저녁에 한잔했던 날이에요. 그때 하고 싶었던 말을 영어로 다시 써 볼까요?" → **버튼 하나** "떠올려 쓰기 시작"(`.btn-accent-outline`, 폭 100%, → recall.html) → caption "전에 쓴 내 표현은 다시 쓴 뒤에 열어 볼 수 있어요."
- 두 번째 버튼, 정답 영어, 할당량, 공백 일수, 스트릭은 넣지 않습니다. 채워진 주 버튼도 쓰지 않습니다.

### 5.8 이전 표현 잠금 카드 `.locked` (recall.html)
- 회상 답을 쓰기 전에는 이전 표현을 보여 주지 않습니다(RP-5, R11). 이 카드는 `data-area="recall"` **밖**에 둡니다.
- `surface`, `1px line`, `radius 16`, `padding 20`, `gap 12`, `aria-labelledby`.
- 구성(Figma): 머리 줄(`flex; align-items:center; gap 8`) = puppy-head-curious 40px(§5.22) + 라벨 "전에 쓴 내 표현"(`label` 600 `ink`) → 가림 막대 묶음 `.veil`(`aria-hidden="true"`, `flex column; gap 8`; 막대 3개 `background line; height 12px; radius 8`, 폭 100% / 80% / 60%) → caption "방금 쓴 문장과 나란히 볼 수 있어요." → 버튼 "전에 쓴 내 표현 열기".
- 버튼 상태:
  - 쓴 뒤(정적 화면의 기준 상태, Figma): `<a class="btn-primary" href="recall-check.html" data-ui-role="button">`. recall.html에서 주 버튼은 이것 하나입니다.
  - 쓰기 전(다른 상태, 이번 정적 화면에는 그리지 않음): `<button type="button" class="btn-disabled" aria-disabled="true" disabled>`.
- 실제 문장을 넣고 흐리게 처리하지 않습니다. '정답 확인', 'AI 풀이 보기' 같은 문구는 쓰지 않습니다.

### 5.9 질문 말풍선 알약 `.question` (write.html만)
- 감싸는 영역 `.question`은 카드가 아닙니다: `display:flex; flex-direction:column; align-items:center; text-align:center; gap 8; padding 8px 0`.
- 위에서 아래로(Figma):
  1. caption "사진을 보고 떠올려 봐요"
  2. 질문 줄 `.q-row`(`display:flex; align-items:center; gap 12`): puppy-head-calm 56px(§5.22) + **말풍선 알약** `.q-bubble`(`surface`, `1px line`, `radius 999`, `padding 12px 24px`, `.heading` 18px 600 `ink` line-height 32px, `data-author="ai" data-content-role="question"`, `lang="en"`) "Who were you with, and what did you do together?" 줄바꿈 허용, 줄 수를 자르지 않습니다.
  3. 한국어 뜻 `.body-muted` "누구와 함께였고, 무엇을 했나요?"(`data-author="ai" data-content-role="question"`)
  4. **'다른 질문' 버튼** `.q-refresh`: `<button type="button" data-ui-role="button" aria-label="다른 질문으로 바꾸기">` 안에 새로고침 선 아이콘(20×20, `alt=""`)과 라벨 "다른 질문"(`label` 600 `ink`). `fill-soft`, 테두리 없음, `radius 999`, `min-height 44; padding 8px 16px; inline-flex; gap 8`.
- 말풍선에 꼬리, 화자 이름, 캐릭터 얼굴을 붙이지 않습니다. 강아지는 알약 **바깥** 장식이고, 질문을 강아지의 말처럼 표시하지 않습니다.
- 질문은 한 번에 하나만 둡니다. **예시 문장, 완성 답, 추적 표현, 모범 placeholder는 넣지 않습니다.**
- write-conversation.html에는 **질문 알약을 두지 않습니다**(Figma).

### 5.10 영어 입력칸 `.input` + 자동 저장 · 글자 수 · 나만 보기
- `.input-wrap`(`flex column; gap 8`): 라벨(`label` 600 `ink`, `id`) → 입력칸 → 글자 수. 라벨 문구: "내 영어로 쓰기"(write·recall-check), "내 영어로 다시 쓰기"(recall), "이 말을 내 영어로"(write-conversation).
- 입력칸: `.ruled` + 테두리 `1px accent`(Figma 입력칸은 모두 쓰는 중 상태), `radius 12`, `padding 16`, `min-height 224px`(6줄) 또는 `128px`(3줄). `role="textbox" contenteditable="true" aria-multiline="true" data-interactive="true"` 또는 `<textarea>`(`font: inherit; font-size:18px; line-height:32px; resize:none`)로 만들고, `aria-labelledby`, `data-author="user"`, `lang="en"`을 붙입니다.
- placeholder는 한국어 안내만 씁니다(`ink-muted`). 영어 예문은 넣지 않습니다.
- 글자 수 `.count-row`: 오른쪽 정렬 caption("105자", "62자", "47자"). 기준이나 경고는 붙이지 않습니다.
- 자동 저장 `.saved`: caption("자동 저장됨 · 오후 9:12" / "자동 저장됨 · 오후 8:40" / "자동 저장됨 · 오후 8:15"), `role="status" aria-live="polite"`, `padding 8`. 저장 경고는 두지 않습니다(RP-8).
- 나만 보기 `.meta-row`(`flex; align-items:center; gap 8`): 출처 알약 + caption "나만 보기 · 비공개 기록". 공유 토글은 없습니다.
- 쓰는 동안에는 추적 표현 힌트를 보여 주지 않습니다.

### 5.11 하단 도구 줄 `.tools` (write.html)
- `.bottom.with-line` 안, 주 버튼 위. `role="group" aria-label="첨부 도구"`, `flex; gap 8`.
- `.tool` 2개: "사진 바꾸기", "텍스트 스캔". 그 아래 주 버튼 "다 썼어요 · 교정 보기"(→ review.html).

### 5.12 출처 알약 `.source`
- `label` 14px 600 `ink`, `surface`, `1px line`, `radius 999`, `padding 4px 12px`. 누를 수 없는 표시입니다.
- 문구는 화면별 Figma 그대로: write.html "사진으로 시작", capture-confirm.html "대화 캡처에서 시작", entry.html "사진에서 시작". (Home 기록 행 caption의 "사진에서 시작"은 알약이 아니라 caption입니다.)

### 5.13 선 아이콘 `.icon`
- 아이콘은 텍스트 라벨과 **함께만** 씁니다(R9). `<img alt="" aria-hidden="true">`, data-URI SVG 선 아이콘(채움 없음). 선 색은 `%231C1B19` / `%232F5D50` / `%236B6760` 중 하나입니다.
  - 기록 시작 4종(24×24, 선 `ink`): photo, chat, scan, pen
  - 새로고침(20×20): '다른 질문' 전용
  - 아래 꺾쇠 chevron-down(16×16, 선 `ink-muted`): 정렬 버튼 전용(§5.17)
- 아이콘 칸 `.src-icon-box`: `40×40`, `fill-soft`, 테두리 없음, `radius 12`, 가운데 정렬. 이모지 아이콘은 쓰지 않습니다.

### 5.14 기록 시작 시트 · 저장 시트 `.sheet` (Figma 31:3472 · 33:3520)
- 별도 HTML 화면입니다. **딤 처리된 뒤 화면 위에 시트가 떠 있는 모양**입니다.
- 화면 루트: `position:relative; height:844px; overflow:hidden; background paper`.
- **뒤 화면(딤)** `.backdrop`: CSS 반투명으로 만들지 않고, Figma에서 내보낸 딤 화면 이미지로만 깝니다(§2). 마크업 순서는 `.backdrop` → `.sheet`(z-index 쓰지 않음).
  - start-sheet.html: `<a class="backdrop" href="home.html" aria-label="시트 닫기" data-ui-role="button"><img src="../../../../docs/assets/start-sheet-backdrop.png" alt="" aria-hidden="true" width="390" height="844"></a>`
  - save-expression.html: `<a class="backdrop" href="review.html" aria-label="시트 닫기" data-ui-role="button"><img src="../../../../docs/assets/save-sheet-backdrop.png" alt="" aria-hidden="true" width="390" height="844"></a>`
  - `.backdrop { position:absolute; inset:0; display:block }`. 4-prototype에서는 `../../../docs/assets/…`.
  - 이미지 안의 글자는 장식이라 `data-author`를 붙이지 않습니다. `<img>` 안의 색은 B4·B7이 세지 않습니다.
- **시트** `.sheet`: `position:absolute; left:16px; right:16px; bottom:16px`(폭 358), `surface`, `border 1px solid line`(네 변), `border-radius 16`, `padding 20px 16px 16px`, `display:flex; flex-direction:column`. 그림자 없음.
- 닫기 버튼(두 시트 공통): `<a class="tool" href="…" aria-label="닫기" data-ui-role="button">닫기</a>`(Chip/Default 모양, 14px 600, `padding 8px 16px`, 높이 44). start-sheet는 → home.html, save-expression은 → review.html.
- **기록 시작 시트**(시트 `gap 4`, Figma 358×426):
  - 머리 `.sheet-head`: `flex; align-items:center; gap 8; padding 0 0 8px 4px` = puppy-head-curious 44px(§5.22) + `h2.section-title`(flex:1) "무엇으로 시작할까요?" + 닫기.
  - 선택지 4개 `.option`: **테두리와 배경이 없는 목록 행**(`<a href data-ui-role="button">`), `display:flex; align-items:center; gap 12; padding 12px 4px; min-height 80px; radius 12`. 아이콘 칸(40×40, §5.13) + 글 상자(`flex column; gap 4`: 제목 `.body-strong` + 설명 `.body-muted`).
    - "사진" / "오늘 찍은 사진을 보며 써요" → write.html
    - "대화 캡처" / "나눈 대화에서 내 말을 영어로 써요" → capture-confirm.html
    - "텍스트 스캔" / "손글씨 메모를 읽어 와서 시작해요" → capture-confirm.html
    - "바로 쓰기" / "아무것도 고르지 않고 바로 써요" → write.html
  - 업셀이나 완성 일기를 만들어 주는 선택지는 두지 않습니다.
- **추적 표현 저장 시트**(시트 `gap 12`, Figma 358×360, 강아지 없음):
  - 머리: `flex; align-items:center; gap 8` = `h2.section-title`(flex:1) "다시 쓸 표현 저장" + 닫기.
  - `body` "다시 써 보고 싶은 표현을 골라요"
  - caption "교정 제안에서" → 칩 줄(`flex; flex-wrap:wrap; gap 8`): "have drinks with", "coworkers" (`data-author="ai" data-content-role="suggestion"`, `lang="en"`)
  - caption "내가 쓴 글에서" → 칩 줄: "talked a lot about", "team trip" (`data-author="user"`, `lang="en"`)
  - 칩은 모두 Chip/Default, **아무것도 선택되지 않은 상태**(`aria-pressed="false"`)입니다.
  - 주 버튼 "고른 표현 저장하기"(→ home.html).

### 5.15 Conversation UI (write-conversation.html, Figma 31:3559)
- 상단 바: "‹ 확인"(→ capture-confirm.html) · "10월 2일 금요일" · "자동 저장됨 · 오후 8:40".
- 맥락 띠 `.context`: `position: sticky; top:0; surface; border-top 1px line; border-bottom 1px line; radius 0; padding 12px 20px; flex column; gap 4`. "지수와의 대화"(`.body-strong`) + caption "10월 2일 카카오톡 캡처 · 내 말만 영어로 써요".
- 작성 영역(`data-area="write"`, `flex column; padding 16px 20px 24px; gap 16`), 위에서 아래로:
  1. 상대 말풍선 "이번 주 금요일에 시간 돼?"
  2. 내 말풍선 "응, 저녁에 괜찮아. 어디 가고 싶은 데 있어?"
  3. 라벨 "이 말을 내 영어로" + 줄노트 입력칸(3줄 128px, `data-original-id="c1"`) "Yes, I'm okay at evening. Where do you want to go?"
  4. 상대 말풍선 "새로 생긴 파스타집 가 보자!"
  5. 내 말풍선 "좋아ㅋㅋㅋ 일곱 시에 회사 앞에서 만나자." (**입력칸 없음** — Figma)
- 말풍선 `.bubble`: `radius 16`, `padding 12px 16px`, `body` 16px 400 `ink`, `max-width: 85%`, 내용 폭만큼. 상대 `.bubble-them`: `surface` + `1px line`, `align-self:flex-start`. 내 말 `.bubble-me`: `letter`, 테두리 없음, `align-self:flex-end`. 캡처에서 읽은 글은 `data-author="user"`로 글자 그대로 둡니다.
- **질문 알약, '다른 질문', 답변 도움 버튼은 두지 않습니다**(Figma, R15). 입력칸은 c1 하나만 둡니다.
- `.bottom`(테두리 없음): 주 버튼 "다 썼어요 · 교정 보기"(→ review.html).

### 5.16 기록 행 `.record` (Home 최근 기록)
- `<a href="entry.html" data-ui-role="card" aria-label="9월 28일 기록 열기">`: `surface`, `1px line`, `radius 16`, `padding 12`, `display:flex; gap 12`, `min-height 44`.
- 썸네일 `.thumb`: `<img>` 64×64, `object-fit:cover; radius 12`, alt(§5.4) + `.meta`(`flex:1; flex column; gap 4`: caption + `.diary-preview`, `data-author="user"`). 줄 수를 자르지 않습니다.
- 행 2개(Figma):
  - photo-drinks.jpg 썸네일 · "9월 28일 · 사진에서 시작" · d1 원문(`data-original-ref="d1"`) — `aria-label="9월 28일 기록 열기"`
  - photo-river.jpg 썸네일 · "9월 14일 · 사진에서 시작" · "I walked along the river with my friend. I look forward to go camping this weekend." — `aria-label="9월 14일 기록 열기"`, 정적 프로토타입에서는 같은 entry.html로 연결합니다.

### 5.17 My English 목록 (my-english.html · my-english-empty.html, Figma 34:3639 · 34:3673)
- 머리: `padding 24px 20px 8px` + `h1.title` "My English".
- 본문: `flex column; padding 8px 20px 24px; gap 20`. 첫 묶음 `.controls`(`flex column; gap 12`) = 검색 바 → 분할 탭 → 정렬 줄.
- **검색 바** `.search`: `<input type="search" aria-label="표현 검색" placeholder="표현 검색">`, `font: inherit; 16px; min-height 44; padding 8px 16px; surface; 1px line; radius 12; ink`, placeholder `ink-muted`.
- **분할 탭** `.segment`(칩이 아닙니다):
  - 트랙: `role="group" aria-label="표현 구분"`, `display:flex; width:100%; background fill-soft; radius 999; padding 4; gap 4`(높이 52).
  - 칸 2개 "저장한 표현" / "스스로 다시 쓴 표현": `<button type="button" data-ui-role="button">`, `flex:1; min-height 44; radius 999; padding 8px 0`(Figma 10/0 → 8/0), 가운데 정렬.
  - 선택 칸("저장한 표현"): `background surface; border 1px solid line; .label-strong(14px 700) ink` + `aria-pressed="true"`.
  - 비선택 칸("스스로 다시 쓴 표현"): `background transparent; border 1px solid #EFECE6`(트랙과 같은 색, 크기 유지용); `.label-regular(14px 400) ink-muted`(4.8:1), `aria-pressed="false"`.
  - ✓ 기호와 개수는 쓰지 않습니다.
- **정렬 줄**: `flex; justify-content:flex-end; min-height 44`. 정렬 버튼 `.sort.btn-text`: `<button type="button" data-ui-role="button" aria-label="정렬: 최신순">`, `inline-flex; align-items:center; gap 4; min-height 44; padding 0 4px 0 8px`, 글자 "최신순"(`label` 600 `ink-muted`) + chevron-down 선 아이콘 16px. 배경·알약·테두리 없음.
- **목록**(my-english.html): 그룹 묶음 `flex column; gap 20`. 그룹 = `flex column; gap 8`.
  - 날짜 그룹 헤더 `.group-head`: `h2`, `label` 600 `ink-muted`. 문구: "9월 28일 월요일", "9월 14일 월요일".
  - **표현 카드** `.expr`: `<a href="expression-journey.html" data-ui-role="card">`, `surface`, `1px line`, `radius 16`, `padding 12px 16px`, `flex column; gap 4`, `min-height 44`. 구(`.diary` 18px `ink`, `lang="en"`) + 사실 caption.
    - 9월 28일: "have drinks with" · "9월 28일 저장 · 교정 제안에서"; "coworkers" · "9월 28일 저장 · 교정 제안에서" (구는 `data-author="ai" data-content-role="suggestion"`, 색은 Figma대로 `ink`)
    - 9월 14일: "looking forward to"(`data-author="user"`, `.reused` 점선 밑줄 §4.2) · "9월 14일 처음 배움 · 9월 28일 스스로 씀"
  - 진행률, 퍼센트, 랭킹, 숙련도, "N개 남음"은 쓰지 않습니다.
- **빈 상태** `.empty`(my-english-empty.html, 목록 자리): `surface`, `1px line`, `radius 16`, `padding 20`, `flex column; align-items:center; text-align:center; gap 12`. puppy-sit 96px(§5.22) + `body` 한 문장 "교정 보기에서 다시 써 보고 싶은 표현을 저장하면 여기에 모여요." 큰 "0"이나 독촉 문구는 쓰지 않습니다.

### 5.18 Expression Journey 타임라인 (expression-journey.html, Figma 34:3697)
- 상단 바: "‹ My English"(→ my-english.html)만.
- 본문 `flex column; padding 8px 20px 24px; gap 24`.
- 머리(`flex column; gap 4`): `h1` 표현 "looking forward to"(`.diary` 18px **600**, Newsreader, `lang="en"`, `data-author="user"`) + caption "처음 쓴 날부터 스스로 쓴 날까지의 기록".
- `<ol class="journey">`: `flex column; gap 0; border-left: 1px solid line`(타임라인 세로선). 각 단계 `.step`: `flex column; gap 8; padding 0 0 20px 16px`. 단계 머리 `.step-head`: `flex; align-items:center; gap 8` = 날짜 caption + 단계 이름(`label` 600 `ink`).
- 단계(Figma 문구):
  1. "9월 14일" · "처음 씀" — `.diary` `ink` `data-author="user"` "I walked along the river with my friend. I look forward to go camping this weekend." → `.link` "9월 14일 기록 보기"(→ entry.html)
  2. "9월 14일" · "교정" — `.diary` `accent` `data-author="ai" data-content-role="suggestion"` "looking forward to going" → `body` "교정 제안을 반영하고 이 표현을 저장했어요."
  3. "9월 21일" · "떠올림" — `body` "떠올리기에서 다시 쓴 뒤, 떠올렸다고 직접 확인했어요."
  4. "9월 28일" · "스스로 씀" — `.diary` d1 원문(`data-original-ref="d1"`, "looking forward to"에 `.reused` 점선) → `body` "새 일기에서 힌트 없이 직접 썼어요." → `.link` "9월 28일 기록 보기"(→ entry.html)
- 경과 시간, 간격 수치, 진행률, 단계 수, 완료 표시는 쓰지 않습니다. **강아지 장식은 두지 않습니다**(성취 자리).

### 5.19 Review 진입 대기 상태 `.pending` (review-pending.html, Figma 33:3446)
- **상단 바 없음.** 루트 안 한 영역: `flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding 0 20px; gap 12`.
- 위에서 아래로: puppy-walk 120px(§5.22) → 문구 묶음(`role="status" aria-live="polite"`, `flex column; align-items:center; gap 4`): `.title` "일기 저장 중" + `.body-muted` "문장을 살펴보고 있어요" → `.link` "교정 보기로 넘어가기"(→ review.html, `align-self:center`).
- 진행률 바, 퍼센트, 회전 표시, 저장 경고는 두지 않습니다. 강아지 그림은 진행에 따라 바뀌지 않습니다.

### 5.20 머리 영역과 탭바 `.tabbar`
- Home 머리 `.top`: `flex column; gap 4; padding 24px 20px 8px` = caption "10월 2일 금요일" + `.greet`(`flex; align-items:center; justify-content:space-between; gap 12`: `h1.title` "다시 만나서 반가워요" + puppy-wave 72px).
- 탭바: 탭은 "홈" / "My English" 두 개. `position:sticky; bottom:0; margin-top:auto; display:flex; gap 8; padding 4px 20px 8px; surface; border-top 1px line`.
- `.tab`: `<a href>`, `flex:1`, `min-height 44`, 가운데 정렬, `label-regular` `ink-muted`. 현재 탭은 `aria-current="page"` + `accent` + 700 + 밑줄. `data-ui-role="tab"`.
- 탭바는 home.html, my-english.html, my-english-empty.html에만 둡니다.

### 5.21 저장 영역 (review.html 하단)
- `.bottom`(테두리 없음) 안에 주 버튼 "다시 쓸 표현 저장하기"(→ save-expression.html)와 보조 버튼 "저장 없이 마치기"(→ home.html). 공유하기·이미지 저장 버튼은 두지 않습니다(PRD 7).

### 5.22 강아지 장식 `.puppy` (사용자 결정 — PRD 7 해석)
- PRD 7은 "캐릭터…를 **중심으로 학습 동기를 설계하지 않는다**"입니다. 캐릭터는 허용하되 **조용히 놓이는 장식**으로만 씁니다.
  - 감정 반응, 보상, 칭찬, 독촉을 하지 않고, 진행에 따라 모습이 바뀌지 않습니다. 화면마다 포즈 하나로 고정합니다.
  - 말을 하지 않습니다. 말풍선, 화자 이름, 대사가 없습니다.
  - **성취·판정 자리에는 두지 않습니다**: Reuse Notice, Expression Journey, 교정 결과(review.html), 저장 시트, recall-check.html.
- 마크업: `<img class="puppy" src="../../../../docs/assets/puppy-<pose>.png" alt="" aria-hidden="true" width="N" height="N">`(4-prototype은 `../../../docs/assets/…`), `object-fit: contain; flex-shrink:0`. 누를 수 없고, 글자를 얹지 않습니다.
- 포즈와 위치(Figma 기준, 이 목록 밖에는 두지 않습니다):

| 화면 | 파일 | 크기 | 위치 |
|---|---|---|---|
| home.html | `puppy-wave.png` | 72px | 인사 제목 오른쪽(`.greet`) |
| start-sheet.html | `puppy-head-curious.png` | 44px | 시트 제목 왼쪽 |
| write.html | `puppy-head-calm.png` | 56px | 질문 알약 왼쪽(`.q-row`), `data-area="write"` 안 장식 |
| review-pending.html | `puppy-walk.png` | 120px | 대기 문구 위 |
| recall.html | `puppy-head-curious.png` | 40px | 잠금 카드 라벨 왼쪽 |
| my-english-empty.html | `puppy-sit.png` | 96px | 빈 상태 카드 안 위쪽 |

### 5.23 캡처 확인 (capture-confirm.html, Figma 53:3473)
- 상단 바: "‹ 시작"(→ start-sheet.html) + 날짜 "10월 2일 금요일".
- 본문 `flex column; padding 8px 20px 24px; gap 20`:
  1. 머리(`flex column; gap 8`): `.meta-row`(출처 알약 "대화 캡처에서 시작" + caption "나만 보기 · 비공개 기록") → `h1.title` "읽어 온 내용을 확인해요" → `body` "캡처에서 읽은 글자는 고치지 않고 그대로 보여 줘요."
  2. **대화 상대 카드**: `surface`, `1px line`, `radius 16`, `padding 20`, `flex column; gap 12`. 라벨 "대화 상대"(`label` 600) → 줄(`flex; align-items:center; justify-content:space-between; gap 12`): "지수"(`.body-strong`, `data-author="user"`) + 보조 버튼 "다른 사람으로 바꾸기"(`<button type="button" class="btn-secondary">`).
  3. **"읽어 온 말"**(`flex column; gap 12`): `h2.section-title` "읽어 온 말" → `body` "영어로 쓸 내 말을 골라요." → 말 카드 4개(폭 100%).
     - 말 카드 공통: `radius 16`, `padding 12px 16px`, `flex column; gap 8`. 화자 caption("지수"/"나", `ink-muted`) + 본문 `body` `ink`(`data-author="user"`, 글자 그대로).
     - 상대 카드 `.msg-them`: `surface` + `1px line`. "이번 주 금요일에 시간 돼?" / "새로 생긴 파스타집 가 보자!"
     - 내 카드 `.msg-me`: `accent-soft`, 테두리 없음. 아래에 칩(`align-self:flex-start`).
       - "응, 저녁에 괜찮아. 어디 가고 싶은 데 있어?" + Chip/Selected "✓ 영어로 쓸 말"(`aria-pressed="true"`)
       - "좋아ㅋㅋㅋ 일곱 시에 회사 앞에서 만나자." + Chip/Default "영어로 쓸 말"(`aria-pressed="false"`)
- `.bottom`(테두리 없음): 주 버튼 "이 내용으로 쓰기 시작"(→ write-conversation.html) + 보조 버튼 "말풍선 없이 한 편으로 쓰기"(→ write.html).
- AI가 번역이나 답을 채워 넣는 요소는 두지 않습니다. 강아지 장식도 없습니다.

### 5.24 기록 보기 (entry.html, Figma 34:3732)
- 상단 바: "‹ 홈"(→ home.html)만.
- 본문 `flex column; padding 8px 20px 24px; gap 20`:
  1. 머리(`flex column; gap 8; align-items:flex-start`): `h1.title` "9월 28일 월요일" + 출처 알약 "사진에서 시작".
  2. 원문 카드(§5.4): 라벨 → 사진 120 → d1 원문 `.ruled`(**밑줄·범례 없음**).
  3. 섹션(`flex column; gap 12`): `h2.section-title` "내가 고른 교정 기록" + 기록 카드 2개.
- 기록 카드 `.unit-record`: `surface`, `1px line`, `radius 16`, `padding 20`, `flex column; gap 12`. **선택 칩이 없는 기록이므로 `data-ui-role="correction-unit"`를 붙이지 않습니다**(S3는 선택이 있는 review.html의 Unit만 셉니다). `↓` 행도 없습니다(Figma).
  - 행: caption "내 표현" + `.diary` `ink`(user) / caption "자연스러운 표현" + `.diary` `accent`(ai suggestion) / caption "이유" + `body`(ai explanation) / 결과 `.body-strong` `ink`.
  - 1: "drink with" → "had drinks with" · 이유(§5.5 첫 번째와 같음) · "반영을 골랐어요 · 표현을 저장했어요"
  - 2: "company people" → "coworkers" · 이유(§5.5 두 번째와 같음) · "내 표현 유지를 골랐어요"
- 강아지 없음.

### 5.25 recall · recall-check 본문 (Figma 34:3458 · 34:3491)
- **recall.html**: 상단 바 "‹ 홈" · "10월 2일 금요일" · "자동 저장됨 · 오후 8:15". 본문 `flex column; padding 8px 20px 24px; gap 20`:
  1. 떠올려 쓰기 영역(`data-area="recall"`, `flex column; gap 12`): 사진(photo-drinks.jpg, 120) → caption "9월 28일의 기록에서" → 단서 `body` 16px 400 `ink`(`data-author="ai" data-content-role="cue"`) "회사 사람들과 저녁에 한잔했던 날이에요. 그때 하고 싶었던 말을 영어로 다시 써 볼까요?" → 라벨 "내 영어로 다시 쓰기" → 입력칸(6줄 224, `data-original-id="r1"`) "I had drinks with my coworkers. We talked about our team trip." → caption "62자".
  2. 잠금 카드(§5.8).
  - `.bottom`은 없습니다(주 버튼은 잠금 카드 안).
- **recall-check.html**: 상단 바 "‹ 떠올리기"(→ recall.html) · "10월 2일 금요일". 본문 `flex column; padding 8px 20px 24px; gap 20`:
  1. 머리(`gap 4`): `h1.title` "두 문장을 나란히 봐요" + `body` "방금 쓴 문장과 전에 쓴 내 표현을 함께 보여 줘요."
  2. 카드 "방금 쓴 문장"(`surface`, `1px line`, `radius 16`, `padding 20`, `gap 8`): 라벨 → `.ruled`(padding 0) r1 원문(`data-original-ref="r1"`) → caption "10월 2일 다시 씀".
  3. 카드 "전에 쓴 내 표현"(같은 모양): 라벨 → caption "9월 28일 기록 · 원문 그대로" → `.ruled` d1 원문(`data-original-ref="d1"`, 밑줄 없음) → caption "9월 28일에 저장한 표현" → `.diary` `accent` "have drinks with"(ai suggestion) → `.link` "9월 28일 기록 전체 보기"(→ entry.html).
  4. 전이 단서 영역(`data-area="transfer-cue"`, `flex column; gap 12`): `h2.section-title` "다른 상황에서도 써 볼까요?" → 단서 `body`(`data-author="ai" data-content-role="cue"`) "지난 토요일, 오랜만에 대학 친구들과 저녁에 한잔했다고 가정해 봐요. 그 일을 영어로 한 문장 써 봐요." → 라벨 "내 영어로 쓰기" → 입력칸(3줄 128, `data-original-id="t1"`) "I had drinks with my old friends last Saturday." → caption "47자".
  - `.bottom`(테두리 없음): 주 버튼 "기록하고 홈으로"(→ home.html).
  - 판정 표시('정답'·'오답'·체크·점수)와 강아지는 두지 않습니다.

## 6. `data-area` 영역 이름

S1(AI 대필 금지) 검사 대상 영역입니다. 아래 이름만 씁니다.

| `data-area` | 붙는 곳 | 화면 | 안에 둘 수 있는 AI 텍스트 |
|---|---|---|---|
| `write` | 영어 직접 작성 영역 (메타 줄 + 사진 + 질문 + 입력칸 / 말풍선 + 입력칸 전체) | write.html, write-conversation.html | `question` (write.html만; 대화 화면에는 AI 텍스트 없음) |
| `comeback` | Memory Comeback Card 전체 | home.html | `cue` |
| `recall` | 떠올려 쓰기 영역 (사진 + 날짜 + 한국어 단서 + 입력칸 + 글자 수) | recall.html | `cue`, `question` |
| `transfer-cue` | 전이 단서 영역 (제목 + 다른 상황 + 입력칸) | recall-check.html | `cue`, `question` |

- 위 4개 영역 안에는 `data-content-role`이 `completed_answer`, `diary_body`, `model_answer`인 요소가 하나도 없어야 합니다.
- 회상·전이 영역의 `cue`·`question`에도 정답이 되는 영어 표현을 넣지 않습니다.
- recall.html 잠금 카드와 recall-check.html의 "전에 쓴 내 표현" 카드는 `recall`·`transfer-cue` 영역 **밖**에 둡니다. 상단 바·맥락 띠·`.bottom`은 `write` 영역 밖에 둡니다.

## 7. 메타데이터 적용 (가이드 3·7·8·17절)

- 화면 루트: `<main data-screen="…" data-author="system" aria-label="…">`.
- 사용자 글(원문, 입력, 캡처에서 읽은 말과 상대 이름, 다시 쓴 표현, 사용자 원문에서 고른 구)에는 `data-author="user"`를 붙입니다.
- AI 글에는 반드시 `data-author="ai"`와 `data-content-role`을 함께 붙입니다. 역할은 `question`, `cue`, `suggestion`, `explanation` 넷만 씁니다.
- 버튼 문구, 라벨, 화자 caption "나" 같은 시스템 UI는 루트의 `system`을 물려받습니다. 강아지·딤 이미지는 `alt=""` 장식이고, 사진은 의미 있는 `alt`를 가집니다.
- 원문 짝짓기 ID:

| ID | 원문 | `data-original-id` 위치 | `data-original-ref` 위치 |
|---|---|---|---|
| `d1` | `I drink with my company people yesterday. We talked a lot about our team trip. I'm looking forward to it.` | write.html 입력칸 | review.html 원문 카드, home.html 최근 기록, entry.html, recall-check.html, expression-journey.html(스스로 씀) |
| `c1` | `Yes, I'm okay at evening. Where do you want to go?` | write-conversation.html 입력칸 | — |
| `r1` | `I had drinks with my coworkers. We talked about our team trip.` | recall.html 입력칸 | recall-check.html |
| `t1` | `I had drinks with my old friends last Saturday.` | recall-check.html 전이 입력칸 | — |

- `data-original-ref`의 텍스트는 원본과 정확히 같아야 합니다. 밑줄은 `.mark`·`.reused` `<span>` 감싸기와 `text-decoration`으로만 하고, 글자·공백을 바꾸지 않습니다.
- 9월 14일 원문(`I walked along the river with my friend. I look forward to go camping this weekend.`)은 ID 없이 쓰되, 보여 주는 곳(home 기록 행, expression-journey)마다 글자를 똑같이 씁니다.

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
- **캐릭터(강아지)는 §5.22 규칙 안의 장식으로만 씁니다.** 감정 반응, 보상, 칭찬, 독촉, 진행에 따른 변화, 대사를 주지 않습니다. 성취·판정 자리(Reuse Notice, Expression Journey, 교정 결과, 저장 시트, recall-check)와 §5.22 목록 밖의 위치에는 두지 않습니다(PRD 7 해석, 사용자 결정).
- 감정 이모지, 축하 연출은 쓰지 않습니다. 기능 기호는 `✓`, `‹`, `↓`만 글자로 쓰고, 그 밖의 아이콘은 §5.13 선 아이콘만 씁니다.
- 줄노트 말고는 그라데이션을 쓰지 않습니다. 반투명·그림자·흐림을 쓰지 않습니다(딤은 이미지로만).
- 빨간색, 취소선, "틀림"·"오답", 교정본 전체 전환 토글을 쓰지 않습니다.
- 공개 피드, 공유, 순위, 업셀을 넣지 않습니다.
- 대화 화면에 AI 답변 도움 버튼과 질문 알약을 두지 않습니다(R15, Figma).
- 전이 단서를 보고 쓴 답을 Reuse로 표시하지 않습니다.
- 교정 요약에 개수나 점수를 쓰지 않습니다.
- 회색 사진 자리표시(`.photo-ph`)를 쓰지 않고 실제 사진 `<img>`를 씁니다.

사람 확인 항목 (rule-builder `service.human_checks` 제안):

- 성인 톤: 전체 인상이 조용한 기록장이고 아동용·게임형 캐릭터 앱처럼 보이지 않는지
- 강아지 장식이 §5.22의 6곳에만 있고(recall은 head-curious 40), 감정 반응·보상·칭찬·독촉·진행 변화·대사가 없으며, 성취·판정 자리에 없는지
- 질문 말풍선 알약이 강아지의 대사처럼 보이지 않고(꼬리·화자 없음), 질문 하나만 있고 예문이 없는지
- 줄노트 가로줄이 글자 줄과 맞고 획·밑줄을 가로지르지 않는지, 토큰 색으로만 그려졌는지(B4는 background-image를 세지 않음)
- 원문 밑줄이 Figma대로 `ink` 실선(drink with, company people)·점선(looking forward to)이고, 배경 표시가 없는지(text-decoration 색은 B4가 세지 않음)
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
- 사진(photo-drinks.jpg · photo-river.jpg)이 Figma와 같은 자리·크기·자르기(object-fit: cover)로 보이고, alt가 의미 있는지
- 화면 문구가 §10의 Figma 노드 문구와 같은지

## 9. 화면 목록과 패턴

`2-concept/screen-structure.md`의 12개 화면에 상태 화면 2개를 더해 14개를 `3-design/screens/`에 만듭니다. 흐름 표는 바꾸지 않습니다. 각 화면의 세부 값과 문구는 §5와 Figma(§10)를 따릅니다.

| 화면 | `data-screen` | 핵심 패턴 (위→아래) | `data-area` |
|---|---|---|---|
| home.html | `home` | 머리(날짜 · "다시 만나서 반가워요" + puppy-wave 72) · Comeback Card(`accent-soft`, 사진 180, 버튼 하나 → recall) · 주 버튼 "오늘 기록하기"(→ start-sheet) + caption "사진 · 대화 캡처 · 텍스트 스캔 · 바로 쓰기 중에서 골라 시작해요" · "최근 기록" + 기록 행 2개(→ entry) · 탭바 | `comeback` |
| start-sheet.html | `start-sheet` | 딤 Home 이미지(`.backdrop` → home) · 시트: puppy-head-curious 44 + "무엇으로 시작할까요?" + 닫기 · 선택지 행 4개(높이 80, 아이콘 칸 40) | — |
| capture-confirm.html | `capture-confirm` | §5.23 | — |
| write.html | `write` | 상단 바("‹ 홈" · 날짜 · 자동 저장) · 출처 알약 "사진으로 시작" + 나만 보기 · 사진 180 · 질문(puppy-head-calm 56 + 알약 + 한국어 뜻 + '다른 질문') · 입력칸 d1 + "105자" · `.bottom.with-line`(도구 줄 + 주 버튼 → review) | `write` |
| write-conversation.html | `write-conversation` | §5.15: 상단 바 · sticky 맥락 띠 · 말풍선 4개 + 입력칸 c1 하나 · 주 버튼 → review | `write` |
| review-pending.html *(상태)* | `review-pending` | 상단 바 없음 · puppy-walk 120 · "일기 저장 중" / "문장을 살펴보고 있어요" · 링크 "교정 보기로 넘어가기" → review | — |
| review.html | `review` | 상단 바("‹ 쓰기" · 날짜) · "교정 보기" + "다듬어 볼 수 있는 표현을 제안해요. 반영할지는 직접 골라요." · 원문 카드(사진 120 + 밑줄 원문 + 범례) · Reuse Notice(`accent-soft`) · "교정 제안" Unit 2개 · `.bottom`("다시 쓸 표현 저장하기" → save-expression, "저장 없이 마치기" → home). 강아지 없음 | — |
| save-expression.html | `save-expression` | 딤 Review 이미지(`.backdrop` → review) · 시트 "다시 쓸 표현 저장" + 닫기 · 칩 4개(선택 없음) · 주 버튼 "고른 표현 저장하기" → home. 강아지 없음 | — |
| recall.html | `recall` | §5.25: 사진 120 · 날짜 · 단서(body 16) · 입력칸 r1 + "62자" · 잠금 카드(puppy-head-curious 40 + 막대 + 주 버튼 → recall-check) | `recall` |
| recall-check.html | `recall-check` | §5.25: 제목 · 방금 쓴 문장(r1) · 전에 쓴 내 표현(d1 + 저장한 표현 + 링크 → entry) · 전이 단서(t1) · 주 버튼 "기록하고 홈으로" → home. 강아지 없음 | `transfer-cue` |
| entry.html | `entry` | §5.24: 상단 바 · "9월 28일 월요일" + 출처 알약 · 원문 카드(밑줄 없음) · "내가 고른 교정 기록" 2개. 강아지 없음 | — |
| my-english.html | `my-english` | §5.17: "My English" · 검색 바 · 분할 탭 · "최신순" · 그룹 2개(카드 3개) · 탭바 | — |
| my-english-empty.html *(상태)* | `my-english-empty` | my-english와 같은 머리·컨트롤 + 빈 상태 카드(puppy-sit 96 + 한 문장) · 탭바 | — |
| expression-journey.html | `expression-journey` | §5.18: 상단 바(→ my-english) · 표현 제목 · 타임라인 4단계. 강아지 없음 | — |

- 날짜 예시: 9월 14일 처음 씀·교정 → 9월 21일 떠올림 → 9월 28일 `d1`에서 스스로 씀 → 10월 2일 `r1`·`t1`, 지수와의 대화 캡처.
- F1~F12를 모두 `<a href>`로 잇습니다. write·write-conversation의 주 버튼은 review.html로 바로 연결합니다(F2·F5). capture-confirm은 주 버튼으로 write-conversation, 보조 버튼으로 write에 연결합니다(F4·F7). 상태 화면 2개는 흐름 밖에 따로 두지만, 같은 Gate 규칙을 지킵니다.
- 정적 화면 하나에는 상태 하나만 그립니다. recall.html은 다 쓴 뒤 상태, my-english.html은 목록이 있는 상태입니다.

## 10. Figma 대응표

파일 `cPEb0XbsRiQONO0Sjr1oZJ`, 페이지 "Mockups (design v2)". 사양 덤프: `.harness-inbox/figma-v2-spec.txt`.

| 화면 파일 | Figma 노드 | Figma 프레임 크기 | 비고 |
|---|---|---|---|
| home.html | `31:3433` | 390×1157 | Home · 회상 카드 + 강아지 |
| start-sheet.html | `31:3472` | 390×844 (시트 358×426) | 뒤 = start-sheet-backdrop.png |
| write.html | `31:3514` | 390×980 | Write · 말풍선 질문 |
| write-conversation.html | `31:3559` | 390×844 | Write · 대화 캡처 |
| capture-confirm.html | `53:3473` | 390×1044 | Capture Confirm |
| review-pending.html | `33:3446` | 390×844 | 상단 바 없음 |
| review.html | `33:3454` | 390×1772 | Review |
| save-expression.html | `33:3520` | 시트 358×360 | 뒤 = save-sheet-backdrop.png |
| recall.html | `34:3458` | 390×870 | Recall |
| recall-check.html | `34:3491` | 390×1122 | Recall check |
| my-english.html | `34:3639` | 390×844 | My English |
| my-english-empty.html | `34:3673` | 390×844 | My English 빈 상태 |
| expression-journey.html | `34:3697` | 390×844 | Expression Journey |
| entry.html | `34:3732` | 390×1248 | Entry |

- Figma와 이 문서가 다르게 보이면 Figma가 기준입니다. 단, §4 "Figma 값 중 허용 목록 밖의 값" 표의 대응 값과 §3 폰트 대체는 판정 규칙 때문에 이 문서를 따릅니다.
