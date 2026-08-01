import type { Locale } from "../i18n";

export type ProjectTone = "violet" | "green" | "orange" | "blue" | "cyan" | "gold";

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  label: string;
  labelDetail: string;
  tone: ProjectTone;
  duration: string;
  role: string;
  problem: string[];
  solution: string[];
  technologies: string[];
  deliverables: string[];
  outcomes: {
    value: string;
    label: string;
    description: string;
  }[];
  screens: {
    kicker: string;
    title: string;
    description: string;
  }[];
};

const trProjects: Project[] = [
  {
    id: "finance",
    index: "01",
    title: "FİNANS SİSTEMLERİ",
    category: "Fintech / Web & Mobile",
    description: "Takip, analiz ve işlem akışlarını birleştiren finans ürünleri.",
    stack: ["Fintech", "Real-time Data", "Dashboard"],
    label: "FIN",
    labelDetail: "Finans Uygulamaları",
    tone: "violet",
    duration: "8–12 hafta",
    role: "Ürün stratejisi, UX/UI ve full-stack geliştirme",
    problem: [
      "Finansal verilerin farklı kaynaklarda dağınık tutulması, ekiplerin güncel durumu tek bakışta görmesini zorlaştırıyordu.",
      "Manuel raporlama süreçleri zaman kaybına neden oluyor; kullanıcı rolleri ve kritik işlem kayıtları için daha güvenli bir yapı gerekiyordu.",
    ],
    solution: [
      "Canlı veri akışlarını, işlem geçmişini ve temel performans göstergelerini tek bir modüler dashboard altında birleştiren ürün mimarisi tasarlandı.",
      "Rol bazlı erişim, denetim kayıtları, gelişmiş filtreleme ve dışa aktarma akışları ürünün temel katmanlarına yerleştirildi.",
    ],
    technologies: ["Next.js", "TypeScript", "C#", "PostgreSQL", "REST API", "WebSocket", "RBAC", "Charting"],
    deliverables: [
      "Finansal veri modeli ve ürün bilgi mimarisi",
      "Gerçek zamanlı dashboard ve grafik sistemi",
      "İşlem listesi, filtreleme ve detay ekranları",
      "Rol bazlı kullanıcı ve yetki yönetimi",
      "Raporlama ve CSV/PDF dışa aktarma akışları",
      "Responsive web arayüzü ve yayın kurulumu",
    ],
    outcomes: [
      {
        value: "TEK PANEL",
        label: "Merkezi görünürlük",
        description: "Kritik finans verileri ve işlem durumları ortak bir ekranda birleşir.",
      },
      {
        value: "CANLI",
        label: "Veri takibi",
        description: "Değişen değerler manuel yenileme gerektirmeden izlenebilir.",
      },
      {
        value: "RBAC",
        label: "Kontrollü erişim",
        description: "Her kullanıcı yalnızca rolünün izin verdiği verilere ve işlemlere ulaşır.",
      },
      {
        value: "WEB + MOBİL",
        label: "Uyumlu deneyim",
        description: "Dashboard temel işlevlerini farklı ekran boyutlarında korur.",
      },
    ],
    screens: [
      {
        kicker: "01 / OVERVIEW",
        title: "Finans özeti",
        description: "Bakiye, nakit akışı ve performans göstergelerini tek bakışta sunan ana kontrol ekranı.",
      },
      {
        kicker: "02 / TRANSACTIONS",
        title: "İşlem merkezi",
        description: "Filtrelenebilir hareket listesi, durum takibi ve ayrıntılı işlem inceleme alanı.",
      },
      {
        kicker: "03 / REPORTS",
        title: "Raporlama",
        description: "Tarih ve kategori bazlı analizler ile paylaşılabilir rapor üretim akışı.",
      },
    ],
  },
  {
    id: "agents",
    index: "02",
    title: "AI AJANLARI",
    category: "Artificial Intelligence / Automation",
    description: "Görev yürüten ve iş akışlarına bağlanan özel yapay zekâ ajanları.",
    stack: ["LLM", "Tool Use", "Workflow"],
    label: "AGENT",
    labelDetail: "Akıllı İş Ajanları",
    tone: "green",
    duration: "6–10 hafta",
    role: "Ajan mimarisi, entegrasyon, güvenlik ve ürün arayüzü",
    problem: [
      "Tekrarlayan bilgi toplama, sınıflandırma ve yanıt üretme işleri ekiplerin zamanını tüketiyor; farklı araçlar arasında sürekli bağlam taşımak gerekiyordu.",
      "Genel amaçlı sohbet araçları şirket verisi, işlem yetkileri ve onay süreçleriyle güvenli biçimde çalışmadığı için üretim akışına doğrudan alınamıyordu.",
    ],
    solution: [
      "Belirli görevleri tamamlamak üzere araç kullanabilen, kurum bilgisini kaynak göstererek tarayan ve gerektiğinde insan onayı isteyen özel ajan akışları kuruldu.",
      "Her görev adımı izlenebilir hâle getirildi; hata yönetimi, yetki sınırları ve maliyet takibi için merkezi bir kontrol katmanı tasarlandı.",
    ],
    technologies: ["LLM API", "RAG", "Vector DB", "Tool Calling", "Workflow Engine", "REST API", "Audit Logs"],
    deliverables: [
      "Kullanım senaryosu ve ajan görev haritası",
      "Kurumsal bilgi tabanı ve kaynaklı cevap sistemi",
      "Harici servis ve şirket API entegrasyonları",
      "İnsan onaylı kritik işlem akışları",
      "Görev geçmişi, log ve hata izleme paneli",
      "Prompt, güvenlik ve maliyet optimizasyonu",
    ],
    outcomes: [
      {
        value: "7/24",
        label: "Görev erişimi",
        description: "Tanımlı ajanlar uygun görevleri günün her anında kabul edebilir.",
      },
      {
        value: "KAYNAKLI",
        label: "Bilgi üretimi",
        description: "Yanıtlar bağlı bilgi tabanındaki içeriklerle ilişkilendirilebilir.",
      },
      {
        value: "ONAYLI",
        label: "Kritik işlemler",
        description: "Riskli adımlar kullanıcı onayı alınmadan yürütülmez.",
      },
      {
        value: "İZLENEBİLİR",
        label: "Ajan kararları",
        description: "Araç çağrıları, sonuçlar ve hata durumları merkezi olarak kaydedilir.",
      },
    ],
    screens: [
      {
        kicker: "01 / COMMAND",
        title: "Ajan çalışma alanı",
        description: "Görev verme, bağlam ekleme ve sonuçları kaynaklarıyla inceleme ekranı.",
      },
      {
        kicker: "02 / WORKFLOW",
        title: "Akış tasarımı",
        description: "Araçlar, karar noktaları ve insan onaylarının görsel görev zinciri.",
      },
      {
        kicker: "03 / OBSERVABILITY",
        title: "Görev gözlemi",
        description: "Ajan durumları, maliyet, süre ve hata kayıtlarını birleştiren kontrol paneli.",
      },
    ],
  },
  {
    id: "games",
    index: "03",
    title: "AÇIK DÜNYA OYUNLARI",
    category: "Game Development / Open World",
    description: "Açık dünya yapısı ve etkileşimli mekaniklere sahip oyun projeleri.",
    stack: ["World Design", "Gameplay Systems", "Optimization"],
    label: "GAME",
    labelDetail: "Açık Dünya Oyunları 2D-3D",
    tone: "orange",
    duration: "10–16 hafta",
    role: "Oyun tasarımı, prototipleme ve teknik geliştirme",
    problem: [
      "Açık dünya fikirleri çoğu zaman kapsamı kontrol edilmeden büyüyor; temel oynanış döngüsü kanıtlanmadan içerik üretimine geçilmesi yüksek geliştirme riski oluşturuyordu.",
      "Harita, görev, envanter ve kayıt sistemlerinin birbirinden kopuk tasarlanması performans ve oyuncu deneyimi sorunlarına neden olabiliyordu.",
    ],
    solution: [
      "Önce hareket, keşif ve etkileşimden oluşan çekirdek oynanış döngüsü prototiplendi; ardından bu döngüyü destekleyen kontrollü bir dünya bölgesi üretildi.",
      "Görev, envanter, NPC ve kayıt sistemleri ortak olay mimarisi altında birleştirilerek genişletilebilir bir vertical slice hazırlandı.",
    ],
    technologies: ["Unity", "C#", "World Streaming", "AI Navigation", "Save System", "Profiling", "Shader Tools"],
    deliverables: [
      "Oynanış döngüsü ve kapsam dokümanı",
      "Karakter hareketi ve kamera sistemi",
      "Etkileşimli örnek açık dünya bölgesi",
      "Görev, envanter ve NPC altyapısı",
      "Kayıt/yükleme ve temel ayarlar",
      "Performans profili ve üretim yol haritası",
    ],
    outcomes: [
      {
        value: "1 SLICE",
        label: "Oynanabilir bölüm",
        description: "Temel sistemleri birlikte gösteren uçtan uca bir oyun kesiti hazırlanır.",
      },
      {
        value: "MODÜLER",
        label: "Oyun sistemleri",
        description: "Yeni içerikler mevcut çekirdeği bozmadan sisteme eklenebilir.",
      },
      {
        value: "KAYITLI",
        label: "Oyuncu ilerlemesi",
        description: "Görev, konum ve envanter durumu kalıcı olarak saklanabilir.",
      },
      {
        value: "PROFİLLİ",
        label: "Performans",
        description: "Darboğazlar üretim öncesinde ölçülür ve görünür hâle getirilir.",
      },
    ],
    screens: [
      {
        kicker: "01 / WORLD",
        title: "Dünya keşfi",
        description: "Oyuncuyu yönlendiren çevresel işaretler ve etkileşim noktaları bulunan örnek bölge.",
      },
      {
        kicker: "02 / SYSTEMS",
        title: "Görev ve envanter",
        description: "Aktif görevler, toplanan öğeler ve ilerleme durumunu birleştiren arayüz.",
      },
      {
        kicker: "03 / DEBUG",
        title: "Geliştirici görünümü",
        description: "Dünya akışı, NPC durumları ve performans değerleri için teknik kontrol katmanı.",
      },
    ],
  },
  {
    id: "web",
    index: "04",
    title: "WEB & E-TİCARET",
    category: "Web / Commerce & Content",
    description: "Kurumsal web, blog ve satış odaklı e-ticaret deneyimleri.",
    stack: ["E-commerce", "Blog", "SEO"],
    label: "WEB",
    labelDetail: "Web Sitesi ve Araçları",
    tone: "blue",
    duration: "4–8 hafta",
    role: "Strateji, UX/UI, frontend ve yayın süreci",
    problem: [
      "Marka mesajı, ürün içeriği ve satın alma akışı farklı sayfalarda tutarsız ilerliyor; ziyaretçiler ihtiyaç duyduğu bilgiye hızlı ulaşamıyordu.",
      "Mobil deneyim, içerik yönetimi ve teknik SEO sonradan ele alındığı için yayın sonrası büyüme ve ölçüm zorlaşıyordu.",
    ],
    solution: [
      "İçerik hiyerarşisi dönüşüm hedeflerine göre yeniden kurgulandı; marka anlatısı, ürün keşfi ve teklif/satın alma akışları ortak tasarım sistemiyle birleştirildi.",
      "Yönetilebilir içerik yapısı, performans odaklı frontend ve ölçüm olayları yayın altyapısına dâhil edildi.",
    ],
    technologies: ["Next.js", "TypeScript", "Headless CMS", "Payment API", "Analytics", "SEO", "Vercel"],
    deliverables: [
      "İçerik stratejisi ve site haritası",
      "Özel responsive arayüz tasarımı",
      "Ürün/kategori ve içerik sayfaları",
      "Sepet, ödeme veya teklif akışları",
      "CMS ve yönetilebilir içerik modeli",
      "Teknik SEO, analitik ve yayın kurulumu",
    ],
    outcomes: [
      {
        value: "MOBİL",
        label: "Öncelikli deneyim",
        description: "Temel içerik ve dönüşüm akışları küçük ekranlar için özel olarak düzenlenir.",
      },
      {
        value: "CMS",
        label: "İçerik kontrolü",
        description: "Ekip, geliştirici desteği olmadan temel metin ve ürünleri güncelleyebilir.",
      },
      {
        value: "SEO",
        label: "Arama altyapısı",
        description: "Metadata, indeksleme ve yapılandırılmış içerik teknik temele eklenir.",
      },
      {
        value: "ÖLÇÜMLÜ",
        label: "Dönüşüm akışı",
        description: "Kritik butonlar ve form adımları analitik olaylarıyla takip edilebilir.",
      },
    ],
    screens: [
      {
        kicker: "01 / LANDING",
        title: "Marka ve ürün anlatısı",
        description: "Değer önerisini birkaç saniyede aktaran, dönüşüm odaklı giriş deneyimi.",
      },
      {
        kicker: "02 / CATALOG",
        title: "Ürün keşfi",
        description: "Kategori, filtre ve ürün ayrıntılarını anlaşılır bir alışveriş akışında birleştiren ekran.",
      },
      {
        kicker: "03 / CONTENT",
        title: "İçerik merkezi",
        description: "Arama görünürlüğünü ve uzmanlık anlatısını destekleyen yönetilebilir yayın alanı.",
      },
    ],
  },
  {
    id: "mobile",
    index: "05",
    title: "MOBİL UYGULAMALAR",
    category: "Mobile / Consumer Apps",
    description: "Başarılı ürün modellerinden esinlenen iOS ve Android uygulamaları.",
    stack: ["iOS", "Android", "React Native"],
    label: "APP",
    labelDetail: "iOS & Android",
    tone: "cyan",
    duration: "8–14 hafta",
    role: "Mobil ürün tasarımı, React Native ve mağaza hazırlığı",
    problem: [
      "Web süreçlerinin doğrudan mobil ekrana taşınması uzun formlar, karmaşık navigasyon ve düşük tekrar kullanım sorunları oluşturuyordu.",
      "iOS ve Android için ayrı geliştirme maliyeti, bildirim, çevrimdışı kullanım ve sürüm yönetimi ihtiyaçlarıyla birlikte artıyordu.",
    ],
    solution: [
      "Kritik kullanıcı görevleri kısa mobil akışlara dönüştürüldü; ortak kod tabanı üzerinde platform davranışlarına uyum sağlayan bir arayüz sistemi kuruldu.",
      "Kimlik doğrulama, bildirim, analitik ve çevrimdışı veri ihtiyaçları ürün mimarisinin ilk aşamasında ele alındı.",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Push Notifications", "REST API", "Analytics", "CI/CD"],
    deliverables: [
      "Kullanıcı akışları ve mobil bilgi mimarisi",
      "iOS ve Android responsive ekran seti",
      "Kimlik doğrulama ve profil yönetimi",
      "API entegrasyonu ve yerel veri önbelleği",
      "Bildirim ve temel analitik olayları",
      "Test dağıtımı ve mağaza hazırlık paketi",
    ],
    outcomes: [
      {
        value: "2 PLATFORM",
        label: "Ortak ürün",
        description: "iOS ve Android deneyimleri tek ürün sistemi üzerinden yönetilir.",
      },
      {
        value: "OFFLINE",
        label: "Kesintisiz kullanım",
        description: "Belirlenen temel veriler bağlantı olmadığında da erişilebilir kalabilir.",
      },
      {
        value: "PUSH",
        label: "Geri dönüş",
        description: "İzinli bildirim senaryoları kullanıcıyı doğru zamanda uygulamaya yönlendirir.",
      },
      {
        value: "CI/CD",
        label: "Sürüm süreci",
        description: "Test ve yayın paketleri tekrarlanabilir bir dağıtım akışıyla hazırlanır.",
      },
    ],
    screens: [
      {
        kicker: "01 / HOME",
        title: "Kişiselleştirilmiş ana ekran",
        description: "Kullanıcının son işlemlerini ve sıradaki görevini öne çıkaran mobil başlangıç alanı.",
      },
      {
        kicker: "02 / FLOW",
        title: "Hızlı işlem akışı",
        description: "Uzun formları küçük, anlaşılır ve geri bildirim veren adımlara bölen deneyim.",
      },
      {
        kicker: "03 / PROFILE",
        title: "Hesap ve tercihler",
        description: "Bildirim, güvenlik ve kişisel ayarların tek noktadan yönetildiği ekran.",
      },
    ],
  },
  {
    id: "automation",
    index: "06",
    title: "İŞLETME OTOMASYONU",
    category: "SMB / Business Automation",
    description: "Esnafın günlük operasyonlarını sadeleştiren özel otomasyon sistemleri.",
    stack: ["Stok", "CRM", "Raporlama"],
    label: "SMB",
    labelDetail: "İş Yeri Sistemleri",
    tone: "gold",
    duration: "6–10 hafta",
    role: "Süreç analizi, otomasyon mimarisi ve yönetim paneli",
    problem: [
      "Stok, müşteri, sipariş ve tahsilat bilgileri farklı dosya ve mesajlaşma kanallarında tutulduğu için operasyonun güncel durumunu görmek zorlaşıyordu.",
      "Tekrarlayan veri girişi hem zaman kaybına hem de hata riskine yol açıyor; işletme sahibi raporları manuel hazırlamak zorunda kalıyordu.",
    ],
    solution: [
      "Günlük operasyon adımları sadeleştirilerek ortak veri modeli altında birleştirildi; kritik tekrarlar otomatik görevler ve bildirimlerle desteklendi.",
      "Rol bazlı yönetim paneli üzerinden stok, müşteri, sipariş ve rapor süreçlerinin tek yerden yürütülmesi sağlandı.",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Workflow", "Messaging API", "Reporting", "Cloud"],
    deliverables: [
      "Mevcut süreç analizi ve otomasyon haritası",
      "Stok, müşteri ve sipariş modülleri",
      "Rol bazlı yönetim paneli",
      "Bildirim ve görev otomasyonları",
      "İçe aktarma ve raporlama araçları",
      "Kullanıcı eğitimi ve operasyon dokümanı",
    ],
    outcomes: [
      {
        value: "TEK KAYIT",
        label: "Ortak veri",
        description: "Müşteri, ürün ve işlem bilgileri dağınık dosyalar yerine merkezi tutulur.",
      },
      {
        value: "OTOMATİK",
        label: "Tekrarlayan işler",
        description: "Tanımlı bildirim ve durum güncellemeleri insan müdahalesini azaltır.",
      },
      {
        value: "ANLIK",
        label: "Operasyon görünümü",
        description: "Stok, sipariş ve tahsilat durumları güncel panel üzerinden izlenebilir.",
      },
      {
        value: "RAPORLU",
        label: "Karar desteği",
        description: "Temel iş göstergeleri düzenli ve paylaşılabilir raporlara dönüşür.",
      },
    ],
    screens: [
      {
        kicker: "01 / OPERATIONS",
        title: "Operasyon merkezi",
        description: "Günün sipariş, stok ve görev durumlarını tek ekranda birleştiren kontrol paneli.",
      },
      {
        kicker: "02 / CUSTOMERS",
        title: "Müşteri görünümü",
        description: "İletişim, işlem geçmişi ve takip notlarını ortak müşteri kaydında birleştiren alan.",
      },
      {
        kicker: "03 / REPORTS",
        title: "İşletme raporları",
        description: "Satış, stok hareketi ve operasyon yoğunluğunu dönemsel olarak özetleyen rapor ekranı.",
      },
    ],
  },
];

const enProjects: Project[] = [
  {
    id: "finance",
    index: "01",
    title: "FINANCIAL SYSTEMS",
    category: "Fintech / Web & Mobile",
    description: "Financial products that unify tracking, analysis, and transaction workflows.",
    stack: ["Fintech", "Real-time Data", "Dashboard"],
    label: "FIN",
    labelDetail: "Financial Applications",
    tone: "violet",
    duration: "8–12 weeks",
    role: "Product strategy, UX/UI, and full-stack development",
    problem: [
      "Financial data was scattered across different sources, making it difficult for teams to see the current state at a glance.",
      "Manual reporting processes were time-consuming, while user roles and critical transaction records required a more secure structure.",
    ],
    solution: [
      "A product architecture was designed to bring live data streams, transaction history, and key performance indicators together in one modular dashboard.",
      "Role-based access, audit logs, advanced filtering, and export workflows were built into the product’s core layers.",
    ],
    technologies: ["Next.js", "TypeScript", "C#", "PostgreSQL", "REST API", "WebSocket", "RBAC", "Charting"],
    deliverables: [
      "Financial data model and product information architecture",
      "Real-time dashboard and charting system",
      "Transaction list, filtering, and detail screens",
      "Role-based user and permission management",
      "Reporting and CSV/PDF export workflows",
      "Responsive web interface and deployment setup",
    ],
    outcomes: [
      {
        value: "ONE DASHBOARD",
        label: "Centralized visibility",
        description: "Critical financial data and transaction statuses are brought together in one view.",
      },
      {
        value: "LIVE",
        label: "Data monitoring",
        description: "Changing values can be monitored without manual refreshes.",
      },
      {
        value: "RBAC",
        label: "Controlled access",
        description: "Each user can access only the data and actions permitted by their role.",
      },
      {
        value: "WEB + MOBILE",
        label: "Responsive experience",
        description: "The dashboard preserves its core functionality across different screen sizes.",
      },
    ],
    screens: [
      {
        kicker: "01 / OVERVIEW",
        title: "Financial overview",
        description: "The main control screen presents balances, cash flow, and performance indicators at a glance.",
      },
      {
        kicker: "02 / TRANSACTIONS",
        title: "Transaction center",
        description: "A filterable activity list with status tracking and a detailed transaction review area.",
      },
      {
        kicker: "03 / REPORTS",
        title: "Reporting",
        description: "A workflow for date- and category-based analysis and shareable report generation.",
      },
    ],
  },
  {
    id: "agents",
    index: "02",
    title: "AI AGENTS",
    category: "Artificial Intelligence / Automation",
    description: "Custom AI agents that execute tasks and connect to business workflows.",
    stack: ["LLM", "Tool Use", "Workflow"],
    label: "AGENT",
    labelDetail: "Intelligent Work Agents",
    tone: "green",
    duration: "6–10 weeks",
    role: "Agent architecture, integration, security, and product interface",
    problem: [
      "Repetitive information gathering, classification, and response generation consumed teams’ time and required context to be carried constantly between tools.",
      "General-purpose chat tools could not be introduced directly into production workflows because they did not work securely with company data, action permissions, and approval processes.",
    ],
    solution: [
      "Custom agent workflows were built to use tools for specific tasks, search organizational knowledge with citations, and request human approval when needed.",
      "Every task step was made traceable, with a centralized control layer for error handling, permission boundaries, and cost monitoring.",
    ],
    technologies: ["LLM API", "RAG", "Vector DB", "Tool Calling", "Workflow Engine", "REST API", "Audit Logs"],
    deliverables: [
      "Use-case definition and agent task map",
      "Organizational knowledge base and cited answer system",
      "External service and company API integrations",
      "Human-approved critical action workflows",
      "Task history, logging, and error-monitoring dashboard",
      "Prompt, security, and cost optimization",
    ],
    outcomes: [
      {
        value: "24/7",
        label: "Task availability",
        description: "Configured agents can accept suitable tasks at any time of day.",
      },
      {
        value: "CITED",
        label: "Knowledge generation",
        description: "Answers can be linked to content in the connected knowledge base.",
      },
      {
        value: "APPROVED",
        label: "Critical actions",
        description: "Risky steps are not executed without user approval.",
      },
      {
        value: "TRACEABLE",
        label: "Agent decisions",
        description: "Tool calls, results, and error states are recorded centrally.",
      },
    ],
    screens: [
      {
        kicker: "01 / COMMAND",
        title: "Agent workspace",
        description: "An interface for assigning tasks, adding context, and reviewing results with their sources.",
      },
      {
        kicker: "02 / WORKFLOW",
        title: "Workflow design",
        description: "A visual task chain connecting tools, decision points, and human approvals.",
      },
      {
        kicker: "03 / OBSERVABILITY",
        title: "Task observability",
        description: "A control panel combining agent statuses, cost, duration, and error logs.",
      },
    ],
  },
  {
    id: "games",
    index: "03",
    title: "OPEN-WORLD GAMES",
    category: "Game Development / Open World",
    description: "Game projects with open-world structures and interactive mechanics.",
    stack: ["World Design", "Gameplay Systems", "Optimization"],
    label: "GAME",
    labelDetail: "2D–3D Open-World Games",
    tone: "orange",
    duration: "10–16 weeks",
    role: "Game design, prototyping, and technical development",
    problem: [
      "Open-world concepts often grew without controlled scope, and moving into content production before proving the core gameplay loop created significant development risk.",
      "Designing map, quest, inventory, and save systems in isolation could lead to performance and player-experience issues.",
    ],
    solution: [
      "The core gameplay loop of movement, exploration, and interaction was prototyped first, followed by a focused world region built to support that loop.",
      "Quest, inventory, NPC, and save systems were unified under a shared event architecture to produce an extensible vertical slice.",
    ],
    technologies: ["Unity", "C#", "World Streaming", "AI Navigation", "Save System", "Profiling", "Shader Tools"],
    deliverables: [
      "Gameplay loop and scope document",
      "Character movement and camera system",
      "Interactive sample open-world region",
      "Quest, inventory, and NPC foundations",
      "Save/load system and core settings",
      "Performance profile and production roadmap",
    ],
    outcomes: [
      {
        value: "1 SLICE",
        label: "Playable section",
        description: "An end-to-end game slice demonstrates the core systems working together.",
      },
      {
        value: "MODULAR",
        label: "Game systems",
        description: "New content can be added without disrupting the existing core.",
      },
      {
        value: "PERSISTED",
        label: "Player progress",
        description: "Quest, location, and inventory states can be stored persistently.",
      },
      {
        value: "PROFILED",
        label: "Performance",
        description: "Bottlenecks are measured and made visible before production.",
      },
    ],
    screens: [
      {
        kicker: "01 / WORLD",
        title: "World exploration",
        description: "A sample region with environmental cues and interaction points that guide the player.",
      },
      {
        kicker: "02 / SYSTEMS",
        title: "Quests and inventory",
        description: "An interface combining active quests, collected items, and progression status.",
      },
      {
        kicker: "03 / DEBUG",
        title: "Developer view",
        description: "A technical control layer for world streaming, NPC states, and performance metrics.",
      },
    ],
  },
  {
    id: "web",
    index: "04",
    title: "WEB & E-COMMERCE",
    category: "Web / Commerce & Content",
    description: "Corporate websites, blogs, and sales-focused e-commerce experiences.",
    stack: ["E-commerce", "Blog", "SEO"],
    label: "WEB",
    labelDetail: "Websites & Tools",
    tone: "blue",
    duration: "4–8 weeks",
    role: "Strategy, UX/UI, frontend, and launch",
    problem: [
      "Brand messaging, product content, and purchase journeys were inconsistent across pages, preventing visitors from reaching the information they needed quickly.",
      "Because mobile experience, content management, and technical SEO were considered late, post-launch growth and measurement became difficult.",
    ],
    solution: [
      "The content hierarchy was rebuilt around conversion goals, while brand storytelling, product discovery, and quote or purchase journeys were unified through a shared design system.",
      "A manageable content structure, performance-focused frontend, and measurement events were included in the deployment foundation.",
    ],
    technologies: ["Next.js", "TypeScript", "Headless CMS", "Payment API", "Analytics", "SEO", "Vercel"],
    deliverables: [
      "Content strategy and site map",
      "Custom responsive interface design",
      "Product, category, and content pages",
      "Cart, payment, or quote workflows",
      "CMS and manageable content model",
      "Technical SEO, analytics, and deployment setup",
    ],
    outcomes: [
      {
        value: "MOBILE",
        label: "First-class experience",
        description: "Core content and conversion journeys are arranged specifically for smaller screens.",
      },
      {
        value: "CMS",
        label: "Content control",
        description: "The team can update core copy and products without developer support.",
      },
      {
        value: "SEO",
        label: "Search foundation",
        description: "Metadata, indexing, and structured content are included in the technical foundation.",
      },
      {
        value: "MEASURED",
        label: "Conversion journey",
        description: "Critical buttons and form steps can be tracked through analytics events.",
      },
    ],
    screens: [
      {
        kicker: "01 / LANDING",
        title: "Brand and product story",
        description: "A conversion-focused landing experience that communicates the value proposition in seconds.",
      },
      {
        kicker: "02 / CATALOG",
        title: "Product discovery",
        description: "An interface that unifies categories, filters, and product details in a clear shopping journey.",
      },
      {
        kicker: "03 / CONTENT",
        title: "Content hub",
        description: "A manageable publishing area supporting search visibility and subject-matter expertise.",
      },
    ],
  },
  {
    id: "mobile",
    index: "05",
    title: "MOBILE APPS",
    category: "Mobile / Consumer Apps",
    description: "iOS and Android applications inspired by successful product models.",
    stack: ["iOS", "Android", "React Native"],
    label: "APP",
    labelDetail: "iOS & Android",
    tone: "cyan",
    duration: "8–14 weeks",
    role: "Mobile product design, React Native, and store readiness",
    problem: [
      "Moving web processes directly onto mobile screens resulted in long forms, complex navigation, and low repeat usage.",
      "The cost of separate iOS and Android development increased further with notification, offline-use, and release-management requirements.",
    ],
    solution: [
      "Critical user tasks were transformed into short mobile journeys, supported by an interface system that adapts to platform behaviors on a shared codebase.",
      "Authentication, notifications, analytics, and offline data needs were addressed in the first stage of the product architecture.",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Push Notifications", "REST API", "Analytics", "CI/CD"],
    deliverables: [
      "User flows and mobile information architecture",
      "Responsive screen set for iOS and Android",
      "Authentication and profile management",
      "API integration and local data cache",
      "Notifications and core analytics events",
      "Test distribution and store-readiness package",
    ],
    outcomes: [
      {
        value: "2 PLATFORMS",
        label: "Shared product",
        description: "The iOS and Android experiences are managed through one product system.",
      },
      {
        value: "OFFLINE",
        label: "Continuous use",
        description: "Selected core data can remain accessible without a network connection.",
      },
      {
        value: "PUSH",
        label: "Re-engagement",
        description: "Opt-in notification scenarios guide users back to the app at the right time.",
      },
      {
        value: "CI/CD",
        label: "Release process",
        description: "Test and release packages are prepared through a repeatable distribution workflow.",
      },
    ],
    screens: [
      {
        kicker: "01 / HOME",
        title: "Personalized home screen",
        description: "A mobile starting point that highlights the user’s latest activity and next task.",
      },
      {
        kicker: "02 / FLOW",
        title: "Fast action flow",
        description: "An experience that breaks long forms into small, clear steps with useful feedback.",
      },
      {
        kicker: "03 / PROFILE",
        title: "Account and preferences",
        description: "A single screen for managing notifications, security, and personal settings.",
      },
    ],
  },
  {
    id: "automation",
    index: "06",
    title: "BUSINESS AUTOMATION",
    category: "SMB / Business Automation",
    description: "Custom automation systems that simplify daily operations for small businesses.",
    stack: ["Inventory", "CRM", "Reporting"],
    label: "SMB",
    labelDetail: "Business Systems",
    tone: "gold",
    duration: "6–10 weeks",
    role: "Process analysis, automation architecture, and management dashboard",
    problem: [
      "Inventory, customer, order, and payment data lived across separate files and messaging channels, making it difficult to see the current state of operations.",
      "Repeated data entry cost time and increased the risk of errors, while business owners had to prepare reports manually.",
    ],
    solution: [
      "Daily operational steps were simplified and unified under a shared data model, with critical repetitions supported by automated tasks and notifications.",
      "A role-based management dashboard made it possible to run inventory, customer, order, and reporting processes from one place.",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Workflow", "Messaging API", "Reporting", "Cloud"],
    deliverables: [
      "Current-process analysis and automation map",
      "Inventory, customer, and order modules",
      "Role-based management dashboard",
      "Notification and task automations",
      "Import and reporting tools",
      "User training and operations documentation",
    ],
    outcomes: [
      {
        value: "ONE SOURCE",
        label: "Shared data",
        description: "Customer, product, and transaction data is centralized instead of scattered across files.",
      },
      {
        value: "AUTOMATED",
        label: "Repetitive work",
        description: "Configured notifications and status updates reduce human intervention.",
      },
      {
        value: "REAL-TIME",
        label: "Operations view",
        description: "Inventory, order, and payment statuses can be monitored from an up-to-date dashboard.",
      },
      {
        value: "REPORTED",
        label: "Decision support",
        description: "Core business indicators become regular, shareable reports.",
      },
    ],
    screens: [
      {
        kicker: "01 / OPERATIONS",
        title: "Operations center",
        description: "A dashboard combining the day’s order, inventory, and task statuses in one view.",
      },
      {
        kicker: "02 / CUSTOMERS",
        title: "Customer view",
        description: "An area that brings contact details, transaction history, and follow-up notes into one customer record.",
      },
      {
        kicker: "03 / REPORTS",
        title: "Business reports",
        description: "A reporting screen that summarizes sales, inventory movement, and operational volume by period.",
      },
    ],
  },
];

const projectsByLocale: Record<Locale, Project[]> = {
  tr: trProjects,
  en: enProjects,
};

// Kept as the Turkish collection for existing Turkish-page imports.
export const projects = trProjects;

export function getProjects(locale: Locale = "tr") {
  return projectsByLocale[locale];
}

export function getProject(slug: string, locale: Locale = "tr") {
  return getProjects(locale).find((project) => project.id === slug);
}
