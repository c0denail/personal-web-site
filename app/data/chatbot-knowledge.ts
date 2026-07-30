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

function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[^\p{L}\p{N}\s&+₺.-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function detectCategory(lastMessage: string, conversation: string): CategoryKey | null {
  const orderedCategories = Object.entries(CATEGORY_INFO) as [
    CategoryKey,
    CategoryInfo,
  ][];
  return (
    orderedCategories.find(([, info]) => includesAny(lastMessage, info.terms))?.[0] ??
    orderedCategories.find(([, info]) => includesAny(conversation, info.terms))?.[0] ??
    null
  );
}

export function getSiteAnswer(message: string, conversation = message) {
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
