import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { getProject, projects } from "../../data/projects";
import styles from "./project.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} — Emirhan Tuncer`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Proje Detayı`,
      description: project.description,
      type: "article",
      locale: "tr_TR",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={`${styles.page} ${styles[`tone_${project.tone}`]}`}>
      <div className={styles.pageGrid} aria-hidden="true" />

      <header className={styles.header}>
        <Link className={styles.brand} href="/#home" aria-label="c0denail ana sayfa">
          <span>&gt;_</span>
          c0denail
        </Link>

        <nav className={styles.headerNav} aria-label="Proje sayfası menüsü">
          <Link href="/#work">← Seçilmiş işler</Link>
          <div className={styles.socials} aria-label="Sosyal medya bağlantıları">
            <a
              href="https://www.instagram.com/c0denail"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profilini yeni sekmede aç"
              title="Instagram"
            >
              <FaInstagram aria-hidden="true" focusable="false" />
            </a>
            <a
              href="https://www.linkedin.com/in/emirhan-tuncer-96106a318"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profilini yeni sekmede aç"
              title="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" focusable="false" />
            </a>
          </div>
          <Link className={styles.headerCta} href="/#contact">
            Projeyi konuşalım <span>↗</span>
          </Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.path}>
              <span>/{project.index}</span>
              <span>case-study/{project.id}</span>
            </div>
            <p className={styles.eyebrow}>{project.category}</p>
            <h1>{project.title}</h1>
            <p className={styles.lead}>{project.description}</p>

            <div className={styles.heroMeta}>
              <div>
                <span>SÜRE</span>
                <strong>{project.duration}</strong>
              </div>
              <div>
                <span>ROL</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>KAPSAM</span>
                <strong>Stratejiden yayına</strong>
              </div>
            </div>
          </div>

          <div className={styles.productPreview} aria-label={`${project.title} arayüz önizlemesi`}>
            <div className={styles.previewTop}>
              <span className={styles.previewDots}><i /><i /><i /></span>
              <span>/{project.id}/overview</span>
              <span>LIVE</span>
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
                    <span>CONTROL CENTER</span>
                    <strong>{project.labelDetail}</strong>
                  </div>
                  <b>+ NEW</b>
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
            <p>PROBLEM &amp; ÇÖZÜM</p>
            <h2>Doğru problemi bul, sade bir sistem kur.</h2>
          </div>

          <div className={styles.storyGrid}>
            <article>
              <span className={styles.storyLabel}>PROBLEM</span>
              <h3>Neyi çözmemiz gerekiyordu?</h3>
              {project.problem.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
            <article>
              <span className={styles.storyLabel}>ÇÖZÜM</span>
              <h3>Nasıl bir ürün tasarlandı?</h3>
              {project.solution.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </article>
          </div>
        </section>

        <section className={styles.scopeSection}>
          <div className={styles.scopeCopy}>
            <span className={styles.sectionCode}>/02 — KAPSAM</span>
            <h2>Teknoloji, teslimler ve proje süresi.</h2>
            <p>
              Ürün kapsamı; doğrulanabilir, sürdürülebilir ve sonraki sürümlerde genişletilebilir
              bir temel oluşturacak şekilde planlandı.
            </p>

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
            <span>/03 — ARAYÜZ ÖNİZLEMELERİ</span>
            <h2>Ürünün önemli ekranları.</h2>
            <p>
              Aşağıdaki görseller çözüm mimarisini temsil eder ve gerçek müşteri verisi içermez.
            </p>
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
            <span>/04 — ÖLÇÜLEBİLİR ÇIKTILAR</span>
            <h2>Ortaya çıkan ürün kazanımları.</h2>
            <p>
              Gerçek satış veya müşteri rakamı yerine, proje kapsamında doğrulanabilen teknik ve
              operasyonel çıktılar gösterilir.
            </p>
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
            <h2>Benzer bir proje mi planlıyorsun?</h2>
            <p>İhtiyacını konuşalım; kapsamı, doğru teknolojiyi ve gerçekçi takvimi birlikte çıkaralım.</p>
          </div>
          <Link href="/#contact">
            Benzer proje istiyorum <span>↗</span>
          </Link>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} EMİRHAN TUNCER</span>
        <Link href="/#work">Tüm projelere dön →</Link>
      </footer>
    </div>
  );
}
