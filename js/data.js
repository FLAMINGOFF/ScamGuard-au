/*
 * ScamGuard AU content.
 * Every phone number and URL in CONTACTS was checked against the official
 * source page listed in its `source` field (checked 27 Nov 2026).
 * Do not add a number or link without checking it against an official page.
 */

const CONTACTS = {
  emergency: {
    name: { zh: "紧急情况：000", en: "Emergency: 000" },
    desc: {
      zh: "你或别人正处于危险中、被人控制、被要求离开住处或“自我隔离”时，立即拨打。",
      en: "Call now if you or someone else is in danger, being controlled, or told to leave home or isolate yourself."
    },
    phone: "000",
    source: "https://www.police.vic.gov.au/report"
  },
  pal: {
    name: { zh: "警察协助热线（非紧急）", en: "Police Assistance Line (non-urgent)" },
    desc: {
      zh: "向澳洲警方报案（非紧急）。冒充中国警察、虚拟绑架等都应该报警。",
      en: "Report a crime to Australian police when it is not an emergency, including fake Chinese police calls and virtual kidnapping."
    },
    phone: "131 444",
    source: "https://www.police.vic.gov.au/report"
  },
  scamwatch: {
    name: { zh: "Scamwatch 举报诈骗", en: "Scamwatch: report a scam" },
    desc: {
      zh: "澳洲政府（ACCC）的诈骗举报平台。即使没有损失也可以举报，帮助其他人。",
      en: "The Australian Government's (ACCC) scam reporting service. Report even if you lost nothing."
    },
    url: "https://www.scamwatch.gov.au/report-a-scam",
    source: "https://www.scamwatch.gov.au/report-a-scam"
  },
  reportcyber: {
    name: { zh: "ReportCyber 网络犯罪报案", en: "ReportCyber" },
    desc: {
      zh: "如果你已经损失了钱、账号被盗或被网上勒索，在这里向澳洲网络安全中心（ACSC）报案。",
      en: "If you lost money, had an account hacked, or are being extorted online, report it to the Australian Cyber Security Centre."
    },
    url: "https://www.cyber.gov.au/report-and-recover/report",
    source: "https://www.vic.gov.au/report-cybercrime-and-online-scams"
  },
  idcare: {
    name: { zh: "IDCARE 身份盗用支援", en: "IDCARE (identity theft support)" },
    desc: {
      zh: "免费的非营利服务。护照、签证、银行卡信息泄露后，帮你制定补救计划。周一至周五 7am-7pm（AEST）。",
      en: "Free, not-for-profit. Helps you make a plan after your passport, visa or bank details are exposed. Mon to Fri, 7am to 7pm AEST."
    },
    phone: "1800 595 160",
    url: "https://www.idcare.org",
    source: "https://www.idcare.org/contact"
  },
  crimestoppers: {
    name: { zh: "Crime Stoppers（可匿名）", en: "Crime Stoppers (anonymous)" },
    desc: {
      zh: "可以匿名提供犯罪线索。",
      en: "Share information about a crime anonymously."
    },
    phone: "1800 333 000",
    source: "https://www.police.nsw.gov.au/crime_report"
  },
  tis: {
    name: { zh: "TIS 免费口译服务", en: "TIS National (interpreters)" },
    desc: {
      zh: "英语不够用时，拨打后说“Mandarin”，可以通过口译员联系政府机构和警察。",
      en: "If English is hard, call and ask for a Mandarin interpreter to talk to government services and police."
    },
    phone: "131 450",
    source: "https://www.police.nsw.gov.au/crime_report"
  },
  mara: {
    name: { zh: "查询注册移民代理（OMARA）", en: "Check a registered migration agent (OMARA)" },
    desc: {
      zh: "在澳洲，只有 OMARA 注册的移民代理（或律师）才能合法提供移民建议。签约前先在官方名册查。",
      en: "Only OMARA-registered migration agents (or lawyers) can legally give migration advice in Australia. Search the register before you sign."
    },
    url: "https://www.mara.gov.au/search-the-register-of-migration-agents/",
    source: "https://portal.mara.gov.au/enquiry/knowledgebase/article/KA-01007/en-us"
  },
  scamwatchLang: {
    name: { zh: "Scamwatch 中文资料", en: "Scamwatch in your language" },
    desc: {
      zh: "Scamwatch 官方的多语言（包括中文）防骗资料。",
      en: "Official Scamwatch scam information in other languages, including Chinese."
    },
    url: "https://www.scamwatch.gov.au/about-scamwatch/tools-resources/in-your-language",
    source: "https://www.scamwatch.gov.au/news/scammers-targeting-chinese-community-in-australia"
  },
  bank: {
    name: { zh: "你的银行", en: "Your bank" },
    desc: {
      zh: "转了账或给了卡号，马上打银行卡背面的电话，要求冻结卡和尝试追回款项。越快越好。",
      en: "If you paid or gave card details, call the number on the back of your card now. Ask them to block the card and try to recall the payment."
    },
    source: null
  },
  uni: {
    name: { zh: "你学校的学生支援 / 校园安保", en: "Your uni's student support and campus security" },
    desc: {
      zh: "所有澳洲大学都有国际学生支援、心理咨询和校园安保。号码在你学校官网或学生卡背面。",
      en: "Every Australian uni has international student support, counselling and campus security. Find the numbers on your uni website or student card."
    },
    source: null
  }
};

/* Scam catalogue */
const SCAMS = [
  {
    id: "fake-police",
    icon: "👮",
    title: { zh: "冒充中国警察 / 大使馆 / 公检法", en: "Fake Chinese police, embassy or officials" },
    summary: {
      zh: "说你涉嫌洗钱、护照被冒用、有包裹藏违禁品，要你“配合调查”或交“保证金”。",
      en: "They say you are linked to money laundering, a fake passport or a parcel, and you must 'cooperate' or pay 'bail'."
    },
    start: {
      zh: [
        "一个陌生号码打来，普通话录音或真人，自称快递公司（如 DHL）、大使馆、领事馆、公安局或“专案组”。",
        "说有一个寄给你名字的包裹里有假护照，或你的银行账户涉嫌犯罪。",
        "接着把电话“转接”给所谓的警察，对方可能报出你的姓名、护照号来让你相信。"
      ],
      en: [
        "A call from an unknown number, recorded or live, in Mandarin. They claim to be a courier (like DHL), the embassy, a consulate, police or a 'special investigations team'.",
        "They say a parcel in your name has fake passports in it, or your bank account is linked to a crime.",
        "They 'transfer' you to a so-called officer who may know your name or passport number."
      ]
    },
    flags: {
      zh: [
        "威胁要逮捕你、遣返你或影响你的签证。",
        "要求你只用微信、WhatsApp 或 QQ 联系，甚至视频“录口供”。",
        "要求你保密，不许告诉家人、朋友、学校、澳洲警察或大使馆。",
        "要你交“保证金”、“资金核查”或“优先调查费”。",
        "不停追问护照、银行卡、住址等个人信息。"
      ],
      en: [
        "Threats of arrest, deportation or visa cancellation.",
        "They want to talk only on WeChat, WhatsApp or QQ, even for a video 'statement'.",
        "You are told to keep it secret from family, friends, uni, Australian police and the embassy.",
        "They ask for 'bail', a 'fund check' or a 'priority investigation' fee.",
        "Repeated requests for your passport, bank and address details."
      ]
    },
    todo: {
      zh: [
        "直接挂断。中国警察不会打电话给在澳洲的你办案，更不会要你转账。",
        "不要回拨来电号码。骗子可以伪造成真实机构的号码。需要核实就自己去官网查电话。",
        "一分钱都不要转，也不要给任何个人或银行信息。",
        "告诉你信任的朋友或家人，然后向澳洲警察（131 444）和 Scamwatch 举报。"
      ],
      en: [
        "Hang up. Chinese police do not call you in Australia to run a case, and never ask you to transfer money.",
        "Do not call the number back. Scammers can fake real agency numbers. Look up the official number yourself.",
        "Do not send any money or give personal or bank details.",
        "Tell a friend or family member you trust, then report to Australian police (131 444) and Scamwatch."
      ]
    },
    contacts: ["pal", "scamwatch", "idcare"],
    sources: [
      "https://afp.gov.au/news-centre/media-release/scam-warning-complex-scams-targeting-australian-public-and-international",
      "https://www.scamwatch.gov.au/news/scammers-targeting-chinese-community-in-australia"
    ]
  },
  {
    id: "virtual-kidnapping",
    icon: "🚨",
    title: { zh: "虚拟绑架", en: "Virtual kidnapping" },
    summary: {
      zh: "冒充警察骗局的升级版：骗你“自我隔离”、拍“被绑”照片，再向你国内父母勒索赎金。",
      en: "An escalation of the fake police scam: you are pushed to isolate and stage 'kidnap' photos, then your parents are asked for ransom."
    },
    start: {
      zh: [
        "通常从上面的“冒充中国警察”电话开始。",
        "对方说你涉案，为了“保护你”或“配合调查”，要你搬到酒店或新住处、换手机号、不跟任何人联系。",
        "接着要求你拍被绑、受伤或很害怕的照片和视频，说是“办案需要”。",
        "骗子把这些照片发给你在国内的父母，说你被绑架了，要求高额赎金。真实案例中有家庭被骗 27 万澳元。"
      ],
      en: [
        "It usually starts with the 'fake Chinese police' call above.",
        "They say you are in a case and, to 'protect you', you must move to a hotel or new place, change your number and cut off contact with everyone.",
        "Then they ask you to film or photograph yourself tied up, hurt or scared, saying it is 'for the investigation'.",
        "They send the photos to your parents in China, say you have been kidnapped, and demand a big ransom. One family paid $270,000."
      ]
    },
    flags: {
      zh: [
        "任何人要你离开住处、切断联系、“消失”一段时间。",
        "要你拍“被绑”、“被打”的照片或视频。",
        "要你去外州或出国。",
        "家人突然收到你“被绑架”的消息，但联系不上你。",
        "要你替“警方”执行“任务”，比如控制或伤害别人。这本身在澳洲是犯罪。"
      ],
      en: [
        "Anyone telling you to leave home, cut contact, or 'disappear' for a while.",
        "Being asked to film or photograph yourself 'tied up' or 'hurt'.",
        "Being told to travel interstate or overseas.",
        "Family suddenly told you were kidnapped and cannot reach you.",
        "Being given 'missions' for the 'police', like holding or hurting someone. That is itself a crime in Australia."
      ]
    },
    todo: {
      zh: [
        "如果你正被要求隔离、搬走或拍照：马上拨打 000。你不会因为报警而惹上麻烦。",
        "立即联系你信任的朋友，并给国内家人报平安，让他们不要转钱。",
        "家人如果收到“绑架”消息：先想办法直接联系本人或其朋友、室友、学校，同时报警。",
        "不要执行对方的任何指令，不要去外州或出国。"
      ],
      en: [
        "If you are being told to isolate, move or take photos: call 000 now. You will not get in trouble for calling police.",
        "Contact a friend you trust right away, and tell your family at home you are safe and not to pay.",
        "If your family got a 'kidnap' message: try to reach the student directly, or their friends, flatmates or uni, and call police.",
        "Do not follow any of their instructions. Do not travel interstate or overseas."
      ]
    },
    contacts: ["emergency", "pal", "uni"],
    urgent: true,
    sources: [
      "https://www.sbs.com.au/news/article/inside-the-scam-coercing-scared-students-into-faking-their-own-kidnappings/8xigfy7iv",
      "https://www.student.unsw.edu.au/notices/2023/10/scam-warning-virtual-kidnappings-continue",
      "https://afp.gov.au/news-centre/media-release/scam-warning-complex-scams-targeting-australian-public-and-international"
    ]
  },
  {
    id: "rental",
    icon: "🏠",
    title: { zh: "假房东 / 租房押金诈骗", en: "Fake landlord and rental deposit scam" },
    summary: {
      zh: "房源又便宜位置又好，“房东在国外”不能看房，要你先转押金“锁房”。",
      en: "A cheap place in a great spot, the 'landlord is overseas' so no inspection, and you must pay a deposit to 'hold' it."
    },
    start: {
      zh: [
        "在小红书、微信群、Facebook、Gumtree 等看到价格明显低于周边的房源。",
        "房东说自己在外地或国外，不能带看，或者只发照片和视频。",
        "催你“很多人在问”，要你先转押金或几周房租才保留房子。"
      ],
      en: [
        "You see a listing well below nearby prices on Xiaohongshu, WeChat groups, Facebook or Gumtree.",
        "The 'landlord' is interstate or overseas and cannot show it, or only sends photos and videos.",
        "They rush you ('lots of people are asking') and want a deposit or weeks of rent before you see it."
      ]
    },
    flags: {
      zh: [
        "不能实地看房，或只能“远程视频看房”。",
        "要求转账到个人账户、海外账户、或用微信/支付宝/加密货币付款。",
        "不签正式租约，或拿不出能证明对方是业主/中介的文件。",
        "押金不按州政府规定存入官方押金机构（各州都有官方 bond 机构）。"
      ],
      en: [
        "No in-person inspection, or 'video inspection only'.",
        "Payment to a personal or overseas account, or via WeChat Pay, Alipay or crypto.",
        "No proper lease, and no proof they own or manage the property.",
        "The bond is not lodged with your state's official bond authority."
      ]
    },
    todo: {
      zh: [
        "看房前不付任何钱。自己去或请朋友去实地看。",
        "签正式租约，押金（bond）应交给州政府的官方押金机构，你会收到官方确认。",
        "已经转账：马上联系银行尝试追回，然后向 Scamwatch 举报。",
        "保留所有聊天记录、转账截图和房源链接。"
      ],
      en: [
        "Do not pay anything before you inspect. Go yourself or send a friend.",
        "Sign a proper lease. The bond should go to your state's official bond authority, and you should get an official receipt.",
        "Already paid? Call your bank now to try to recall it, then report to Scamwatch.",
        "Keep all chats, payment screenshots and listing links."
      ]
    },
    contacts: ["bank", "scamwatch", "reportcyber"],
    sources: ["https://www.scamwatch.gov.au/report-a-scam"]
  },
  {
    id: "visa-agent",
    icon: "🛂",
    title: { zh: "假中介 / 代办签证诈骗", en: "Fake visa or migration agent" },
    summary: {
      zh: "保证“包过”签证、包 PR、“内部渠道”，收了钱就消失，或者帮你递交虚假材料。",
      en: "Guaranteed visas or PR, 'inside contacts', then they vanish with the money or lodge false documents for you."
    },
    start: {
      zh: [
        "朋友圈、微信群或小红书广告：“100% 包过”、“内部关系”、“不用 IELTS”。",
        "对方不是注册移民代理，但收高额“服务费”。",
        "有时冒充移民局（Home Affairs）打电话，说你签证有问题要马上交钱。"
      ],
      en: [
        "Ads on WeChat Moments, groups or Xiaohongshu: '100% success', 'inside contacts', 'no IELTS needed'.",
        "They are not registered migration agents but charge big 'service fees'.",
        "Sometimes they pretend to be Home Affairs and say your visa has a problem that needs payment now."
      ]
    },
    flags: {
      zh: [
        "承诺签证一定能下来。没有任何人能保证签证结果。",
        "在官方 OMARA 名册上查不到这个代理。",
        "要你提供虚假材料，或让你不要看申请内容。",
        "要你把 ImmiAccount 密码交给他们，或付款到个人账户。"
      ],
      en: [
        "A promise that the visa will be granted. Nobody can guarantee a visa outcome.",
        "The agent is not on the official OMARA register.",
        "They want to use false documents, or tell you not to read your application.",
        "They want your ImmiAccount password, or payment to a personal account."
      ]
    },
    todo: {
      zh: [
        "签约前在 OMARA 官方名册查注册号和姓名。",
        "自己保管 ImmiAccount 密码，所有材料自己看过再提交。",
        "如果有人“打电话说签证有问题”，挂断后自己登录 ImmiAccount 或去 Home Affairs 官网核实。",
        "非法移民服务可以向 Home Affairs 的 Border Watch 举报。"
      ],
      en: [
        "Search the official OMARA register for their name and number before signing anything.",
        "Keep your ImmiAccount password yourself and read every document before it is lodged.",
        "If someone calls about a 'visa problem', hang up and check your ImmiAccount or the Home Affairs website yourself.",
        "Unlawful immigration help can be reported to Home Affairs via Border Watch."
      ]
    },
    contacts: ["mara", "scamwatch"],
    extraLinks: [
      {
        name: { zh: "Border Watch 举报非法移民服务", en: "Border Watch (report unlawful immigration help)" },
        url: "https://www.homeaffairs.gov.au/help-and-support/departmental-forms/online-forms/border-watch?offenceType=immigration"
      }
    ],
    sources: [
      "https://www.mara.gov.au/get-help-with-a-visa/help-from-registered-agents/steps-to-choose",
      "https://portal.mara.gov.au/enquiry/knowledgebase/article/KA-01007/en-us"
    ]
  },
  {
    id: "gov-impersonation",
    icon: "🏛️",
    title: { zh: "冒充澳洲税务局 / 政府机构", en: "Fake ATO or Australian government calls" },
    summary: {
      zh: "说你欠税、要被逮捕或遣返，要求马上用礼品卡、比特币或转账付“罚款”。",
      en: "You 'owe tax' or face arrest or deportation, and must pay a 'fine' now with gift cards, Bitcoin or a transfer."
    },
    start: {
      zh: [
        "自动语音或真人来电，自称 ATO（税务局）、移民局或警察。",
        "说你逃税或有未付罚款，不马上付就会被逮捕、遣返。"
      ],
      en: [
        "A robocall or live call claiming to be the ATO, Home Affairs or police.",
        "They say you avoided tax or have an unpaid fine and will be arrested or deported unless you pay now."
      ]
    },
    flags: {
      zh: [
        "要求用比特币、iTunes / Google Play / Steam 礼品卡、代金券或电汇付款。政府机构从来不会这样收钱。",
        "要你一直保持通话，不许挂断。",
        "威胁逮捕或遣返。"
      ],
      en: [
        "Payment by Bitcoin, iTunes, Google Play or Steam cards, vouchers or wire transfer. Government agencies never ask for this.",
        "You must stay on the line and not hang up.",
        "Threats of arrest or deportation."
      ]
    },
    todo: {
      zh: [
        "挂断。自己去官网找电话再打回去核实。",
        "不要买礼品卡，不要转账。",
        "向 Scamwatch 举报。"
      ],
      en: [
        "Hang up. Find the official number yourself and call back to check.",
        "Do not buy gift cards or transfer money.",
        "Report it to Scamwatch."
      ]
    },
    contacts: ["scamwatch"],
    sources: ["https://afp.gov.au/news-centre/media-release/scam-warning-complex-scams-targeting-australian-public-and-international"]
  },
  {
    id: "phishing-sms",
    icon: "📦",
    title: { zh: "快递 / 过路费 / 罚单 钓鱼短信", en: "Parcel, toll and fine text scams" },
    summary: {
      zh: "短信说你的包裹派送失败、有未付过路费或罚单，附一个链接让你填资料付款。",
      en: "A text says your parcel failed delivery or you have an unpaid toll or fine, with a link to pay."
    },
    start: {
      zh: [
        "收到看起来像 Australia Post、快递公司、收费公路或州政府的短信或邮件。",
        "链接打开是一个仿冒的官网，要你填卡号、验证码或登录信息。"
      ],
      en: [
        "A text or email that looks like it is from Australia Post, a courier, a toll road or a state agency.",
        "The link opens a fake website asking for card details, a one-time code or your login."
      ]
    },
    flags: {
      zh: [
        "网址很奇怪，不是对方的官方域名。",
        "催你“24 小时内处理”否则加罚。",
        "要你提供银行发来的验证码。任何人都不应该问你要验证码。"
      ],
      en: [
        "The web address is odd and not the official domain.",
        "Pressure to act 'within 24 hours' or pay more.",
        "They ask for a code your bank sent you. Nobody should ever ask for that."
      ]
    },
    todo: {
      zh: [
        "不要点链接。自己打开官方 App 或官网查。",
        "已经填了卡号或验证码：马上打电话给银行冻结卡。",
        "已经填了密码：立刻改密码并开启两步验证。",
        "向 Scamwatch 举报；身份信息泄露可以联系 IDCARE。"
      ],
      en: [
        "Do not tap the link. Open the official app or type the website yourself.",
        "Entered card details or a code? Call your bank now to block the card.",
        "Entered a password? Change it now and turn on two-step verification.",
        "Report to Scamwatch. If your identity details leaked, contact IDCARE."
      ]
    },
    contacts: ["bank", "scamwatch", "idcare"],
    sources: ["https://www.scamwatch.gov.au/report-a-scam"]
  },
  {
    id: "jobs",
    icon: "💼",
    title: { zh: "兼职刷单 / 高薪工作诈骗", en: "Task, 'easy money' and job scams" },
    summary: {
      zh: "在家点赞、刷单、做“任务”就能赚钱，先给你一点甜头，再要你“充值”才能提现。",
      en: "Get paid to like posts or complete 'tasks' online. You get a small payout first, then must 'top up' to withdraw."
    },
    start: {
      zh: [
        "微信、WhatsApp 或 Telegram 上陌生人主动联系，或者群里发“轻松兼职”。",
        "前几单真的给你钱，让你相信。",
        "然后说你“任务”卡住了，要先充值或交保证金才能拿回钱。"
      ],
      en: [
        "A stranger messages you on WeChat, WhatsApp or Telegram, or a group posts an 'easy side job'.",
        "The first few tasks really pay, so you trust it.",
        "Then your 'task' is stuck and you must top up or pay a deposit to get your money back."
      ]
    },
    flags: {
      zh: [
        "工作内容简单但报酬高得不正常。",
        "要你先付钱才能“工作”或提现。",
        "要你用自己的银行账户帮别人“收款、转款”。这可能让你变成洗钱的“钱骡”，要承担法律责任。"
      ],
      en: [
        "Simple work with pay that is far too high.",
        "You must pay before you can 'work' or withdraw.",
        "You are asked to receive and pass on money through your bank account. That can make you a 'money mule' and you can be held legally responsible."
      ]
    },
    todo: {
      zh: [
        "停止充值。已经投入的钱不会因为再充值就拿回来。",
        "不要借出你的银行账户、银行卡或身份信息。",
        "联系银行，向 ReportCyber 报案。"
      ],
      en: [
        "Stop paying in. More top-ups will not get your money back.",
        "Never lend your bank account, card or ID to anyone.",
        "Call your bank and report it to ReportCyber."
      ]
    },
    contacts: ["bank", "reportcyber", "scamwatch"],
    sources: ["https://www.scamwatch.gov.au/report-a-scam"]
  },
  {
    id: "investment-romance",
    icon: "💔",
    title: { zh: "“杀猪盘”：交友 + 投资诈骗", en: "Romance and investment scams" },
    summary: {
      zh: "网上认识的“完美对象”，聊了几周后带你“一起投资”加密货币或外汇平台。",
      en: "A 'perfect match' you met online, who after weeks of chatting gets you to 'invest together' in crypto or forex."
    },
    start: {
      zh: [
        "在社交软件、交友 App，甚至“加错微信”认识一个人。",
        "对方每天嘘寒问暖，展示自己的投资收益。",
        "带你在某个 App 或网站上投资，前期账面赚很多，但提现时要交“税”或“手续费”。"
      ],
      en: [
        "You meet someone on social media, a dating app, or a 'wrong number' message.",
        "They chat every day and show off their investment profits.",
        "They get you onto an app or website where your balance grows fast, but withdrawing needs 'tax' or a 'fee'."
      ]
    },
    flags: {
      zh: [
        "从没见过面，视频总有理由推掉。",
        "投资平台是对方介绍的，不是正规知名机构。",
        "提现要先交钱。"
      ],
      en: [
        "You have never met, and they always avoid video calls.",
        "The investment platform came from them, not a known licensed company.",
        "You must pay to withdraw."
      ]
    },
    todo: {
      zh: [
        "停止转账，不要再交任何“手续费”。",
        "联系银行，保留所有聊天和转账记录，向 ReportCyber 报案。",
        "这不是你的错。可以找学校的心理咨询聊一聊。"
      ],
      en: [
        "Stop sending money and do not pay any more 'fees'.",
        "Call your bank, keep all chats and payment records, and report to ReportCyber.",
        "It is not your fault. Your uni counselling service can help."
      ]
    },
    contacts: ["bank", "reportcyber", "uni"],
    sources: ["https://www.scamwatch.gov.au/report-a-scam"]
  }
];

/*
 * "What should I do now?" decision flow.
 * Node types: question (options -> next) or result (steps + contacts).
 */
const FLOW = {
  start: {
    q: { zh: "现在发生了什么？", en: "What is happening right now?" },
    options: [
      { label: { zh: "有人要我离开住处、不跟任何人联系、或者拍“被绑”照片", en: "Someone wants me to leave home, cut contact, or take 'kidnap' photos" }, next: "danger" },
      { label: { zh: "有人自称警察 / 大使馆 / 移民局 / 税务局打给我", en: "Someone claiming to be police, embassy, Home Affairs or ATO contacted me" }, next: "authority" },
      { label: { zh: "家人说收到我“被绑架”的消息", en: "My family got a message saying I was 'kidnapped'" }, next: "familyKidnap" },
      { label: { zh: "我已经转了钱", en: "I already sent money" }, next: "paid" },
      { label: { zh: "我给出了护照、银行卡、密码或验证码", en: "I gave out my passport, card, password or a code" }, next: "info" },
      { label: { zh: "租房 / 中介 / 兼职 / 投资，感觉不对劲", en: "A rental, agent, job or investment feels off" }, next: "offer" }
    ]
  },
  authority: {
    q: { zh: "你已经转账或给出个人信息了吗？", en: "Have you sent money or given personal details?" },
    options: [
      { label: { zh: "还没有", en: "Not yet" }, next: "authorityNoLoss" },
      { label: { zh: "转了钱", en: "I sent money" }, next: "paid" },
      { label: { zh: "给了信息，没转钱", en: "I gave details but no money" }, next: "info" },
      { label: { zh: "他们要我搬走或不和别人联系", en: "They want me to move or stop talking to people" }, next: "danger" }
    ]
  },
  offer: {
    q: { zh: "是哪一种？", en: "Which one?" },
    options: [
      { label: { zh: "租房：要先付押金才能看房 / 不能看房", en: "Rental: pay before inspecting, or no inspection" }, next: "rental" },
      { label: { zh: "签证中介：保证包过 / 内部渠道", en: "Visa agent: guaranteed result or 'inside contacts'" }, next: "agent" },
      { label: { zh: "兼职或投资：要先充值 / 交费才能提现", en: "Job or investment: top up or pay a fee to withdraw" }, next: "topup" }
    ]
  },
  danger: {
    result: true,
    level: "urgent",
    title: { zh: "你可能正处于“虚拟绑架”骗局中。现在就拨打 000。", en: "This looks like a virtual kidnapping scam. Call 000 now." },
    steps: {
      zh: [
        "拨打 000，告诉警察有人冒充中国警方在控制你。你不会因此惹麻烦。",
        "不要执行对方任何指令，不要拍照、不要去外州或出国。",
        "马上联系一个你信任的朋友，告诉对方你在哪里。",
        "给国内家人报平安，告诉他们无论收到什么都不要转钱。"
      ],
      en: [
        "Call 000 and tell police someone pretending to be Chinese police is controlling you. You will not get in trouble.",
        "Do not follow their instructions. Do not take photos or travel interstate or overseas.",
        "Contact a friend you trust now and tell them where you are.",
        "Tell your family at home you are safe and not to pay anything, whatever they hear."
      ]
    },
    contacts: ["emergency", "pal", "uni"],
    scam: "virtual-kidnapping"
  },
  familyKidnap: {
    result: true,
    level: "urgent",
    title: { zh: "很可能是虚拟绑架。先确认安全，不要付赎金。", en: "Very likely virtual kidnapping. Confirm safety first and do not pay." },
    steps: {
      zh: [
        "马上给家人回电话或视频，让他们看到你平安。",
        "告诉家人不要给任何人转钱，并让家人在国内也报警。",
        "如果是你的朋友失联：联系对方的室友、学校，并拨打 000 报警。",
        "向澳洲警察报案（131 444）。"
      ],
      en: [
        "Call or video your family right now so they can see you are safe.",
        "Tell them not to pay anyone, and to report it to police at home too.",
        "If it is a friend who cannot be reached: contact their flatmates and uni, and call 000.",
        "Report to Australian police on 131 444."
      ]
    },
    contacts: ["emergency", "pal", "uni"],
    scam: "virtual-kidnapping"
  },
  authorityNoLoss: {
    result: true,
    level: "ok",
    title: { zh: "挂断，你目前是安全的。", en: "Hang up. You are safe for now." },
    steps: {
      zh: [
        "挂断电话，拉黑号码。不要回拨。",
        "真正的中国警察不会打电话给在澳洲的你办案，任何政府机构都不会要你通过电话转账。",
        "如果担心是真的，自己去官网查电话再打过去核实。",
        "向 Scamwatch 举报，帮助其他同学。"
      ],
      en: [
        "Hang up and block the number. Do not call back.",
        "Real Chinese police do not call you in Australia about a case, and no government agency asks you to transfer money by phone.",
        "If you are worried it might be real, look up the official number yourself and call it.",
        "Report it to Scamwatch to help other students."
      ]
    },
    contacts: ["scamwatch", "pal"],
    scam: "fake-police"
  },
  paid: {
    result: true,
    level: "warn",
    title: { zh: "立刻行动，越快越有机会追回。", en: "Act now. The faster you move, the better the chance of recovery." },
    steps: {
      zh: [
        "马上打电话给你的银行（卡背面的号码），说你被诈骗了，要求冻结和追回这笔转账。",
        "停止继续付款。骗子会说“再交一笔就退款”，那是假的。",
        "截图保存所有聊天记录、转账记录、对方账号和电话。",
        "在 ReportCyber 报案，并向 Scamwatch 举报。",
        "如果护照、签证或银行信息也给出去了，联系 IDCARE。"
      ],
      en: [
        "Call your bank now (number on the back of your card). Say you were scammed and ask them to stop and recall the payment.",
        "Stop paying. Scammers will say 'one more payment and you get a refund'. That is a lie.",
        "Screenshot all chats, payment records, and the scammer's accounts and numbers.",
        "Report on ReportCyber, and to Scamwatch.",
        "If you also gave passport, visa or bank details, contact IDCARE."
      ]
    },
    contacts: ["bank", "reportcyber", "scamwatch", "idcare"]
  },
  info: {
    result: true,
    level: "warn",
    title: { zh: "尽快锁住账户，防止身份被盗用。", en: "Lock things down fast to stop identity theft." },
    steps: {
      zh: [
        "给了银行卡号或验证码：马上打电话给银行冻结卡。",
        "给了密码：立刻改密码（包括用同一个密码的其他账号），开启两步验证。",
        "给了护照或签证信息：联系 IDCARE（1800 595 160），他们会帮你做补救计划。",
        "注意之后的可疑电话和短信，骗子可能会用这些信息再骗你。",
        "向 Scamwatch 举报。"
      ],
      en: [
        "Gave a card number or code: call your bank now to block the card.",
        "Gave a password: change it now (and anywhere you reuse it), and turn on two-step verification.",
        "Gave passport or visa details: call IDCARE on 1800 595 160 for a recovery plan.",
        "Watch for follow-up calls and texts. Scammers may use your details to try again.",
        "Report to Scamwatch."
      ]
    },
    contacts: ["bank", "idcare", "scamwatch"]
  },
  rental: {
    result: true,
    level: "warn",
    title: { zh: "很可能是假房东。看房前别付钱。", en: "Likely a fake landlord. Do not pay before inspecting." },
    steps: {
      zh: [
        "坚持实地看房，自己去或请朋友去。",
        "只签正式租约，押金交到州政府官方押金机构。",
        "已经转账：马上联系银行，再向 Scamwatch 举报。"
      ],
      en: [
        "Insist on an in-person inspection, by you or a friend.",
        "Only sign a proper lease, and pay the bond to your state's official bond authority.",
        "Already paid? Call your bank now, then report to Scamwatch."
      ]
    },
    contacts: ["bank", "scamwatch"],
    scam: "rental"
  },
  agent: {
    result: true,
    level: "warn",
    title: { zh: "先在 OMARA 官方名册查这个中介。", en: "Check this agent on the official OMARA register first." },
    steps: {
      zh: [
        "在 OMARA 名册搜索对方的名字和注册号，查不到就不要签约。",
        "没有人能保证签证结果，“包过”就是危险信号。",
        "不要把 ImmiAccount 密码给任何人。"
      ],
      en: [
        "Search the OMARA register for their name and number. If they are not there, do not sign.",
        "Nobody can guarantee a visa. A 'guaranteed' result is a red flag.",
        "Never give anyone your ImmiAccount password."
      ]
    },
    contacts: ["mara", "scamwatch"],
    scam: "visa-agent"
  },
  topup: {
    result: true,
    level: "warn",
    title: { zh: "这是典型骗局。停止充值。", en: "This is a classic scam. Stop paying in." },
    steps: {
      zh: [
        "不要再充值或交“手续费”、“税”，钱不会因此回来。",
        "联系银行，保留所有记录，在 ReportCyber 报案。",
        "不要把银行账户借给别人收款转款。"
      ],
      en: [
        "Do not top up or pay any 'fee' or 'tax'. It will not bring your money back.",
        "Call your bank, keep all records, and report on ReportCyber.",
        "Never let anyone use your bank account to move money."
      ]
    },
    contacts: ["bank", "reportcyber", "scamwatch"],
    scam: "jobs"
  }
};
