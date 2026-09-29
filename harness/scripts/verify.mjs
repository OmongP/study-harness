#!/usr/bin/env node
// verify.mjs — 상태·판정 스크립트 (R7 · R8)
//   init · status · 게이트 판정 · reopen · unblock · 상태 전이를 맡는다.
//   state.json 과 5-review/ 는 이 스크립트만 쓴다.
//   판정 값은 rules.yaml(실행별) 또는 harness/rules-base.yaml(공통)만 읽는다.
//
// 사용법
//   node harness/scripts/verify.mjs init <run-id> --prd <PRD 경로>
//   node harness/scripts/verify.mjs status <run-id>
//   node harness/scripts/verify.mjs <research|concept|approval|design|prototype|review> <run-id>
//   node harness/scripts/verify.mjs reopen <run-id> --from <gate>     # 사용자 동의 후에만
//   node harness/scripts/verify.mjs unblock <run-id>                  # 사용자가 명시적으로 요청할 때만
//
// 종료 코드: 0 통과 · 1 실패(복귀) 또는 승인 대기 · 2 사용법·전제 오류 · 3 🛑 차단(재시도 한도)

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

export const HARNESS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = process.env.HARNESS_ROOT ? path.resolve(process.env.HARNESS_ROOT) : path.resolve(HARNESS_DIR, "..");

export const loadBase = () => YAML.parse(fs.readFileSync(path.join(HARNESS_DIR, "rules-base.yaml"), "utf8"));
export const runsDir = (base) => path.join(ROOT, base.run.runs_dir);

class UsageError extends Error {}

// ─────────────────────────── 색 · 대비 ───────────────────────────
export function parseColor(s) {
  if (!s) return null;
  s = s.trim();
  let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a };
  }
  m = s.match(/^rgba?\(([^)]+)\)$/i);
  if (m) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  return null;
}
const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
const sameRgb = (a, b) => a && b && Math.round(a.r) === Math.round(b.r) && Math.round(a.g) === Math.round(b.g) && Math.round(a.b) === Math.round(b.b);
function blend(fg, bg) {
  if (fg.a >= 1) return fg;
  return { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 };
}
function luminance(c) {
  const ch = [c.r, c.g, c.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}
export function contrast(fg, bg) {
  const f = blend(fg, bg);
  const [l1, l2] = [luminance(f), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

// ─────────────────────────── 화면 검사 ───────────────────────────
const round2 = (n) => Math.round(n * 100) / 100;
const v = (rule, title, screen, element, value, expected, ret, critical = false) => ({ rule, title, critical, screen, element, value: String(value), expected: String(expected), ret });

// data: extract_html 결과 · base: rules-base · service: 실행별 rules.yaml 의 service · ruleIds: 돌릴 공통 검사
export function checkScreens(data, base, service, ruleIds) {
  const out = [];
  const C = base.checks;
  const on = (id) => ruleIds.includes(id);
  const tokens = (service?.tokens?.colors ?? []).map(parseColor).filter(Boolean);
  const isToken = (c) => tokens.some((t) => sameRgb(t, c));

  for (const s of data.screens) {
    const F = s.file;
    if (on("B1")) {
      if (s.roots.length !== 1)
        out.push(v("B1", C.B1.title, F, `[${base.screen.root_attr}]`, `${s.roots.length}개`, "정확히 1개", "design_rule"));
      for (const r of s.roots)
        if (Math.round(r.width) !== base.screen.width || Math.round(r.height) !== base.screen.height)
          out.push(v("B1", C.B1.title, F, `[${base.screen.root_attr}="${r.name}"]`, `${r.width}×${r.height}`, `${base.screen.width}×${base.screen.height}`, "design_rule"));
    }
    for (const e of s.elements) {
      if (!e.visible) continue;
      const hasText = !!e.ownText;
      if (on("B2")) {
        const bad = [...new Set([...e.padding, ...e.gap].map(round2).filter((n) => n !== 0 && !C.B2.allowed.includes(n)))];
        for (const n of bad) out.push(v("B2", C.B2.title, F, e.desc, `${n}px`, C.B2.allowed.join("/"), "design_rule"));
      }
      if (on("B3")) {
        const bad = new Set();
        for (const r of e.radius) {
          for (const part of String(r).split(/\s+/)) {
            if (part.endsWith("%") && parseFloat(part) !== 0) bad.add(part);
            else if (!part.endsWith("%") && !C.B3.allowed.includes(round2(parseFloat(part)))) bad.add(part);
          }
        }
        for (const b of bad) out.push(v("B3", C.B3.title, F, e.desc, b, C.B3.allowed.join("/"), "design_rule"));
      }
      if (on("B4") && !e.inImg) {
        const cands = [];
        if (hasText) cands.push(["color", e.color]);
        const bg = parseColor(e.backgroundColor);
        if (bg && bg.a > 0) cands.push(["background-color", e.backgroundColor]);
        for (const b of e.borders) if (b.width > 0) cands.push(["border-color", b.color]);
        const seen = new Set();
        for (const [prop, raw] of cands) {
          const c = parseColor(raw);
          if (!c || c.a === 0) continue;
          const ok = c.a >= 1 && isToken(c);
          const key = `${prop}:${raw}`;
          if (!ok && !seen.has(key)) {
            seen.add(key);
            out.push(v("B4", C.B4.title, F, e.desc, `${prop} ${c.a < 1 ? raw : hex(c)}`, "service.tokens.colors 목록", "design_rule"));
          }
        }
      }
      if (on("B5") && hasText) {
        const fs_ = round2(e.fontSize);
        if (fs_ < C.B5.min && !C.B5.small_allowed.includes(fs_))
          out.push(v("B5", C.B5.title, F, e.desc, `${fs_}px`, `≥${C.B5.min} 또는 ${C.B5.small_allowed.join("/")}`, "design_rule"));
      }
      if (on("B6") && e.interactive && !e.disabled) {
        if (e.width < C.B6.min || e.height < C.B6.min)
          out.push(v("B6", C.B6.title, F, e.desc, `${e.width}×${e.height}`, `≥${C.B6.min}×${C.B6.min}`, "design_rule"));
      }
      if (on("B7") && hasText && !e.onImage && !e.inImg) {
        const fg = parseColor(e.color);
        const bg = parseColor(e.effectiveBg);
        if (fg && bg) {
          const r = contrast(fg, bg);
          if (r < C.B7.min_ratio)
            out.push(v("B7", C.B7.title, F, e.desc, `${r.toFixed(2)}:1`, `≥${C.B7.min_ratio}:1`, "design_rule"));
        }
      }
      if (on("M1") && hasText && !e.author)
        out.push(v("M1", base.metadata.M1.title, F, e.desc, "data-author 없음", "자신 또는 조상에 data-author", "design_rule"));
      if (on("M2") && hasText && e.author === "ai" && !e.contentRole)
        out.push(v("M2", base.metadata.M2.title, F, e.desc, "data-content-role 없음", "data-content-role", "design_rule"));
    }
  }

  // 서비스 규칙 (실행별 rules.yaml service.rules)
  for (const r of service?.rules ?? []) out.push(...checkServiceRule(r, data));
  return out;
}

export function checkServiceRule(r, data) {
  const out = [];
  const mk = (screen, el, value, expected) => v(r.id, r.title, screen, el, value, expected, "service_rule", !!r.critical);
  if (r.type === "forbid_in_areas") {
    for (const s of data.screens)
      for (const e of s.elements)
        if (e.contentRoleSelf && r.values.includes(e.contentRoleSelf) && e.areas.some((a) => r.areas.includes(a)))
          out.push(mk(s.file, e.desc, `data-content-role="${e.contentRoleSelf}" in data-area="${e.area}"`, `${r.values.join("/")} 금지`));
  } else if (r.type === "original_preserved") {
    const ids = new Map();
    for (const s of data.screens) for (const e of s.elements) if (e.originalId && !ids.has(e.originalId)) ids.set(e.originalId, e.innerText);
    for (const s of data.screens)
      for (const e of s.elements) {
        if (e.originalRef) {
          if (!ids.has(e.originalRef)) out.push(mk(s.file, e.desc, `원문 id "${e.originalRef}" 없음`, "같은 id 의 data-original-id"));
          else if (ids.get(e.originalRef) !== e.innerText) out.push(mk(s.file, e.desc, `"${e.innerText}"`, `"${ids.get(e.originalRef)}"`));
        }
        if (e.visible && e.ownText && e.author === "user" && e.lineThrough) out.push(mk(s.file, e.desc, "사용자 원문에 취소선", "취소선 없음"));
      }
  } else if (r.type === "default_choice") {
    for (const s of data.screens)
      for (const e of s.elements)
        if (e.uiRole === r.unit_role) {
          const defs = e.choices.filter((c) => c.isDefault);
          if (defs.length !== 1 || defs[0].choice !== r.expected)
            out.push(mk(s.file, e.desc, defs.length ? defs.map((d) => d.choice).join(",") : "기본 선택 없음", `data-choice="${r.expected}" data-default="true" 1개`));
        }
  } else if (r.type === "forbid_values") {
    for (const s of data.screens)
      for (const e of s.elements)
        if (e.uiRole && r.values.includes(e.uiRole)) out.push(mk(s.file, e.desc, `data-ui-role="${e.uiRole}"`, `${r.values.join("/")} 금지`));
  } else {
    out.push(mk("-", "rules.yaml", `알 수 없는 type "${r.type}"`, "rules-base.yaml service_rule_types"));
  }
  return out;
}

// B8 — flows.md 의 행마다 출발 화면에 도착 화면으로 가는 <a href> 가 있는지
export function checkFlows(flowsText, data, base) {
  const out = [];
  const T = base.checks.B8.title;
  const re = new RegExp(base.prototype.flow_row_pattern);
  const rows = flowsText.split("\n").map((l) => l.match(re)).filter(Boolean);
  if (!rows.length) out.push(v("B8", T, base.prototype.flows_file, "흐름 표", "행 0개", "| F1 | 단계 | 출발.html → 도착.html |", "flow_link"));
  const byFile = new Map(data.screens.map((s) => [s.file, s]));
  for (const m of rows) {
    const [from, to] = [m[1], m[2]];
    const missing = [from, to].filter((f) => !byFile.has(f));
    if (missing.length) {
      out.push(v("B8", T, from, m[0].trim(), `화면 없음: ${missing.join(", ")}`, "흐름의 화면이 프로토타입에 있음", "flow_screen"));
      continue;
    }
    const linked = byFile.get(from).elements.some((e) => e.href && path.posix.basename(e.href.split(/[?#]/)[0]) === to);
    if (!linked) out.push(v("B8", T, from, `→ ${to}`, "<a href> 연결 없음", `<a href="${to}">`, "flow_link"));
  }
  return out;
}

// 1 리서치 Gate (R5 R1)
export function checkResearch(text, base) {
  const R = base.research;
  const out = [];
  const lines = text.split("\n");
  const blocks = (headRe) => {
    const re = new RegExp(headRe);
    const res = [];
    let cur = null;
    for (const l of lines) {
      const m = l.match(re);
      if (m) {
        cur = { id: m[1], head: l.trim(), body: [] };
        res.push(cur);
      } else if (/^#{1,3}\s/.test(l)) cur = null;
      else if (cur) cur.body.push(l);
    }
    return res;
  };
  const field = (b, name) => {
    const l = b.body.find((x) => new RegExp(`^-\\s*${name}\\s*[:：]`).test(x));
    return l === undefined ? undefined : l.replace(/^[^:：]*[:：]/, "").trim();
  };
  const refs = blocks(R.reference_heading);
  if (refs.length < R.min_references) out.push(v("R1", "레퍼런스 수", R.file, "### R<n>.", `${refs.length}개`, `≥${R.min_references}개`, "research"));
  for (const b of refs)
    for (const f of R.reference_required_fields) if (!field(b, f)) out.push(v("R1", "빈 분석 항목", R.file, b.head, `${f} 비어 있음`, `${f} 작성`, "research"));
  const pts = blocks(R.point_heading);
  if (pts.length < R.min_points) out.push(v("R1", "반영 요소 수", R.file, "### RP-<n>.", `${pts.length}개`, `≥${R.min_points}개`, "research"));
  for (const b of pts)
    for (const f of R.point_required_fields) if (!field(b, f)) out.push(v("R1", "PRD 연결 없는 반영 요소", R.file, b.head, `${f} 비어 있음`, `${f} 작성`, "research"));
  return out;
}

export function findPlaceholders(text, base, file) {
  const re = new RegExp(base.run.placeholder_pattern, "g");
  return [...new Set(text.match(re) ?? [])].map((p) => v("P", "미치환 자리표시", file, p, "남아 있음", "채워서 제거", null));
}

// ─────────────────────────── 상태 ───────────────────────────
const runPath = (base, id, ...p) => path.join(runsDir(base), id, ...p);
const readState = (base, id) => {
  const p = runPath(base, id, "state.json");
  if (!fs.existsSync(p)) throw new UsageError(`runs/${id}/state.json 이 없습니다. 'verify.mjs init ${id} --prd <경로>' 로 먼저 만드세요.`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
};
const writeState = (base, id, s) => {
  s.updated = new Date().toISOString();
  const p = runPath(base, id, "state.json");
  fs.writeFileSync(p + ".tmp", JSON.stringify(s, null, 2) + "\n");
  fs.renameSync(p + ".tmp", p);
};
const stageOf = (base, g) => base.gates.stage[g];
function setFrom(base, s, gate) {
  // gate 의 단계를 진행 중으로, 그 뒤 단계는 대기로
  const st = stageOf(base, gate);
  for (const k of Object.keys(s.stages)) {
    const n = Number(k);
    if (n === st) s.stages[k] = gate === "approval" ? "awaiting_approval" : "running";
    else if (n > st) s.stages[k] = "pending";
  }
  s.current_stage = st;
  s.next = gate;
}
function archiveApproval(base, id, s, prefix, reason) {
  const dir = runPath(base, id, base.gates.dir.approval);
  const f = path.join(dir, base.approval.file);
  s.approval_lock = null;
  if (!fs.existsSync(f)) return null;
  let n = 1;
  while (fs.existsSync(path.join(dir, `${prefix}-${n}.md`))) n++;
  const to = `${prefix}-${n}.md`;
  fs.renameSync(f, path.join(dir, to));
  s.history.push({ at: new Date().toISOString(), event: "approval-archived", file: to, reason });
  return to;
}
function lockHash(base, id) {
  const h = crypto.createHash("sha256");
  const files = [];
  for (const rel of base.approval.lock_files) {
    const p = runPath(base, id, rel);
    if (!fs.existsSync(p)) continue;
    if (fs.statSync(p).isDirectory()) for (const f of fs.readdirSync(p).sort()) files.push(path.join(rel, f));
    else files.push(rel);
  }
  for (const rel of files.sort()) {
    h.update(rel + "\0");
    h.update(fs.readFileSync(runPath(base, id, rel)));
    h.update("\0");
  }
  return { sha256: h.digest("hex"), files };
}

// ─────────────────────────── 리포트 ───────────────────────────
const line = (x) => `- ${x.screen} / ${x.element} / ${x.value} / ${x.expected} / ${x.rule}`;
function writeReport(base, id, gate, result, next, humanChecks) {
  const file = base.gates.report[gate];
  if (!file) return null;
  const dir = runPath(base, id, base.gates.dir.review);
  fs.mkdirSync(dir, { recursive: true });
  const V = result.violations;
  const crit = V.filter((x) => x.critical);
  const svc = V.filter((x) => x.rule === "B8" || x.ret === "service_rule");
  const des = V.filter((x) => !svc.includes(x));
  const L = [];
  L.push(`# 판정 결과 — ${gate} · runs/${id}`, "", `> verify.mjs 가 작성 (${new Date().toISOString()}). 사람·에이전트가 수정하지 않는다.`, "");
  L.push(`판정: ${V.length ? "❌ FAIL" : "✅ PASS"} (위반 ${V.length}건)`, "");
  L.push("## 1. ★ Critical", "", crit.length ? crit.map(line).join("\n") : "위반 없음", "");
  L.push("## 2. PRD · 서비스", "", svc.length ? svc.map(line).join("\n") : "위반 없음", "");
  L.push("## 3. 디자인 규칙", "", des.length ? des.map(line).join("\n") : "위반 없음", "");
  L.push("## 4. 사람 확인", "", ...(humanChecks.length ? humanChecks.map((h) => `- [ ] ${h}`) : ["없음"]), "");
  L.push("## 5. 다음 행동", "", next, "");
  L.push("형식: 화면 / 요소 / 값 / 기대값 / 규칙 번호", "");
  fs.writeFileSync(path.join(dir, file), L.join("\n"));
  return `runs/${id}/${base.gates.dir.review}/${file}`;
}

// ─────────────────────────── 게이트 ───────────────────────────
function readRunRules(base, id) {
  const p = runPath(base, id, base.gates.dir.design, "rules.yaml");
  if (!fs.existsSync(p)) return { error: "3-design/rules.yaml 없음" };
  let y;
  try {
    y = YAML.parse(fs.readFileSync(p, "utf8"));
  } catch (e) {
    return { error: `rules.yaml 파싱 실패: ${e.message}` };
  }
  if (!y || typeof y !== "object") return { error: "rules.yaml 비어 있음" };
  const canon = (o) => (Array.isArray(o) ? o.map(canon) : o && typeof o === "object" ? Object.fromEntries(Object.keys(o).sort().map((k) => [k, canon(o[k])])) : o);
  if (JSON.stringify(canon(y.base)) !== JSON.stringify(canon(base))) return { error: "rules.yaml 의 base 가 harness/rules-base.yaml 과 다름 (수정 없이 복사해야 함)" };
  if (!y.service || !Array.isArray(y.service?.tokens?.colors) || !Array.isArray(y.service?.rules)) return { error: "rules.yaml 의 service.tokens.colors / service.rules 없음" };
  return { rules: y };
}

async function screenGate(base, id, gate, dirRel) {
  const { extractDir } = await import("./extract_html.mjs");
  const rr = readRunRules(base, id);
  const V = [];
  if (rr.error) return { violations: [v("RULES", "실행별 규칙", "3-design/rules.yaml", "-", rr.error, "R4 형식", "design_rule")], human: [] };
  const svc = rr.rules.service;
  const dir = runPath(base, id, dirRel);
  const data = await extractDir(dir, base);
  if (!data.screens.length) V.push(v("FILES", "필수 파일", dirRel, "*.html", "0개", "1개 이상", gate === "review" ? "flow_screen" : "design_rule"));
  fs.mkdirSync(runPath(base, id, base.gates.dir.review), { recursive: true });
  fs.writeFileSync(runPath(base, id, base.gates.dir.review, `elements-${gate}.json`), JSON.stringify(data, null, 1));
  V.push(...checkScreens(data, base, svc, base.gate_checks[gate]));
  if (gate === "review") {
    const ff = path.join(dir, base.prototype.flows_file);
    V.push(...checkFlows(fs.existsSync(ff) ? fs.readFileSync(ff, "utf8") : "", data, base));
  }
  const onImage = data.screens.flatMap((s) => s.elements.filter((e) => e.visible && e.ownText && e.onImage).map((e) => `${s.file} / ${e.desc} — 사진 위 글자 대비 확인`));
  return { violations: V, human: [...base.human_checks, ...(svc.human_checks ?? []), ...onImage] };
}

const need = (base, id, rel, V, ret) => {
  if (!fs.existsSync(runPath(base, id, rel))) {
    V.push(v("FILES", "필수 파일", rel, "-", "없음", "있음", ret));
    return null;
  }
  return fs.readFileSync(runPath(base, id, rel), "utf8");
};

const HANDLERS = {
  async research(base, id) {
    const V = [];
    const rel = path.join(base.gates.dir.research, base.research.file);
    const t = need(base, id, rel, V, "research");
    if (t !== null) {
      V.push(...findPlaceholders(t, base, rel).map((x) => ({ ...x, ret: "research" })));
      V.push(...checkResearch(t, base));
    }
    return { violations: V, human: base.human_checks.slice(0, 1) };
  },
  async concept(base, id) {
    const V = [];
    const d = base.gates.dir.concept;
    for (const f of base.concept.files) {
      const t = need(base, id, path.join(d, f), V, "concept");
      if (t !== null) V.push(...findPlaceholders(t, base, path.join(d, f)).map((x) => ({ ...x, ret: "concept" })));
    }
    const kd = runPath(base, id, d, base.concept.keyscreens_dir);
    const n = fs.existsSync(kd) ? fs.readdirSync(kd).filter((f) => f.endsWith(".html")).length : 0;
    if (n < base.concept.min_keyscreens || n > base.concept.max_keyscreens)
      V.push(v("FILES", "키스크린 수", `${d}/${base.concept.keyscreens_dir}/`, "*.html", `${n}개`, `${base.concept.min_keyscreens}~${base.concept.max_keyscreens}개`, "concept"));
    return { violations: V, human: [] };
  },
  async design(base, id) {
    const V = [];
    for (const f of base.design.files) need(base, id, path.join(base.gates.dir.design, f), V, "design_rule");
    const r = await screenGate(base, id, "design", path.join(base.gates.dir.design, base.design.screens_dir));
    return { violations: [...V, ...r.violations], human: r.human };
  },
  async prototype(base, id) {
    const V = [];
    const d = base.gates.dir.prototype;
    const rel = path.join(d, base.prototype.flows_file);
    const t = need(base, id, rel, V, "prototype");
    if (t !== null) {
      V.push(...findPlaceholders(t, base, rel).map((x) => ({ ...x, ret: "prototype" })));
      if (!t.split("\n").some((l) => new RegExp(base.prototype.flow_row_pattern).test(l)))
        V.push(v("FILES", "흐름 표", rel, "| F1 | … |", "행 0개", "1행 이상", "prototype"));
    }
    const n = fs.existsSync(runPath(base, id, d)) ? fs.readdirSync(runPath(base, id, d)).filter((f) => f.endsWith(".html")).length : 0;
    if (!n) V.push(v("FILES", "필수 파일", d, "*.html", "0개", "1개 이상", "prototype"));
    return { violations: V, human: [] };
  },
  async review(base, id) {
    return screenGate(base, id, "review", base.gates.dir.prototype);
  },
};

function retOf(base, gate, violations) {
  const map = base.gates.return_to;
  if (gate !== "review") return map[gate];
  const targets = [...new Set(violations.map((x) => map[x.ret] ?? "design"))];
  return targets.sort((a, b) => base.gates.order.indexOf(a) - base.gates.order.indexOf(b))[0];
}

async function runGate(base, id, gate) {
  const s = readState(base, id);
  if (s.blocked) {
    console.log(`🛑 차단 상태 — ${s.blocked.gate} 게이트 ${base.gates.max_attempts}회 실패. 사용자 판단이 필요합니다 (unblock 은 사용자 요청 시에만).`);
    return 3;
  }
  if (s.done) throw new UsageError(`runs/${id} 은(는) 완료된 실행입니다. 다시 하려면 사용자 동의 후 reopen 하세요.`);
  if (s.next !== gate) throw new UsageError(`지금 게이트는 ${s.next} 입니다 (요청: ${gate}).`);
  const now = new Date().toISOString();

  // 컨펌 잠금 확인 (R7)
  if (base.approval.lock_check_gates.includes(gate)) {
    const cur = lockHash(base, id).sha256;
    if (!s.approval_lock || s.approval_lock.sha256 !== cur) {
      const reason = s.approval_lock ? "승인 뒤 screen-structure.md 또는 keyscreens/ 가 바뀜" : "승인 잠금 기록 없음";
      const to = archiveApproval(base, id, s, base.approval.stale_prefix, reason);
      setFrom(base, s, base.gates.return_to.approval_lock);
      s.history.push({ at: now, gate, result: "lock-invalid", reason });
      writeState(base, id, s);
      console.log(`⏳ 컨펌 무효 — ${reason}.${to ? ` 기존 승인은 ${to} 로 보관.` : ""} 현재 설계·시안으로 다시 승인받아 approval.md 를 작성해 주세요.`);
      return 1;
    }
  }

  // 👤 승인
  if (gate === "approval") {
    const rel = path.join(base.gates.dir.approval, base.approval.file);
    const p = runPath(base, id, rel);
    const t = fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
    const get = (pat) => t.split("\n").map((l) => l.match(new RegExp(pat))).find(Boolean)?.[1];
    const approved = get(base.approval.approved_pattern);
    const ks = get(base.approval.keyscreen_pattern);
    const date = get(base.approval.date_pattern);
    const ph = findPlaceholders(t, base, rel);
    if (!t || ph.length || !approved || !date || (approved === "yes" && !ks)) {
      console.log(`⏳ 승인 대기 — runs/${id}/${rel} 를 사람이 작성해야 합니다 (approved · 채택 키스크린 · 날짜, 코멘트는 선택).${ph.length ? ` 남은 자리표시: ${ph.map((x) => x.element).join(" ")}` : ""}`);
      return 1;
    }
    if (approved === "no") {
      const to = archiveApproval(base, id, s, base.approval.rejected_prefix, "반려");
      setFrom(base, s, base.gates.return_to.approval_rejected);
      s.history.push({ at: now, gate, result: "rejected", file: to });
      writeState(base, id, s);
      console.log(`↩️ 반려 — ${to} 로 보관. ${s.next} 단계로 돌아갑니다 (코멘트를 concept-designer 에게 전달).`);
      return 1;
    }
    const kfile = path.join(base.gates.dir.concept, base.concept.keyscreens_dir, ks);
    if (!fs.existsSync(runPath(base, id, kfile))) {
      console.log(`⏳ 승인 대기 — 채택 키스크린 ${ks} 가 ${kfile} 에 없습니다. approval.md 를 고쳐 주세요.`);
      return 1;
    }
    s.approval_lock = { ...lockHash(base, id), approved_at: now, keyscreen: ks, date };
    s.stages[String(stageOf(base, "approval"))] = "pass";
    s.retries = {};
    setFrom(base, s, "design");
    s.history.push({ at: now, gate, result: "approved", keyscreen: ks });
    writeState(base, id, s);
    console.log(`✅ 승인 — 채택 키스크린 ${ks}. 잠금 기록 (${s.approval_lock.files.length}개 파일). 다음: design`);
    return 0;
  }

  const r = await HANDLERS[gate](base, id);
  const V = r.violations;
  if (!V.length) {
    const idx = base.gates.order.indexOf(gate);
    const nextGate = base.gates.order[idx + 1];
    for (const k of Object.keys(s.retries)) if (k === gate || k.startsWith(`${gate}→`)) delete s.retries[k];
    s.stages[String(stageOf(base, gate))] = gate === "concept" ? "awaiting_approval" : "pass";
    if (nextGate) setFrom(base, s, nextGate);
    else {
      s.done = true;
      s.next = null;
    }
    s.history.push({ at: now, gate, result: "pass" });
    const rep = writeReport(base, id, gate, r, nextGate ? `다음 단계: ${nextGate}` : "완료", r.human);
    writeState(base, id, s);
    console.log(`✅ ${gate} PASS${rep ? ` — ${rep}` : ""}. ${nextGate ? `다음: ${nextGate}` : "하네스 완료"}`);
    if (gate === "concept") console.log(`⏳ 사람 승인 대기 — runs/${id}/${base.gates.dir.approval}/${base.approval.file} 를 harness/templates/approval.md 양식으로 작성해 주세요.`);
    return 0;
  }

  const target = retOf(base, gate, V);
  const key = target === gate ? gate : `${gate}→${target}`; // 같은 복귀 지점 단위로 센다 (R5 · R7)
  s.retries[key] = (s.retries[key] ?? 0) + 1;
  const n = s.retries[key];
  const crit = V.filter((x) => x.critical);
  s.history.push({ at: now, gate, result: "fail", attempt: n, violations: V.length, critical: crit.length, return_to: target, rules: [...new Set(V.map((x) => x.rule))] });
  if (n >= base.gates.max_attempts) {
    s.blocked = { gate, key, at: now, attempts: n };
    s.stages[String(stageOf(base, gate))] = "awaiting_approval";
    const rep = writeReport(base, id, gate, r, `🛑 ${gate} ${n}회 실패 — 정지. 사용자 판단 필요 (산출물 직접 수정 후 unblock / 기준 조정 / 중단).`, r.human);
    writeState(base, id, s);
    console.log(`🛑 ${gate} FAIL (${n}/${base.gates.max_attempts}) — 차단.${rep ? ` ${rep}` : ""}`);
    for (const x of [...crit, ...V.filter((y) => !y.critical)].slice(0, 40)) console.log(line(x));
    return 3;
  }
  if (target === "concept" && gate === "review") archiveApproval(base, id, s, base.approval.stale_prefix, "검수에서 화면 누락으로 2 컨셉 복귀");
  setFrom(base, s, target);
  const rep = writeReport(base, id, gate, r, `복귀: ${target} (남은 재시도 ${base.gates.max_attempts - n}회)`, r.human);
  writeState(base, id, s);
  console.log(`❌ ${gate} FAIL (${n}/${base.gates.max_attempts}) — 위반 ${V.length}건${crit.length ? `, ★ Critical ${crit.length}건` : ""}. 복귀: ${target}${rep ? ` — ${rep}` : ""}`);
  for (const x of [...crit, ...V.filter((y) => !y.critical)].slice(0, 40)) console.log(line(x));
  return 1;
}

// ─────────────────────────── 명령 ───────────────────────────
function init(base, id, prd) {
  if (!new RegExp(base.run.run_id_pattern).test(id)) throw new UsageError(`run-id 형식: YYYY-MM-DD-서비스명 (요청: ${id})`);
  if (!prd || !fs.existsSync(path.resolve(ROOT, prd))) throw new UsageError(`--prd 경로가 없습니다: ${prd}`);
  const dir = runPath(base, id);
  if (fs.existsSync(dir)) throw new UsageError(`runs/${id} 가 이미 있습니다. 이어서 하려면 status 를 보세요.`);
  fs.mkdirSync(path.join(dir, "input"), { recursive: true });
  for (const d of new Set(Object.values(base.gates.dir))) fs.mkdirSync(path.join(dir, d), { recursive: true });
  fs.copyFileSync(path.resolve(ROOT, prd), path.join(dir, "input", "prd.md"));
  fs.chmodSync(path.join(dir, "input", "prd.md"), 0o444);
  const s = {
    run_id: id,
    prd_source: prd,
    created: new Date().toISOString(),
    current_stage: 1,
    next: "research",
    stages: { 1: "running", 2: "pending", 3: "pending", 4: "pending", 5: "pending" },
    retries: {},
    blocked: null,
    done: false,
    approval_lock: null,
    history: [{ at: new Date().toISOString(), event: "init", prd }],
  };
  writeState(base, id, s);
  console.log(`✅ runs/${id} 생성 — input/prd.md 복사(읽기 전용). 다음: research`);
  return 0;
}

function status(base, id) {
  const s = readState(base, id);
  console.log(`실행: runs/${id}`);
  console.log(`단계: ${Object.entries(s.stages).map(([k, x]) => `${k}:${x}`).join("  ")}`);
  console.log(`다음: ${s.done ? "완료" : s.next}  (쓸 폴더: ${s.done || s.next === "approval" ? "없음" : base.gates.dir[s.next]})`);
  console.log(`재시도: ${JSON.stringify(s.retries)}`);
  if (s.approval_lock) console.log(`컨펌 잠금: ${s.approval_lock.keyscreen} (${s.approval_lock.approved_at})`);
  const last = s.history.filter((h) => h.result === "fail").slice(-1)[0];
  if (last) console.log(`마지막 실패: ${last.gate} — ${last.rules?.join(", ")} (복귀 ${last.return_to})`);
  if (s.blocked) {
    console.log(`🛑 차단: ${s.blocked.gate} ${s.blocked.attempts}회 실패`);
    return 3;
  }
  if (s.next === "approval") {
    console.log("⏳ 사람 승인 대기");
    return 1;
  }
  return 0;
}

function reopen(base, id, from) {
  const s = readState(base, id);
  if (!base.gates.order.includes(from)) throw new UsageError(`--from 은 ${base.gates.order.join("|")} 중 하나`);
  s.done = false;
  s.blocked = null;
  for (const k of Object.keys(s.retries)) if (k === from || k.startsWith(`${from}→`)) delete s.retries[k];
  if (stageOf(base, from) <= stageOf(base, "approval")) archiveApproval(base, id, s, base.approval.stale_prefix, `reopen --from ${from}`);
  setFrom(base, s, from);
  s.history.push({ at: new Date().toISOString(), event: "reopen", from });
  writeState(base, id, s);
  console.log(`↩️ runs/${id} 를 ${from} 부터 다시 엽니다 (산출물은 유지).`);
  return 0;
}

function unblock(base, id) {
  const s = readState(base, id);
  if (!s.blocked) {
    console.log("차단 상태가 아닙니다.");
    return 0;
  }
  const g = s.blocked.gate;
  delete s.retries[s.blocked.key ?? g];
  s.blocked = null;
  s.stages[String(stageOf(base, g))] = g === "approval" ? "awaiting_approval" : "running";
  s.history.push({ at: new Date().toISOString(), event: "unblock", gate: g });
  writeState(base, id, s);
  console.log(`🔓 unblock — ${g} 재시도 횟수 초기화. 다음: ${s.next}`);
  return 0;
}

export async function main(argv) {
  const [cmd, id, ...rest] = argv;
  const opt = (k) => {
    const i = rest.indexOf(k);
    return i >= 0 ? rest[i + 1] : undefined;
  };
  const base = loadBase();
  if (!cmd || !id) throw new UsageError("사용법: verify.mjs <init|status|research|concept|approval|design|prototype|review|reopen|unblock> <run-id> [옵션]");
  if (cmd === "init") return init(base, id, opt("--prd"));
  if (cmd === "status") return status(base, id);
  if (cmd === "reopen") return reopen(base, id, opt("--from"));
  if (cmd === "unblock") return unblock(base, id);
  if (base.gates.order.includes(cmd)) return runGate(base, id, cmd);
  throw new UsageError(`알 수 없는 명령: ${cmd}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2))
    .then((code) => process.exit(code))
    .catch((e) => {
      console.error(e instanceof UsageError ? `사용법·전제 오류: ${e.message}` : e.stack);
      process.exit(2);
    });
}
