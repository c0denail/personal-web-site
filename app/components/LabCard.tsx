import Link from "next/link";
import type { Locale } from "../i18n";
import { labHref } from "../i18n";
import { getLabLabels, type LabEntry } from "../data/lab";
import styles from "./LabCard.module.css";

type LabCardProps = {
  entry: LabEntry;
  locale: Locale;
  href?: string | null;
  compact?: boolean;
};

const copy = {
  tr: {
    observation: "GÖZLEM",
    openLive: "CANLI ARACI AÇ",
    viewEntry: "LAB KAYDINI GÖR",
    unavailable: "İÇERİK HENÜZ YAYINDA DEĞİL",
    openAria: (title: string) => `${title} içeriğini aç`,
  },
  en: {
    observation: "OBSERVATION",
    openLive: "OPEN LIVE TOOL",
    viewEntry: "VIEW LAB ENTRY",
    unavailable: "CONTENT IS NOT LIVE YET",
    openAria: (title: string) => `Open ${title}`,
  },
} as const;

export default function LabCard({ entry, locale, href, compact = false }: LabCardProps) {
  const labels = getLabLabels(locale);
  const text = copy[locale];
  const anchor = entry.id === "prompt-inspector" ? entry.id : `entry-${entry.id}`;
  const resolvedHref = href === undefined ? `${labHref(locale)}#${anchor}` : href;

  return (
    <article
      className={`${styles.card} ${styles[`tone_${entry.tone}`]} ${compact ? styles.compact : ""}`}
      id={`entry-${entry.id}`}
    >
      <div className={styles.topline}>
        <span className={styles.code}>{entry.code}</span>
        <span className={styles.kind}>{labels.kinds[entry.kind]}</span>
        <span className={`${styles.status} ${styles[`status_${entry.status}`]}`}>
          <i aria-hidden="true" />
          {labels.statuses[entry.status]}
        </span>
      </div>

      <div className={styles.body}>
        <h3>{entry.title}</h3>
        <p className={styles.summary}>{entry.summary}</p>
        <div className={styles.tags} aria-label={locale === "tr" ? "Etiketler" : "Tags"}>
          {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>

      {!compact && (
        <div className={styles.observation}>
          <span>{text.observation}</span>
          <p>{entry.observation}</p>
        </div>
      )}

      <div className={styles.footer}>
        {resolvedHref ? (
          <Link href={resolvedHref} aria-label={text.openAria(entry.title)}>
            {entry.status === "live" ? text.openLive : text.viewEntry}
            <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <span className={styles.unavailable}>{text.unavailable}</span>
        )}
      </div>
    </article>
  );
}
