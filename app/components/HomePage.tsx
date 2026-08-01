"use client";

import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Chatbot from "./Chatbot";
import LabCard from "./LabCard";
import { getHomeContent } from "../data/home-content";
import { getHomeUi } from "../data/home-ui";
import { getLabEntries } from "../data/lab";
import { getProjects } from "../data/projects";
import { homeHref, labHref, localeConfig, otherLocale, projectHref, type Locale } from "../i18n";

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


type Theme = "dark" | "light";

function formatMoney(value: number, locale: Locale) {
  const formatted = new Intl.NumberFormat(localeConfig[locale].numberLocale).format(value);
  return locale === "en" ? `₺${formatted}` : `${formatted} ₺`;
}

export function HomePage({ locale }: { locale: Locale }) {
  const ui = getHomeUi(locale);
  const { services, packageCategories, addOns, faqs } = getHomeContent(locale);
  const projects = getProjects(locale);
  const labEntries = getLabEntries(locale).slice(0, 3);
  const [theme, setTheme] = useState<Theme>("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [command, setCommand] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    ui.terminal.initial,
  ]);
  const [activeCategory, setActiveCategory] = useState("web");
  const [activePackage, setActivePackage] = useState("web-product");
  const [activeAddOns, setActiveAddOns] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>(ui.contact.services[0]);
  const [openFaq, setOpenFaq] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    status: "success" | "error";
  } | null>(null);
  const commandRef = useRef<HTMLInputElement>(null);
  const words = useMemo(
    () => [...ui.typedWords],
    [ui.typedWords],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("c0denail-theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const nextTheme = saved || preferred;
    document.documentElement.dataset.theme = nextTheme;
    const frame = window.requestAnimationFrame(() => setTheme(nextTheme));
    return () => window.cancelAnimationFrame(frame);
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
      help: ui.terminal.help,
      about: ui.terminal.about,
      services: ui.terminal.services,
      work: ui.terminal.work,
      lab: ui.terminal.lab,
      pricing: ui.terminal.pricing,
      contact: `${ui.terminal.contact}: ${CONTACT_EMAIL}`,
      theme: ui.terminal.themeChanged(
        theme === "dark" ? ui.terminal.light : ui.terminal.dark,
      ),
    };

    if (clean === "clear") {
      setTerminalLines([]);
    } else {
      setTerminalLines((lines) => [
        ...lines.slice(-3),
        `$ ${clean}`,
        output[clean] || ui.terminal.notFound(clean),
      ]);
    }

    if (["about", "services", "work", "lab", "pricing", "contact"].includes(clean)) {
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
      `${selectedCategory.name} — ${chosenPackage.name} — ${formatMoney(total, locale)}`,
    );
    scrollTo("contact");
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("locale", locale);

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
        throw new Error(result.message || ui.contact.error);
      }

      form.reset();
      setSelectedService(ui.contact.services[0]);
      setToast({
        message: ui.contact.success,
        status: "success",
      });
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : ui.contact.error,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setToast(null), 4200);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setToast({ message: ui.contact.copied, status: "success" });
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <main lang={locale}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label={ui.brandHome}>
          <span className="brand-mark">&gt;_</span>
          <span>c0denail</span>
          <span className="brand-cursor">▋</span>
        </a>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label={ui.mainNavigation}>
          <button onClick={() => scrollTo("about")}>{ui.nav.about}</button>
          <button onClick={() => scrollTo("services")}>{ui.nav.services}</button>
          <button onClick={() => scrollTo("work")}>{ui.nav.work}</button>
          <button onClick={() => scrollTo("lab")}>{ui.nav.lab}</button>
          <button onClick={() => scrollTo("pricing")}>{ui.nav.pricing}</button>
        </nav>

        <div className="header-actions">
          <div className="header-socials" aria-label={ui.socialNavigation}>
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                className="header-social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ui.openSocial(label)}
                title={label}
              >
                <Icon aria-hidden="true" focusable="false" />
              </a>
            ))}
          </div>
          <Link
            className="language-switch"
            href={homeHref(otherLocale(locale))}
            hrefLang={otherLocale(locale)}
            aria-label={ui.switchLanguage}
            title={ui.switchLanguage}
          >
            <span className={locale === "tr" ? "active" : ""}>TR</span>
            <i aria-hidden="true">/</i>
            <span className={locale === "en" ? "active" : ""}>EN</span>
          </Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label={ui.changeTheme}>
            <span className="theme-icon">{theme === "dark" ? "☼" : "◐"}</span>
            <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>
          <button className="header-cta" onClick={() => scrollTo("contact")}>
            {ui.startProject} <span>↗</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={ui.toggleMenu}
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
            {ui.hero.line1Start}<span className="outline-word">{ui.hero.line1Accent}</span>
            <br />
            {ui.hero.line2Start}<span className="accent-word">{ui.hero.line2Accent}</span>
          </h1>
          <p className="hero-intro">
            {ui.hero.intro}{" "}
            <span className="typed-wrap">
              {typedText}
              <span className="type-caret">▋</span>
            </span>
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("contact")}>
              <span>{ui.hero.primary}</span>
              <span className="button-arrow">↗</span>
            </button>
            <button className="text-button" onClick={() => scrollTo("work")}>
              <span className="play-icon">▶</span>
              {ui.hero.secondary}
            </button>
          </div>

          <div className="hero-meta">
            <div>
              <span className="meta-label">{ui.hero.locationLabel}</span>
              <strong>{ui.hero.location}</strong>
            </div>
            <div>
              <span className="meta-label">{ui.hero.workModelLabel}</span>
              <strong>{ui.hero.workModel}</strong>
            </div>
            <div>
              <span className="meta-label">{ui.hero.focusLabel}</span>
              <strong>{ui.hero.focus}</strong>
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
                  aria-label={ui.terminal.inputLabel}
                />
              </form>
            </div>
          </div>
          <div className="console-caption">
            <span>{ui.terminal.tip}</span>
            <span>⌘ K</span>
          </div>
        </div>

        <button className="scroll-cue" onClick={() => scrollTo("about")} aria-label={ui.hero.scroll}>
          <span>SCROLL TO EXPLORE</span>
          <i>↓</i>
        </button>
      </section>

      <section className="marquee" aria-label={ui.hero.marquee}>
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
          <span>{ui.about.system}</span>
        </div>
        <div className="about-layout">
          <div className="about-statement" data-reveal>
            <p className="eyebrow"><span className="prompt">&gt;</span> cat philosophy.txt</p>
            <h2>
              {ui.about.heading1}
              <br />
              <span>{ui.about.headingAccent}</span>{ui.about.heading2}
            </h2>
          </div>
          <div className="about-copy" data-reveal>
            <p>
              {ui.about.introBefore}<strong>{ui.about.introName}</strong>{ui.about.introAfter}
            </p>
            <p>{ui.about.body}</p>
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
          {ui.about.principles.map((principle, index) => (
            <article data-reveal key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}.</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services section-shell section-block" id="services">
        <div className="section-heading" data-reveal>
          <div className="section-index">
            <span>02</span>
            <span>/ SERVICES.JSON</span>
          </div>
          <h2>{ui.servicesSection.title}</h2>
          <p>{ui.servicesSection.description}</p>
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
              <h2>{ui.work.title}</h2>
            </div>
            <p>{ui.work.description}</p>
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
                  <Link
                    href={projectHref(locale, project.id)}
                    hrefLang={locale}
                    aria-label={ui.work.projectAria(project.title)}
                    title={ui.work.projectTitle}
                  >
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </Link>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="work-footer" data-reveal>
            <span>{ui.work.footer}</span>
            <button className="text-link" onClick={() => scrollTo("contact")}>
              {ui.work.cta} <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="lab-preview section-block"
        id="lab"
        aria-labelledby="lab-preview-title"
      >
        <div className="section-shell">
          <div className="section-heading split-heading lab-preview-heading" data-reveal>
            <div>
              <div className="section-index">
                <span>04</span>
                <span>{ui.labSection.system}</span>
              </div>
              <h2 id="lab-preview-title">{ui.labSection.title}</h2>
            </div>
            <div className="lab-preview-intro">
              <p>{ui.labSection.description}</p>
              <Link
                className="lab-preview-link"
                href={labHref(locale)}
                hrefLang={locale}
                aria-label={ui.labSection.aria}
              >
                {ui.labSection.viewAll} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="lab-preview-grid">
            {labEntries.map((entry) => (
              <div className="lab-preview-item" data-reveal key={entry.id}>
                <LabCard entry={entry} locale={locale} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process section-shell section-block" id="process">
        <div className="section-heading split-heading" data-reveal>
          <div>
            <div className="section-index">
              <span>05</span>
              <span>/ PROCESS.LOG</span>
            </div>
            <h2>{ui.process.title}</h2>
          </div>
          <p>{ui.process.description}</p>
        </div>

        <div className="process-terminal" data-reveal>
          <div className="terminal-bar">
            <div className="window-dots"><i /><i /><i /></div>
            <span>project-roadmap.log</span>
            <span>READ ONLY</span>
          </div>
          <div className="process-steps">
            {ui.process.steps.map((step, index) => (
              <article key={step[0]}>
                <div className="process-marker">
                  <span>{step[0]}</span>
                  {index < 3 && <i />}
                </div>
                <div>
                  <span className="process-command">$ step --{step[1].toLocaleLowerCase(localeConfig[locale].numberLocale)}</span>
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
              <span>06</span>
              <span>/ PRICING.CONFIG</span>
            </div>
            <h2>{ui.pricing.title1}<br /><span>{ui.pricing.title2}</span></h2>
            <p>{ui.pricing.description}</p>
          </div>

          <div
            className="package-category-tabs"
            role="group"
            aria-label={ui.pricing.categoriesAria}
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
            <span>{ui.pricing.selectedCategory}</span>
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
                {pack.featured && <span className="popular-badge">{ui.pricing.recommended}</span>}
                <div className="package-head">
                  <span>/{selectedCategory.id}/{pack.level}</span>
                  <span>{pack.duration}</span>
                </div>
                <h3>{pack.name}</h3>
                <p>{pack.note}</p>
                <div className="price">
                  <small>{ui.pricing.starting}</small>
                  <strong>{formatMoney(pack.price, locale)}</strong>
                  <span>+</span>
                </div>
                <ul>
                  {pack.includes.map((item) => (
                    <li key={item}><span>✓</span>{item}</li>
                  ))}
                </ul>
                <button onClick={() => choosePackage(pack.id)}>
                  {activePackage === pack.id ? ui.pricing.selected : ui.pricing.select} <span>→</span>
                </button>
              </article>
            ))}
          </div>

          <div className="quote-calculator" id="calculator" data-reveal>
            <div className="calculator-copy">
              <span className="eyebrow"><span className="prompt">&gt;</span> quick_quote --interactive</span>
              <h3>{ui.pricing.quoteTitle}</h3>
              <p>{ui.pricing.quoteDescription}</p>
            </div>
            <div className="calculator-controls">
              <div className="selected-package">
                <div>
                  <span>{ui.pricing.selectedPackage}</span>
                  <strong>{selectedCategory.name} / {chosenPackage.name}</strong>
                </div>
                <span>{formatMoney(chosenPackage.price, locale)}</span>
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
                    <strong>+{formatMoney(item.price, locale)}</strong>
                  </label>
                ))}
              </div>
              <div className="calculator-total">
                <div>
                  <span>{ui.pricing.estimated}</span>
                  <strong>{formatMoney(total, locale)}</strong>
                </div>
                <button className="primary-button" onClick={requestOffer}>
                  {ui.pricing.request} <span>↗</span>
                </button>
              </div>
              <small>{ui.pricing.disclaimer}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-shell section-block" id="faq">
        <div className="faq-layout">
          <div className="section-heading" data-reveal>
            <div className="section-index">
              <span>07</span>
              <span>/ FAQ.MD</span>
            </div>
            <h2>{ui.faqSection.title1}<br />{ui.faqSection.title2}</h2>
            <p>{ui.faqSection.description}</p>
            <button className="text-link" onClick={() => scrollTo("contact")}>
              {ui.faqSection.cta} <span>→</span>
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
              <span>08</span>
              <span>/ CONNECT.SH</span>
            </div>
            <p className="eyebrow"><span className="prompt">root@future:~$</span> ./start-project</p>
            <h2>
              {ui.contact.title1}
              <br />
              <span>{ui.contact.title2}</span>
            </h2>
            <p className="contact-intro">{ui.contact.intro}</p>
            <div className="direct-contact">
              <span>{ui.contact.directEmail}</span>
              <button onClick={copyEmail}>
                {CONTACT_EMAIL} <span>⧉</span>
              </button>
            </div>
            <div className="contact-status">
              <span className="status-dot" />
              <div>
                <strong>{ui.contact.available}</strong>
                <small>{ui.contact.responseTime}</small>
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
                  <span>{ui.contact.nameLabel}</span>
                  <input name="name" type="text" placeholder={ui.contact.namePlaceholder} required />
                </label>
                <label>
                  <span>{ui.contact.emailLabel}</span>
                  <input name="email" type="email" placeholder={ui.contact.emailPlaceholder} required />
                </label>
              </div>
              <label>
                <span>{ui.contact.companyLabel} <small>{ui.contact.optional}</small></span>
                <input name="company" type="text" placeholder={ui.contact.companyPlaceholder} />
              </label>
              <div className="form-row">
                <label>
                  <span>{ui.contact.serviceLabel}</span>
                  <select
                    name="service"
                    value={selectedService}
                    onChange={(event) => setSelectedService(event.target.value)}
                  >
                    {ui.contact.services.map((service) => <option key={service}>{service}</option>)}
                    {!ui.contact.services.includes(selectedService as never) && <option>{selectedService}</option>}
                  </select>
                </label>
                <label>
                  <span>{ui.contact.budgetLabel}</span>
                  <select name="budget" defaultValue={ui.contact.budgets[1]}>
                    {ui.contact.budgets.map((budget) => <option key={budget}>{budget}</option>)}
                  </select>
                </label>
              </div>
              <label>
                <span>{ui.contact.messageLabel}</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder={ui.contact.messagePlaceholder}
                  required
                />
              </label>
              <label className="contact-honeypot" aria-hidden="true">
                <span>{ui.contact.website}</span>
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="form-submit">
                <span>{ui.contact.secure}</span>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? ui.contact.sending : ui.contact.submit} <span>↗</span>
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
          <p>{ui.footer.line1}<br />{ui.footer.line2}</p>
          <div className="footer-nav">
            <button onClick={() => scrollTo("about")}>{ui.footer.about}</button>
            <button onClick={() => scrollTo("services")}>{ui.footer.services}</button>
            <button onClick={() => scrollTo("work")}>{ui.footer.work}</button>
            <button onClick={() => scrollTo("lab")}>{ui.footer.lab}</button>
            <button onClick={() => scrollTo("contact")}>{ui.footer.contact}</button>
          </div>
          <button className="back-top" onClick={() => scrollTo("home")}>
            {ui.footer.top} <span>↑</span>
          </button>
        </div>
        <div className="section-shell footer-bottom">
          <span>© {new Date().getFullYear()} EMİRHAN TUNCER</span>
          <span>ALL SYSTEMS OPERATIONAL <i className="status-dot" /></span>
          <span>v1.0.0</span>
        </div>
      </footer>

      <Chatbot locale={locale} />

      {toast && (
        <div className={`toast toast-${toast.status}`} role="status">
          <span>{toast.status === "success" ? "✓" : "!"}</span>
          {toast.message}
        </div>
      )}
    </main>
  );
}
