# 화면 구조 — 영어가 내 것이 되는 일기

## 목적

영어를 여러 번 다시 시작해 온 성인이 자기 하루(사진·대화 캡처·손글씨)를 소재로 영어를 직접 쓰고(EXPRESS), 원문을 지키는 교정 가운데 반영할 것을 스스로 고르고(CORRECT), 과거 경험을 단서로 표현을 다시 떠올리고(RECALL), 새 일기에서 힌트 없이 다시 쓰기(REUSE)까지 이어지는 흐름을 MVP 화면으로 설계합니다. 스트릭·점수·진행률·독촉 없이, 쉬었다 돌아와도 바로 이어 쓸 수 있는 차분한 개인 기록장 구조로 만듭니다(PRD 3, 6, references.md 리서치 기준).

## 화면 목록

| 화면 | 파일 | PRD 근거 | 키스크린 |
|---|---|---|---|
| Home (Memory Comeback Card · 주 행동 '오늘 기록하기' 하나 · 최근 기록) | home.html | PRD 5 Home, 4 시나리오 C-1~2, 6.3 · RP-1, RP-5 | 예 |
| 기록 시작 시트 (사진 / 대화 캡처 / 텍스트 스캔 / 바로 쓰기를 텍스트 라벨과 아이콘 쌍으로 세로 배치, 업셀 없음) | start-sheet.html | PRD 3 MY LIFE, 5 Home(기록 시작 시 선택), 4 시나리오 A-1 · B-1 · RP-1 | 아니오 |
| 기록 인식 확인 (대화 캡처·텍스트 스캔 OCR 결과에서 쓸 부분과 대화 상대 확인) | capture-confirm.html | PRD 3 MY LIFE(대화 캡처·손글씨/OCR), 4 시나리오 B-2 · RP-3 | 아니오 |
| Write (사진 + AI 질문 하나와 '다른 질문' + 영어 직접 작성 + 글자 수 + 자동 저장 텍스트 + '나만 보기' 표시) | write.html | PRD 3 EXPRESS, 5 Write, 4 시나리오 A-2 · D-1, 6.5 · RP-2, RP-8 | 예 |
| Write — Conversation UI (상단 고정 맥락 띠: 누구와의 대화인지·캡처 날짜, 말풍선마다 내 영어 입력칸, 자동 저장 텍스트, AI 답변 도움 버튼 없음) | write-conversation.html | PRD 4 시나리오 B-2~3, 5 Write(Conversation UI), 6.5 · RP-3, RP-8 | 아니오 |
| Review (원문 본문 보존 · 수정 단위 카드 '내 표현 → 자연스러운 표현 → 이유' · [반영]/[내 표현 유지] · Reuse Notice · 진입 직후 '일기 저장 중 / 교정을 준비하고 있어요' 두 줄 대기 상태) | review.html | PRD 3 CORRECT · REUSE, 5 Review, 4 시나리오 A-3 · B-4 · D-2~3, 6.1, 6.2 · RP-4, RP-8 | 예 |
| 추적 표현 저장 시트 (원문에서 구 단위 표현 고르기) | save-expression.html | PRD 3 CORRECT(추적 표현 저장), 5 Review, 4 시나리오 A-4 · B-4 | 아니오 |
| 떠올리기 (과거 사진 + 한국어 단서 + 영어 직접 작성 + 가려 둔 '이전 내 표현' 영역, 다시 쓰기 전에는 열 수 없음) | recall.html | PRD 3 RECALL, 4 시나리오 C-3, 6.5 · RP-5 | 아니오 |
| 떠올린 뒤 확인 (사용자가 눌러서 연 이전 내 표현과 방금 쓴 문장을 나란히, 정답·오답·점수 문구 없음, 필요하면 한국어 전이 단서) | recall-check.html | PRD 3 RECALL(점수 없음·전이 단서), 4 시나리오 C-4 · RP-5 | 아니오 |
| 기록 보기 (지난 일기 원문과 선택한 교정 기록) | entry.html | PRD 5 Home(최근 기록), 6.1 원문 보존 | 아니오 |
| My English (검색 바 · 최신순 · '저장한 표현 / 스스로 다시 쓴 표현' 구분 · 날짜 그룹 헤더 · 구 단위 표현 카드 · 빈 상태 한 문장 안내, 진행률·퍼센트·랭킹 없음) | my-english.html | PRD 5 My English, 3 REUSE, 6.4, 7 · RP-7 | 아니오 |
| Expression Journey (세로 타임라인: 처음 씀 → 교정 → 떠올림 → 스스로 씀, 단계마다 날짜와 원문 발췌, 경과 시간·간격 수치 없음) | expression-journey.html | PRD 5 My English(Expression Journey), 3 REUSE, 4 시나리오 D-4, 6.4 · RP-6 | 아니오 |

## PRD 사용자 흐름

| 흐름 | PRD 단계 | 지나가는 화면 |
|---|---|---|
| F1 | 시나리오 A-1 사진을 골라 일기 시작 | home.html → start-sheet.html → write.html |
| F2 | 시나리오 A-2~3 AI 질문을 참고해 직접 쓰고, 교정 제안과 이유를 확인한 뒤 반영 여부 선택 | write.html → review.html |
| F3 | 시나리오 A-4 교정 후 추적 표현 저장 | review.html → save-expression.html → home.html |
| F4 | 시나리오 B-1~2 대화 캡처 선택, OCR 결과와 대화 상대 확인 후 말풍선 작성 UI | home.html → start-sheet.html → capture-confirm.html → write-conversation.html |
| F5 | 시나리오 B-3~4 각 말을 영어로 직접 쓰고, 작성한 영어만 교정받고 표현 저장 | write-conversation.html → review.html → save-expression.html |
| F6 | 기록 없이 바로 쓰기 (MY LIFE 네 번째 입구) | start-sheet.html → write.html |
| F7 | 손글씨를 텍스트 스캔(OCR)으로 읽어 시작 | start-sheet.html → capture-confirm.html → write.html |
| F8 | 시나리오 C-1~3 돌아온 사용자가 Home의 Memory Comeback Card에서 떠올려 쓰기 | home.html → recall.html |
| F9 | 시나리오 C-4 다시 쓴 뒤 직접 눌러 이전 표현 확인(점수 없음), 필요하면 전이 단서로 다른 상황에 적용 | recall.html → recall-check.html → home.html |
| F10 | 시나리오 D-1~3 새 일기에서 힌트 없이 다시 쓰고 Review에서 Reuse Notice 확인 | home.html → start-sheet.html → write.html → review.html |
| F11 | 시나리오 D-4 해당 표현의 Expression Journey 확인 | review.html → expression-journey.html, home.html → my-english.html → expression-journey.html |
| F12 | 최근 기록 다시 보기 | home.html → entry.html |

## 키스크린 선정 이유

키스크린 3개(home·write·review, 기존과 같은 파일 이름)는 PRD 8의 차별화 포인트와 6의 원칙이 가장 많이 모이고, 새 리서치의 반영 요소가 가장 많이 걸리는 화면으로 골랐습니다.

1. **home.html (10월 2일, 돌아온 사용자)** — Memory Comeback과 Pause Is Not Failure가 처음 보이는 화면입니다.
   - Memory Comeback Card는 과거 사진, 날짜, 한국어 단서, 시작 버튼 하나로만 구성합니다(RP-5, R10). '지금은 넘기기' 같은 두 번째 버튼, 개수 할당, 정답 영어는 두지 않습니다. 카드 아래 한 줄로 '전에 쓴 내 표현은 다시 쓴 뒤에 열어 볼 수 있다'는 점을 미리 알려 줍니다(RP-5, R11).
   - 화면에서 채워진 주 버튼은 '오늘 기록하기' 하나뿐입니다(RP-1, R1). 누르면 기록 시작 시트로 가서 사진 / 대화 캡처 / 텍스트 스캔 / 바로 쓰기를 텍스트 라벨과 아이콘 쌍으로 고릅니다(R9).
   - 스트릭, 남은 시간, 월간 캘린더는 두지 않습니다(R1 피할 것). 인사는 쉰 기간을 말하지 않습니다.
   - 최근 기록은 날짜, 썸네일, 원문 그대로의 미리보기로 보여 주고 원문 d1을 `data-original-ref`로 짝짓습니다(PRD 6.1).
2. **write.html (9월 28일, 시나리오 A)** — Life as Material과 AI 대필 금지를 검증하는 화면입니다.
   - 위쪽에는 사진, AI 질문 하나(`question`), '다른 질문' 교체 버튼만 둡니다. 예문이나 모범 문장은 넣지 않습니다(RP-2, R6·R2).
   - 넓은 입력 영역 아래에 글자 수만 보여 줍니다. 최소 글자 수로 막는 툴팁은 두지 않습니다(R2 피할 것).
   - 상단에 '자동 저장됨 · 오후 9:12' 짧은 상태 텍스트와 '나만 보기' 표시를 둡니다. '나가면 저장되지 않아요' 경고는 없습니다(RP-8, R8·R5).
   - 텍스트 스캔·사진 바꾸기는 보조 진입점으로 하단 도구 줄에 둡니다(R2·R8). 작성 중에는 추적 표현 힌트를 보여 주지 않습니다.
   - 사용자 원문에 `data-original-id="d1"`을 붙였습니다.
3. **review.html (9월 28일, 시나리오 A + D)** — 원문 보존, 사용자 선택권, Reuse Detection이 한 화면에 모이는 핵심 화면입니다.
   - 사진과 원문 본문을 한 카드에 그대로 둡니다(R3). 수정 위치는 색과 함께 실선 밑줄로, 스스로 다시 쓴 표현은 점선 밑줄과 텍스트 범례로 표시합니다. 취소선이나 '교정된 일기' 전체 전환 토글은 두지 않습니다(RP-4).
   - AI 제안은 '교정 제안' 영역으로 본문과 분리합니다(R7). 수정 하나당 카드 하나로 '내 표현 → 자연스러운 표현 → 이유'를 보여 주고, [반영]/[내 표현 유지] 중 기본값은 내 표현 유지입니다(RP-4, PRD 6.2).
   - 9월 14일에 배운 looking forward to를 힌트 없이 다시 쓴 사실을 Reuse Notice에 날짜와 함께 알리고, Expression Journey로 연결합니다(PRD 4 시나리오 D). 축하 연출이나 공개 피드 게시 버튼은 없습니다.

키스크린에 넣지 않은 반영 요소의 배치는 다음과 같습니다. 이 화면들은 위 3개 화면의 패턴(질문만 주는 작성 영역, 원문 보존, 사실과 날짜로 보여 주는 기록)을 따르므로 3 디자인 단계에서 전체 화면으로 만듭니다.
- **RP-3 (write-conversation.html)**: 상단 고정 띠에 '지수와의 대화 · 10월 2일 카카오톡 캡처'처럼 누구와 나눈 대화인지 한 줄로 보여 줍니다. 상대 말풍선은 OCR로 읽은 원래 말을 그대로 두고, 내 말풍선마다 영어 입력칸을 둡니다. '답변을 도와주세요' 같은 AI 답변 버튼은 두지 않습니다.
- **RP-5 (recall.html → recall-check.html)**: recall.html의 '전에 쓴 내 표현' 영역은 흐리게 가려 두고, 사용자가 영어로 다시 쓰기 전에는 여는 버튼을 비활성으로 둡니다. 다 쓴 뒤 사용자가 직접 눌러야 recall-check.html에서 열립니다. '정답'·'오답' 같은 판정 문구와 체크 표시는 쓰지 않습니다.
- **RP-6 (expression-journey.html)**: 세로선 하나로 네 단계를 잇고, 단계마다 날짜와 원문 발췌만 보여 줍니다. 'n일 경과' 같은 간격 수치는 없습니다.
- **RP-7 (my-english.html)**: 상단 검색 바, '최신순' 정렬, '저장한 표현 / 스스로 다시 쓴 표현' 구분, '10월 2일' 같은 날짜 그룹 헤더, 구 단위 표현 한 줄 카드(누르면 Expression Journey)로 구성합니다. 진행률·퍼센트·랭킹은 쓰지 않습니다. 빈 상태는 '교정 보기에서 다시 써 보고 싶은 표현을 저장하면 여기에 모여요' 한 문장만 보여 줍니다.
- **RP-8 (write-conversation.html, review.html 진입)**: Conversation UI에도 Write와 같은 자동 저장 텍스트를 둡니다. Review로 넘어가는 동안에는 '일기 저장 중 / 교정을 준비하고 있어요' 두 줄 텍스트만 보여 줍니다. 캐릭터 그림이나 '나가면 저장되지 않아요' 경고는 두지 않습니다.
