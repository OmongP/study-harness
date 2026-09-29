// extract_html.mjs — HTML 화면 → elements.json (R8)
// 설치된 Chrome 을 puppeteer-core 로 열어 계산된 스타일·크기·메타데이터를 뽑는다.
// 판정은 하지 않는다. 판정은 verify.mjs 가 이 결과(elements.json)만 보고 한다.
// 식별 방식은 harness/guides/html-screen-guide.md 와 같은 정의를 쓴다.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME_CANDIDATES = [
  process.env.HARNESS_CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

export function findChrome() {
  const p = CHROME_CANDIDATES.find((c) => fs.existsSync(c));
  if (!p)
    throw new Error(
      "Chrome 을 찾지 못했습니다. HARNESS_CHROME 환경변수에 Chrome 실행 파일 경로를 지정하세요.",
    );
  return p;
}

// 페이지 안에서 실행되는 수집기. opts 는 rules-base.yaml 의 식별자 값.
function collect(opts) {
  const px = (v) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : 0;
  };
  const effectiveBg = (el) => {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const bg = getComputedStyle(e).backgroundColor;
      const m = bg.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(",").map((s) => parseFloat(s));
        if (parts.length < 4 || parts[3] > 0) return bg;
      }
    }
    return "rgb(255, 255, 255)";
  };
  const describe = (el) => {
    let d = el.tagName.toLowerCase();
    if (el.id) d += `#${el.id}`;
    for (const a of ["data-screen", "data-area", "data-ui-role", "data-choice", "data-original-id", "data-original-ref"]) {
      if (el.hasAttribute(a)) d += `[${a}="${el.getAttribute(a)}"]`;
    }
    const t = (el.innerText || "").trim().replace(/\s+/g, " ");
    if (t) d += ` "${t.slice(0, 30)}${t.length > 30 ? "…" : ""}"`;
    return d;
  };
  const lineThrough = (el) => {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      if (getComputedStyle(e).textDecorationLine.includes("line-through")) return true;
    }
    return false;
  };

  const roots = [...document.querySelectorAll(`[${opts.rootAttr}]`)].map((r) => {
    const b = r.getBoundingClientRect();
    return { name: r.getAttribute(opts.rootAttr), width: Math.round(b.width * 100) / 100, height: Math.round(b.height * 100) / 100 };
  });

  const elements = [];
  for (const el of document.body.querySelectorAll("*")) {
    if (["SCRIPT", "STYLE", "TEMPLATE", "NOSCRIPT"].includes(el.tagName)) continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const visible = cs.display !== "none" && cs.visibility !== "hidden" && r.width > 0 && r.height > 0;
    const ownText = [...el.childNodes]
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join("")
      .trim();
    const authorEl = el.closest("[data-author]");
    const roleEl = el.closest("[data-content-role]");
    const areaEl = el.closest("[data-area]");
    const inImg = !!el.closest("img, picture");
    const borders = ["Top", "Right", "Bottom", "Left"].map((s) => ({
      width: px(cs[`border${s}Width`]),
      color: cs[`border${s}Color`],
    }));
    elements.push({
      desc: describe(el),
      tag: el.tagName.toLowerCase(),
      visible,
      width: Math.round(r.width * 100) / 100,
      height: Math.round(r.height * 100) / 100,
      ownText,
      author: authorEl ? authorEl.getAttribute("data-author") : null,
      authorSelf: el.getAttribute("data-author"),
      contentRole: roleEl ? roleEl.getAttribute("data-content-role") : null,
      contentRoleSelf: el.getAttribute("data-content-role"),
      uiRole: el.getAttribute("data-ui-role"),
      area: areaEl ? areaEl.getAttribute("data-area") : null,
      areas: (() => {
        const a = [];
        for (let e = el; e && e.nodeType === 1; e = e.parentElement) if (e.hasAttribute("data-area")) a.push(e.getAttribute("data-area"));
        return a;
      })(),
      originalId: el.getAttribute("data-original-id"),
      originalRef: el.getAttribute("data-original-ref"),
      innerText: (el.innerText || "").trim(),
      choice: el.getAttribute("data-choice"),
      isDefault: el.getAttribute("data-default") === "true",
      interactive: el.matches(opts.interactive),
      disabled: el.matches(opts.disabled),
      href: el.tagName === "A" ? el.getAttribute("href") : null,
      onImage: !!el.closest(`[${opts.onImageAttr}="true"]`),
      inImg,
      padding: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px),
      gap: [cs.rowGap, cs.columnGap].map((g) => (g === "normal" ? 0 : px(g))),
      radius: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      borders,
      fontSize: px(cs.fontSize),
      lineThrough: lineThrough(el),
      effectiveBg: effectiveBg(el),
      // 이 요소 안에서 data-choice 를 가진 자손 (S3 용)
      choices: el.hasAttribute("data-ui-role")
        ? [...el.querySelectorAll("[data-choice]")].map((c) => ({ choice: c.getAttribute("data-choice"), isDefault: c.getAttribute("data-default") === "true" }))
        : [],
    });
  }
  return { roots, elements };
}

// dir 안의 *.html 을 모두 추출한다. 반환: { screens: [{ file, roots, elements }] }
export async function extractDir(dir, base) {
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort()
    : [];
  const opts = {
    rootAttr: base.screen.root_attr,
    interactive: base.checks.B6.interactive,
    disabled: base.checks.B6.disabled,
    onImageAttr: base.checks.B7.on_image_attr,
  };
  const out = { extractedAt: new Date().toISOString(), dir, screens: [] };
  if (!files.length) return out;
  const browser = await puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ["--no-sandbox", "--allow-file-access-from-files"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: base.screen.width, height: base.screen.height });
    for (const f of files) {
      await page.goto(pathToFileURL(path.join(dir, f)).href, { waitUntil: "load" });
      const data = await page.evaluate(collect, opts);
      out.screens.push({ file: f, ...data });
    }
  } finally {
    await browser.close();
  }
  return out;
}
