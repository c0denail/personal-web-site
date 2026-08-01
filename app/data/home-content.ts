import type { Locale } from "../i18n";

export type PackageLevel = "start" | "product" | "scale";

export interface ServiceContent {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  command: string;
}

export interface PackageContent {
  id: string;
  level: PackageLevel;
  name: string;
  price: number;
  note: string;
  includes: string[];
  duration: string;
  featured?: boolean;
}

export interface PackageCategoryContent {
  id: string;
  name: string;
  description: string;
  packages: PackageContent[];
}

export interface AddOnContent {
  id: string;
  label: string;
  price: number;
}

export interface FaqContent {
  q: string;
  a: string;
}

export interface HomeContent {
  services: ServiceContent[];
  packageCategories: PackageCategoryContent[];
  addOns: AddOnContent[];
  faqs: FaqContent[];
}

const content = {
  tr: {
    services: [
      {
        icon: "01",
        title: "Web deneyimleri",
        description:
          "Markanı birkaç saniyede anlatan, hızlı ve dönüşüm odaklı web siteleri.",
        tags: ["Landing page", "Kurumsal site", "E-ticaret", "SEO"],
        command: "npm run launch",
      },
      {
        icon: "02",
        title: "AI Ajanları & otomasyon",
        description:
          "İş süreçlerini anlayan, karar alan ve ekibinle birlikte çalışan akıllı sistemler.",
        tags: ["AI ajanları", "LLM", "Workflow", "API"],
        command: "python agent.py --deploy",
      },
      {
        icon: "03",
        title: "Oyun geliştirme",
        description:
          "Fikirden oynanabilir prototipe, güçlü mekaniklere sahip etkileşimli oyun deneyimleri.",
        tags: ["Web oyunları", "2D / 3D", "Multiplayer", "Prototip"],
        command: "npm run playtest",
      },
      {
        icon: "04",
        title: "Mobil uygulama",
        description:
          "iOS ve Android için hızlı, akıcı ve kullanıcıların tekrar dönmek isteyeceği uygulamalar.",
        tags: ["iOS", "Android", "React Native", "App Store"],
        command: "npx expo start",
      },
    ],
    packageCategories: [
      {
        id: "finance",
        name: "Finans Sistemleri",
        description:
          "Finansal veriyi anlaşılır, güvenli ve işlem yapılabilir ürünlere dönüştüren paketler.",
        packages: [
          {
            id: "finance-start",
            level: "start",
            name: "Finans Başlangıç",
            price: 39000,
            note: "Temel finans verilerini tek ekranda izlemek isteyen ürünler için hızlı başlangıç.",
            includes: [
              "Keşif çalışması ve finansal veri modeli",
              "Güvenli giriş ve kullanıcı hesabı",
              "Gelir, gider veya portföy dashboard’u",
              "Manuel veri girişi ve CSV içe aktarma",
              "Mobil uyumlu temel arayüz",
              "Yayın kurulumu ve 2 revizyon",
            ],
            duration: "2–4 hafta",
          },
          {
            id: "finance-product",
            level: "product",
            name: "Finans Ürün",
            price: 69000,
            note: "Canlı veriler ve gelişmiş raporlarla kullanıma hazır finansal ürün MVP’si.",
            includes: [
              "Başlangıç paketindeki tüm özellikler",
              "Banka, piyasa veya özel API bağlantısı",
              "Canlı grafikler ve karşılaştırmalı analiz",
              "Yönetici, ekip ve müşteri rolleri",
              "PDF / Excel raporlama ve dışa aktarma",
              "Bildirimler, testler ve 14 gün destek",
            ],
            duration: "4–7 hafta",
            featured: true,
          },
          {
            id: "finance-scale",
            level: "scale",
            name: "Finans Ölçek",
            price: 109000,
            note: "Birden fazla kullanıcı grubuna hizmet veren ölçeklenebilir finans platformu.",
            includes: [
              "Ürün stratejisi ve teknik mimari",
              "Çoklu şirket / müşteri yapısı",
              "Özel işlem ve onay akışları",
              "Gelişmiş analiz, risk ve performans ekranları",
              "Yönetim paneli, audit log ve güvenlik katmanı",
              "Yük testi, yayın planı ve 30 gün destek",
            ],
            duration: "7–10 hafta",
          },
        ],
      },
      {
        id: "agents",
        name: "AI Ajanları",
        description:
          "Tek görevli yardımcıdan çok araçlı operasyon ajanlarına kadar iş akışına özel çözümler.",
        packages: [
          {
            id: "agents-start",
            level: "start",
            name: "Ajan Başlangıç",
            price: 29000,
            note: "Tek bir iş problemini çözen, kontrollü ve ölçülebilir AI ajanı.",
            includes: [
              "Kullanım senaryosu ve başarı kriterleri",
              "Tek görevli özel AI ajanı",
              "Prompt ve sistem davranışı tasarımı",
              "1 araç veya API entegrasyonu",
              "Temel hata kontrolü ve test senaryoları",
              "Kurulum dokümanı ve 2 revizyon",
            ],
            duration: "2–3 hafta",
          },
          {
            id: "agents-product",
            level: "product",
            name: "Workflow Ajanı",
            price: 49000,
            note: "Birden fazla adımı ve aracı yöneten, ekip onaylı üretim ajanı.",
            includes: [
              "Çok adımlı görev ve karar akışı",
              "3 adede kadar araç / API entegrasyonu",
              "Doküman ve bilgi tabanı bağlantısı",
              "İnsan onayı ve geri bildirim noktaları",
              "Çalışma geçmişi ve yönetim ekranı",
              "Değerlendirme raporu ve 14 gün destek",
            ],
            duration: "3–5 hafta",
            featured: true,
          },
          {
            id: "agents-scale",
            level: "scale",
            name: "Ajan Platformu",
            price: 89000,
            note: "Birden fazla ajanı, kullanıcıyı ve iş sürecini tek merkezden yöneten sistem.",
            includes: [
              "Çoklu ajan mimarisi ve görev dağıtımı",
              "Rol bazlı kullanıcı ve yetki sistemi",
              "CRM, e-posta ve operasyon bağlantıları",
              "Kalıcı hafıza ve kurumsal bilgi katmanı",
              "Guardrail, değerlendirme ve maliyet takibi",
              "Canlıya geçiş planı ve 30 gün destek",
            ],
            duration: "6–9 hafta",
          },
        ],
      },
      {
        id: "games",
        name: "Açık Dünya Oyunları",
        description:
          "Fikir doğrulamadan yatırımcıya veya yayıncıya sunulabilir oynanabilir sürüme kadar.",
        packages: [
          {
            id: "games-start",
            level: "start",
            name: "Oynanabilir Konsept",
            price: 39000,
            note: "Oyunun temel fikrini ve eğlence potansiyelini test eden kompakt demo.",
            includes: [
              "Oyun fikri ve ana döngü tasarımı",
              "Tek oynanabilir alan / bölüm",
              "Karakter hareketi ve kamera sistemi",
              "Temel etkileşim ve görev prototipi",
              "Geçici UI ve oyun içi yönlendirme",
              "Masaüstü veya web demo teslimi",
            ],
            duration: "3–5 hafta",
          },
          {
            id: "games-product",
            level: "product",
            name: "Dünya Prototipi",
            price: 74000,
            note: "Keşif, görev ve ilerleme sistemlerini birleştiren kapsamlı oyun prototipi.",
            includes: [
              "Harita, bölge ve biyom prototipi",
              "Envanter, görev ve ilerleme sistemi",
              "NPC davranışları ve temel düşman AI’ı",
              "Kayıt / yükleme ve kontrol ayarları",
              "Performans optimizasyonunun ilk aşaması",
              "2 playtest sürümü ve sonuç raporu",
            ],
            duration: "5–8 hafta",
            featured: true,
          },
          {
            id: "games-scale",
            level: "scale",
            name: "Vertical Slice",
            price: 119000,
            note: "Oyunun nihai kalitesini temsil eden, sunuma hazır cilalı üretim dilimi.",
            includes: [
              "Görsel yön ve üretim standardı",
              "Cilalı açık dünya bölgesi",
              "Savaş, görev ve karakter gelişimi",
              "Özgün UI, ses ve geri bildirim katmanı",
              "Hedef cihazlarda performans çalışması",
              "Yayıncı sunumu ve üretim yol haritası",
            ],
            duration: "8–12 hafta",
          },
        ],
      },
      {
        id: "web",
        name: "Web & E-Ticaret",
        description:
          "Marka sitesinden satış ve büyüme altyapısına kadar hızlı, yönetilebilir web ürünleri.",
        packages: [
          {
            id: "web-start",
            level: "start",
            name: "Launch Site",
            price: 24000,
            note: "Markanı net anlatan, hızlı açılan ve yayına hazır profesyonel web sitesi.",
            includes: [
              "1–5 sayfa özel arayüz tasarımı",
              "Mobil, tablet ve masaüstü uyumu",
              "İletişim formu ve temel entegrasyonlar",
              "Teknik SEO ve performans ayarları",
              "Analytics ve arama motoru kurulumu",
              "Yayın, alan adı bağlantısı ve 2 revizyon",
            ],
            duration: "2–3 hafta",
          },
          {
            id: "web-product",
            level: "product",
            name: "Commerce Pro",
            price: 35000,
            note: "Ürünlerini yönetip güvenli biçimde satış yapabileceğin e-ticaret sistemi.",
            includes: [
              "Özel mağaza ve ürün sayfası tasarımı",
              "Ürün, kategori ve stok yönetimi",
              "Sepet, ödeme ve sipariş akışları",
              "Yönetim paneli veya CMS bağlantısı",
              "E-posta bildirimleri ve temel raporlar",
              "SEO, hız optimizasyonu ve 14 gün destek",
            ],
            duration: "3–5 hafta",
            featured: true,
          },
          {
            id: "web-scale",
            level: "scale",
            name: "Growth Platform",
            price: 69000,
            note: "İçerik, satış ve otomasyonu tek altyapıda buluşturan büyüme platformu.",
            includes: [
              "Çok dilli ve çok bölgeli yapı",
              "Gelişmiş filtre, arama ve ürün varyantları",
              "CRM, pazarlama ve muhasebe bağlantıları",
              "Blog, kampanya ve landing page sistemi",
              "Dönüşüm analitiği ve A/B test altyapısı",
              "Ekip eğitimi, yayın planı ve 30 gün destek",
            ],
            duration: "6–9 hafta",
          },
        ],
      },
      {
        id: "mobile",
        name: "Mobil Uygulamalar",
        description:
          "Fikir prototipinden mağazalarda yayınlanabilir iOS ve Android ürünlerine kadar.",
        packages: [
          {
            id: "mobile-start",
            level: "start",
            name: "Mobil Prototip",
            price: 39000,
            note: "Ana fikri gerçek cihazda test etmeyi sağlayan işlevsel mobil prototip.",
            includes: [
              "Kullanıcı akışları ve ekran planı",
              "5 temel ekranın özel tasarımı",
              "React Native uygulama altyapısı",
              "Yerel veri ve temel etkileşimler",
              "Android ve iOS test sürümleri",
              "Demo teslimi ve 2 revizyon",
            ],
            duration: "3–4 hafta",
          },
          {
            id: "mobile-product",
            level: "product",
            name: "Mobil MVP",
            price: 64000,
            note: "Gerçek kullanıcılarla yayına çıkabilecek temel özelliklere sahip mobil ürün.",
            includes: [
              "iOS ve Android üretim uygulaması",
              "Kayıt, giriş ve kullanıcı profili",
              "API, veritabanı ve bulut bağlantısı",
              "Push bildirimleri ve temel yönetim ekranı",
              "Analitik ve hata izleme kurulumu",
              "App Store / Google Play yayın hazırlığı",
            ],
            duration: "5–8 hafta",
            featured: true,
          },
          {
            id: "mobile-scale",
            level: "scale",
            name: "Mobil Ölçek",
            price: 109000,
            note: "Gelir modeli, gelişmiş modüller ve operasyon araçlarıyla ölçeklenebilir uygulama.",
            includes: [
              "Gelişmiş kullanıcı ve içerik modülleri",
              "Abonelik, ödeme veya üyelik sistemi",
              "Çevrimdışı kullanım ve veri senkronizasyonu",
              "Gelişmiş analitik ve crash monitoring",
              "CI/CD ve mağaza sürüm yönetimi",
              "Performans testi ve 30 gün destek",
            ],
            duration: "8–12 hafta",
          },
        ],
      },
      {
        id: "automation",
        name: "İşletme Otomasyonu",
        description:
          "Tek bir tekrarlı görevden bütün operasyonu yöneten akıllı işletme sistemine kadar.",
        packages: [
          {
            id: "automation-start",
            level: "start",
            name: "Süreç Başlangıç",
            price: 29000,
            note: "Zaman kaybettiren tek bir iş akışını otomatikleştiren sade çözüm.",
            includes: [
              "Süreç analizi ve darboğaz haritası",
              "Tek ana otomasyon akışı",
              "1 harici servis entegrasyonu",
              "Basit takip ve durum paneli",
              "E-posta / mesaj bildirimleri",
              "Kurulum dokümanı ve ekip anlatımı",
            ],
            duration: "2–3 hafta",
          },
          {
            id: "automation-product",
            level: "product",
            name: "Operasyon Merkezi",
            price: 44000,
            note: "Müşteri, stok, görev ve raporlamayı tek panelde birleştiren işletme sistemi.",
            includes: [
              "CRM, stok veya görevden 3 ana modül",
              "Kullanıcı rolleri ve ekip yetkileri",
              "Canlı operasyon ve raporlama paneli",
              "3 adede kadar servis entegrasyonu",
              "Excel içe / dışa aktarma ve bildirimler",
              "Veri aktarımı, eğitim ve 14 gün destek",
            ],
            duration: "4–6 hafta",
            featured: true,
          },
          {
            id: "automation-scale",
            level: "scale",
            name: "Akıllı Operasyon",
            price: 79000,
            note: "Departmanlar arası süreçleri ve karar noktalarını uçtan uca yöneten platform.",
            includes: [
              "Uçtan uca çok departmanlı iş akışları",
              "AI destekli belge ve talep işleme",
              "Gelişmiş raporlar ve yönetici ekranları",
              "Onay mekanizmaları ve audit log",
              "Yedekleme, güvenlik ve hata senaryoları",
              "Canlıya geçiş planı ve 30 gün destek",
            ],
            duration: "6–9 hafta",
          },
        ],
      },
    ],
    addOns: [
      { id: "brand", label: "Marka yönü", price: 15000 },
      { id: "copy", label: "İçerik & metin", price: 10000 },
      { id: "speed", label: "Öncelikli teslim", price: 20000 },
    ],
    faqs: [
      {
        q: "Süreç nasıl başlıyor?",
        a: "Kısa bir tanışma görüşmesinde hedefi, kapsamı ve başarı ölçütlerini netleştiriyoruz. Ardından sana net teslimleri, takvimi ve bütçeyi içeren bir proje planı gönderiyorum.",
      },
      {
        q: "Hazır tema mı kullanıyorsun?",
        a: "Hayır. Her proje ihtiyaca göre tasarlanıyor. Gereksiz yere sıfırdan altyapı yazmak yerine güvenilir teknolojileri, markana özel deneyimle birleştiriyorum.",
      },
      {
        q: "Yayın sonrası destek var mı?",
        a: "Evet. Teslim sonrası hata düzeltme dönemi her pakete dahil. Sürekli geliştirme ve bakım için aylık destek modeli de oluşturabiliriz.",
      },
      {
        q: "Bütçem paketlere uymuyorsa?",
        a: "Paketler başlangıç noktasıdır. Öncelikleri birlikte sıralayıp hedefi koruyan daha küçük bir ilk sürüm planlayabiliriz.",
      },
    ],
  },
  en: {
    services: [
      {
        icon: "01",
        title: "Web experiences",
        description:
          "Fast, conversion-focused websites that communicate your brand in seconds.",
        tags: ["Landing page", "Corporate website", "E-commerce", "SEO"],
        command: "npm run launch",
      },
      {
        icon: "02",
        title: "AI agents & automation",
        description:
          "Intelligent systems that understand workflows, make decisions, and work alongside your team.",
        tags: ["AI agents", "LLM", "Workflow", "API"],
        command: "python agent.py --deploy",
      },
      {
        icon: "03",
        title: "Game development",
        description:
          "Interactive game experiences with strong mechanics, from the first idea to a playable prototype.",
        tags: ["Web games", "2D / 3D", "Multiplayer", "Prototype"],
        command: "npm run playtest",
      },
      {
        icon: "04",
        title: "Mobile apps",
        description:
          "Fast, fluid iOS and Android apps that users will want to come back to.",
        tags: ["iOS", "Android", "React Native", "App Store"],
        command: "npx expo start",
      },
    ],
    packageCategories: [
      {
        id: "finance",
        name: "Financial Systems",
        description:
          "Packages that turn financial data into clear, secure, and actionable products.",
        packages: [
          {
            id: "finance-start",
            level: "start",
            name: "Finance Starter",
            price: 39000,
            note: "A fast start for products that need to track essential financial data in one place.",
            includes: [
              "Discovery workshop and financial data model",
              "Secure sign-in and user accounts",
              "Income, expense, or portfolio dashboard",
              "Manual data entry and CSV import",
              "Mobile-friendly core interface",
              "Production setup and 2 revision rounds",
            ],
            duration: "2–4 weeks",
          },
          {
            id: "finance-product",
            level: "product",
            name: "Finance Product",
            price: 69000,
            note: "A launch-ready financial product MVP with live data and advanced reporting.",
            includes: [
              "Everything in the Starter package",
              "Banking, market data, or custom API integration",
              "Live charts and comparative analysis",
              "Admin, team, and customer roles",
              "PDF / Excel reporting and export",
              "Notifications, testing, and 14 days of support",
            ],
            duration: "4–7 weeks",
            featured: true,
          },
          {
            id: "finance-scale",
            level: "scale",
            name: "Finance at Scale",
            price: 109000,
            note: "A scalable financial platform built to serve multiple user groups.",
            includes: [
              "Product strategy and technical architecture",
              "Multi-company / multi-client structure",
              "Custom transaction and approval workflows",
              "Advanced analytics, risk, and performance views",
              "Admin panel, audit log, and security layer",
              "Load testing, launch plan, and 30 days of support",
            ],
            duration: "7–10 weeks",
          },
        ],
      },
      {
        id: "agents",
        name: "AI Agents",
        description:
          "Workflow-specific solutions, from single-purpose assistants to multi-tool operations agents.",
        packages: [
          {
            id: "agents-start",
            level: "start",
            name: "Agent Starter",
            price: 29000,
            note: "A controlled, measurable AI agent that solves one clearly defined business problem.",
            includes: [
              "Use case definition and success criteria",
              "Custom single-purpose AI agent",
              "Prompt and system behavior design",
              "1 tool or API integration",
              "Core error handling and test scenarios",
              "Setup guide and 2 revision rounds",
            ],
            duration: "2–3 weeks",
          },
          {
            id: "agents-product",
            level: "product",
            name: "Workflow Agent",
            price: 49000,
            note: "A production agent that manages multiple steps and tools with team approval built in.",
            includes: [
              "Multi-step task and decision workflow",
              "Up to 3 tool / API integrations",
              "Document and knowledge base connections",
              "Human approval and feedback checkpoints",
              "Run history and management dashboard",
              "Evaluation report and 14 days of support",
            ],
            duration: "3–5 weeks",
            featured: true,
          },
          {
            id: "agents-scale",
            level: "scale",
            name: "Agent Platform",
            price: 89000,
            note: "One system for managing multiple agents, users, and business processes.",
            includes: [
              "Multi-agent architecture and task delegation",
              "Role-based users and permissions",
              "CRM, email, and operations integrations",
              "Persistent memory and organizational knowledge layer",
              "Guardrails, evaluations, and cost tracking",
              "Go-live plan and 30 days of support",
            ],
            duration: "6–9 weeks",
          },
        ],
      },
      {
        id: "games",
        name: "Open-World Games",
        description:
          "From validating an idea to a playable build ready to present to investors or publishers.",
        packages: [
          {
            id: "games-start",
            level: "start",
            name: "Playable Concept",
            price: 39000,
            note: "A compact demo that tests the core idea and the game's potential for fun.",
            includes: [
              "Game concept and core loop design",
              "One playable area / level",
              "Character movement and camera system",
              "Core interaction and quest prototype",
              "Placeholder UI and in-game guidance",
              "Desktop or web demo delivery",
            ],
            duration: "3–5 weeks",
          },
          {
            id: "games-product",
            level: "product",
            name: "World Prototype",
            price: 74000,
            note: "A comprehensive game prototype combining exploration, quests, and progression systems.",
            includes: [
              "Map, region, and biome prototype",
              "Inventory, quest, and progression systems",
              "NPC behavior and core enemy AI",
              "Save / load and control settings",
              "First-pass performance optimization",
              "2 playtest builds and a findings report",
            ],
            duration: "5–8 weeks",
            featured: true,
          },
          {
            id: "games-scale",
            level: "scale",
            name: "Vertical Slice",
            price: 119000,
            note: "A polished, presentation-ready production slice that represents the game's target quality.",
            includes: [
              "Visual direction and production standards",
              "Polished open-world region",
              "Combat, quests, and character progression",
              "Custom UI, audio, and feedback layer",
              "Performance work on target devices",
              "Publisher presentation and production roadmap",
            ],
            duration: "8–12 weeks",
          },
        ],
      },
      {
        id: "web",
        name: "Web & E-Commerce",
        description:
          "Fast, manageable web products, from brand websites to sales and growth infrastructure.",
        packages: [
          {
            id: "web-start",
            level: "start",
            name: "Launch Site",
            price: 24000,
            note: "A fast, professional, launch-ready website that communicates your brand clearly.",
            includes: [
              "Custom interface design for 1–5 pages",
              "Responsive mobile, tablet, and desktop layouts",
              "Contact form and essential integrations",
              "Technical SEO and performance setup",
              "Analytics and search engine setup",
              "Launch, domain connection, and 2 revision rounds",
            ],
            duration: "2–3 weeks",
          },
          {
            id: "web-product",
            level: "product",
            name: "Commerce Pro",
            price: 35000,
            note: "An e-commerce system for managing products and selling securely online.",
            includes: [
              "Custom storefront and product page design",
              "Product, category, and inventory management",
              "Cart, payment, and order flows",
              "Admin panel or CMS integration",
              "Email notifications and core reports",
              "SEO, speed optimization, and 14 days of support",
            ],
            duration: "3–5 weeks",
            featured: true,
          },
          {
            id: "web-scale",
            level: "scale",
            name: "Growth Platform",
            price: 69000,
            note: "A growth platform that brings content, sales, and automation into one system.",
            includes: [
              "Multilingual and multi-region architecture",
              "Advanced filters, search, and product variants",
              "CRM, marketing, and accounting integrations",
              "Blog, campaign, and landing page system",
              "Conversion analytics and A/B testing infrastructure",
              "Team training, launch plan, and 30 days of support",
            ],
            duration: "6–9 weeks",
          },
        ],
      },
      {
        id: "mobile",
        name: "Mobile Apps",
        description:
          "From an idea prototype to iOS and Android products ready for the app stores.",
        packages: [
          {
            id: "mobile-start",
            level: "start",
            name: "Mobile Prototype",
            price: 39000,
            note: "A functional mobile prototype for testing the core idea on a real device.",
            includes: [
              "User flows and screen plan",
              "Custom design for 5 core screens",
              "React Native application foundation",
              "Local data and essential interactions",
              "Android and iOS test builds",
              "Demo delivery and 2 revision rounds",
            ],
            duration: "3–4 weeks",
          },
          {
            id: "mobile-product",
            level: "product",
            name: "Mobile MVP",
            price: 64000,
            note: "A mobile product with the essential features needed to launch with real users.",
            includes: [
              "Production app for iOS and Android",
              "Sign-up, sign-in, and user profiles",
              "API, database, and cloud integration",
              "Push notifications and a core admin view",
              "Analytics and error tracking setup",
              "App Store / Google Play launch preparation",
            ],
            duration: "5–8 weeks",
            featured: true,
          },
          {
            id: "mobile-scale",
            level: "scale",
            name: "Mobile at Scale",
            price: 109000,
            note: "A scalable app with monetization, advanced modules, and operations tooling.",
            includes: [
              "Advanced user and content modules",
              "Subscription, payment, or membership system",
              "Offline use and data synchronization",
              "Advanced analytics and crash monitoring",
              "CI/CD and store release management",
              "Performance testing and 30 days of support",
            ],
            duration: "8–12 weeks",
          },
        ],
      },
      {
        id: "automation",
        name: "Business Automation",
        description:
          "From automating one repetitive task to an intelligent system that runs the entire operation.",
        packages: [
          {
            id: "automation-start",
            level: "start",
            name: "Process Starter",
            price: 29000,
            note: "A focused solution that automates one time-consuming workflow.",
            includes: [
              "Process analysis and bottleneck map",
              "One core automation workflow",
              "1 external service integration",
              "Simple tracking and status dashboard",
              "Email / message notifications",
              "Setup guide and team walkthrough",
            ],
            duration: "2–3 weeks",
          },
          {
            id: "automation-product",
            level: "product",
            name: "Operations Hub",
            price: 44000,
            note: "A business system that unifies customers, inventory, tasks, and reporting in one dashboard.",
            includes: [
              "3 core modules across CRM, inventory, or tasks",
              "User roles and team permissions",
              "Live operations and reporting dashboard",
              "Up to 3 service integrations",
              "Excel import / export and notifications",
              "Data migration, training, and 14 days of support",
            ],
            duration: "4–6 weeks",
            featured: true,
          },
          {
            id: "automation-scale",
            level: "scale",
            name: "Intelligent Operations",
            price: 79000,
            note: "An end-to-end platform for managing cross-department workflows and decision points.",
            includes: [
              "End-to-end, cross-department workflows",
              "AI-assisted document and request processing",
              "Advanced reports and executive dashboards",
              "Approval mechanisms and audit log",
              "Backups, security, and failure scenarios",
              "Go-live plan and 30 days of support",
            ],
            duration: "6–9 weeks",
          },
        ],
      },
    ],
    addOns: [
      { id: "brand", label: "Brand direction", price: 15000 },
      { id: "copy", label: "Content & copywriting", price: 10000 },
      { id: "speed", label: "Priority delivery", price: 20000 },
    ],
    faqs: [
      {
        q: "How does the process begin?",
        a: "In a short introductory call, we clarify the goal, scope, and success criteria. I then send you a project plan with clear deliverables, timeline, and budget.",
      },
      {
        q: "Do you use off-the-shelf themes?",
        a: "No. Every project is designed around its specific needs. Instead of rebuilding infrastructure from scratch without a reason, I combine reliable technologies with an experience tailored to your brand.",
      },
      {
        q: "Do you provide support after launch?",
        a: "Yes. Every package includes a post-delivery bug-fix period. We can also arrange a monthly support plan for ongoing development and maintenance.",
      },
      {
        q: "What if my budget does not fit the packages?",
        a: "The packages are starting points. We can prioritize together and plan a smaller first release that keeps the core goal intact.",
      },
    ],
  },
} satisfies Record<Locale, HomeContent>;

export function getHomeContent(locale: Locale): HomeContent {
  return content[locale];
}
