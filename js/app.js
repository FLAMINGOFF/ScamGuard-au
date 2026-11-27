/* ScamGuard AU: tiny hash router, language toggle and self-check flow. No dependencies. */
(function () {
  "use strict";

  const UI = {
    siteName: { zh: "澳洲留学生防骗指南", en: "ScamGuard AU" },
    tagline: {
      zh: "专为在澳中国留学生整理的防骗信息。遇到可疑电话、短信、租房或中介，先来这里查。",
      en: "Scam safety for Chinese international students in Australia. Got a strange call, text, rental or agent? Check here first."
    },
    navHome: { zh: "首页", en: "Home" },
    navScams: { zh: "骗局图鉴", en: "Scam types" },
    navCheck: { zh: "我现在该怎么办", en: "What do I do now?" },
    navHelp: { zh: "求助与举报", en: "Get help" },
    langBtn: { zh: "English", en: "中文" },
    langBtnLabel: { zh: "Switch to English", en: "切换到中文" },
    skip: { zh: "跳到正文", en: "Skip to content" },
    dangerBanner: {
      zh: "有危险，或有人要你离开住处、切断联系？立即拨打 000。",
      en: "In danger, or told to leave home or cut off contact? Call 000 now."
    },
    bannerLabel: { zh: "紧急提示", en: "Emergency notice" },
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
    howStarts: { zh: "通常怎么开始", en: "How it usually starts" },
    redFlags: { zh: "危险信号", en: "Red flags" },
    whatToDo: { zh: "遇到了怎么办", en: "What to do" },
    whoToContact: { zh: "联系谁", en: "Who to contact" },
    sources: { zh: "信息来源", en: "Sources" },
    readMore: { zh: "查看详情", en: "Read more" },
    back: { zh: "← 返回骗局图鉴", en: "← Back to scam types" },
    restart: { zh: "重新开始", en: "Start over" },
    stepBack: { zh: "← 上一步", en: "← Back" },
    learnMore: { zh: "了解这种骗局", en: "Learn about this scam" },
    checkIntro: {
      zh: "回答几个问题，告诉你现在最该做什么。不会保存你的任何回答。",
      en: "Answer a few questions to get clear next steps. Nothing you choose is saved or sent anywhere."
    },
    helpIntro: {
      zh: "以下号码和网址都已对照官方页面核实。紧急情况一律拨打 000。",
      en: "Every number and link below was checked against an official page. In an emergency, always call 000."
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

  function telHref(phone) { return "tel:" + phone.replace(/\s+/g, ""); }

  function contactCard(key, hl) {
    const h = hl || "h3";
    const c = CONTACTS[key];
    if (!c) return "";
    let actions = "";
    if (c.phone) {
      actions += `<a class="btn btn-call" href="${telHref(c.phone)}">${esc(t(UI.call))} <span class="num">${esc(c.phone)}</span></a>`;
    }
    if (c.url) {
      actions += `<a class="btn btn-link" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(t(UI.visit))}<span class="sr-only"> ${esc(t(UI.opensNew))}</span></a>`;
    }
    return `<li class="contact${key === "emergency" ? " contact-urgent" : ""}">
      <${h}>${esc(t(c.name))}</${h}>
      <p>${esc(t(c.desc))}</p>
      ${actions ? `<div class="actions">${actions}</div>` : ""}
    </li>`;
  }

  function list(items, ordered) {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</${tag}>`;
  }

  /* Views */
  function viewHome() {
    return `
      <section class="hero">
        <h1>${esc(t(UI.siteName))}</h1>
        <p class="lead">${esc(t(UI.tagline))}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/check">${esc(t(UI.ctaCheck))}</a>
          <a class="btn btn-secondary" href="#/scams">${esc(t(UI.ctaScams))}</a>
        </div>
      </section>
      <section class="rules" aria-labelledby="rules-h">
        <h2 id="rules-h">${esc(t(UI.homeRulesTitle))}</h2>
        ${list(t(UI.homeRules), true)}
      </section>
      <section aria-labelledby="types-h">
        <h2 id="types-h">${esc(t(UI.navScams))}</h2>
        ${scamGrid()}
      </section>`;
  }

  function scamGrid(hl) {
    const h = hl || "h3";
    return `<ul class="grid">${SCAMS.map((s) => `
      <li class="card${s.urgent ? " card-urgent" : ""}">
        <a href="#/scams/${s.id}">
          <span class="icon" aria-hidden="true">${s.icon}</span>
          <${h}>${esc(t(s.title))}</${h}>
          <p>${esc(t(s.summary))}</p>
          <span class="more">${esc(t(UI.readMore))} →</span>
        </a>
      </li>`).join("")}</ul>`;
  }

  function viewScams() {
    return `<h1>${esc(t(UI.navScams))}</h1>${scamGrid("h2")}`;
  }

  function viewScam(id) {
    const s = SCAMS.find((x) => x.id === id);
    if (!s) return viewNotFound();
    const extra = (s.extraLinks || []).map((l) =>
      `<li class="contact"><h3>${esc(t(l.name))}</h3><div class="actions"><a class="btn btn-link" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(t(UI.visit))}<span class="sr-only"> ${esc(t(UI.opensNew))}</span></a></div></li>`).join("");
    return `
      <p><a href="#/scams">${esc(t(UI.back))}</a></p>
      <article class="scam">
        <h1><span aria-hidden="true">${s.icon}</span> ${esc(t(s.title))}</h1>
        <p class="lead">${esc(t(s.summary))}</p>
        <section class="block"><h2>${esc(t(UI.howStarts))}</h2>${list(t(s.start))}</section>
        <section class="block block-flags"><h2>${esc(t(UI.redFlags))}</h2>${list(t(s.flags))}</section>
        <section class="block block-todo"><h2>${esc(t(UI.whatToDo))}</h2>${list(t(s.todo), true)}</section>
        <section class="block"><h2>${esc(t(UI.whoToContact))}</h2><ul class="contacts">${s.contacts.map((k) => contactCard(k)).join("")}${extra}</ul></section>
        <details class="sources"><summary>${esc(t(UI.sources))}</summary>
          <ul>${s.sources.map((u) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(u)}</a></li>`).join("")}</ul>
        </details>
      </article>`;
  }

  function viewHelp() {
    const order = ["emergency", "pal", "bank", "scamwatch", "reportcyber", "idcare", "crimestoppers", "tis", "mara", "scamwatchLang", "uni"];
    return `
      <h1>${esc(t(UI.navHelp))}</h1>
      <p class="lead">${esc(t(UI.helpIntro))}</p>
      <ul class="contacts">${order.map((k) => contactCard(k, "h2")).join("")}</ul>
      <p class="note">${esc(t(UI.embassyNote))}</p>`;
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
          <h2>${esc(t(node.title))}</h2>
          ${list(t(node.steps), true)}
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
        <fieldset class="question">
          <legend><h2>${esc(t(node.q))}</h2></legend>
          <ul class="options">${node.options.map((o) => `<li><a class="option" href="${base}${o.next}">${esc(t(o.label))}</a></li>`).join("")}</ul>
        </fieldset>`;
    }
    return `
      <h1>${esc(t(UI.navCheck))}</h1>
      ${path.length ? "" : `<p class="lead">${esc(t(UI.checkIntro))}</p>`}
      ${body}
      ${backHref ? `<p><a href="${backHref}">${esc(t(UI.stepBack))}</a></p>` : ""}`;
  }

  function viewNotFound() {
    return `<h1>${esc(t(UI.notFound))}</h1><p><a href="#/">${esc(t(UI.navHome))}</a></p>`;
  }

  /* Shell */
  function renderChrome(active) {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en-AU";
    document.title = t(UI.siteName) + (lang === "zh" ? " | ScamGuard AU" : "");
    document.getElementById("skip").textContent = t(UI.skip);
    document.getElementById("brand").textContent = t(UI.siteName);
    document.getElementById("banner-text").textContent = t(UI.dangerBanner);
    document.getElementById("danger-banner").setAttribute("aria-label", t(UI.bannerLabel));
    document.getElementById("disclaimer").textContent = t(UI.disclaimer);
    const btn = document.getElementById("lang-toggle");
    btn.textContent = t(UI.langBtn);
    btn.setAttribute("aria-label", t(UI.langBtnLabel));
    btn.setAttribute("lang", lang === "zh" ? "en" : "zh-CN");
    const nav = [["#/", UI.navHome, "home"], ["#/scams", UI.navScams, "scams"], ["#/check", UI.navCheck, "check"], ["#/help", UI.navHelp, "help"]];
    document.getElementById("nav-list").innerHTML = nav.map(([href, label, key]) =>
      `<li><a href="${href}"${key === active ? ' aria-current="page"' : ""}>${esc(t(label))}</a></li>`).join("");
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
      if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus(); }
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
