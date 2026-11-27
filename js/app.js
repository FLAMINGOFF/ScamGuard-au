/* ScamGuard AU: tiny hash router, language toggle and self-check flow. No dependencies. */
(function () {
  "use strict";

  const UI = {
    siteName: { zh: "澳洲留学生防骗指南", en: "ScamGuard AU" },
    heroKicker: { zh: "ScamGuard AU · 免费 · 无需注册", en: "防骗指南 · Free · No sign-up" },
    heroTitle: { zh: "接到可疑电话？\n先别慌，先来这里查。", en: "Got a strange call?\nPause. Check here first." },
    tagline: {
      zh: "专为在澳中国留学生整理：冒充警察、虚拟绑架、假房东、假中介……告诉你怎么识别、现在该做什么、找谁帮忙。",
      en: "Made for Chinese international students in Australia: fake police, virtual kidnapping, fake landlords and agents. How to spot them, what to do now, and who can help."
    },
    navHome: { zh: "首页", en: "Home" },
    navScams: { zh: "骗局", en: "Scams" },
    navCheck: { zh: "自查", en: "Check" },
    navHelp: { zh: "求助", en: "Help" },
    pageScams: { zh: "骗局图鉴", en: "Scam types" },
    pageScamsLead: { zh: "在澳留学生最常遇到的 8 种骗局。点开看怎么开始、危险信号和应对方法。", en: "The 8 scams that most often target students in Australia. Open one to see how it starts, the red flags and what to do." },
    pageCheck: { zh: "我现在该怎么办", en: "What do I do now?" },
    pageHelp: { zh: "求助与举报", en: "Get help and report" },
    langBtn: { zh: "EN", en: "中文" },
    langBtnLabel: { zh: "Switch to English", en: "切换到中文" },
    skip: { zh: "跳到正文", en: "Skip to content" },
    bannerLabel: { zh: "紧急提示", en: "Emergency notice" },
    dangerBanner: {
      zh: "有危险，或被要求离家、断联？",
      en: "In danger, or told to leave home or cut contact?"
    },
    bannerCall: { zh: "拨打 000", en: "Call 000" },
    ctaCheck: { zh: "开始自查", en: "Start the self-check" },
    ctaScams: { zh: "看骗局图鉴", en: "Browse scam types" },
    homeRulesTitle: { zh: "记住这 4 条", en: "Remember these 4 rules" },
    homeRules: {
      zh: [
        "中国警察、大使馆不会打电话给在澳洲的你办案，更不会要你转账。",
        "任何人要你保密、不许告诉家人朋友，就是骗局。",
        "不回拨来电号码，自己去官网查电话核实。",
        "已经转账？第一时间打给银行。"
      ],
      en: [
        "Chinese police and the embassy do not call you in Australia about a case, and never ask for money.",
        "Anyone who tells you to keep it secret from family and friends is a scammer.",
        "Never call back the number that called you. Look up the official number yourself.",
        "Already paid? Call your bank first, right away."
      ]
    },
    homeHelpTitle: { zh: "需要马上找人帮忙？", en: "Need help right now?" },
    homeHelpText: { zh: "警察、银行、Scamwatch、IDCARE……所有号码都对照官方页面核实过。", en: "Police, your bank, Scamwatch, IDCARE. Every number is checked against an official page." },
    homeHelpCta: { zh: "查看求助渠道", en: "See who to contact" },
    highRisk: { zh: "高危", en: "High risk" },
    howStarts: { zh: "通常怎么开始", en: "How it usually starts" },
    redFlags: { zh: "危险信号", en: "Red flags" },
    whatToDo: { zh: "遇到了怎么办", en: "What to do" },
    whoToContact: { zh: "联系谁", en: "Who to contact" },
    sources: { zh: "信息来源", en: "Sources" },
    back: { zh: "骗局图鉴", en: "Scam types" },
    restart: { zh: "重新开始", en: "Start over" },
    stepBack: { zh: "上一步", en: "Back" },
    step: { zh: "第 {n} 步", en: "Step {n}" },
    yourPlan: { zh: "你的下一步", en: "Your next steps" },
    learnMore: { zh: "了解这种骗局", en: "About this scam" },
    checkIntro: {
      zh: "回答几个问题，告诉你现在最该做什么。不会保存你的任何回答。",
      en: "Answer a few questions to get clear next steps. Nothing you choose is saved or sent anywhere."
    },
    helpIntro: {
      zh: "以下号码和网址都已对照官方页面核实。紧急情况一律拨打 000。",
      en: "Every number and link below was checked against an official page. In an emergency, always call 000."
    },
    helpGroups: {
      urgent: { zh: "紧急与报警", en: "Emergency and police" },
      money: { zh: "钱和身份信息", en: "Money and identity" },
      report: { zh: "举报诈骗", en: "Report a scam" },
      more: { zh: "其他帮助", en: "More help" }
    },
    call: { zh: "拨打", en: "Call" },
    visit: { zh: "打开网站", en: "Open website" },
    opensNew: { zh: "（在新窗口打开）", en: "(opens in a new tab)" },
    embassyNote: {
      zh: "需要联系中国驻澳使领馆？请自己从使领馆官网查号码，不要使用来电者给你的号码。",
      en: "Need the Chinese embassy or a consulate? Find the number on its official website yourself. Never use a number a caller gives you."
    },
    disclaimer: {
      zh: "本站为个人公益项目，不是政府网站，不构成法律意见。信息核实日期：2026 年 11 月。",
      en: "A personal community project, not a government site, and not legal advice. Information checked November 2026."
    },
    notFound: { zh: "找不到这个页面。", en: "Page not found." }
  };

  /* Inline icons (stroke, 24px grid). Decorative: always aria-hidden. */
  const ICON = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
    scams: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    check: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    help: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    back: '<path d="m15 6-6 6 6 6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    start: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    todo: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>'
  };
  const icon = (name, cls) => `<svg class="ic${cls ? " " + cls : ""}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[name]}</svg>`;

  const LANG_KEY = "scamguard-lang";
  let lang = detectLang();

  function detectLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "zh" || q === "en") return q;
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) { /* storage blocked: fall through */ }
    return "zh";
  }

  const t = (obj) => (obj && obj[lang]) || "";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const br = (s) => esc(s).replace(/\n/g, "<br>");

  function telHref(phone) { return "tel:" + phone.replace(/\s+/g, ""); }

  function contactCard(key, hl) {
    const c = CONTACTS[key];
    if (!c) return "";
    const h = hl || "h3";
    let actions = "";
    if (c.phone) {
      actions += `<a class="btn btn-call" href="${telHref(c.phone)}">${icon("phone")}${esc(t(UI.call))} <span class="num">${esc(c.phone)}</span></a>`;
    }
    if (c.url) {
      actions += `<a class="btn btn-link" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(t(UI.visit))}${icon("external")}<span class="sr-only"> ${esc(t(UI.opensNew))}</span></a>`;
    }
    return `<li class="contact${key === "emergency" ? " contact-urgent" : ""}">
      <${h}>${esc(t(c.name))}</${h}>
      <p>${esc(t(c.desc))}</p>
      ${actions ? `<div class="actions">${actions}</div>` : ""}
    </li>`;
  }

  function list(items, ordered, cls) {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}${cls ? ` class="${cls}"` : ""}>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`;
  }

  function pageHead(title, lead) {
    return `<header class="page-head"><h1>${esc(title)}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ""}</header>`;
  }

  /* Views */
  function viewHome() {
    return `
      <section class="hero">
        <p class="kicker">${esc(t(UI.heroKicker))}</p>
        <h1>${br(t(UI.heroTitle))}</h1>
        <p class="hero-lead">${esc(t(UI.tagline))}</p>
        <div class="hero-actions">
          <a class="btn btn-hero" href="#/check">${icon("check")}${esc(t(UI.ctaCheck))}</a>
          <a class="btn btn-hero-ghost" href="#/scams">${esc(t(UI.ctaScams))}</a>
        </div>
      </section>
      <section class="section" aria-labelledby="rules-h">
        <h2 id="rules-h">${esc(t(UI.homeRulesTitle))}</h2>
        <ol class="rules">${t(UI.homeRules).map((r) => `<li>${esc(r)}</li>`).join("")}</ol>
      </section>
      <section class="section" aria-labelledby="types-h">
        <h2 id="types-h">${esc(t(UI.pageScams))}</h2>
        ${scamGrid()}
      </section>
      <section class="help-cta" aria-labelledby="helpcta-h">
        <div>
          <h2 id="helpcta-h">${esc(t(UI.homeHelpTitle))}</h2>
          <p>${esc(t(UI.homeHelpText))}</p>
        </div>
        <a class="btn btn-primary" href="#/help">${icon("help")}${esc(t(UI.homeHelpCta))}</a>
      </section>`;
  }

  function scamGrid(hl) {
    const h = hl || "h3";
    return `<ul class="grid">${SCAMS.map((s) => `
      <li class="card${s.urgent ? " card-urgent" : ""}">
        <a href="#/scams/${s.id}">
          <span class="card-icon" aria-hidden="true">${s.icon}</span>
          <span class="card-body">
            <${h}>${esc(t(s.title))}${s.urgent ? ` <span class="tag">${esc(t(UI.highRisk))}</span>` : ""}</${h}>
            <span class="card-text">${esc(t(s.summary))}</span>
          </span>
          ${icon("chevron", "card-chevron")}
        </a>
      </li>`).join("")}</ul>`;
  }

  function viewScams() {
    return `${pageHead(t(UI.pageScams), t(UI.pageScamsLead))}${scamGrid("h2")}`;
  }

  function viewScam(id) {
    const s = SCAMS.find((x) => x.id === id);
    if (!s) return viewNotFound();
    const extra = (s.extraLinks || []).map((l) =>
      `<li class="contact"><h3>${esc(t(l.name))}</h3><div class="actions"><a class="btn btn-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(t(UI.visit))}${icon("external")}<span class="sr-only"> ${esc(t(UI.opensNew))}</span></a></div></li>`).join("");
    return `
      <a class="crumb" href="#/scams">${icon("back")}${esc(t(UI.back))}</a>
      <article class="scam">
        <header class="scam-head${s.urgent ? " scam-head-urgent" : ""}">
          <span class="scam-icon" aria-hidden="true">${s.icon}</span>
          <h1>${esc(t(s.title))}</h1>
          <p class="lead">${esc(t(s.summary))}</p>
        </header>
        <section class="block"><h2>${icon("start")}${esc(t(UI.howStarts))}</h2>${list(t(s.start), true, "steps")}</section>
        <section class="block block-flags"><h2>${icon("flag")}${esc(t(UI.redFlags))}</h2>${list(t(s.flags), false, "flags")}</section>
        <section class="block block-todo"><h2>${icon("todo")}${esc(t(UI.whatToDo))}</h2>${list(t(s.todo), true, "todo")}</section>
        <section class="block block-plain"><h2>${icon("people")}${esc(t(UI.whoToContact))}</h2><ul class="contacts">${s.contacts.map((k) => contactCard(k)).join("")}${extra}</ul></section>
        <details class="sources"><summary>${esc(t(UI.sources))}</summary>
          <ul>${s.sources.map((u) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u)}</a></li>`).join("")}</ul>
        </details>
      </article>`;
  }

  function viewHelp() {
    const groups = [
      ["urgent", ["emergency", "pal"]],
      ["money", ["bank", "idcare"]],
      ["report", ["scamwatch", "reportcyber", "crimestoppers"]],
      ["more", ["tis", "mara", "scamwatchLang", "uni"]]
    ];
    return `
      ${pageHead(t(UI.pageHelp), t(UI.helpIntro))}
      ${groups.map(([g, keys]) => `
        <section class="section" aria-labelledby="g-${g}">
          <h2 id="g-${g}">${esc(t(UI.helpGroups[g]))}</h2>
          <ul class="contacts">${keys.map((k) => contactCard(k)).join("")}</ul>
        </section>`).join("")}
      <p class="note">${icon("globe")}<span>${esc(t(UI.embassyNote))}</span></p>`;
  }

  /* Self-check: path is stored in the hash, e.g. #/check/authority/paid */
  function viewCheck(path) {
    const nodeId = path.length ? path[path.length - 1] : "start";
    const node = FLOW[nodeId];
    if (!node) return viewNotFound();
    const backHref = path.length ? "#/check" + (path.length > 1 ? "/" + path.slice(0, -1).join("/") : "") : null;
    let body;
    if (node.result) {
      const scam = node.scam && SCAMS.find((s) => s.id === node.scam);
      body = `
        <div class="result result-${node.level}" role="status">
          <p class="result-label">${esc(t(UI.yourPlan))}</p>
          <h2>${esc(t(node.title))}</h2>
          ${list(t(node.steps), true, "todo")}
        </div>
        <h2>${esc(t(UI.whoToContact))}</h2>
        <ul class="contacts">${node.contacts.map((k) => contactCard(k)).join("")}</ul>
        <div class="flow-nav">
          ${scam ? `<a class="btn btn-secondary" href="#/scams/${scam.id}">${esc(t(UI.learnMore))}: ${esc(t(scam.title))}</a>` : ""}
          <a class="btn btn-secondary" href="#/check">${esc(t(UI.restart))}</a>
        </div>`;
    } else {
      const base = "#/check/" + (path.length ? path.join("/") + "/" : "");
      body = `
        <section class="question" aria-labelledby="q-h">
          <p class="step-label">${esc(t(UI.step).replace("{n}", path.length + 1))}</p>
          <h2 id="q-h">${esc(t(node.q))}</h2>
          <ul class="options">${node.options.map((o) => `<li><a class="option" href="${base}${o.next}"><span>${esc(t(o.label))}</span>${icon("chevron")}</a></li>`).join("")}</ul>
        </section>`;
    }
    return `
      ${pageHead(t(UI.pageCheck), path.length ? "" : t(UI.checkIntro))}
      ${body}
      ${backHref ? `<p><a class="crumb" href="${backHref}">${icon("back")}${esc(t(UI.stepBack))}</a></p>` : ""}`;
  }

  function viewNotFound() {
    return `${pageHead(t(UI.notFound))}<p><a href="#/">${esc(t(UI.navHome))}</a></p>`;
  }

  /* Shell */
  function renderChrome(active) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en-AU";
    document.title = t(UI.siteName) + (lang === "zh" ? " | ScamGuard AU" : "");
    document.getElementById("skip").textContent = t(UI.skip);
    document.getElementById("brand").textContent = t(UI.siteName);
    document.getElementById("banner-text").textContent = t(UI.dangerBanner);
    document.getElementById("banner-call").textContent = t(UI.bannerCall);
    document.getElementById("danger-banner").setAttribute("aria-label", t(UI.bannerLabel));
    document.getElementById("disclaimer").textContent = t(UI.disclaimer);
    const btn = document.getElementById("lang-toggle");
    btn.textContent = t(UI.langBtn);
    btn.setAttribute("aria-label", t(UI.langBtnLabel));
    btn.setAttribute("lang", lang === "zh" ? "en" : "zh-CN");
    const nav = [["#/", UI.navHome, "home"], ["#/scams", UI.navScams, "scams"], ["#/check", UI.navCheck, "check"], ["#/help", UI.navHelp, "help"]];
    document.getElementById("nav-list").innerHTML = nav.map(([href, label, key]) =>
      `<li><a href="${href}"${key === active ? ' aria-current="page"' : ""}>${icon(key)}<span>${esc(t(label))}</span></a></li>`).join("");
  }

  function route(focus) {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    let html, active;
    switch (parts[0]) {
      case undefined: html = viewHome(); active = "home"; break;
      case "scams": html = parts[1] ? viewScam(parts[1]) : viewScams(); active = "scams"; break;
      case "check": html = viewCheck(parts.slice(1)); active = "check"; break;
      case "help": html = viewHelp(); active = "help"; break;
      default: html = viewNotFound();
    }
    renderChrome(active);
    const main = document.getElementById("main");
    main.innerHTML = html;
    if (focus) {
      const h1 = main.querySelector("h1");
      if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
      window.scrollTo(0, 0);
    }
  }

  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
    route(false);
  });
  // The skip link must not change the hash, or the router would treat "#main" as a page.
  document.getElementById("skip").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("main").focus();
  });
  window.addEventListener("hashchange", () => route(true));
  route(false);
})();
