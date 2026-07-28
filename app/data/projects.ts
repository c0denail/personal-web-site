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

export const projects: Project[] = [
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

export function getProject(slug: string) {
  return projects.find((project) => project.id === slug);
}
