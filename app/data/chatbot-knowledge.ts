import type { Locale } from "../i18n";

type CategoryKey =
  | "web"
  | "agents"
  | "mobile"
  | "games"
  | "finance"
  | "automation";

type CategoryInfo = {
  terms: string[];
  summary: string;
  prices: string;
  durations: string;
  technologies: string;
};

const CATEGORY_INFO: Record<CategoryKey, CategoryInfo> = {
  web: {
    terms: [
      "web",
      "internet sitesi",
      "web sitesi",
      "kurumsal site",
      "landing page",
      "e-ticaret",
      "eticaret",
      "mağaza",
      "commerce",
    ],
    summary:
      "Web & E-Ticaret tarafında üç paket bulunuyor:\n• Launch Site — profesyonel marka veya kurumsal site\n• Commerce Pro — ürün, stok, sepet, ödeme ve sipariş altyapısı\n• Growth Platform — çok dil, CRM, kampanya ve büyüme otomasyonları",
    prices:
      "Web & E-Ticaret paketleri:\n• Launch Site: 24.000 ₺\n• Commerce Pro: 35.000 ₺\n• Growth Platform: 69.000 ₺\nNihai bütçe, keşif görüşmesinde kapsam ve entegrasyonlara göre netleşir.",
    durations:
      "Web & E-Ticaret teslim aralıkları:\n• Launch Site: 2–3 hafta\n• Commerce Pro: 3–5 hafta\n• Growth Platform: 6–9 hafta",
    technologies:
      "Web projelerinde ihtiyaca göre Next.js, TypeScript, Headless CMS, ödeme API'leri, Analytics, SEO araçları ve Vercel kullanılabilir.",
  },
  agents: {
    terms: [
      "ai ajan",
      "ajan",
      "yapay zeka",
      "yapay zekâ",
      "llm",
      "rag",
      "chatbot",
      "workflow ajan",
    ],
    summary:
      "AI Ajanları tarafında üç paket bulunuyor:\n• Ajan Başlangıç — tek görev ve 1 araç/API\n• Workflow Ajanı — çok adımlı akış ve 3 entegrasyona kadar bağlantı\n• Ajan Platformu — çoklu ajan, rol, hafıza ve kurumsal yönetim",
    prices:
      "AI Ajanları paketleri:\n• Ajan Başlangıç: 29.000 ₺\n• Workflow Ajanı: 49.000 ₺\n• Ajan Platformu: 89.000 ₺",
    durations:
      "AI Ajanları teslim aralıkları:\n• Ajan Başlangıç: 2–3 hafta\n• Workflow Ajanı: 3–5 hafta\n• Ajan Platformu: 6–9 hafta",
    technologies:
      "AI ajanı projelerinde kullanım senaryosuna göre LLM API, RAG, Vector DB, Tool Calling, Workflow Engine, REST API ve Audit Logs kullanılabilir.",
  },
  mobile: {
    terms: [
      "mobil",
      "ios",
      "android",
      "react native",
      "expo",
      "app store",
      "google play",
      "uygulama",
    ],
    summary:
      "Mobil Uygulamalar tarafında üç paket bulunuyor:\n• Mobil Prototip — fikri gerçek cihazda test etmek için\n• Mobil MVP — gerçek kullanıcılarla yayına çıkmak için\n• Mobil Ölçek — ödeme, abonelik, çevrimdışı kullanım ve gelişmiş operasyonlar için",
    prices:
      "Mobil Uygulama paketleri:\n• Mobil Prototip: 39.000 ₺\n• Mobil MVP: 64.000 ₺\n• Mobil Ölçek: 109.000 ₺",
    durations:
      "Mobil Uygulama teslim aralıkları:\n• Mobil Prototip: 3–4 hafta\n• Mobil MVP: 5–8 hafta\n• Mobil Ölçek: 8–12 hafta",
    technologies:
      "Mobil projelerde React Native, Expo, TypeScript, REST API, Push Notifications, Analytics ve CI/CD kullanılabilir.",
  },
  games: {
    terms: [
      "oyun",
      "game",
      "unity",
      "açık dünya",
      "2d",
      "3d",
      "vertical slice",
      "playtest",
    ],
    summary:
      "Oyun projelerinde üç paket bulunuyor:\n• Oynanabilir Konsept — temel fikri ve eğlenceyi test etmek için\n• Dünya Prototipi — harita, görev, envanter ve NPC sistemleri için\n• Vertical Slice — yayıncı veya yatırımcı sunumuna hazır cilalı sürüm için",
    prices:
      "Açık Dünya Oyunları paketleri:\n• Oynanabilir Konsept: 39.000 ₺\n• Dünya Prototipi: 74.000 ₺\n• Vertical Slice: 119.000 ₺",
    durations:
      "Oyun projesi teslim aralıkları:\n• Oynanabilir Konsept: 3–5 hafta\n• Dünya Prototipi: 5–8 hafta\n• Vertical Slice: 8–12 hafta",
    technologies:
      "Oyun projelerinde Unity, C#, World Streaming, AI Navigation, Save System, Profiling ve Shader Tools kullanılabilir.",
  },
  finance: {
    terms: [
      "finans",
      "fintech",
      "portföy",
      "banka",
      "piyasa",
      "dashboard",
      "gelir gider",
      "raporlama",
    ],
    summary:
      "Finans Sistemleri tarafında üç paket bulunuyor:\n• Finans Başlangıç — temel veri modeli ve dashboard\n• Finans Ürün — canlı API, grafik, rol ve raporlama\n• Finans Ölçek — çoklu şirket, gelişmiş analiz, audit log ve güvenlik",
    prices:
      "Finans Sistemleri paketleri:\n• Finans Başlangıç: 39.000 ₺\n• Finans Ürün: 69.000 ₺\n• Finans Ölçek: 109.000 ₺",
    durations:
      "Finans Sistemi teslim aralıkları:\n• Finans Başlangıç: 2–4 hafta\n• Finans Ürün: 4–7 hafta\n• Finans Ölçek: 7–10 hafta",
    technologies:
      "Finans projelerinde Next.js, TypeScript, C#, PostgreSQL, REST API, WebSocket, RBAC ve grafik araçları kullanılabilir.",
  },
  automation: {
    terms: [
      "otomasyon",
      "işletme",
      "operasyon",
      "crm",
      "stok",
      "iş akışı",
      "süreç otomasyonu",
      "excel",
    ],
    summary:
      "İşletme Otomasyonu tarafında üç paket bulunuyor:\n• Süreç Başlangıç — tek bir tekrarlı işi otomatikleştirmek için\n• Operasyon Merkezi — CRM, stok veya görev modüllerini birleştirmek için\n• Akıllı Operasyon — departmanlar arası akışlar ve AI destekli belge işleme için",
    prices:
      "İşletme Otomasyonu paketleri:\n• Süreç Başlangıç: 29.000 ₺\n• Operasyon Merkezi: 44.000 ₺\n• Akıllı Operasyon: 79.000 ₺",
    durations:
      "İşletme Otomasyonu teslim aralıkları:\n• Süreç Başlangıç: 2–3 hafta\n• Operasyon Merkezi: 4–6 hafta\n• Akıllı Operasyon: 6–9 hafta",
    technologies:
      "Otomasyon projelerinde Next.js, Node.js, PostgreSQL, Workflow sistemleri, Messaging API, raporlama araçları ve bulut servisleri kullanılabilir.",
  },
};

const EN_CATEGORY_INFO: Record<CategoryKey, CategoryInfo> = {
  web: {
    terms: [
      "web",
      "website",
      "company site",
      "corporate site",
      "landing page",
      "e-commerce",
      "ecommerce",
      "online store",
      "shop",
      "commerce",
    ],
    summary:
      "There are three Web & E-commerce packages:\n• Launch Site — a professional brand or company website\n• Commerce Pro — product, inventory, cart, payment, and order infrastructure\n• Growth Platform — multilingual content, CRM connections, campaigns, and growth automations",
    prices:
      "Web & E-commerce packages start at:\n• Launch Site: ₺24,000\n• Commerce Pro: ₺35,000\n• Growth Platform: ₺69,000\nThe final budget is confirmed after the discovery call, based on scope and integrations.",
    durations:
      "Estimated Web & E-commerce delivery times:\n• Launch Site: 2–3 weeks\n• Commerce Pro: 3–5 weeks\n• Growth Platform: 6–9 weeks",
    technologies:
      "Depending on the project, the web stack may include Next.js, TypeScript, a headless CMS, payment APIs, analytics, SEO tools, and Vercel.",
  },
  agents: {
    terms: [
      "ai agent",
      "agent",
      "artificial intelligence",
      "llm",
      "rag",
      "chatbot",
      "workflow agent",
    ],
    summary:
      "There are three AI Agent packages:\n• Agent Starter — one focused task and one tool/API\n• Workflow Agent — a multi-step workflow with up to three integrations\n• Agent Platform — multiple agents, roles, memory, and enterprise management",
    prices:
      "AI Agent packages start at:\n• Agent Starter: ₺29,000\n• Workflow Agent: ₺49,000\n• Agent Platform: ₺89,000",
    durations:
      "Estimated AI Agent delivery times:\n• Agent Starter: 2–3 weeks\n• Workflow Agent: 3–5 weeks\n• Agent Platform: 6–9 weeks",
    technologies:
      "Depending on the use case, an AI agent project may use LLM APIs, RAG, a vector database, tool calling, a workflow engine, REST APIs, and audit logs.",
  },
  mobile: {
    terms: [
      "mobile",
      "mobile app",
      "ios",
      "android",
      "react native",
      "expo",
      "app store",
      "google play",
      "application",
    ],
    summary:
      "There are three Mobile App packages:\n• Mobile Prototype — test the idea on a real device\n• Mobile MVP — launch with real users\n• Mobile Scale — add payments, subscriptions, offline use, and advanced operations",
    prices:
      "Mobile App packages start at:\n• Mobile Prototype: ₺39,000\n• Mobile MVP: ₺64,000\n• Mobile Scale: ₺109,000",
    durations:
      "Estimated Mobile App delivery times:\n• Mobile Prototype: 3–4 weeks\n• Mobile MVP: 5–8 weeks\n• Mobile Scale: 8–12 weeks",
    technologies:
      "Mobile projects may use React Native, Expo, TypeScript, REST APIs, push notifications, analytics, and CI/CD.",
  },
  games: {
    terms: [
      "game",
      "gaming",
      "unity",
      "open world",
      "2d",
      "3d",
      "vertical slice",
      "playtest",
    ],
    summary:
      "There are three Game Development packages:\n• Playable Concept — test the core idea and fun factor\n• World Prototype — build map, quest, inventory, and NPC systems\n• Vertical Slice — create a polished build for a publisher or investor presentation",
    prices:
      "Open-world Game packages start at:\n• Playable Concept: ₺39,000\n• World Prototype: ₺74,000\n• Vertical Slice: ₺119,000",
    durations:
      "Estimated Game project delivery times:\n• Playable Concept: 3–5 weeks\n• World Prototype: 5–8 weeks\n• Vertical Slice: 8–12 weeks",
    technologies:
      "Game projects may use Unity, C#, world streaming, AI navigation, save systems, profiling, and shader tools.",
  },
  finance: {
    terms: [
      "finance",
      "financial",
      "fintech",
      "portfolio",
      "bank",
      "market",
      "dashboard",
      "income",
      "expense",
      "reporting",
    ],
    summary:
      "There are three Finance System packages:\n• Finance Starter — a core data model and dashboard\n• Finance Product — live APIs, charts, roles, and reporting\n• Finance Scale — multiple companies, advanced analytics, audit logs, and security",
    prices:
      "Finance System packages start at:\n• Finance Starter: ₺39,000\n• Finance Product: ₺69,000\n• Finance Scale: ₺109,000",
    durations:
      "Estimated Finance System delivery times:\n• Finance Starter: 2–4 weeks\n• Finance Product: 4–7 weeks\n• Finance Scale: 7–10 weeks",
    technologies:
      "Finance projects may use Next.js, TypeScript, C#, PostgreSQL, REST APIs, WebSockets, RBAC, and data-visualization tools.",
  },
  automation: {
    terms: [
      "automation",
      "business automation",
      "operations",
      "workflow",
      "crm",
      "inventory",
      "process automation",
      "excel",
    ],
    summary:
      "There are three Business Automation packages:\n• Process Starter — automate one repetitive task\n• Operations Center — combine CRM, inventory, or task modules\n• Smart Operations — connect departments and add AI-assisted document processing",
    prices:
      "Business Automation packages start at:\n• Process Starter: ₺29,000\n• Operations Center: ₺44,000\n• Smart Operations: ₺79,000",
    durations:
      "Estimated Business Automation delivery times:\n• Process Starter: 2–3 weeks\n• Operations Center: 4–6 weeks\n• Smart Operations: 6–9 weeks",
    technologies:
      "Automation projects may use Next.js, Node.js, PostgreSQL, workflow systems, messaging APIs, reporting tools, and cloud services.",
  },
};

const PACKAGE_ANSWERS = [
  {
    terms: ["launch site"],
    answer:
      "Launch Site; 1–5 sayfa özel tasarım, mobil uyum, iletişim formu, temel entegrasyonlar, teknik SEO, Analytics, alan adı bağlantısı ve 2 revizyon içerir. Başlangıç fiyatı 24.000 ₺, tahmini süre 2–3 haftadır.",
  },
  {
    terms: ["commerce pro"],
    answer:
      "Commerce Pro; özel mağaza ve ürün sayfaları, ürün/kategori/stok yönetimi, sepet, ödeme, sipariş, CMS veya yönetim paneli, e-posta bildirimleri, SEO ve 14 gün destek içerir. Başlangıç fiyatı 35.000 ₺, tahmini süre 3–5 haftadır.",
  },
  {
    terms: ["growth platform"],
    answer:
      "Growth Platform; çok dil ve bölge, gelişmiş filtre ve arama, ürün varyantları, CRM/pazarlama/muhasebe bağlantıları, blog, kampanya, landing page ve A/B test altyapısı içerir. Başlangıç fiyatı 69.000 ₺, tahmini süre 6–9 haftadır.",
  },
  {
    terms: ["finans başlangıç"],
    answer:
      "Finans Başlangıç; finansal veri modeli, güvenli giriş, gelir/gider veya portföy dashboard'u, manuel veri, CSV içe aktarma, mobil arayüz, yayın ve 2 revizyon içerir. Başlangıç fiyatı 39.000 ₺, tahmini süre 2–4 haftadır.",
  },
  {
    terms: ["finans ürün"],
    answer:
      "Finans Ürün; canlı banka, piyasa veya özel API, grafikler, kullanıcı rolleri, PDF/Excel raporlama, bildirimler ve 14 gün destek içerir. Başlangıç fiyatı 69.000 ₺, tahmini süre 4–7 haftadır.",
  },
  {
    terms: ["finans ölçek"],
    answer:
      "Finans Ölçek; çoklu şirket/müşteri, özel işlem ve onay akışları, risk ve performans ekranları, yönetim paneli, audit log, güvenlik, yük testi ve 30 gün destek içerir. Başlangıç fiyatı 109.000 ₺, tahmini süre 7–10 haftadır.",
  },
  {
    terms: ["ajan başlangıç"],
    answer:
      "Ajan Başlangıç; tek görevli özel ajan, prompt ve davranış tasarımı, 1 araç/API entegrasyonu, hata kontrolleri, test senaryoları ve 2 revizyon içerir. Başlangıç fiyatı 29.000 ₺, tahmini süre 2–3 haftadır.",
  },
  {
    terms: ["workflow ajanı", "workflow ajan"],
    answer:
      "Workflow Ajanı; çok adımlı görev akışı, 3 araca kadar entegrasyon, bilgi tabanı, insan onayı, çalışma geçmişi, yönetim ekranı ve 14 gün destek içerir. Başlangıç fiyatı 49.000 ₺, tahmini süre 3–5 haftadır.",
  },
  {
    terms: ["ajan platformu"],
    answer:
      "Ajan Platformu; çoklu ajan mimarisi, rol ve yetki, CRM/e-posta bağlantıları, kalıcı hafıza, kurumsal bilgi, guardrail ve maliyet takibi içerir. Başlangıç fiyatı 89.000 ₺, tahmini süre 6–9 haftadır.",
  },
  {
    terms: ["mobil prototip"],
    answer:
      "Mobil Prototip; kullanıcı akışları, 5 temel ekran, React Native altyapısı, yerel veri, Android/iOS test sürümleri ve 2 revizyon içerir. Başlangıç fiyatı 39.000 ₺, tahmini süre 3–4 haftadır.",
  },
  {
    terms: ["mobil mvp"],
    answer:
      "Mobil MVP; iOS/Android uygulama, kayıt ve profil, API/veritabanı/bulut bağlantısı, push bildirimleri, yönetim ekranı, analitik ve mağaza hazırlığı içerir. Başlangıç fiyatı 64.000 ₺, tahmini süre 5–8 haftadır.",
  },
  {
    terms: ["mobil ölçek"],
    answer:
      "Mobil Ölçek; abonelik veya ödeme, çevrimdışı kullanım, veri senkronizasyonu, gelişmiş analitik, CI/CD, mağaza sürüm yönetimi ve 30 gün destek içerir. Başlangıç fiyatı 109.000 ₺, tahmini süre 8–12 haftadır.",
  },
  {
    terms: ["oynanabilir konsept"],
    answer:
      "Oynanabilir Konsept; oyun fikri ve ana döngü, tek alan, karakter/kamera, temel etkileşim, görev prototipi, geçici UI ve demo teslimi içerir. Başlangıç fiyatı 39.000 ₺, tahmini süre 3–5 haftadır.",
  },
  {
    terms: ["dünya prototipi"],
    answer:
      "Dünya Prototipi; harita ve biyom, envanter, görev ve ilerleme, NPC ve düşman AI, kayıt/yükleme, ilk optimizasyon ve 2 playtest içerir. Başlangıç fiyatı 74.000 ₺, tahmini süre 5–8 haftadır.",
  },
  {
    terms: ["vertical slice"],
    answer:
      "Vertical Slice; görsel yön, cilalı açık dünya bölgesi, savaş/görev/karakter gelişimi, özgün UI ve ses, performans çalışması ve yayıncı sunumu içerir. Başlangıç fiyatı 119.000 ₺, tahmini süre 8–12 haftadır.",
  },
  {
    terms: ["süreç başlangıç"],
    answer:
      "Süreç Başlangıç; süreç analizi, tek ana otomasyon, 1 harici servis, takip paneli, e-posta/mesaj bildirimleri ve ekip anlatımı içerir. Başlangıç fiyatı 29.000 ₺, tahmini süre 2–3 haftadır.",
  },
  {
    terms: ["operasyon merkezi"],
    answer:
      "Operasyon Merkezi; CRM, stok veya görevden 3 ana modül, kullanıcı rolleri, canlı operasyon paneli, 3 entegrasyona kadar bağlantı, Excel aktarımı, eğitim ve 14 gün destek içerir. Başlangıç fiyatı 44.000 ₺, tahmini süre 4–6 haftadır.",
  },
  {
    terms: ["akıllı operasyon"],
    answer:
      "Akıllı Operasyon; çok departmanlı akışlar, AI destekli belge/talep işleme, yönetici ekranları, onaylar, audit log, yedekleme, güvenlik ve 30 gün destek içerir. Başlangıç fiyatı 79.000 ₺, tahmini süre 6–9 haftadır.",
  },
];

const EN_PACKAGE_ANSWERS = [
  {
    terms: ["launch site"],
    answer:
      "Launch Site includes a custom design for 1–5 pages, responsive layouts, a contact form, essential integrations, technical SEO, analytics, domain connection, and two revision rounds. It starts at ₺24,000 and usually takes 2–3 weeks.",
  },
  {
    terms: ["commerce pro"],
    answer:
      "Commerce Pro includes custom storefront and product pages, product/category/inventory management, cart, payments, orders, a CMS or admin panel, email notifications, SEO, and 14 days of support. It starts at ₺35,000 and usually takes 3–5 weeks.",
  },
  {
    terms: ["growth platform"],
    answer:
      "Growth Platform includes multilingual and multi-region support, advanced filtering and search, product variants, CRM/marketing/accounting connections, a blog, campaigns, landing pages, and A/B testing infrastructure. It starts at ₺69,000 and usually takes 6–9 weeks.",
  },
  {
    terms: ["finance starter", "finans başlangıç"],
    answer:
      "Finance Starter includes a financial data model, secure sign-in, an income/expense or portfolio dashboard, manual data entry, CSV import, a mobile-friendly interface, deployment, and two revision rounds. It starts at ₺39,000 and usually takes 2–4 weeks.",
  },
  {
    terms: ["finance product", "finans ürün"],
    answer:
      "Finance Product includes a live banking, market, or custom API, charts, user roles, PDF/Excel reporting, notifications, and 14 days of support. It starts at ₺69,000 and usually takes 4–7 weeks.",
  },
  {
    terms: ["finance scale", "finans ölçek"],
    answer:
      "Finance Scale includes multi-company or multi-client support, custom transaction and approval flows, risk and performance views, an admin panel, audit logs, security, load testing, and 30 days of support. It starts at ₺109,000 and usually takes 7–10 weeks.",
  },
  {
    terms: ["agent starter", "ajan başlangıç"],
    answer:
      "Agent Starter includes a custom agent focused on one task, prompt and behavior design, one tool/API integration, error handling, test scenarios, and two revision rounds. It starts at ₺29,000 and usually takes 2–3 weeks.",
  },
  {
    terms: ["workflow agent", "workflow ajan"],
    answer:
      "Workflow Agent includes a multi-step task flow, up to three tool integrations, a knowledge base, human approval steps, run history, an admin screen, and 14 days of support. It starts at ₺49,000 and usually takes 3–5 weeks.",
  },
  {
    terms: ["agent platform", "ajan platformu"],
    answer:
      "Agent Platform includes a multi-agent architecture, roles and permissions, CRM/email connections, persistent memory, enterprise knowledge, guardrails, and cost tracking. It starts at ₺89,000 and usually takes 6–9 weeks.",
  },
  {
    terms: ["mobile prototype", "mobil prototip"],
    answer:
      "Mobile Prototype includes user flows, five core screens, a React Native foundation, local data, Android/iOS test builds, and two revision rounds. It starts at ₺39,000 and usually takes 3–4 weeks.",
  },
  {
    terms: ["mobile mvp", "mobil mvp"],
    answer:
      "Mobile MVP includes an iOS/Android app, sign-up and profiles, API/database/cloud connections, push notifications, an admin screen, analytics, and store-launch preparation. It starts at ₺64,000 and usually takes 5–8 weeks.",
  },
  {
    terms: ["mobile scale", "mobil ölçek"],
    answer:
      "Mobile Scale includes subscriptions or payments, offline use, data synchronization, advanced analytics, CI/CD, store release management, and 30 days of support. It starts at ₺109,000 and usually takes 8–12 weeks.",
  },
  {
    terms: ["playable concept", "oynanabilir konsept"],
    answer:
      "Playable Concept includes the game idea and core loop, one area, character and camera controls, basic interaction, a quest prototype, temporary UI, and a playable demo. It starts at ₺39,000 and usually takes 3–5 weeks.",
  },
  {
    terms: ["world prototype", "dünya prototipi"],
    answer:
      "World Prototype includes a map and biome, inventory, quests and progression, NPC and enemy AI, save/load systems, initial optimization, and two playtests. It starts at ₺74,000 and usually takes 5–8 weeks.",
  },
  {
    terms: ["vertical slice"],
    answer:
      "Vertical Slice includes visual direction, a polished open-world area, combat/quest/character progression, custom UI and sound, performance work, and a publisher-ready presentation build. It starts at ₺119,000 and usually takes 8–12 weeks.",
  },
  {
    terms: ["process starter", "süreç başlangıç"],
    answer:
      "Process Starter includes process analysis, one primary automation, one external service, a tracking panel, email/message notifications, and a team handover. It starts at ₺29,000 and usually takes 2–3 weeks.",
  },
  {
    terms: ["operations center", "operasyon merkezi"],
    answer:
      "Operations Center includes three main CRM, inventory, or task modules, user roles, a live operations dashboard, up to three integrations, Excel export, training, and 14 days of support. It starts at ₺44,000 and usually takes 4–6 weeks.",
  },
  {
    terms: ["smart operations", "akıllı operasyon"],
    answer:
      "Smart Operations includes cross-department workflows, AI-assisted document/request processing, management dashboards, approvals, audit logs, backups, security, and 30 days of support. It starts at ₺79,000 and usually takes 6–9 weeks.",
  },
];

function normalize(value: string, locale: Locale = "tr") {
  return value
    .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
    .replace(/[^\p{L}\p{N}\s&+₺.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function detectCategory(
  lastMessage: string,
  conversation: string,
  categoryInfo: Record<CategoryKey, CategoryInfo> = CATEGORY_INFO,
): CategoryKey | null {
  const orderedCategories = Object.entries(categoryInfo) as [
    CategoryKey,
    CategoryInfo,
  ][];
  return (
    orderedCategories.find(([, info]) => includesAny(lastMessage, info.terms))?.[0] ??
    orderedCategories.find(([, info]) => includesAny(conversation, info.terms))?.[0] ??
    null
  );
}

function getEnglishSiteAnswer(message: string, conversation: string) {
  const clean = normalize(message, "en");
  const cleanConversation = normalize(conversation, "en");
  const category = detectCategory(clean, cleanConversation, EN_CATEGORY_INFO);

  const packageMatch = EN_PACKAGE_ANSWERS.find((pack) =>
    includesAny(clean, pack.terms),
  );
  if (packageMatch) return packageMatch.answer;

  if (
    clean.length < 40 &&
    ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"].some(
      (greeting) => clean === greeting || clean.startsWith(`${greeting} `),
    )
  ) {
    return "Hello! I can help with web and e-commerce projects, AI agents, mobile apps, games, finance systems, and business automation. What would you like to explore?";
  }

  if (
    includesAny(clean, [
      "contact",
      "get in touch",
      "reach you",
      "email",
      "e-mail",
      "quote",
      "proposal",
    ])
  ) {
    return "For a detailed quote, use the contact form on this page or email info@c0denail.com. Including your goal, scope, approximate budget, and target launch date will help us assess the project faster.";
  }

  const asksPrice = includesAny(clean, [
    "price",
    "pricing",
    "cost",
    "budget",
    "how much",
    "fee",
    "rate",
    "lira",
    "₺",
  ]);
  if (asksPrice && category) return EN_CATEGORY_INFO[category].prices;
  if (asksPrice) {
    return "Starting prices by category:\n• Web & E-commerce: ₺24,000\n• AI Agents: ₺29,000\n• Business Automation: ₺29,000\n• Finance Systems: ₺39,000\n• Mobile Apps: ₺39,000\n• Open-world Games: ₺39,000\nThe final budget is confirmed after a discovery call.";
  }

  const asksDuration = includesAny(clean, [
    "duration",
    "timeline",
    "delivery",
    "how long",
    "how many weeks",
    "weeks",
    "schedule",
    "when can",
  ]);
  if (asksDuration && category) return EN_CATEGORY_INFO[category].durations;
  if (asksDuration) {
    return "Depending on the package, projects typically take about 2–12 weeks. Websites and single-process automations can start at 2–3 weeks, while larger mobile, game, and scale packages may take 8–12 weeks. Which category would you like a timeline for?";
  }

  const asksTechnology = includesAny(clean, [
    "technology",
    "technologies",
    "tech stack",
    "stack",
    "programming language",
    "infrastructure",
    "framework",
    "c#",
    "next.js",
    "react native",
    "unity",
    "typescript",
  ]);
  if (asksTechnology && category) {
    return EN_CATEGORY_INFO[category].technologies;
  }
  if (asksTechnology) {
    return "The technology stack is selected for each project. Common choices include Next.js, TypeScript, C#, Node.js, PostgreSQL, React Native, Expo, Unity, REST APIs, WebSockets, and cloud services. Which kind of product are you asking about?";
  }

  if (
    includesAny(clean, [
      "add-on",
      "add on",
      "extra module",
      "brand direction",
      "content and copy",
      "priority delivery",
      "rush delivery",
    ])
  ) {
    return "Available add-ons:\n• Brand direction: +₺15,000\n• Content & copy: +₺10,000\n• Priority delivery: +₺20,000\nAvailability and the final schedule are assessed together with the project scope.";
  }

  if (
    includesAny(clean, [
      "how does the process",
      "project process",
      "working process",
      "how do we start",
      "project stages",
      "your process",
    ])
  ) {
    return "The project moves through four stages:\n1. Discovery — goals and success criteria\n2. Direction — information architecture, visual language, and technical approach\n3. Production — design and development\n4. Launch — testing, performance, and handover";
  }

  if (
    includesAny(clean, [
      "offer support",
      "provide support",
      "ongoing support",
      "maintenance",
      "after launch",
      "post-launch",
      "bug fix",
    ])
  ) {
    return "Every package includes a post-delivery bug-fix period. An ongoing monthly support plan can also be arranged for continuous development, maintenance, and new features.";
  }

  if (includesAny(clean, ["revision", "revisions", "change request"])) {
    return "Starter packages explicitly include two revision rounds. Feedback and support for other packages follow their listed scope; the exact revision plan is confirmed at the start of the project.";
  }

  if (
    includesAny(clean, [
      "ready-made theme",
      "ready made theme",
      "template",
      "custom design",
      "prebuilt theme",
    ])
  ) {
    return "Ready-made themes are not used. Each project is designed around its needs, combining reliable technologies with a brand-specific interface and user experience.";
  }

  if (includesAny(clean, ["seo", "search engine", "google ranking"])) {
    return "Launch Site and Commerce Pro include technical SEO and performance work. Growth Platform also adds infrastructure for content, campaigns, landing pages, and conversion analytics.";
  }

  if (
    includesAny(clean, [
      "payment",
      "checkout",
      "shopping cart",
      "order",
      "inventory",
      "sell products",
    ])
  ) {
    return "Commerce Pro includes cart, payments, orders, products, categories, and inventory management. If you also need multiple languages, advanced filtering, product variants, and CRM connections, Growth Platform is the better fit.";
  }

  if (includesAny(clean, ["admin panel", "management panel", "cms"])) {
    return "A CMS or admin panel is included in Commerce Pro. Role-based management and operations screens can also be built into finance, AI agent, and automation packages when needed.";
  }

  if (
    includesAny(clean, [
      "multilingual",
      "multiple languages",
      "multi-language",
      "international",
      "different countries",
      "multi-region",
    ])
  ) {
    return "Multilingual and multi-region web support is included in Growth Platform. Region-specific content, product, and integration needs are confirmed during discovery.";
  }

  if (
    includesAny(clean, [
      "analytics",
      "report",
      "reporting",
      "measurement",
      "metrics",
    ])
  ) {
    return "Web packages can include analytics and conversion measurement, while finance, mobile, and automation packages can include product-specific reporting dashboards. The required metrics are defined during discovery.";
  }

  if (
    includesAny(clean, [
      "security",
      "permission",
      "role",
      "audit",
      "data protection",
    ])
  ) {
    return "Advanced packages such as Finance Scale and Agent Platform include role-based permissions, audit logs, and security layers. Exact security requirements are planned around the data type and user roles.";
  }

  if (
    includesAny(clean, [
      "app store",
      "google play",
      "store launch",
      "publish the app",
    ])
  ) {
    return "Mobile MVP includes App Store and Google Play launch preparation. Mobile Scale also includes CI/CD and store release management.";
  }

  if (
    includesAny(clean, [
      "where are you",
      "location",
      "istanbul",
      "remote",
      "worldwide",
    ])
  ) {
    return "c0denail is based in Istanbul and can deliver projects remotely. You can reach us at info@c0denail.com or through the project form on this page.";
  }

  if (
    includesAny(clean, [
      "who are you",
      "what is c0denail",
      "what do you do",
      "your services",
      "services do you offer",
    ])
  ) {
    return "c0denail is an Istanbul-based software studio building web and e-commerce products, AI agents, mobile apps, games, finance systems, and business automation solutions.";
  }

  if (
    includesAny(clean, [
      "right package",
      "which package",
      "choose a package",
      "recommend a package",
      "package recommendation",
      "best package",
    ])
  ) {
    if (category) {
      return `${EN_CATEGORY_INFO[category].summary}\n\nTell me your goal, approximate budget, and target launch date, and I can narrow these three options down further.`;
    }
    return "To find the right package, let’s first choose the product type: web/e-commerce, AI agent, mobile app, game, finance system, or business automation. Then we can narrow the options based on your goal and approximate budget.";
  }

  if (category) return EN_CATEGORY_INFO[category].summary;

  return "This assistant answers using only the service and package information on the c0denail website. You can ask about web/e-commerce, AI agents, mobile apps, games, finance systems, business automation, prices, timelines, technologies, or the project process.";
}

export function getSiteAnswer(
  message: string,
  conversation = message,
  locale: Locale = "tr",
) {
  if (locale === "en") return getEnglishSiteAnswer(message, conversation);

  const clean = normalize(message);
  const cleanConversation = normalize(conversation);
  const category = detectCategory(clean, cleanConversation);

  const packageMatch = PACKAGE_ANSWERS.find((pack) =>
    includesAny(clean, pack.terms),
  );
  if (packageMatch) return packageMatch.answer;

  if (
    clean.length < 30 &&
    includesAny(clean, ["merhaba", "selam", "hey", "iyi günler", "kolay gelsin"])
  ) {
    return "Merhaba. Web, e-ticaret, AI ajanları, mobil uygulama, oyun, finans sistemleri ve işletme otomasyonu hakkında yardımcı olabilirim. Hangi konuyu incelemek istersin?";
  }

  if (includesAny(clean, ["iletişim", "iletişime", "ulaş", "e-posta", "email", "teklif"])) {
    return "Detaylı teklif için sayfadaki iletişim formunu kullanabilir veya info@c0denail.com adresine yazabilirsin. Hedef, kapsam, yaklaşık bütçe ve yayın tarihini eklersen değerlendirme daha hızlı ilerler.";
  }

  const asksPrice = includesAny(clean, [
    "fiyat",
    "ücret",
    "bütçe",
    "kaç para",
    "maliyet",
    "tl",
    "₺",
  ]);
  if (asksPrice && category) return CATEGORY_INFO[category].prices;
  if (asksPrice) {
    return "Kategori başlangıç fiyatları:\n• Web & E-Ticaret: 24.000 ₺\n• AI Ajanları: 29.000 ₺\n• İşletme Otomasyonu: 29.000 ₺\n• Finans Sistemleri: 39.000 ₺\n• Mobil Uygulamalar: 39.000 ₺\n• Açık Dünya Oyunları: 39.000 ₺\nKesin bütçe keşif görüşmesinden sonra netleşir.";
  }

  const asksDuration = includesAny(clean, [
    "süre",
    "kaç hafta",
    "ne kadar sür",
    "teslim",
    "takvim",
    "ne zaman",
  ]);
  if (asksDuration && category) return CATEGORY_INFO[category].durations;
  if (asksDuration) {
    return "Proje süreleri pakete göre yaklaşık 2–12 hafta arasında değişir. Web ve tek süreç otomasyonları 2–3 haftadan; kapsamlı mobil, oyun ve ölçek paketleri 8–12 haftaya kadar uzanabilir. Hangi kategorinin sürelerini görmek istersin?";
  }

  const asksTechnology = includesAny(clean, [
    "teknoloji",
    "yazılım dili",
    "hangi dil",
    "altyapı",
    "stack",
    "c#",
    "next.js",
    "react native",
    "unity",
    "typescript",
  ]);
  if (asksTechnology && category) return CATEGORY_INFO[category].technologies;
  if (asksTechnology) {
    return "Teknoloji seçimi projeye göre yapılır. Kullanılan başlıca teknolojiler arasında Next.js, TypeScript, C#, Node.js, PostgreSQL, React Native, Expo, Unity, REST API, WebSocket ve bulut servisleri bulunur. Hangi ürün için teknoloji bilgisini görmek istersin?";
  }

  if (includesAny(clean, ["ek modül", "marka yönü", "içerik ve metin", "öncelikli teslim"])) {
    return "Ek modüller:\n• Marka yönü: +15.000 ₺\n• İçerik & metin: +10.000 ₺\n• Öncelikli teslim: +20.000 ₺\nUygunluk ve nihai takvim proje kapsamıyla birlikte değerlendirilir.";
  }

  if (includesAny(clean, ["süreç nasıl", "nasıl baş", "çalışma süreci", "proje süreci", "aşamalar"])) {
    return "Proje süreci dört aşamada ilerler:\n1. Keşif — hedef ve başarı ölçütleri\n2. Yön — bilgi mimarisi, görsel dil ve teknik yaklaşım\n3. Üretim — tasarım ve geliştirme\n4. Yayın — test, performans ve teslim";
  }

  if (includesAny(clean, ["destek", "bakım", "yayın sonrası", "hata düzeltme"])) {
    return "Her pakete teslim sonrası hata düzeltme dönemi dahildir. Sürekli geliştirme, bakım ve yeni özellikler için ayrıca aylık destek modeli oluşturulabilir.";
  }

  if (includesAny(clean, ["revizyon", "değişiklik hakkı"])) {
    return "Başlangıç paketlerinde 2 revizyon açıkça dahildir. Diğer paketlerde geri bildirim ve destek kapsamı paket içeriğine göre ilerler; kesin revizyon planı proje başlangıcında netleştirilir.";
  }

  if (includesAny(clean, ["hazır tema", "tema kullan", "özel tasarım"])) {
    return "Hazır tema kullanılmaz. Her proje ihtiyaca göre tasarlanır; güvenilir teknolojiler markaya özel arayüz ve kullanıcı deneyimiyle birleştirilir.";
  }

  if (includesAny(clean, ["seo", "arama motoru", "google"])) {
    return "Launch Site ve Commerce Pro paketlerinde teknik SEO ve performans çalışmaları bulunur. Growth Platform ayrıca içerik, kampanya, landing page ve dönüşüm analitiği altyapısı sunar.";
  }

  if (includesAny(clean, ["ödeme", "sepet", "sipariş", "stok", "ürün sat"])) {
    return "Sepet, ödeme, sipariş, ürün, kategori ve stok yönetimi Commerce Pro paketinde yer alır. Çok dil, gelişmiş filtre, ürün varyantları ve CRM bağlantıları gerekiyorsa Growth Platform daha uygundur.";
  }

  if (includesAny(clean, ["admin panel", "yönetim panel", "cms"])) {
    return "Yönetim paneli veya CMS, Commerce Pro kapsamında bulunur. Finans, AI ajanı ve otomasyon paketlerinde de ihtiyaca göre rol bazlı yönetim ve operasyon ekranları hazırlanabilir.";
  }

  if (includesAny(clean, ["çok dil", "çoklu dil", "yurt dışı", "farklı ülke", "bölge"])) {
    return "Çok dilli ve çok bölgeli web yapısı Growth Platform paketinde yer alır. Bölgeye özel içerik, ürün ve entegrasyon ihtiyaçları keşif aşamasında netleştirilir.";
  }

  if (includesAny(clean, ["analytics", "analitik", "rapor", "ölçüm"])) {
    return "Web paketlerinde Analytics ve dönüşüm ölçümü; finans, mobil ve otomasyon paketlerinde ürüne özel raporlama ekranları bulunabilir. Gerekli metrikler keşif aşamasında belirlenir.";
  }

  if (includesAny(clean, ["güvenlik", "yetki", "rol", "audit", "veri güvenliği"])) {
    return "Finans Ölçek ve Ajan Platformu gibi gelişmiş paketlerde rol bazlı yetki, audit log ve güvenlik katmanları yer alır. Kesin güvenlik gereksinimleri veri türü ve kullanıcı rollerine göre planlanır.";
  }

  if (includesAny(clean, ["app store", "google play", "mağazaya yayın", "mağaza yayını"])) {
    return "Mobil MVP paketinde App Store ve Google Play yayın hazırlığı bulunur. Mobil Ölçek paketinde buna ek olarak CI/CD ve mağaza sürüm yönetimi sağlanır.";
  }

  if (includesAny(clean, ["nerede", "lokasyon", "istanbul", "uzaktan", "remote"])) {
    return "c0denail İstanbul merkezlidir ve projeler uzaktan yürütülebilir. İletişim için info@c0denail.com adresini veya sayfadaki proje formunu kullanabilirsin.";
  }

  if (includesAny(clean, ["kimsin", "c0denail nedir", "ne yapıyorsunuz", "hizmetler"])) {
    return "c0denail; web ve e-ticaret, AI ajanları, mobil uygulama, oyun, finans sistemleri ve işletme otomasyonu geliştiren İstanbul merkezli bir yazılım stüdyosudur.";
  }

  if (includesAny(clean, ["uygun paket", "hangi paket", "paket öner", "öneri"])) {
    if (category) {
      return `${CATEGORY_INFO[category].summary}\n\nHedefini, yaklaşık bütçeni ve istediğin yayın tarihini yazarsan bu üç seçenek arasından daha net yönlendirebilirim.`;
    }
    return "Sana uygun paketi belirlemek için önce ürün türünü seçelim: web/e-ticaret, AI ajanı, mobil uygulama, oyun, finans sistemi veya işletme otomasyonu. Ardından hedef ve yaklaşık bütçene göre seçenekleri daraltabiliriz.";
  }

  if (category) return CATEGORY_INFO[category].summary;

  return "Bu asistan yalnızca c0denail sitesindeki hizmet ve paket bilgileriyle yanıt verir. Web/e-ticaret, AI ajanları, mobil uygulama, oyun, finans sistemleri, işletme otomasyonu, fiyatlar, süreler, teknolojiler veya proje süreci hakkında soru sorabilirsin.";
}
