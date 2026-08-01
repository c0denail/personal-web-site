import Link from "next/link";
import { notFound } from "next/navigation";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { getProject } from "../data/projects";
import { homeHref, otherLocale, projectHref, type Locale } from "../i18n";
import styles from "../projeler/[slug]/project.module.css";

type ProjectDetailPageProps = {
  locale: Locale;
  slug: string;
};

const copy = {
  tr: {
    brandLabel: "c0denail ana sayfa",
    navLabel: "Proje sayfası menüsü",
    workLink: "← Seçilmiş işler",
    socialsLabel: "Sosyal medya ve dil bağlantıları",
    instagramLabel: "Instagram profilini yeni sekmede aç",
    linkedinLabel: "LinkedIn profilini yeni sekmede aç",
    switchLabel: "Switch to English",
    switchText: "EN",
    discussProject: "Projeyi konuşalım",
    caseStudy: "vaka-analizi",
    duration: "SÜRE",
    role: "ROL",
    scope: "KAPSAM",
    scopeValue: "Stratejiden yayına",
    previewLabel: "arayüz önizlemesi",
    live: "CANLI",
    controlCenter: "KONTROL MERKEZİ",
    newItem: "+ YENİ",
    storyCode: "PROBLEM & ÇÖZÜM",
    storyTitle: "Doğru problemi bul, sade bir sistem kur.",
    problem: "PROBLEM",
    problemTitle: "Neyi çözmemiz gerekiyordu?",
    solution: "ÇÖZÜM",
    solutionTitle: "Nasıl bir ürün tasarlandı?",
    scopeCode: "/02 — KAPSAM",
    scopeTitle: "Teknoloji, teslimler ve proje süresi.",
    scopeDescription:
      "Ürün kapsamı; doğrulanabilir, sürdürülebilir ve sonraki sürümlerde genişletilebilir bir temel oluşturacak şekilde planlandı.",
    screensCode: "/03 — ARAYÜZ ÖNİZLEMELERİ",
    screensTitle: "Ürünün önemli ekranları.",
    screensDescription:
      "Aşağıdaki görseller çözüm mimarisini temsil eder ve gerçek müşteri verisi içermez.",
    resultsCode: "/04 — ÖLÇÜLEBİLİR ÇIKTILAR",
    resultsTitle: "Ortaya çıkan ürün kazanımları.",
    resultsDescription:
      "Gerçek satış veya müşteri rakamı yerine, proje kapsamında doğrulanabilen teknik ve operasyonel çıktılar gösterilir.",
    ctaTitle: "Benzer bir proje mi planlıyorsun?",
    ctaDescription:
      "İhtiyacını konuşalım; kapsamı, doğru teknolojiyi ve gerçekçi takvimi birlikte çıkaralım.",
    ctaLink: "Benzer proje istiyorum",
    footerProjects: "Tüm projelere dön →",
  },
  en: {
    brandLabel: "c0denail home page",
    navLabel: "Project page menu",
    workLink: "← Selected work",
    socialsLabel: "Social media and language links",
    instagramLabel: "Open Instagram profile in a new tab",
    linkedinLabel: "Open LinkedIn profile in a new tab",
    switchLabel: "Türkçeye geç",
    switchText: "TR",
    discussProject: "Let’s discuss your project",
    caseStudy: "case-study",
    duration: "DURATION",
    role: "ROLE",
    scope: "SCOPE",
    scopeValue: "From strategy to launch",
    previewLabel: "interface preview",
    live: "LIVE",
    controlCenter: "CONTROL CENTER",
    newItem: "+ NEW",
    storyCode: "PROBLEM & SOLUTION",
    storyTitle: "Find the right problem. Build a simple system.",
    problem: "PROBLEM",
    problemTitle: "What did we need to solve?",
    solution: "SOLUTION",
    solutionTitle: "What kind of product did we design?",
    scopeCode: "/02 — SCOPE",
    scopeTitle: "Technology, deliverables, and timeline.",
    scopeDescription:
      "The product scope was planned to create a verifiable, sustainable foundation that can expand in future releases.",
    screensCode: "/03 — INTERFACE PREVIEWS",
    screensTitle: "The product’s key screens.",
    screensDescription:
      "The visuals below represent the solution architecture and contain no real client data.",
    resultsCode: "/04 — MEASURABLE OUTCOMES",
    resultsTitle: "The value created by the product.",
    resultsDescription:
      "Instead of actual sales or client figures, these are technical and operational outcomes that can be verified within the project scope.",
    ctaTitle: "Planning a similar project?",
    ctaDescription:
      "Let’s discuss your needs and define the scope, the right technology, and a realistic timeline together.",
    ctaLink: "I want a similar project",
    footerProjects: "Back to all projects →",
  },
} as const;

export default function ProjectDetailPage({ locale, slug }: ProjectDetailPageProps) {
  const project = getProject(slug, locale);

  if (!project) {
    notFound();
  }

  const text = copy[locale];
  const home = homeHref(locale);
  const alternateLocale = otherLocale(locale);

  return (
    <div className={`${styles.page} ${styles[`tone_${project.tone}`]}`} lang={locale}>
      <div className={styles.pageGrid} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.brand} href={`${home}#home`} aria-label={text.brandLabel}>
          <span>&gt;_</span>
          c0denail
        </Link>

        <nav className={styles.headerNav} aria-label={text.navLabel}>
          <Link href={`${home}#work`}>{text.workLink}</Link>
          <div className={styles.socials} aria-label={text.socialsLabel}>
            <a
              href="https://www.instagram.com/c0denail"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={text.instagramLabel}
              title="Instagram"
            >
              <FaInstagram aria-hidden="true" focusable="false" />
            </a>
            <a
              href="https://www.linkedin.com/in/emirhan-tuncer-96106a318"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={text.linkedinLabel}
              title="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" focusable="false" />
            </a>
            <Link
              href={projectHref(alternateLocale, project.id)}
              hrefLang={alternateLocale}
              lang={alternateLocale}
              aria-label={text.switchLabel}
              title={text.switchLabel}
            >
              {text.switchText}
            </Link>
          </div>
          <Link className={styles.headerCta} href={`${home}#contact`}>
            {text.discussProject} <span>↗</span>
          </Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.path}>
              <span>/{project.index}</span>
              <span>{text.caseStudy}/{project.id}</span>
            </div>
            <p className={styles.eyebrow}>{project.category}</p>
            <h1>{project.title}</h1>
            <p className={styles.lead}>{project.description}</p>

            <div className={styles.heroMeta}>
              <div>
                <span>{text.duration}</span>
                <strong>{project.duration}</strong>
              </div>
              <div>
                <span>{text.role}</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>{text.scope}</span>
                <strong>{text.scopeValue}</strong>
              </div>
            </div>
          </div>

          <div className={styles.productPreview} aria-label={`${project.title} ${text.previewLabel}`}>
            <div className={styles.previewTop}>
              <span className={styles.previewDots}><i /><i /><i /></span>
              <span>/{project.id}/overview</span>
              <span>{text.live}</span>
            </div>
            <div className={styles.previewBody}>
              <aside className={styles.previewSide} aria-hidden="true">
                <strong>{project.label}</strong>
                <i />
                <i />
                <i />
                <i />
              </aside>
              <div className={styles.previewMain}>
                <div className={styles.previewHeading}>
                  <div>
                    <span>{text.controlCenter}</span>
                    <strong>{project.labelDetail}</strong>
                  </div>
                  <b>{text.newItem}</b>
                </div>
                <div className={styles.previewStats}>
                  {project.outcomes.slice(0, 3).map((outcome) => (
                    <div key={outcome.label}>
                      <span>{outcome.label}</span>
                      <strong>{outcome.value}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.previewData}>
                  <div className={styles.previewChart} aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i /><i />
                  </div>
                  <div className={styles.previewRows} aria-hidden="true">
                    <span /><span /><span /><span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionIntro}>
            <span>/01</span>
            <p>{text.storyCode}</p>
            <h2>{text.storyTitle}</h2>
          </div>

          <div className={styles.storyGrid}>
            <article>
              <span className={styles.storyLabel}>{text.problem}</span>
              <h3>{text.problemTitle}</h3>
              {project.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
            <article>
              <span className={styles.storyLabel}>{text.solution}</span>
              <h3>{text.solutionTitle}</h3>
              {project.solution.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </div>
        </section>

        <section className={styles.scopeSection}>
          <div className={styles.scopeCopy}>
            <span className={styles.sectionCode}>{text.scopeCode}</span>
            <h2>{text.scopeTitle}</h2>
            <p>{text.scopeDescription}</p>

            <div className={styles.techList}>
              {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>

          <div className={styles.deliverables}>
            {project.deliverables.map((deliverable, index) => (
              <div key={deliverable}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{deliverable}</p>
                <i>✓</i>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.screensSection}>
          <div className={styles.sectionHeading}>
            <span>{text.screensCode}</span>
            <h2>{text.screensTitle}</h2>
            <p>{text.screensDescription}</p>
          </div>

          <div className={styles.screenGrid}>
            {project.screens.map((screen, index) => (
              <article className={styles.screenCard} key={screen.title}>
                <div className={styles.screenVisual}>
                  <div className={styles.screenBar}><i /><i /><i /><span>{screen.kicker}</span></div>
                  <div className={styles.screenUi}>
                    <aside aria-hidden="true"><b>{project.label}</b><i /><i /><i /><i /></aside>
                    <div aria-hidden="true">
                      <span />
                      <strong />
                      <section>
                        <i /><i /><i /><i /><i />
                      </section>
                    </div>
                  </div>
                  <span className={styles.screenNumber}>0{index + 1}</span>
                </div>
                <div className={styles.screenCopy}>
                  <span>{screen.kicker}</span>
                  <h3>{screen.title}</h3>
                  <p>{screen.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className={styles.sectionHeading}>
            <span>{text.resultsCode}</span>
            <h2>{text.resultsTitle}</h2>
            <p>{text.resultsDescription}</p>
          </div>

          <div className={styles.resultsGrid}>
            {project.outcomes.map((outcome, index) => (
              <article key={outcome.label}>
                <span>0{index + 1}</span>
                <strong>{outcome.value}</strong>
                <h3>{outcome.label}</h3>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div>
            <span>root@future:~$ ./start-similar-project</span>
            <h2>{text.ctaTitle}</h2>
            <p>{text.ctaDescription}</p>
          </div>
          <Link href={`${home}#contact`}>
            {text.ctaLink} <span>↗</span>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} EMİRHAN TUNCER</span>
        <Link href={`${home}#work`}>{text.footerProjects}</Link>
      </footer>
    </div>
  );
}
