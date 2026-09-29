// fixtures.mjs — 규칙별 PASS/FAIL fixture (R8 필수 검증 1)
// 통과 세트(PASS) 1개 + 규칙마다 "그 규칙만 딱 1번 어긴" 위반 세트.
// 식별 방식은 harness/guides/html-screen-guide.md 를 따른다.

export const SERVICE = {
  name: "fixture-service",
  tokens: { colors: ["#FAF8F4", "#FFFFFF", "#1C1B19", "#6B6760", "#2F5D50"] },
  rules: [
    { id: "S1", title: "AI 대필 금지", critical: true, type: "forbid_in_areas", values: ["completed_answer", "diary_body", "model_answer"], areas: ["write", "comeback", "transfer-cue"], source: "fixture" },
    { id: "S2", title: "원문 보존", critical: true, type: "original_preserved", source: "fixture" },
    { id: "S3", title: "선택권 기본값", critical: true, type: "default_choice", unit_role: "correction-unit", expected: "keep", source: "fixture" },
    { id: "S4", title: "게임화 요소", critical: false, type: "forbid_values", values: ["streak", "score", "level", "progress_bar", "badge", "ranking", "missed_day_count"], source: "fixture" },
  ],
  human_checks: ["fixture 사람 확인"],
};

const STYLE = `
* { margin:0; padding:0; border:0; box-sizing:border-box; background:transparent; color:inherit; font:inherit; text-decoration:none; }
body { color:#1C1B19; font-family:Georgia, serif; font-size:16px; }
main { width:390px; height:844px; background:#FAF8F4; padding:20px; }
.card { background:#FFFFFF; border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:12px; }
.btn { display:block; min-height:44px; min-width:44px; padding:12px 16px; border-radius:12px; background:#2F5D50; color:#FFFFFF; }
.meta { font-size:13px; color:#6B6760; }
`;
const page = (screen, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${STYLE}</style></head><body>
<main data-screen="${screen}">
${body}
</main>
</body></html>
`;

const WRITE = {
  question: `<p data-author="ai" data-content-role="question">Who did you have dinner with?</p>`,
  original: `<p data-author="user" data-original-id="d1">I drink with my company people yesterday.</p>`,
  meta: `<p class="meta" data-author="system">9.28</p>`,
  unit: `<div data-ui-role="correction-unit" class="card">
    <button class="btn" data-author="system" data-choice="apply">반영</button>
    <button class="btn" data-author="system" data-choice="keep" data-default="true">내 표현 유지</button>
  </div>`,
  link: `<a class="btn" href="review.html" data-author="system">다음</a>`,
  extra: "",
};
const write = (o = {}) => {
  const w = { ...WRITE, ...o };
  return page(o.screenName ?? "write", `<section data-area="write" class="card">
  ${w.question}
  ${w.original}
  ${w.meta}
  ${w.unit}
  ${w.link}
  ${w.extra}
</section>`);
};
const review = (o = {}) =>
  page("review", `<section data-area="review" class="card">
  ${o.ref ?? `<p data-author="user" data-original-ref="d1">I drink with my company people yesterday.</p>`}
  <a class="btn" href="write.html" data-author="system">처음으로</a>
</section>`);
const FLOWS = `# 프로토타입 흐름 — fixture

| 흐름 | PRD 흐름 단계 | 연결 |
|---|---|---|
| F1 | 작성 → 교정 | write.html → review.html |
`;
const set = (w, r = review(), flows = FLOWS) => ({ "write.html": w, "review.html": r, "flows.md": flows });

// 화면 fixture: { name, rule, expect: 위반 수, files }
export const SCREEN_FIXTURES = [
  { name: "PASS", rule: null, files: set(write()) },
  { name: "B1 프레임 391px", rule: "B1", files: set(write().replace('data-screen="write"', 'data-screen="write" style="width:391px"')) },
  { name: "B2 간격 10px", rule: "B2", files: set(write({ meta: `<p class="meta" data-author="system" style="padding:10px">9.28</p>` })) },
  { name: "B3 모서리 6px", rule: "B3", files: set(write({ meta: `<p class="meta" data-author="system" style="border-radius:6px">9.28</p>` })) },
  { name: "B4 토큰 밖 색", rule: "B4", files: set(write({ meta: `<p class="meta" data-author="system" style="color:#000000">9.28</p>` })) },
  { name: "B5 글자 15px", rule: "B5", files: set(write({ meta: `<p class="meta" data-author="system" style="font-size:15px">9.28</p>` })) },
  { name: "B6 터치 26px", rule: "B6", files: set(write({ unit: WRITE.unit.replace('class="btn" data-author="system" data-choice="apply"', 'class="btn" style="min-height:0;padding:4px 8px" data-author="system" data-choice="apply"') })) },
  { name: "B7 대비 부족", rule: "B7", files: set(write({ meta: `<p class="meta" data-author="system" style="color:#FAF8F4">9.28</p>` })) },
  { name: "B8 링크 끊김", rule: "B8", ret: "flow_link", files: set(write({ link: `<a class="btn" href="write.html" data-author="system">다음</a>` })) },
  { name: "B8 화면 없음", rule: "B8", ret: "flow_screen", files: set(write(), review(), FLOWS.replace("write.html → review.html", "write.html → missing.html").replace('href="review.html"', "")) },
  { name: "M1 작성자 누락", rule: "M1", files: set(write({ extra: `<p>no author</p>` })) },
  { name: "M2 AI 역할 누락", rule: "M2", files: set(write({ extra: `<p data-author="ai">hint</p>` })) },
  { name: "S1 AI 모범 답안", rule: "S1", critical: true, files: set(write({ question: `<p data-author="ai" data-content-role="model_answer">I had dinner with my coworkers.</p>` })) },
  { name: "S2 원문 변경", rule: "S2", critical: true, files: set(write(), review({ ref: `<p data-author="user" data-original-ref="d1">I had drinks with my coworkers yesterday.</p>` })) },
  { name: "S2 원문 취소선", rule: "S2", critical: true, files: set(write({ original: `<p data-author="user" data-original-id="d1" style="text-decoration:line-through">I drink with my company people yesterday.</p>` })) },
  { name: "S3 기본값 apply", rule: "S3", critical: true, files: set(write({ unit: WRITE.unit.replace('data-choice="apply"', 'data-choice="apply" data-default="true"').replace(' data-default="true">내 표현', ">내 표현") })) },
  { name: "S4 스트릭", rule: "S4", files: set(write({ extra: `<p data-ui-role="streak" data-author="system">3일 연속</p>` })) },
];

// 리서치 fixture (R5 R1)
const ref = (n, o = {}) => `### R${n}. 앱${n} — 화면${n}

- 링크:${o.link ?? ""}
- 대응 화면: ${o.screen ?? "Write"}
- 무드: 담백
- 가져올 것: 구조
- 피할 것: ${o.avoid ?? "스트릭 (design.md §9)"}
`;
const research = (count, o = {}) => `# 레퍼런스 — fixture

## 리서치 기준

- 무드 방향: 차분함
- 무드 태그 목록: 담백 · 편안함

## 레퍼런스

${Array.from({ length: count }, (_, i) => ref(i + 1, i === 0 ? o : {})).join("\n")}
## 반영 요소

### RP-1. 질문을 입력창 위에 고정

- 근거 레퍼런스: R1
- PRD 연결: ${o.prd ?? "§3 EXPRESS"}
`;
export const RESEARCH_FIXTURES = [
  { name: "PASS (링크 비어 있음)", rule: null, text: research(10) },
  { name: "R1 레퍼런스 9개", rule: "R1", text: research(9) },
  { name: "R1 피할 것 비어 있음", rule: "R1", text: research(10, { avoid: "" }) },
  { name: "R1 PRD 연결 없음", rule: "R1", text: research(10, { prd: "" }) },
];

export const PLACEHOLDER_FIXTURES = [
  { name: "PASS", rule: null, text: FLOWS },
  { name: "P 자리표시 남음", rule: "P", text: FLOWS.replace("작성 → 교정", "{{PRD 흐름 단계}}") },
];

export const PASS_WRITE = write;
