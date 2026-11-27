# ScamGuard AU 澳洲留学生防骗指南

[![CI](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml/badge.svg)](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml)
[![Lighthouse performance](https://img.shields.io/endpoint?url=https%3A%2F%2Fflamingoff.github.io%2Fscamguard-au%2Fbadges%2Fperformance.json)](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml)
[![Lighthouse accessibility](https://img.shields.io/endpoint?url=https%3A%2F%2Fflamingoff.github.io%2Fscamguard-au%2Fbadges%2Faccessibility.json)](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml)
[![Lighthouse best practices](https://img.shields.io/endpoint?url=https%3A%2F%2Fflamingoff.github.io%2Fscamguard-au%2Fbadges%2Fbest-practices.json)](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml)
[![Lighthouse SEO](https://img.shields.io/endpoint?url=https%3A%2F%2Fflamingoff.github.io%2Fscamguard-au%2Fbadges%2Fseo.json)](https://github.com/FLAMINGOFF/scamguard-au/actions/workflows/ci.yml)

专为在澳中国留学生整理的中英双语防骗网站。A bilingual (Chinese / English) scam safety guide for Chinese international students in Australia.

**紧急情况请拨打 000。In an emergency, call 000.**

## 功能 Features

- **骗局图鉴 Scam types**：8 类常见骗局（冒充中国警察/大使馆、虚拟绑架、假房东、假签证中介、冒充 ATO、钓鱼短信、兼职刷单、杀猪盘），每类写清楚怎么开始、危险信号、遇到了怎么办。
- **我现在该怎么办 Self-check**：回答几个问题，直接告诉你下一步做什么。回答不会被保存或上传。
- **求助与举报 Get help**：000、警察协助热线 131 444、Scamwatch、ReportCyber、IDCARE、Crime Stoppers、TIS 口译、OMARA 移民代理名册。
- **中英切换 zh / en toggle**：记住你的选择，也可以用 `?lang=en` 直接打开英文版。

## 信息核实 Verified contacts

所有电话和网址都对照官方页面核实过（2026 年 11 月），来源记录在 [`js/data.js`](js/data.js) 每一项的 `source` 字段。新增号码前必须先找到官方来源。
Every number and link was checked against an official page (November 2026). The source is recorded next to each entry in `js/data.js`.

本站不提供中国驻澳使领馆电话：请从使领馆官网自己查，不要用来电者给的号码。

## 本地运行 Run locally

纯静态网站，没有构建步骤。No build step.

```bash
python3 -m http.server 4173   # then open http://localhost:4173
```

## 测试 Tests

```bash
npm ci
npm run test:unit                      # 内容完整性：中英对应、链接来源、自查流程没有死路
npx playwright install chromium
npm run test:e2e                       # 端到端 + axe 无障碍检查（中/英 × 浅色/深色 × 桌面/手机）
npm run lighthouse                     # Lighthouse：性能/SEO/最佳实践 ≥ 90，无障碍 = 100
```

## CI 和部署 CI and deployment

`.github/workflows/ci.yml` 在每次 push 和 PR 时运行测试、无障碍检查和 Lighthouse。推送到 `main` 后自动部署到 GitHub Pages，并更新上面的 Lighthouse 徽章。

首次部署需要：仓库 **Settings → Pages → Source** 选 **GitHub Actions**。私有仓库开 Pages 需要 GitHub Pro（学生包免费），或者把仓库改为公开。

## 免责声明 Disclaimer

个人公益项目，不是政府网站，不构成法律意见。A personal community project, not a government site, and not legal advice.
