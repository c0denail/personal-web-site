"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { getLabEntries, getLabLabels, type LabKind } from "../data/lab";
import { homeHref, labHref, otherLocale, type Locale } from "../i18n";
import LabCard from "./LabCard";
import PromptInspector from "./PromptInspector";
import styles from "./LabPage.module.css";

type Theme = "dark" | "light";
type Filter = "all" | LabKind;

const filterOrder: readonly LabKind[] = [
  "demo",
  "ai-experiment",
  "game-prototype",
  "technical-note",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/c0denail", Icon: FaInstagram },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/emirhan-tuncer-96106a318",
    Icon: FaLinkedinIn,
  },
];

const copy = {
  tr: {
    brandLabel: "c0denail ana sayfa",
    navigation: "Lab sayfası menüsü",
    home: "← ANA SAYFA",
    entries: "KAYITLAR",
    socialNavigation: "Sosyal medya bağlantıları",
    openSocial: (label: string) => `${label} profilini yeni sekmede aç`,
    switchLanguage: "Switch to English",
    contact: "İLETİŞİM",
    changeTheme: "Temayı değiştir",
    light: "LIGHT",
    dark: "DARK",
    heroEyebrow: "/ LAB.LOG — AÇIK ÇALIŞMA KAYITLARI",
    heroTitleStart: "Lab /",
    heroTitleAccent: "Teknik Günlük",
    heroDescription:
      "Çalışan küçük araçlar, erken prototipler ve üretim sırasında ortaya çıkan teknik gözlemler. Her kayıt ne olduğuna ve ne olmadığına göre açıkça etiketlenir.",
    openTool: "CANLI ARACI AÇ",
    browseEntries: "KAYITLARI İNCELE",
    liveTool: "canlı araç",
    openRecords: "açık geliştirme kaydı",
    terminalTitle: "lab-registry.json",
    terminalMode: "READ ONLY",
    terminalFooter: "durumlar yayın iddiası değil, mevcut kapsamı gösterir",
    toolIndex: "/01 — ÇALIŞAN DENEY",
    toolLead:
      "İlk canlı Lab içeriği: prompt yapısını görünür kılan, ağ isteği oluşturmayan küçük bir kapsam denetleyicisi.",
    entriesIndex: "/02 — LAB KAYITLARI",
    entriesTitle: "Deneyler, prototipler ve notlar.",
    entriesDescription:
      "Filtreler kayıt türünü değiştirir. Canlı olmayan çalışmalar sonuç veya tamamlanmış ürün gibi sunulmaz.",
    filterLabel: "Lab kayıtlarını türe göre filtrele",
    all: "TÜMÜ",
    showing: (count: number) => `${count} kayıt gösteriliyor`,
    empty: "Bu filtrede kayıt bulunmuyor.",
    principlesIndex: "/03 — KAYIT PROTOKOLÜ",
    principlesTitle: "Önce dürüst kapsam.",
    principles: [
      ["01", "DENE", "Fikir, küçük ve incelenebilir bir yüzeye indirgenir."],
      ["02", "GÖZLE", "Ne çalıştıysa ve ne eksikse doğrudan kayda geçer."],
      ["03", "ETİKETLE", "Canlı, prototip, yapımda ve not durumları birbirine karıştırılmaz."],
    ],
    ctaEyebrow: "root@future:~$ ./build-together",
    ctaTitle: "Bir fikri çalışan deneye çevirelim.",
    ctaDescription: "Kapsamı birlikte küçültelim, en riskli varsayımı önce test edelim.",
    ctaLink: "PROJEYİ KONUŞALIM",
    footerHome: "Ana sayfaya dön →",
  },
  en: {
    brandLabel: "c0denail home page",
    navigation: "Lab page menu",
    home: "← HOME",
    entries: "ENTRIES",
    socialNavigation: "Social media links",
    openSocial: (label: string) => `Open ${label} profile in a new tab`,
    switchLanguage: "Türkçeye geç",
    contact: "CONTACT",
    changeTheme: "Change theme",
    light: "LIGHT",
    dark: "DARK",
    heroEyebrow: "/ LAB.LOG — OPEN WORK RECORDS",
    heroTitleStart: "Lab /",
    heroTitleAccent: "Technical Journal",
    heroDescription:
      "Small working tools, early prototypes, and technical observations from the build process. Every entry is labeled clearly for what it is—and what it is not.",
    openTool: "OPEN LIVE TOOL",
    browseEntries: "BROWSE ENTRIES",
    liveTool: "live tool",
    openRecords: "open development records",
    terminalTitle: "lab-registry.json",
    terminalMode: "READ ONLY",
    terminalFooter: "statuses describe current scope, not release claims",
    toolIndex: "/01 — WORKING EXPERIMENT",
    toolLead:
      "The first live Lab entry: a small, network-free inspector that makes prompt structure visible.",
    entriesIndex: "/02 — LAB ENTRIES",
    entriesTitle: "Experiments, prototypes, and notes.",
    entriesDescription:
      "Filters change the entry type. Work that is not live is never presented as a result or finished product.",
    filterLabel: "Filter Lab entries by type",
    all: "ALL",
    showing: (count: number) => `${count} entries shown`,
    empty: "There are no entries under this filter.",
    principlesIndex: "/03 — LOGGING PROTOCOL",
    principlesTitle: "Honest scope first.",
    principles: [
      ["01", "TEST", "Reduce the idea to a small surface that can be inspected."],
      ["02", "OBSERVE", "Record directly what worked and what remains incomplete."],
      ["03", "LABEL", "Keep live, prototype, in-progress, and note states distinct."],
    ],
    ctaEyebrow: "root@future:~$ ./build-together",
    ctaTitle: "Let’s turn an idea into a working experiment.",
    ctaDescription: "We can narrow the scope together and test the riskiest assumption first.",
    ctaLink: "LET’S DISCUSS IT",
    footerHome: "Back to home →",
  },
} as const;

export default function LabPage({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const entries = getLabEntries(locale);
  const labels = getLabLabels(locale);
  const home = homeHref(locale);
  const alternateLocale = otherLocale(locale);
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("c0denail-theme") as Theme | null;
    const preferredTheme: Theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const nextTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : preferredTheme;
    document.documentElement.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filteredEntries = useMemo(
    () => activeFilter === "all" ? entries : entries.filter((entry) => entry.kind === activeFilter),
    [activeFilter, entries],
  );

  const liveCount = entries.filter((entry) => entry.status === "live").length;
  const openCount = entries.length - liveCount;

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("c0denail-theme", nextTheme);
  };

  return (
    <div className={styles.page} lang={locale}>
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href={`${home}#home`} aria-label={text.brandLabel}>
            <span>&gt;_</span> c0denail<i aria-hidden="true">▋</i>
          </Link>

          <nav className={styles.nav} aria-label={text.navigation}>
            <Link href={home}>{text.home}</Link>
            <a href="#lab-entries">{text.entries}</a>
          </nav>

          <div className={styles.headerActions}>
            <div className={styles.socials} aria-label={text.socialNavigation}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={text.openSocial(label)}
                  title={label}
                  key={label}
                >
                  <Icon aria-hidden="true" focusable="false" />
                </a>
              ))}
            </div>
            <Link
              className={styles.language}
              href={labHref(alternateLocale)}
              hrefLang={alternateLocale}
              lang={alternateLocale}
              aria-label={text.switchLanguage}
              title={text.switchLanguage}
            >
              <span className={locale === "tr" ? styles.activeLanguage : ""}>TR</span>
              <i aria-hidden="true">/</i>
              <span className={locale === "en" ? styles.activeLanguage : ""}>EN</span>
            </Link>
            <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={text.changeTheme}>
              <b aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</b>
              <span>{theme === "dark" ? text.light : text.dark}</span>
            </button>
            <Link className={styles.contact} href={`${home}#contact`}>
              {text.contact} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{text.heroEyebrow}</p>
            <h1>{text.heroTitleStart}<br /><span>{text.heroTitleAccent}</span></h1>
            <p className={styles.lead}>{text.heroDescription}</p>
            <div className={styles.heroActions}>
              <a href="#prompt-inspector">{text.openTool} <span aria-hidden="true">↓</span></a>
              <a href="#lab-entries">{text.browseEntries}</a>
            </div>
            <div className={styles.heroCounts} aria-label={locale === "tr" ? "Lab içerik özeti" : "Lab content summary"}>
              <span><strong>{String(liveCount).padStart(2, "0")}</strong>{text.liveTool}</span>
              <span><strong>{String(openCount).padStart(2, "0")}</strong>{text.openRecords}</span>
            </div>
          </div>

          <div className={styles.registry} aria-label={locale === "tr" ? "Lab kayıt durumları" : "Lab entry statuses"}>
            <div className={styles.registryBar}>
              <span className={styles.registryDots} aria-hidden="true"><i /><i /><i /></span>
              <span>{text.terminalTitle}</span>
              <span>{text.terminalMode}</span>
            </div>
            <div className={styles.registryBody}>
              <span className={styles.registryPath}>~/c0denail/lab/entries</span>
              {entries.map((entry) => (
                <div className={styles.registryRow} key={entry.id}>
                  <span>{entry.code}</span>
                  <strong>{entry.id}</strong>
                  <i>{labels.statuses[entry.status]}</i>
                </div>
              ))}
              <p><span aria-hidden="true">{"//"}</span> {text.terminalFooter}</p>
            </div>
          </div>
        </section>

        <section className={styles.toolSection}>
          <div className={styles.sectionLead}>
            <span>{text.toolIndex}</span>
            <p>{text.toolLead}</p>
          </div>
          <PromptInspector locale={locale} />
        </section>

        <section className={styles.entriesSection} id="lab-entries" aria-labelledby="lab-entries-title">
          <div className={styles.entriesHeading}>
            <div>
              <span>{text.entriesIndex}</span>
              <h2 id="lab-entries-title">{text.entriesTitle}</h2>
            </div>
            <p>{text.entriesDescription}</p>
          </div>

          <div className={styles.filterBar}>
            <div className={styles.filters} role="group" aria-label={text.filterLabel}>
              <button
                type="button"
                aria-pressed={activeFilter === "all"}
                onClick={() => setActiveFilter("all")}
              >
                {text.all}<span>{String(entries.length).padStart(2, "0")}</span>
              </button>
              {filterOrder.map((kind) => (
                <button
                  type="button"
                  aria-pressed={activeFilter === kind}
                  onClick={() => setActiveFilter(kind)}
                  key={kind}
                >
                  {labels.kinds[kind]}
                  <span>{String(entries.filter((entry) => entry.kind === kind).length).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <p aria-live="polite">{text.showing(filteredEntries.length)}</p>
          </div>

          {filteredEntries.length > 0 ? (
            <div className={styles.cardGrid} id="lab-entry-grid">
              {filteredEntries.map((entry) => (
                <LabCard
                  entry={entry}
                  locale={locale}
                  href={entry.status === "live" ? "#prompt-inspector" : null}
                  key={entry.id}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{text.empty}</p>
          )}
        </section>

        <section className={styles.principles}>
          <div className={styles.principlesHeading}>
            <span>{text.principlesIndex}</span>
            <h2>{text.principlesTitle}</h2>
          </div>
          <div className={styles.principleGrid}>
            {text.principles.map(([code, title, description]) => (
              <article key={code}>
                <span>{code}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <span>{text.ctaEyebrow}</span>
            <h2>{text.ctaTitle}</h2>
            <p>{text.ctaDescription}</p>
          </div>
          <Link href={`${home}#contact`}>{text.ctaLink} <span aria-hidden="true">↗</span></Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} EMİRHAN TUNCER</span>
        <span>LAB.LOG / v1</span>
        <Link href={home}>{text.footerHome}</Link>
      </footer>
    </div>
  );
}
