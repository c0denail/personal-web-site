"use client";

import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const CONTACT_EMAIL = "info@c0denail.com";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/c0denail",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emirhan-tuncer-96106a318",
    Icon: FaLinkedinIn,
  },
];

const services = [
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
];

const projects = [
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
  },
];

const packageCategories = [
  {
    id: "finance",
    name: "Finans Sistemleri",
    description: "Finansal veriyi anlaşılır, güvenli ve işlem yapılabilir ürünlere dönüştüren paketler.",
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
    description: "Tek görevli yardımcıdan çok araçlı operasyon ajanlarına kadar iş akışına özel çözümler.",
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
    description: "Fikir doğrulamadan yatırımcıya veya yayıncıya sunulabilir oynanabilir sürüme kadar.",
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
    description: "Marka sitesinden satış ve büyüme altyapısına kadar hızlı, yönetilebilir web ürünleri.",
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
    description: "Fikir prototipinden mağazalarda yayınlanabilir iOS ve Android ürünlerine kadar.",
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
    description: "Tek bir tekrarlı görevden bütün operasyonu yöneten akıllı işletme sistemine kadar.",
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
];

const addOns = [
  { id: "brand", label: "Marka yönü", price: 15000 },
  { id: "copy", label: "İçerik & metin", price: 10000 },
  { id: "speed", label: "Öncelikli teslim", price: 20000 },
];

const faqs = [
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
];

type Theme = "dark" | "light";

function formatMoney(value: number) {
  return new Intl.NumberFormat("tr-TR").format(value) + " ₺";
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [command, setCommand] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Bağlantı güvenli. Kullanılabilir komutlar için “help” yaz.",
  ]);
  const [activeCategory, setActiveCategory] = useState("web");
  const [activePackage, setActivePackage] = useState("web-product");
  const [activeAddOns, setActiveAddOns] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState("Web deneyimleri");
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const words = useMemo(
    () => ["web deneyimleri.", "AI ajanları.", "oyunlar.", "mobil uygulamalar."],
    [],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("c0denail-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const nextTheme = saved || preferred;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isComplete = typedText === currentWord;
    const isEmpty = typedText === "";
    const speed = deleting ? 34 : 72;
    const delay = !deleting && isComplete ? 1450 : deleting && isEmpty ? 280 : speed;

    const timer = window.setTimeout(() => {
      if (!deleting && isComplete) {
        setDeleting(true);
      } else if (deleting && isEmpty) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      } else {
        setTypedText(
          deleting
            ? currentWord.slice(0, Math.max(0, typedText.length - 1))
            : currentWord.slice(0, typedText.length + 1),
        );
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, typedText, wordIndex, words]);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const moveGlow = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
    };
    window.addEventListener("pointermove", moveGlow);
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener("pointermove", moveGlow);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("c0denail-theme", nextTheme);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleCommand = (event: FormEvent) => {
    event.preventDefault();
    const clean = command.trim().toLowerCase();
    if (!clean) return;
    const output: Record<string, string> = {
      help: "Komutlar: about, services, work, pricing, contact, theme, clear",
      about: "Emirhan; fikirleri çalışan, hissedilen dijital ürünlere dönüştürür.",
      services: "Web deneyimleri · AI ajanları & otomasyon · Oyun geliştirme · Mobil uygulama",
      work: "Finans · AI ajanları · Oyun · Web · Mobil · Otomasyon — vitrine ışınlanıyor…",
      pricing: "6 kategori · 18 paket · 24K’dan başlayan proje seçenekleri",
      contact: `Bağlantı kanalı: ${CONTACT_EMAIL}`,
      theme: `Tema ${theme === "dark" ? "aydınlık" : "karanlık"} moda geçirildi.`,
    };

    if (clean === "clear") {
      setTerminalLines([]);
    } else {
      setTerminalLines((lines) => [
        ...lines.slice(-3),
        `$ ${clean}`,
        output[clean] || `Komut bulunamadı: ${clean}. “help” deneyebilirsin.`,
      ]);
    }

    if (["about", "services", "work", "pricing", "contact"].includes(clean)) {
      scrollTo(clean);
    }
    if (clean === "theme") toggleTheme();
    setCommand("");
  };

  const handleTilt = (event: MouseEvent<HTMLElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--rotate-x", `${y * -5}deg`);
    element.style.setProperty("--rotate-y", `${x * 7}deg`);
  };

  const resetTilt = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  const selectedCategory =
    packageCategories.find((item) => item.id === activeCategory) || packageCategories[3];
  const visiblePackages = selectedCategory.packages;
  const chosenPackage =
    visiblePackages.find((item) => item.id === activePackage) || visiblePackages[1];
  const total =
    chosenPackage.price +
    addOns
      .filter((item) => activeAddOns.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

  const choosePackage = (packageId: string) => {
    const pack = visiblePackages.find((item) => item.id === packageId);
    if (!pack) return;
    setActivePackage(packageId);
    setSelectedService(`${selectedCategory.name} — ${pack.name}`);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const chooseCategory = (categoryId: string) => {
    const category = packageCategories.find((item) => item.id === categoryId);
    if (!category) return;
    const recommendedPackage =
      category.packages.find((item) => item.featured) || category.packages[0];

    setActiveCategory(categoryId);
    setActivePackage(recommendedPackage.id);
    setActiveAddOns([]);
    setSelectedService(category.name);
  };

  const toggleAddOn = (id: string) => {
    setActiveAddOns((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  };

  const requestOffer = () => {
    setSelectedService(
      `${selectedCategory.name} — ${chosenPackage.name} — ${formatMoney(total)}`,
    );
    scrollTo("contact");
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Mesaj gönderilemedi.");
      }

      form.reset();
      setSelectedService("Web deneyimleri");
      setToast({
        message: "Talebin ulaştı. En kısa sürede dönüş yapacağım.",
        status: "success",
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Mesaj gönderilemedi.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setToast(null), 4200);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setToast({ message: "E-posta adresi kopyalandı.", status: "success" });
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="c0denail ana sayfa">
          <span className="brand-mark">&gt;_</span>
          <span>c0denail</span>
          <span className="brand-cursor">▋</span>
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Ana menü">
          <button onClick={() => scrollTo("about")}>./hakkımda</button>
          <button onClick={() => scrollTo("services")}>./hizmetler</button>
          <button onClick={() => scrollTo("work")}>./işler</button>
          <button onClick={() => scrollTo("pricing")}>./paketler</button>
        </nav>

        <div className="header-actions">
          <div className="header-socials" aria-label="Sosyal medya bağlantıları">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                className="header-social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profilini yeni sekmede aç`}
                title={label}
              >
                <Icon aria-hidden="true" focusable="false" />
              </a>
            ))}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Temayı değiştir">
            <span className="theme-icon">{theme === "dark" ? "☼" : "◐"}</span>
            <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>
          <button className="header-cta" onClick={() => scrollTo("contact")}>
            Projeyi başlat <span>↗</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menüyü aç veya kapat"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="prompt">emirhan@c0denail:~$</span> create --future
          </p>
          <h1>
            Fikri <span className="outline-word">koda,</span>
            <br />
            kodu <span className="accent-word">ürüne.</span>
          </h1>
          <p className="hero-intro">
            Markaların ve girişimlerin büyümesine yardım eden{" "}
            <span className="typed-wrap">
              {typedText}
              <span className="type-caret">▋</span>
            </span>
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("contact")}>
              <span>Birlikte üretelim</span>
              <span className="button-arrow">↗</span>
            </button>
            <button className="text-button" onClick={() => scrollTo("work")}>
              <span className="play-icon">▶</span>
              İşleri keşfet
            </button>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">LOKASYON</span>
              <strong>İstanbul, TR</strong>
            </div>
            <div>
              <span className="meta-label">ÇALIŞMA MODELİ</span>
              <strong>Remote / Worldwide</strong>
            </div>
            <div>
              <span className="meta-label">ODAK</span>
              <strong>Design × Code × AI</strong>
            </div>
          </div>
        </div>

        <div className="hero-console" data-reveal>
          <div className="terminal-window">
            <div className="terminal-bar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>portfolio.tsx — zsh — 98×32</span>
              <span className="terminal-status">● LIVE</span>
            </div>

            <div className="terminal-body">
              <div className="code-block" aria-hidden="true">
                <div><span className="line-no">01</span><span className="code-purple">const</span> creator = {"{"}</div>
                <div><span className="line-no">02</span>&nbsp;&nbsp;name: <span className="code-green">&quot;Emirhan Tuncer&quot;</span>,</div>
                <div><span className="line-no">03</span>&nbsp;&nbsp;role: <span className="code-green">&quot;Creative Developer&quot;</span>,</div>
                <div><span className="line-no">04</span>&nbsp;&nbsp;mindset: <span className="code-green">&quot;ship → learn → evolve&quot;</span>,</div>
                <div><span className="line-no">05</span>&nbsp;&nbsp;available: <span className="code-orange">true</span>,</div>
                <div><span className="line-no">06</span>{"}"};</div>
                <div><span className="line-no">07</span></div>
                <div><span className="line-no">08</span><span className="code-purple">await</span> creator.<span className="code-blue">build</span>(yourIdea);</div>
              </div>

              <div className="system-orbit" aria-hidden="true">
                <div className="orbit orbit-one"><i /></div>
                <div className="orbit orbit-two"><i /></div>
                <div className="core">&gt;_</div>
                <span className="orbit-label label-top">DESIGN</span>
                <span className="orbit-label label-right">CODE</span>
                <span className="orbit-label label-bottom">IMPACT</span>
              </div>

              <div className="terminal-output" aria-live="polite">
                {terminalLines.map((line, index) => (
                  <p key={`${line}-${index}`} className={line.startsWith("$") ? "command-line" : ""}>
                    {line}
                  </p>
                ))}
              </div>

              <form className="command-input" onSubmit={handleCommand}>
                <label htmlFor="command">
                  <span className="prompt">visitor@portfolio:~$</span>
                </label>
                <input
                  ref={commandRef}
                  id="command"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder="help"
                  autoComplete="off"
                  aria-label="Terminal komutu"
                />
              </form>
            </div>
          </div>
          <div className="console-caption">
            <span>TIP: terminale “help” yaz</span>
            <span>⌘ K</span>
          </div>
        </div>

        <button className="scroll-cue" onClick={() => scrollTo("about")} aria-label="Aşağı kaydır">
          <span>SCROLL TO EXPLORE</span>
          <i>↓</i>
        </button>
      </section>

      <section className="marquee" aria-label="Uzmanlık alanları">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              <span>CREATIVE DEVELOPMENT</span><i>✦</i>
              <span>PRODUCT DESIGN</span><i>✦</i>
              <span>AI AUTOMATION</span><i>✦</i>
              <span>MOTION & INTERACTION</span><i>✦</i>
            </div>
          ))}
        </div>
      </section>

      <section className="about section-shell section-block" id="about">
        <div className="section-index" data-reveal>
          <span>01</span>
          <span>/ SİSTEM.HAKKIMDA</span>
        </div>
        <div className="about-layout">
          <div className="about-statement" data-reveal>
            <p className="eyebrow"><span className="prompt">&gt;</span> cat philosophy.txt</p>
            <h2>
              Sadece çalışan değil,
              <br />
              <span>iz bırakan</span> ürünler.
            </h2>
          </div>
          <div className="about-copy" data-reveal>
            <p>
              Merhaba, ben <strong>Emirhan.</strong> Tasarım hassasiyetini mühendislik
              disipliniyle birleştiren bir yazılımcıyım.
            </p>
            <p>
              Kodu yalnızca bir araç olarak görüyorum. Asıl işim; problemi doğru anlamak,
              karmaşayı sadeleştirmek ve kullanıcıyla marka arasında akılda kalan bir bağ kurmak.
            </p>
            <div className="about-signature">
              <span>c0denail</span>
              <div>
                <strong>Emirhan Tuncer</strong>
                <small>Creative Developer</small>
              </div>
            </div>
          </div>
        </div>
        <div className="principle-grid">
          <article data-reveal>
            <span>01.</span>
            <h3>Net düşün</h3>
            <p>Önce doğru problemi bulur, sonra en sade çözümü tasarlarız.</p>
          </article>
          <article data-reveal>
            <span>02.</span>
            <h3>İyi hissettir</h3>
            <p>Her hareket, her boşluk ve her kelime deneyimin bir parçasıdır.</p>
          </article>
          <article data-reveal>
            <span>03.</span>
            <h3>Sağlam inşa et</h3>
            <p>Hızlı açılan, erişilebilir ve büyümeye hazır sistemler geliştiririm.</p>
          </article>
          <article data-reveal>
            <span>04.</span>
            <h3>Gerçek değer üret</h3>
            <p>Başarıyı süslü ekranlarla değil, iş sonucuyla ölçerim.</p>
          </article>
        </div>
      </section>

      <section className="services section-shell section-block" id="services">
        <div className="section-heading" data-reveal>
          <div className="section-index">
            <span>02</span>
            <span>/ SERVICES.JSON</span>
          </div>
          <h2>Ne inşa edebiliriz?</h2>
          <p>Stratejiden yayına, ihtiyacın olan uçtan uca dijital üretim.</p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article
              className="service-card tilt-card"
              key={service.title}
              data-reveal
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div className="service-top">
                <span className="service-number">[{service.icon}]</span>
                <span className="service-command">{service.command}</span>
                <span className="service-arrow card-arrow" aria-hidden="true">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="tag-row">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-block" id="work">
        <div className="section-shell">
          <div className="section-heading split-heading" data-reveal>
            <div>
              <div className="section-index">
                <span>03</span>
                <span>/ WORK.INDEX</span>
              </div>
              <h2>Seçilmiş işler</h2>
            </div>
            <p>Finanstan oyun geliştirmeye uzanan seçili ürün ve sistem çalışmaları.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project-card project-${project.tone} tilt-card`}
                key={project.id}
                data-reveal
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="project-visual">
                  <span className="project-index">/{project.index}</span>
                  <div className="visual-grid" />
                  <div className="visual-window">
                    <div className="mini-window-bar"><i /><i /><i /></div>
                    <div className="visual-content">
                      <span>{project.category}</span>
                      <strong>{project.title}</strong>
                      <div className="visual-lines"><i /><i /><i /></div>
                    </div>
                  </div>
                  <div className="project-chip">
                    <strong>{project.label}</strong>
                    <span>{project.labelDetail}</span>
                  </div>
                </div>
                <div className="project-info">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <button onClick={() => scrollTo("contact")} aria-label={`${project.title} benzeri proje konuş`}>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </button>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="work-footer" data-reveal>
            <span>Yeni bir ürün mü planlıyorsun?</span>
            <button className="text-link" onClick={() => scrollTo("contact")}>
              Projeni konuşalım <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="process section-shell section-block" id="process">
        <div className="section-heading split-heading" data-reveal>
          <div>
            <div className="section-index">
              <span>04</span>
              <span>/ PROCESS.LOG</span>
            </div>
            <h2>Fikirden yayına.</h2>
          </div>
          <p>Şeffaf, odaklı ve sürprizsiz bir üretim süreci.</p>
        </div>

        <div className="process-terminal" data-reveal>
          <div className="terminal-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>project-roadmap.log</span>
            <span>READ ONLY</span>
          </div>
          <div className="process-steps">
            {[
              ["01", "Keşif", "Hedefi, kullanıcıyı ve başarı ölçütünü birlikte netleştiririz.", "1–2 gün"],
              ["02", "Yön", "Bilgi mimarisi, görsel dil ve teknik yaklaşım tek sistemde buluşur.", "3–5 gün"],
              ["03", "Üretim", "Kısa döngülerle tasarlar, geliştirir ve düzenli olarak paylaşırım.", "2–5 hafta"],
              ["04", "Yayın", "Son kontroller, performans ayarları ve pürüzsüz teslim.", "1–2 gün"],
            ].map((step, index) => (
              <article key={step[0]}>
                <div className="process-marker">
                  <span>{step[0]}</span>
                  {index < 3 && <i />}
                </div>
                <div>
                  <span className="process-command">$ step --{step[1].toLocaleLowerCase("tr-TR")}</span>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                </div>
                <span className="process-time">{step[3]}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing section-block" id="pricing">
        <div className="section-shell">
          <div className="section-heading centered-heading" data-reveal>
            <div className="section-index">
              <span>05</span>
              <span>/ PRICING.CONFIG</span>
            </div>
            <h2>Ürününe özel,<br /><span>net başlangıçlar.</span></h2>
            <p>Önce ürün kategorini, ardından ihtiyacına uygun paket seviyesini seç.</p>
          </div>

          <div
            className="package-category-tabs"
            role="group"
            aria-label="Paket kategorileri"
            data-reveal
          >
            {packageCategories.map((category, index) => (
              <button
                key={category.id}
                id={`category-${category.id}`}
                type="button"
                aria-pressed={activeCategory === category.id}
                aria-controls="package-panel"
                className={activeCategory === category.id ? "active" : ""}
                onClick={() => chooseCategory(category.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>

          <div className="package-category-copy" aria-live="polite">
            <span>SEÇİLİ KATEGORİ</span>
            <strong>{selectedCategory.name}</strong>
            <p>{selectedCategory.description}</p>
          </div>

          <div
            className="package-grid"
            id="package-panel"
          >
            {visiblePackages.map((pack) => (
              <article
                key={pack.id}
                className={`package-card ${pack.featured ? "featured" : ""} ${activePackage === pack.id ? "active" : ""}`}
              >
                {pack.featured && <span className="popular-badge">KATEGORİNİN ÖNERİLEN PAKETİ</span>}
                <div className="package-head">
                  <span>/{selectedCategory.id}/{pack.level}</span>
                  <span>{pack.duration}</span>
                </div>
                <h3>{pack.name}</h3>
                <p>{pack.note}</p>
                <div className="price">
                  <small>başlangıç</small>
                  <strong>{formatMoney(pack.price)}</strong>
                  <span>+</span>
                </div>
                <ul>
                  {pack.includes.map((item) => (
                    <li key={item}><span>✓</span>{item}</li>
                  ))}
                </ul>
                <button onClick={() => choosePackage(pack.id)}>
                  {activePackage === pack.id ? "Seçildi" : "Bu paketi seç"} <span>→</span>
                </button>
              </article>
            ))}
          </div>

          <div className="quote-calculator" id="calculator" data-reveal>
            <div className="calculator-copy">
              <span className="eyebrow"><span className="prompt">&gt;</span> quick_quote --interactive</span>
              <h3>Teklifini yapılandır</h3>
              <p>Seçtiğin pakete ek modüller ekle; tahmini proje başlangıcı anında güncellensin.</p>
            </div>
            <div className="calculator-controls">
              <div className="selected-package">
                <div>
                  <span>SEÇİLEN PAKET</span>
                  <strong>{selectedCategory.name} / {chosenPackage.name}</strong>
                </div>
                <span>{formatMoney(chosenPackage.price)}</span>
              </div>
              <div className="addon-list">
                {addOns.map((item) => (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      checked={activeAddOns.includes(item.id)}
                      onChange={() => toggleAddOn(item.id)}
                    />
                    <span className="fake-check">✓</span>
                    <span>{item.label}</span>
                    <strong>+{formatMoney(item.price)}</strong>
                  </label>
                ))}
              </div>
              <div className="calculator-total">
                <div>
                  <span>TAHMİNİ PROJE BAŞLANGICI</span>
                  <strong>{formatMoney(total)}</strong>
                </div>
                <button className="primary-button" onClick={requestOffer}>
                  Teklif iste <span>↗</span>
                </button>
              </div>
              <small>* Nihai bütçe, keşif görüşmesinden sonra kapsam ve takvime göre netleşir.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-shell section-block" id="faq">
        <div className="faq-layout">
          <div className="section-heading" data-reveal>
            <div className="section-index">
              <span>06</span>
              <span>/ FAQ.MD</span>
            </div>
            <h2>Merak<br />ettiklerin.</h2>
            <p>Başka bir sorun varsa terminalin diğer ucundayım.</p>
            <button className="text-link" onClick={() => scrollTo("contact")}>
              Direkt sor <span>→</span>
            </button>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map((item, index) => (
              <article className={openFaq === index ? "open" : ""} key={item.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.q}</strong>
                  <i>{openFaq === index ? "−" : "+"}</i>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-block" id="contact">
        <div className="contact-grid-bg" aria-hidden="true" />
        <div className="section-shell contact-layout">
          <div className="contact-copy" data-reveal>
            <div className="section-index">
              <span>07</span>
              <span>/ CONNECT.SH</span>
            </div>
            <p className="eyebrow"><span className="prompt">root@future:~$</span> ./start-project</p>
            <h2>
              Sıradaki iyi fikir
              <br />
              <span>seninki olabilir.</span>
            </h2>
            <p className="contact-intro">
              Projeni, hedefini veya sadece kafandaki fikri anlat. En geç iki iş günü içinde
              sana net bir sonraki adımla döneyim.
            </p>
            <div className="direct-contact">
              <span>DOĞRUDAN E-POSTA</span>
              <button onClick={copyEmail}>
                {CONTACT_EMAIL} <span>⧉</span>
              </button>
            </div>
            <div className="contact-status">
              <span className="status-dot" />
              <div>
                <strong>Şu an ulaşılabilir</strong>
                <small>Ortalama yanıt süresi: 24–48 saat</small>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitContact} data-reveal>
            <div className="form-bar">
              <span>new-project.request</span>
              <span>UTF-8</span>
            </div>
            <div className="form-body">
              <div className="form-row">
                <label>
                  <span>01 / İSMİN</span>
                  <input name="name" type="text" placeholder="Nasıl hitap edeyim?" required />
                </label>
                <label>
                  <span>02 / E-POSTA</span>
                  <input name="email" type="email" placeholder="sen@markan.com" required />
                </label>
              </div>
              <label>
                <span>03 / ŞİRKET VEYA MARKA <small>(opsiyonel)</small></span>
                <input name="company" type="text" placeholder="Markanın adı" />
              </label>
              <div className="form-row">
                <label>
                  <span>04 / HİZMET</span>
                  <select
                    name="service"
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.target.value)}
                  >
                    <option>Web deneyimleri</option>
                    <option>AI Ajanları & otomasyon</option>
                    <option>Oyun geliştirme</option>
                    <option>Mobil uygulama</option>
                    <option>Finans uygulaması</option>
                    <option>İşletme otomasyonu</option>
                    {![
                      "Web deneyimleri",
                      "AI Ajanları & otomasyon",
                      "Oyun geliştirme",
                      "Mobil uygulama",
                      "Finans uygulaması",
                      "İşletme otomasyonu",
                    ].includes(selectedService) && <option>{selectedService}</option>}
                  </select>
                </label>
                <label>
                  <span>05 / BÜTÇE</span>
                  <select name="budget" defaultValue="75.000 – 150.000 ₺">
                    <option>45.000 – 75.000 ₺</option>
                    <option>75.000 – 150.000 ₺</option>
                    <option>150.000 – 300.000 ₺</option>
                    <option>300.000 ₺ +</option>
                    <option>Henüz net değil</option>
                  </select>
                </label>
              </div>
              <label>
                <span>06 / PROJENİ ANLAT</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Ne inşa ediyoruz, kimin için ve ne zaman yayında olmalı?"
                  required
                />
              </label>
              <label className="contact-honeypot" aria-hidden="true">
                <span>WEB SİTESİ</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="form-submit">
                <span>Talebin güvenli biçimde doğrudan bize iletilir.</span>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? "Gönderiliyor…" : "Talebi gönder"} <span>↗</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="section-shell footer-top">
          <a className="brand" href="#home">
            <span className="brand-mark">&gt;_</span>
            <span>c0denail</span>
          </a>
          <p>Tasarım, kod ve merakla<br />İstanbul&apos;da üretildi.</p>
          <div className="footer-nav">
            <button onClick={() => scrollTo("about")}>Hakkımda</button>
            <button onClick={() => scrollTo("services")}>Hizmetler</button>
            <button onClick={() => scrollTo("work")}>İşler</button>
            <button onClick={() => scrollTo("contact")}>İletişim</button>
          </div>
          <button className="back-top" onClick={() => scrollTo("home")}>
            Yukarı <span>↑</span>
          </button>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} EMİRHAN TUNCER</span>
          <span>ALL SYSTEMS OPERATIONAL <i className="status-dot" /></span>
          <span>v1.0.0</span>
        </div>
      </footer>

      {toast && (
        <div className={`toast toast-${toast.status}`} role="status">
          <span>{toast.status === "success" ? "✓" : "!"}</span>
          {toast.message}
        </div>
      )}
    </main>
  );
}
