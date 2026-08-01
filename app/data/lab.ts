import type { Locale } from "../i18n";

export type LabKind = "demo" | "ai-experiment" | "game-prototype" | "technical-note";
export type LabStatus = "live" | "prototype" | "in-progress" | "note";
export type LabTone = "cyan" | "violet" | "orange" | "blue";

export type LabEntry = {
  id: string;
  code: string;
  kind: LabKind;
  status: LabStatus;
  tone: LabTone;
  title: string;
  summary: string;
  observation: string;
  tags: readonly string[];
};

const entries: Record<Locale, readonly LabEntry[]> = {
  tr: [
    {
      id: "prompt-inspector",
      code: "LAB-01",
      kind: "ai-experiment",
      status: "live",
      tone: "cyan",
      title: "Prompt Kapsam Denetleyicisi",
      summary:
        "Bir promptun amaç, bağlam, kısıt ve çıktı biçimi bileşenlerini tarayıcı içinde kontrol eden canlı araç.",
      observation:
        "Bu denetim yanıt kalitesini tahmin etmez; yalnızca isteğin açıkça tarif edilen dört yapısal öğeyi içerip içermediğini görünür kılar.",
      tags: ["Prompt tasarımı", "Yerel işlem", "Sezgisel kontrol"],
    },
    {
      id: "interface-state-map",
      code: "LAB-02",
      kind: "demo",
      status: "in-progress",
      tone: "violet",
      title: "Arayüz Durum Haritası",
      summary:
        "Yükleniyor, boş, hata ve başarı durumlarını tek bir etkileşimli yüzeyde karşılaştırmayı amaçlayan arayüz demosu.",
      observation:
        "İnteraktif sürüm henüz yayında değil; bu kayıt, geliştirilen durum modelinin kapsamını belgeliyor.",
      tags: ["UI durumları", "Erişilebilirlik", "Prototipleme"],
    },
    {
      id: "world-streaming-slice",
      code: "LAB-03",
      kind: "game-prototype",
      status: "prototype",
      tone: "orange",
      title: "Dünya Akışı Kesiti",
      summary:
        "Komşu bölgeleri oyuncu konumuna göre yükleme ve boşaltma yaklaşımını sınayan açık dünya sistem taslağı.",
      observation:
        "Bu kayıt yayımlanmış bir oyun ya da performans sonucu değil; sistem sınırlarını netleştiren erken aşama bir prototip.",
      tags: ["Unity", "World streaming", "Sistem tasarımı"],
    },
    {
      id: "reliable-form-notes",
      code: "LAB-04",
      kind: "technical-note",
      status: "note",
      tone: "blue",
      title: "Dayanıklı Form Akışları",
      summary:
        "İstemci doğrulaması, sunucu hataları, tekrar gönderim ve erişilebilir geri bildirim üzerine kısa uygulama notları.",
      observation:
        "Bu içerik bir üretim benchmark’ı değil; farklı projelerde tekrar kullanılabilecek kararları toparlayan teknik bir not.",
      tags: ["Formlar", "Hata yönetimi", "Progressive enhancement"],
    },
  ],
  en: [
    {
      id: "prompt-inspector",
      code: "LAB-01",
      kind: "ai-experiment",
      status: "live",
      tone: "cyan",
      title: "Prompt Scope Inspector",
      summary:
        "A live, browser-based tool that checks a prompt for purpose, context, constraints, and output format.",
      observation:
        "This inspection does not predict response quality; it only makes the presence of four explicitly described structural elements visible.",
      tags: ["Prompt design", "Local-only", "Heuristic check"],
    },
    {
      id: "interface-state-map",
      code: "LAB-02",
      kind: "demo",
      status: "in-progress",
      tone: "violet",
      title: "Interface State Map",
      summary:
        "An interface demo intended to compare loading, empty, error, and success states on one interactive surface.",
      observation:
        "The interactive version is not live yet; this entry documents the scope of the state model being developed.",
      tags: ["UI states", "Accessibility", "Prototyping"],
    },
    {
      id: "world-streaming-slice",
      code: "LAB-03",
      kind: "game-prototype",
      status: "prototype",
      tone: "orange",
      title: "World Streaming Slice",
      summary:
        "An open-world systems draft exploring how adjacent regions can load and unload around the player’s position.",
      observation:
        "This is not a released game or a performance result; it is an early prototype used to clarify system boundaries.",
      tags: ["Unity", "World streaming", "Systems design"],
    },
    {
      id: "reliable-form-notes",
      code: "LAB-04",
      kind: "technical-note",
      status: "note",
      tone: "blue",
      title: "Resilient Form Flows",
      summary:
        "Short implementation notes on client validation, server errors, repeat submissions, and accessible feedback.",
      observation:
        "This is not a production benchmark; it is a technical note collecting decisions that can be reused across projects.",
      tags: ["Forms", "Error handling", "Progressive enhancement"],
    },
  ],
};

const labels = {
  tr: {
    kinds: {
      demo: "DEMO",
      "ai-experiment": "AI DENEYİ",
      "game-prototype": "OYUN PROTOTİPİ",
      "technical-note": "TEKNİK NOT",
    },
    statuses: {
      live: "CANLI",
      prototype: "PROTOTİP",
      "in-progress": "YAPIMDA",
      note: "NOT",
    },
  },
  en: {
    kinds: {
      demo: "DEMO",
      "ai-experiment": "AI EXPERIMENT",
      "game-prototype": "GAME PROTOTYPE",
      "technical-note": "TECHNICAL NOTE",
    },
    statuses: {
      live: "LIVE",
      prototype: "PROTOTYPE",
      "in-progress": "IN PROGRESS",
      note: "NOTE",
    },
  },
} as const satisfies Record<
  Locale,
  { kinds: Record<LabKind, string>; statuses: Record<LabStatus, string> }
>;

export function getLabEntries(locale: Locale): readonly LabEntry[] {
  return entries[locale];
}

export function getLabLabels(locale: Locale) {
  return labels[locale];
}
