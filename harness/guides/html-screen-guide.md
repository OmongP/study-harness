# HTML 화면 구현 가이드

> 에이전트가 HTML 화면을 만들 때 따르는 구현 형식이다. 디자인 원칙은 `harness/design-base.md`와
> 실행별 `3-design/design.md`에, 판정 값은 `rules.yaml`에 있다. 이 가이드는 "어떻게 적는가"만 다룬다.
> 이 가이드의 식별 방식은 새 디자인 원칙이 아니라, 기존 Gate를 HTML에서 판정하기 위한 **구현 계약**이다.
> 판정 스크립트(`harness/scripts/verify.mjs`, `extract_html.mjs`)는 이 가이드와 같은 정의를 쓴다. 한쪽을 바꾸면 다른 쪽도 함께 바꾼다.
> 🚦 = 스크립트가 검사하는 항목. 괄호 안은 근거 (라운드 · Gate 번호).
> 승인: 2026-09-29 (1~5절 초안, 6~10절 a~e, 11~17절 f~l)

## 1. 파일 단위 (R8)

- 화면 1개 = HTML 파일 1개.
- 키스크린(`2-concept/keyscreens/`)과 전체 화면(`3-design/screens/`) 모두 같은 형식.

## 2. 🚦 화면 크기 (R5 B1, R8)

- 화면 프레임은 390×844.

## 3. 🚦 메타데이터 속성 (R5, R8)

기계 판정이 필요한 요소에 붙인다. Gate는 이 값을 센다.

| 속성 | 붙는 대상 | 값 |
|---|---|---|
| `data-author` | 모든 텍스트 요소 | `user` / `ai` / `system` |
| `data-content-role` | `data-author="ai"`인 텍스트 | `question` / `explanation` / `suggestion` / `cue` / `completed_answer` / `diary_body` / `model_answer` |
| `data-ui-role` | 시스템이 제공하는 UI 요소 | 예: `button`, `card`, `streak`, `score`, `level`, `progress_bar`, `badge`, `ranking`, `missed_day_count` |

- `data-content-role`이 없는 `data-author="ai"` 텍스트는 메타데이터 누락으로 실패한다 (R5).

## 4. 화면 연결 (R8)

- 프로토타입은 화면 HTML을 링크로 연결해, 브라우저에서 PRD 주요 흐름을 직접 눌러볼 수 있게 한다. 연결 방식은 10절을 따른다.

## 5. 판정 구조 (R8)

- 판정 스크립트는 HTML을 직접 보지 않고, 추출기가 만든 `elements.json`을 읽는다.
  위 속성이 빠지면 추출기가 값을 뽑을 수 없어 해당 Gate를 셀 수 없다.

## 6. 🚦 영역 표시 — `data-area` (R5 S1)

- Gate가 검사할 영역 컨테이너에 `data-area`를 붙인다.
  예: `data-area="write"`, `data-area="comeback"`, `data-area="transfer-cue"`
- S1(AI 대필 금지)은 rules.yaml에 지정된 영역 **내부만** 검사한다. 영역 밖의 요소는 S1 대상이 아니다.

```html
<section data-area="write">
  <p data-author="ai" data-content-role="question">Who did you have dinner with?</p>
  <textarea data-author="user"></textarea>
</section>
```

## 7. 🚦 원문 짝짓기 — `data-original-id` / `data-original-ref` (R5 S2)

- 사용자가 처음 쓴 원문 요소에 `data-original-id`를 붙인다.
- 그 원문을 다른 화면에서 다시 보여주는 요소에 같은 값으로 `data-original-ref`를 붙인다.
- S2는 같은 ID끼리 매칭해 텍스트가 **정확히 동일한지** 검사한다.

```html
<!-- write.html -->
<p data-author="user" data-original-id="d1">I drink with my company people yesterday.</p>
<!-- review.html -->
<p data-author="user" data-original-ref="d1">I drink with my company people yesterday.</p>
```

## 8. 🚦 선택지와 기본값 — `data-choice` / `data-default` (R5 S3)

- Correction Unit(`data-ui-role="correction-unit"`) 안의 선택지에 `data-choice="keep"` / `data-choice="apply"`를 붙인다.
- 기본 선택인 선택지에 `data-default="true"`를 붙인다.
- S3는 각 Correction Unit에서 `keep`이 기본 선택인지 검사한다.

```html
<div data-ui-role="correction-unit">
  <button data-choice="apply">반영</button>
  <button data-choice="keep" data-default="true">내 표현 유지</button>
</div>
```

## 9. 🚦 인터랙티브 요소 (R5 B6)

- B6(터치 영역 44×44)은 아래 요소를 인터랙티브로 센다.
  - 기본: `a`, `button`, `input`, `textarea`, `select`, `[role="button"]`
  - 커스텀: `[data-interactive="true"]` — 위 태그가 아닌데 누를 수 있는 요소에 붙인다.
- 실제 조작 대상이 아닌 요소는 B6 대상에서 제외한다: `disabled` 속성이 있거나 `aria-disabled="true"`인 요소.

## 10. 🚦 화면 연결 — 내부 링크 (R5 B8, R8)

- v1에서 화면 전환은 `<a href="다른화면.html">`로 표현한다. B8은 이 링크만 연결로 인정한다.
- JavaScript만으로 일어나는 화면 전환은 B8의 연결로 인정하지 않는다.
- 따라서 프로토타입의 주요 PRD 흐름은 반드시 검사 가능한 내부 링크로 연결한다.

## 11. 🚦 화면 루트 — `data-screen` (R5 B1)

- 화면 루트 요소에 `data-screen="화면이름"`을 붙인다. 파일마다 정확히 1개.
- B1은 이 루트의 렌더링 크기가 390×844인지 검사한다.

```html
<main data-screen="write">…</main>
```

## 12. 🚦 간격으로 세는 속성 (R5 B2)

- B2가 세는 간격: `padding` 4방향, `gap`(row-gap · column-gap).
- `margin`은 세지 않는다 (가운데 정렬 `auto`가 계산값으로 섞이기 때문).

## 13. 🚦 색으로 세는 속성 (R5 B4)

- `color`: 글자가 있는 요소만.
- `background-color`: 투명이 아닌 경우만.
- `border-color`: 테두리 두께가 0보다 큰 경우만.
- `<img>` 안의 색(사진 등 콘텐츠 이미지)은 세지 않는다.

## 14. 🚦 caption · label 역할 (R5 B5)

- 글자 크기로 역할을 판단한다: 16 미만 텍스트는 13(`caption`) 또는 14(`label`)만 허용하고, 그 외 크기는 위반.

## 15. 🚦 대비의 배경색 (R5 B7)

- 배경색은 투명하지 않은 가장 가까운 조상의 `background-color`로 본다.
- 사진 위에 놓인 글자는 `data-on-image="true"`를 붙인다. 이 요소는 B7 기계 판정에서 빼고, 검수 리포트의 사람 확인 항목으로 돌린다.

## 16. 🚦 흐름 목록 — `4-prototype/flows.md` (R4, R5 B8)

- B8이 읽는 흐름 목록은 `4-prototype/flows.md`의 표다. 행 형식:

```markdown
| F1 | PRD 흐름 단계 | 출발.html → 도착.html |
```

- B8은 행마다 출발 화면에 도착 화면으로 가는 `<a href>`(10절)가 있는지 검사한다.

## 17. 🚦 작성자 물려받기 — `data-author` (R5)

- 텍스트 요소의 작성자는 자신 또는 가장 가까운 조상의 `data-author`로 본다. 부모에게 물려받아도 된다.
- 자신과 조상 어디에도 `data-author`가 없는 텍스트는 메타데이터 누락이다.
