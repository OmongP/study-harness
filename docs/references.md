# references.md — UIbowl 경쟁사 레퍼런스 선별본 (S1·S2 산출물)

> 출처: UIbowl(uibowl.io) 검색 결과에서 Claude가 선별. 수집일 2026-09-29.
> 선별 기준: `docs/design.md`. 각 레퍼런스는 **가져올 것**과 **피할 것**을 같이 적는다. 가져올 것이 design.md 규칙과 부딪히면 design.md가 이긴다.
> 무드 태그 3종(레퍼런스당 1개): `손글씨/편안함` · `담백/정돈` · `기록/타임라인`
> ※ UIbowl 무료 등급은 검색당 3건만 보여줘서, 쿼리를 여러 번 나눠 모았다.

## 핵심 레퍼런스 — 하루냥 · 하이링구얼 (Omong 확정 2026-09-29)

키스크린(S4)은 이 두 앱을 1순위로 참고한다. 두 앱 모두 design.md와 부딪히는 요소가 있으므로 **구조와 흐름만 가져오고, 아래 "버릴 것"은 가져오지 않는다.**

### 하루냥 → Write 화면의 기준

| 가져올 것 | 버릴 것 (design.md 근거) |
|---|---|
| 날짜 제목 + 질문 한 줄을 작성 영역 위에 고정 (§5 Question Card: 질문은 작성 영역 위에 남아도 됨) | 고양이 캐릭터 (§9 Don't: 캐릭터·마스코트 금지, §4 Icon & Motion) |
| 질문 옆 새로고침으로 다른 질문 받기 (질문은 prompt 역할만, §8 AI Questions) | 감정 이모지 칩 `비` `화나` (§9 Don't: 이모지 일러스트) |
| 줄노트 가로줄이 있는 넓은 작성 카드 (§5 Diary Input: 옅은 가로줄 허용) | `0/1000` 글자 수 표시 (§5 Diary Input: 부담을 낮추는 방향) |
| 하단 툴바에 사진·임시저장만 두는 단순한 구성 (§5 Diary Input: 자동 저장 허용) | "하루냥의 편지": AI가 감정 답장을 대신 써 줌 + 이모지 (§1 차분한 성인 톤, §9 Don't) |

### 하이링구얼 → Review · Home 화면의 기준

| 가져올 것 | 버릴 것 (design.md 근거) |
|---|---|
| 사진(위) + 내가 쓴 일기 원문(아래)을 한 카드에 담는 Review (§5 Correction Unit: 원문 보존) | 교정 부분을 주황 **글자색**으로 칠함 (§2 Color Principles, §5 Correction Unit: AI 제안이 원문보다 강해 보이면 안 됨) |
| 원문 아래 "주요 피드백" 목록: 내 문장(`me`)부터 보여주고 제안을 이어 붙임 (§5 Correction Unit 순서 1→3) | `피드에 게시하기` (§9 Don't: 공개 피드, §10 Community 범위 밖) |
| `문법·철자` / `추천표현` 탭으로 교정 유형 분리 | `교정된 일기` 토글로 원문을 교정본으로 바꿔 보기 (§9 Don't: 원문 대체 금지) |
| Home 일기 카드: 날짜 + 첫 문장 미리보기 + 사진 썸네일 (§5 Photo Card) | `N일 연속 작성 중` + 불꽃 아이콘, `45시간 남았어요` (§9 Don't: 스트릭, §4 no streak flames) |
| 영어 일기 서비스라는 같은 문제를 푸는 가장 가까운 경쟁사 | 달력 중심 Home (§6 Home: 목적은 새 기록 시작 + 회상) |

## G1 자체 점검 (기계 1차)

| 조건 | 결과 |
|---|---|
| 선별 레퍼런스 ≥ 10개 | PASS (12) |
| 각 레퍼런스 무드 태그 1개 | PASS (12/12) |
| `손글씨/편안함` ≥ 30% | PASS (4/12 = 33%) |
| 무드 적합성 | **사람 확인 필요** (하루냥·하이링구얼은 확인됨) |

## 선별 레퍼런스 (12)

★ = 핵심 레퍼런스

| # | 앱 · 화면 | 대응 화면 | 무드 | 가져올 것 | 피할 것 (design.md 근거) |
|---|---|---|---|---|---|
| R01★ | [하이링구얼 — AI / 피드백 상세](https://uibowl.io/name/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC?patterns=AI&patternName=%ED%94%BC%EB%93%9C%EB%B0%B1%20%EC%83%81%EC%84%B8) | Review | `담백/정돈` | 위 "핵심 레퍼런스" 참고 | 위 "핵심 레퍼런스" 참고 |
| R02★ | [하이링구얼 — 메인 / 일기 작성 후](https://uibowl.io/name/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC?patterns=%EB%A9%94%EC%9D%B8&patternName=%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1%20%ED%9B%84) | Home | `담백/정돈` | 위 "핵심 레퍼런스" 참고 | 위 "핵심 레퍼런스" 참고 |
| R03★ | [하루냥 — AI / 일기작성](https://uibowl.io/name/%ED%95%98%EB%A3%A8%EB%83%A5?patterns=AI&patternName=%EC%9D%BC%EA%B8%B0%EC%9E%91%EC%84%B1) | Write | `손글씨/편안함` | 위 "핵심 레퍼런스" 참고 | 위 "핵심 레퍼런스" 참고 |
| R04 | [클로디 — 글쓰기 / 감사일기 쓰기](https://uibowl.io/name/%ED%81%B4%EB%A1%9C%EB%94%94?patterns=%EA%B8%80%EC%93%B0%EA%B8%B0&patternName=%EA%B0%90%EC%82%AC%EC%9D%BC%EA%B8%B0%20%EC%93%B0%EA%B8%B0) | Write | `손글씨/편안함` | 날짜 제목 하나 + 넓은 여백 + 부담 없는 플레이스홀더 | `0/50` 글자 제한 (§5 Diary Input) |
| R05 | [투두메이트 — 글쓰기 / 일기](https://uibowl.io/name/%ED%88%AC%EB%91%90%EB%A9%94%EC%9D%B4%ED%8A%B8?patterns=%EA%B8%80%EC%93%B0%EA%B8%B0&patternName=%EC%9D%BC%EA%B8%B0) | Write | `손글씨/편안함` | 빈 종이 같은 작성 화면, 질문 한 줄만 플레이스홀더로 | 감정 이모지 스티커 (§9 Don't) |
| R06 | [닥터다이어리 — 글쓰기 / 감정일기](https://uibowl.io/name/%EB%8B%A5%ED%84%B0%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC?patterns=%EA%B8%80%EC%93%B0%EA%B8%B0&imgId=cmr7e2vq6000fl1041o5bh54l) | Write | `손글씨/편안함` | 따뜻한 오프화이트 바탕 + 질문형 제목 + 작성 카드 (§1 paper-like) | 저장 완료 시트의 종이비행기 일러스트·축하 톤 (§4 Icon & Motion, §9 Don't) |
| R07 | [워크온 — 글쓰기 / 게시글 작성](https://uibowl.io/name/%EC%9B%8C%ED%81%AC%EC%98%A8?patterns=%EA%B8%80%EC%93%B0%EA%B8%B0&imgId=cmudxbc82001ul504y5h3c1sn) | Home → Start Sheet | `담백/정돈` | "어디에 글을 쓸까요?" 제목 + 텍스트 선택지만 있는 바텀시트 (§5 Start Sheet) | 선택지 4개 → 우리는 사진 기반 시작 / 바로 쓰기 |
| R08 | [플랭 — AI / AI 영작채팅](https://uibowl.io/name/%ED%94%8C%EB%9E%AD?patterns=AI&patternName=AI%20%EC%98%81%EC%9E%91%EC%B1%84%ED%8C%85) | Home → Comeback | `담백/정돈` | "지난 대화에서 교정 받은 문장"을 회상 재료로 씀 (§5 Memory Comeback Card: 내 기록 기반) | `N문장` 과제형 개수 (§6 Home: backlog 금지) / "복습" 교실 톤 (§1) |
| R09 | [셔클 — 길찾기 / DRT 탑승 전](https://uibowl.io/name/%EC%85%94%ED%81%B4?patterns=%EA%B8%B8%EC%B0%BE%EA%B8%B0&imgId=cmrt10thq00a0ii048kynycy5) | Expression Journey | `기록/타임라인` | 세로 타임라인: 지점 아이콘 + 시각 + 한 항목 설명, 지점 사이 연결선 (§5 Expression Journey) | 파란·빨간 상태 점 (§2 Color Principles: 임의의 상태색 금지) |
| R10 | [센디 — 내역 / 운송현황 상세](https://uibowl.io/name/%EC%84%BC%EB%94%94?patterns=%EB%82%B4%EC%97%AD&imgId=cmp6az7rg00lmjo04sn7eug0z) | Expression Journey | `기록/타임라인` | 라인 아이콘 + 라벨 + 값 행을 세로선으로 잇는 담백한 이력 구조 | 채운 아이콘 박스 장식 (§4 Icon & Motion: 단순·기능적) |
| R11 | [쑥쑥찰칵 — 통계·리포트 / 수유텀 리듬](https://uibowl.io/name/%EC%91%A5%EC%91%A5%EC%B0%B0%EC%B9%B5?patterns=%ED%86%B5%EA%B3%84%C2%B7%EB%A6%AC%ED%8F%AC%ED%8A%B8&imgId=cmub7l6ol002rjt046tmfwtpq) | Expression Journey / My English | `기록/타임라인` | 날짜 헤더로 묶은 기록 목록, 각 기록은 시각 + 한 항목 | 분홍 간격 경고 띠 (§1 쉰 시간에 죄책감 주지 않기, §5 Comeback: 공백 일수 금지) |
| R12 | [세모 — 내역 / 오답 목록](https://uibowl.io/name/%EC%84%B8%EB%AA%A8?patterns=%EB%82%B4%EC%97%AD&imgId=cmrix1q8w0003l104rrw09gwc) | My English (빈 상태) | `담백/정돈` | 라인 아이콘 1개 + 설명 2줄의 조용한 빈 상태 | 빨간 `0개의 오답` (§2: 빨강으로 틀림 표시 금지, §9 Don't "wrong") |

## 대조군 — 피할 패턴만 확인한 화면 (G1 개수에 포함하지 않음)

| 앱 · 화면 | 피할 것 | design.md 근거 |
|---|---|---|
| [하이링구얼 — 메인 / 일기 작성 전](https://uibowl.io/name/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC?patterns=%EB%A9%94%EC%9D%B8&patternName=%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1%20%EC%A0%84) | `0일 연속 작성 중` + `45시간 남았어요` 마감 압박 | §9 Don't, §6 Home |
| [하루냥 — AI / 기분작성 (하루냥의 편지)](https://uibowl.io/name/%ED%95%98%EB%A3%A8%EB%83%A5?patterns=AI&patternName=%EA%B8%B0%EB%B6%84%EC%9E%91%EC%84%B1) | AI 캐릭터가 이모지 섞인 답장을 대신 써 줌 | §1 차분한 성인 톤, §9 Don't |
| [말해보카 — 학습하기 / 문법-정답](https://uibowl.io/name/%EB%A7%90%ED%95%B4%EB%B3%B4%EC%B9%B4?patterns=%ED%95%99%EC%8A%B5%ED%95%98%EA%B8%B0&imgId=cmmy9qwkb001ala04uowqev7h) | 진행률 바, 레벨, `정답 보기`, 단어 칩 조립형 문제 | §9 Don't, §1 not a classroom |
| [열품타 — 통계·리포트 / 공부 현황](https://uibowl.io/name/%EC%97%B4%ED%92%88%ED%83%80?patterns=%ED%86%B5%EA%B3%84%C2%B7%EB%A6%AC%ED%8F%AC%ED%8A%B8&patternName=%EA%B3%B5%EB%B6%80%20%ED%98%84%ED%99%A9) | 시간·수치 대시보드 | §6 My English: 부담 주는 개수 금지 |
| [하이링구얼 — 마이페이지 / 빈 화면](https://uibowl.io/name/%ED%95%98%EC%9D%B4%EB%A7%81%EA%B5%AC%EC%96%BC?patterns=%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80&imgId=cmnmkyeyl0003jx045ub7owc7) | 빈 상태를 캐릭터 일러스트로 채움 | §9 Don't |

## 반영 요소 정리 (S2)

1. **Write = 하루냥 구조** (R03, 보조 R04~R06). 날짜 + 질문 한 줄을 고정하고 그 아래 줄노트 작성 카드를 둔다. 캐릭터·이모지·글자 수는 뺀다.
2. **Review = 하이링구얼 구조** (R01). 사진과 원문을 한 카드에 담고 그 아래에 "내 문장 → 제안 → 이유" 목록을 둔다. 표시는 글자색이 아니라 밑줄 + 옅은 배경으로 하고, 원문을 교정본으로 바꿔 보여주지 않는다.
3. **Home 일기 카드 = 하이링구얼 카드** (R02). 스트릭과 달력은 빼고, 맨 위에 Comeback Card 1장을 둔다.
4. **Start Sheet = 텍스트 선택지만 있는 바텀시트** (R07).
5. **회상 재료 = 내가 교정받은 문장** (R08). 과제 개수나 "복습" 표현 없이 카드 1장만 둔다.
6. **Expression Journey = 세로 타임라인** (R09~R11). 라인 아이콘 + 날짜 + 한 항목으로 쓰고, 강조는 `accent`만 쓴다.
7. **빈 상태 = 라인 아이콘 + 설명 문장** (R12). 개수나 일러스트는 넣지 않는다.

**공통으로 피할 것:** 스트릭·마감 카운트다운, 진행률 바·레벨, 캐릭터·이모지, 글자 수 제한, 교정 부분을 글자색으로 강조하기, 원문을 교정본으로 바꿔 보여주기.
