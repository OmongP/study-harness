# 프로토타입 흐름 — 영어가 내 것이 되는 일기

| 흐름 | PRD 흐름 단계 | 연결 |
|---|---|---|
| F1 | (F1) 시나리오 A-1 홈에서 오늘 기록하기로 기록 시작 시트 열기 | home.html → start-sheet.html |
| F2 | (F1) 시나리오 A-1 사진을 골라 일기 시작 | start-sheet.html → write.html |
| F3 | (F2) 시나리오 A-2~3 AI 질문을 참고해 직접 쓰고 교정 제안과 이유 확인 | write.html → review.html |
| F4 | (F3) 시나리오 A-4 교정 후 추적 표현 저장 시트 열기 | review.html → save-expression.html |
| F5 | (F3) 시나리오 A-4 고른 표현 저장 후 홈으로 | save-expression.html → home.html |
| F6 | (F4) 시나리오 B-1 홈에서 기록 시작 시트 열기 | home.html → start-sheet.html |
| F7 | (F4) 시나리오 B-1~2 대화 캡처 선택 후 OCR 결과와 대화 상대 확인 | start-sheet.html → capture-confirm.html |
| F8 | (F4) 시나리오 B-2 확인한 내용으로 말풍선 작성 UI 시작 | capture-confirm.html → write-conversation.html |
| F9 | (F5) 시나리오 B-3~4 각 말을 영어로 직접 쓰고 작성한 영어만 교정받기 | write-conversation.html → review.html |
| F10 | (F5) 시나리오 B-4 교정 후 표현 저장 | review.html → save-expression.html |
| F11 | (F6) 기록 없이 바로 쓰기 (MY LIFE 네 번째 입구) | start-sheet.html → write.html |
| F12 | (F7) 손글씨를 텍스트 스캔(OCR)으로 읽어 확인 | start-sheet.html → capture-confirm.html |
| F13 | (F7) 읽어 온 손글씨로 한 편 쓰기 시작 | capture-confirm.html → write.html |
| F14 | (F8) 시나리오 C-1~3 돌아온 사용자가 Memory Comeback Card에서 떠올려 쓰기 | home.html → recall.html |
| F15 | (F9) 시나리오 C-4 다시 쓴 뒤 직접 눌러 이전 표현 확인(점수 없음) | recall.html → recall-check.html |
| F16 | (F9) 시나리오 C-4 전이 단서 확인 후 기록하고 홈으로 | recall-check.html → home.html |
| F17 | (F10) 시나리오 D-1 새 일기를 위해 기록 시작 시트 열기 | home.html → start-sheet.html |
| F18 | (F10) 시나리오 D-1 사진으로 새 일기 시작 | start-sheet.html → write.html |
| F19 | (F10) 시나리오 D-2~3 힌트 없이 다시 쓰고 Review에서 Reuse Notice 확인 | write.html → review.html |
| F20 | (F11) 시나리오 D-4 Reuse Notice에서 해당 표현의 Expression Journey 확인 | review.html → expression-journey.html |
| F21 | (F11) 시나리오 D-4 홈에서 My English 열기 | home.html → my-english.html |
| F22 | (F11) 시나리오 D-4 My English 표현 카드에서 Expression Journey 확인 | my-english.html → expression-journey.html |
| F23 | (F12) 최근 기록 다시 보기 | home.html → entry.html |
