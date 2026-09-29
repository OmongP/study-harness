# 프로토타입 흐름 — 영어가 내 것이 되는 일기

| 흐름 | PRD 흐름 단계 | 연결 |
|---|---|---|
| F1 | 시나리오 A-1 Home의 오늘 기록하기에서 기록 시작 선택 | home.html → start-sheet.html |
| F2 | 시나리오 A-1 사진을 골라 일기 시작 (바로 쓰기도 같은 연결) | start-sheet.html → write.html |
| F3 | 시나리오 A-2~3 AI 질문을 참고해 직접 쓰고 교정 제안·이유 확인, 반영 여부 선택 | write.html → review.html |
| F4 | 시나리오 A-4 교정 후 추적 표현 저장 | review.html → save-expression.html |
| F5 | 시나리오 A-4 표현 저장 후 Home으로 돌아감 | save-expression.html → home.html |
| F6 | 시나리오 B-1 대화 캡처 선택 (손글씨 OCR도 같은 연결) | start-sheet.html → capture-confirm.html |
| F7 | 시나리오 B-2 OCR로 읽은 대화를 확인하고 말풍선 작성 UI로 이동 | capture-confirm.html → write-conversation.html |
| F8 | 시나리오 B-3~4 각 말을 영어로 직접 쓰고 작성한 영어만 Review에서 교정 | write-conversation.html → review.html |
| F9 | MY LIFE 손글씨/OCR 인식 결과를 글 한 편으로 이어 쓰기 | capture-confirm.html → write.html |
| F10 | 시나리오 C-1~3 돌아온 사용자가 Memory Comeback Card에서 떠올려 쓰기 | home.html → recall.html |
| F11 | 시나리오 C-4 점수 없이 이전에 쓴 표현 확인, 필요하면 전이 단서 | recall.html → recall-check.html |
| F12 | 시나리오 C-4 확인을 마치고 Home으로 돌아감 | recall-check.html → home.html |
| F13 | 시나리오 D-3 Reuse Notice에서 해당 표현의 Expression Journey 확인 | review.html → expression-journey.html |
| F14 | 시나리오 D-4 My English 열기 | home.html → my-english.html |
| F15 | 시나리오 D-4 My English에서 표현의 Expression Journey 확인 | my-english.html → expression-journey.html |
| F16 | PRD 5 Home 최근 기록 다시 보기 (원문 보존) | home.html → entry.html |
