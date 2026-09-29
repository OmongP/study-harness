# 화면 구조 — 영어가 내 것이 되는 일기

## 목적

영어를 여러 번 다시 시작해온 성인이 자신의 실제 하루(사진·대화 캡처·손글씨)를 소재로 영어를 직접 쓰고(EXPRESS), 원문을 지키는 교정을 스스로 골라 받고(CORRECT), 과거 경험을 단서로 다시 떠올리고(RECALL), 새 일기에서 힌트 없이 다시 쓸 때(REUSE)까지 이어지는 흐름을 MVP 화면으로 설계한다. 스트릭·점수·진행률 없이, 쉬었다 돌아와도 이어지는 구조로 만든다 (PRD 3, 6).

## 화면 목록

| 화면 | 파일 | PRD 근거 | 키스크린 |
|---|---|---|---|
| Home (오늘 기록하기 · Memory Comeback Card · 최근 기록) | home.html | PRD 5 Home, 4 시나리오 C-1~2, 6.3 중단 존중 | 예 |
| 기록 시작 시트 (사진 / 대화 캡처 / 손글씨 OCR / 바로 쓰기) | start-sheet.html | PRD 3 MY LIFE, 5 Home(기록 시작 시 선택), 4 시나리오 A-1 · B-1 | 아니오 |
| 기록 인식 확인 (대화 캡처·손글씨 OCR 결과에서 쓸 부분 고르기) | capture-confirm.html | PRD 3 MY LIFE(대화 캡처·손글씨/OCR), 4 시나리오 B-2 | 아니오 |
| Write (소재·질문 + 영어 직접 작성 + 자동 저장) | write.html | PRD 3 EXPRESS, 5 Write, 4 시나리오 A-2 · D-1, 6.5 AI 대필 금지 | 예 |
| Write — Conversation UI (말풍선마다 영어 입력칸) | write-conversation.html | PRD 4 시나리오 B-2~3, 5 Write(Conversation UI), 6.5 | 아니오 |
| Review (원문 보존 · 교정 제안과 이유 · 반영/내 표현 유지 · Reuse Notice) | review.html | PRD 3 CORRECT · REUSE, 5 Review, 4 시나리오 A-3 · B-4 · D-2~3, 6.1, 6.2 | 예 |
| 추적 표현 저장 시트 | save-expression.html | PRD 3 CORRECT(추적 표현 저장), 5 Review, 4 시나리오 A-4 · B-4 | 아니오 |
| 떠올리기 (과거 사진 + 한국어 단서 + 영어 직접 작성) | recall.html | PRD 3 RECALL, 4 시나리오 C-3, 6.5 | 아니오 |
| 떠올린 뒤 확인 (내가 전에 쓴 표현 확인 + 전이 단서) | recall-check.html | PRD 3 RECALL(점수 없음·전이 단서), 4 시나리오 C-4 | 아니오 |
| 기록 보기 (지난 일기 원문과 교정 기록) | entry.html | PRD 5 Home(최근 기록), 6.1 원문 보존 | 아니오 |
| My English (저장한 표현 · 스스로 다시 사용한 표현) | my-english.html | PRD 5 My English, 3 REUSE, 6.4 | 아니오 |
| Expression Journey (처음 씀 → 교정 → 떠올림 → 스스로 씀, 날짜와 근거) | expression-journey.html | PRD 5 My English(Expression Journey), 3 REUSE, 4 시나리오 D-4, 6.4 | 아니오 |

## PRD 사용자 흐름

| 흐름 | PRD 단계 | 지나가는 화면 |
|---|---|---|
| F1 | 시나리오 A-1 사진 선택으로 일기 시작 | home.html → start-sheet.html → write.html |
| F2 | 시나리오 A-2~3 AI 질문을 참고해 직접 쓰고 교정 제안·이유 확인, 반영 여부 선택 | write.html → review.html |
| F3 | 시나리오 A-4 교정 후 추적 표현 저장 | review.html → save-expression.html → home.html |
| F4 | 시나리오 B-1~2 대화 캡처 선택, OCR 결과 확인 후 말풍선 작성 UI | home.html → start-sheet.html → capture-confirm.html → write-conversation.html |
| F5 | 시나리오 B-3~4 각 말을 영어로 직접 쓰고 작성한 영어만 교정, 표현 저장 | write-conversation.html → review.html → save-expression.html |
| F6 | 기록 없이 바로 쓰기 (MY LIFE 4번째 입구) | start-sheet.html → write.html |
| F7 | 손글씨/OCR로 시작 | start-sheet.html → capture-confirm.html → write.html |
| F8 | 시나리오 C-1~3 돌아온 사용자가 Home의 Memory Comeback Card에서 떠올려 쓰기 | home.html → recall.html |
| F9 | 시나리오 C-4 점수 없이 이전 표현 확인, 필요하면 전이 단서로 다른 상황에 적용 | recall.html → recall-check.html → home.html |
| F10 | 시나리오 D-1~3 새 일기에서 힌트 없이 다시 쓰고 Review에서 Reuse Notice 확인 | home.html → start-sheet.html → write.html → review.html |
| F11 | 시나리오 D-4 해당 표현의 Expression Journey 확인 | review.html → expression-journey.html, home.html → my-english.html → expression-journey.html |
| F12 | 최근 기록 다시 보기 | home.html → entry.html |

## 키스크린 선정 이유

키스크린 3개는 PRD 8의 차별화 포인트와 6의 절대 원칙이 가장 많이 모이는 화면으로 골랐다.

1. **home.html (10월 2일, 돌아온 사용자)** — Memory Comeback과 Pause Is Not Failure가 처음 보이는 화면이다. 앱을 연 시점에 과거 사진, 날짜, 한국어 단서가 담긴 카드 하나만 보여준다(RP-5). 정답 영어, 남은 개수, 공백 일수, 스트릭은 넣지 않았다. 오늘 기록하기는 기록 시작 시트로 들어간다(RP-1). 최근 기록은 날짜, 사진 썸네일, 원문 그대로의 미리보기로 보여준다(R1, PRD 6.1). 인사는 "다시 만나서 반가워요"로, 쉬었던 기간을 말하지 않는다.
2. **write.html (9월 28일, 시나리오 A)** — Life as Material과 AI 대필 금지를 검증하는 화면이다. 사진과 AI 영어 질문을 위에 두고 넓은 영어 입력칸을 아래에 두며, 자동 저장한다(RP-2). AI는 질문(`question`)만 제공하고 예시 문장이나 완성 답은 두지 않는다. 작성 중에는 추적 표현 힌트를 보여주지 않는다. 사용자 원문에 `data-original-id="d1"`을 붙여 Review·Home과 원문 동일성을 검사할 수 있게 했다.
3. **review.html (9월 28일, 시나리오 A + D)** — 원문 보존, 사용자 선택권, Reuse Detection이 한 화면에 모이는 핵심 화면이다.
   - 원문은 지우거나 대체하지 않고 밑줄로만 표시한다. 실선은 다듬어 볼 표현, 점선은 스스로 다시 쓴 표현이다. 취소선은 쓰지 않는다(RP-4, R7 변형).
   - 수정 하나당 카드 하나로 "내 표현 → 자연스러운 표현 → 이유"를 보여준다. [반영]과 [내 표현 유지]를 따로 고르며, 기본값은 내 표현 유지다(RP-4, R6). 일괄 반영, 점수, 전체 Rewrite 버튼은 두지 않았다.
   - 9월 14일에 배운 looking forward to를 힌트 없이 다시 쓴 사실을 Reuse Notice로 날짜와 함께 알려준다. 이 표현의 Expression Journey로 연결된다(PRD 4 시나리오 D).

Conversation UI(RP-3)와 My English·Expression Journey(RP-6)는 원칙상 위 3개 화면의 패턴(질문만 제공하는 작성 영역, 원문 보존, 사실과 날짜로 보여주는 기록)을 그대로 따르므로 3 디자인 단계의 전체 화면에서 만든다.
