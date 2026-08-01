"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n";
import styles from "./PromptInspector.module.css";

type Criterion = "purpose" | "context" | "constraint" | "format";

type CriterionResult = {
  id: Criterion;
  found: boolean;
};

const signals: Record<Locale, Record<Criterion, readonly string[]>> = {
  tr: {
    purpose: [
      "oluştur", "hazırla", "açıkla", "analiz et", "karşılaştır", "tasarla", "özetle",
      "geliştir", "üret", "incele", "çevir", "planla", "öner",
    ],
    context: [
      "bağlam", "hedef kitle", "kullanıcı", "okuyucu", "müşteri", "rolünde", "gibi davran",
      "şunları kullan", "verilen", "için",
    ],
    constraint: [
      "en fazla", "en az", "yalnızca", "sadece", "kullanma", "kaçın", "zorunlu", "hariç",
      "sınır", "kelime", "karakter", "ton",
    ],
    format: [
      "çıktı", "çıktıyı", "format", "biçim", "markdown", "json", "tablo", "liste", "madde",
      "başlık", "bölüm",
    ],
  },
  en: {
    purpose: [
      "create", "write", "explain", "analyze", "compare", "design", "summarize", "build",
      "generate", "review", "translate", "plan", "recommend",
    ],
    context: [
      "context", "audience", "user", "reader", "customer", "act as", "use the following",
      "given", "background", "for",
    ],
    constraint: [
      "at most", "at least", "only", "do not", "avoid", "must", "except", "limit", "words",
      "characters", "tone",
    ],
    format: [
      "output", "format", "markdown", "json", "table", "list", "bullets", "headings",
      "sections", "schema",
    ],
  },
};

const copy = {
  tr: {
    eyebrow: "LAB-01 / CANLI AI DENEYİ",
    title: "Prompt Kapsam Denetleyicisi",
    description:
      "İsteğini göndermeden önce dört temel yapısal öğeyi kontrol et. Analiz tamamen bu tarayıcı sekmesinde çalışır.",
    local: "YEREL / VERİ GÖNDERİLMEZ",
    inputLabel: "Denetlenecek prompt",
    placeholder: "Promptunu buraya yaz veya yerelleştirilmiş örneği yükle…",
    inputHelp: "Metin cihazından ayrılmaz. Araç yalnızca açık ifade sinyallerini arar.",
    example: "ÖRNEĞİ YÜKLE",
    reset: "SIFIRLA",
    character: "karakter",
    scoreLabel: "KAPSAM PUANI",
    scoreHelp: "Her bulunan öğe 25 puandır. Bu puan model yanıtının kalitesini ölçmez.",
    waiting: "Bir prompt bekleniyor",
    early: "Temel öğeler eksik",
    developing: "Kapsam gelişiyor",
    almost: "Neredeyse hazır",
    clear: "Kapsam net görünüyor",
    found: "Açık sinyal bulundu",
    missing: "Açık sinyal bulunamadı",
    criteria: {
      purpose: {
        title: "Amaç",
        description: "Modelden istenen eylem açıkça belirtilmiş.",
        tip: "Oluştur, analiz et veya karşılaştır gibi net bir eylem ekle.",
      },
      context: {
        title: "Bağlam",
        description: "Hedef kitle, rol veya kullanım durumu tarif edilmiş.",
        tip: "Kimin için, hangi durumda veya hangi bilgilerle çalışılacağını yaz.",
      },
      constraint: {
        title: "Kısıt",
        description: "Sınır, ton veya kaçınılacak noktalar tanımlanmış.",
        tip: "Uzunluk, ton, zorunluluk veya kaçınılacak bir öğe ekle.",
      },
      format: {
        title: "Çıktı biçimi",
        description: "Yanıtın yapısı veya biçimi açıkça istenmiş.",
        tip: "Liste, tablo, JSON veya Markdown gibi bir çıktı biçimi belirt.",
      },
    },
    examplePrompt: `Bir ürün stratejisti gibi davran.

Yeni başlayan yazılım ekipleri için uzaktan retrospektif toplantı rehberi oluştur.

Bağlam: Ekip 6 kişilik ve toplantı 45 dakika sürecek.

Hazırlık, toplantı akışı ve takip olmak üzere 3 bölüm kullan. Her bölümde en fazla 4 madde olsun; teknik jargon kullanma.

Çıktıyı Markdown başlıkları ve madde işaretleriyle biçimlendir.`,
  },
  en: {
    eyebrow: "LAB-01 / LIVE AI EXPERIMENT",
    title: "Prompt Scope Inspector",
    description:
      "Check four essential structural elements before sending your request. The analysis runs entirely in this browser tab.",
    local: "LOCAL / NO DATA SENT",
    inputLabel: "Prompt to inspect",
    placeholder: "Write your prompt here or load the localized example…",
    inputHelp: "The text never leaves your device. The tool only looks for explicit phrasing signals.",
    example: "LOAD EXAMPLE",
    reset: "RESET",
    character: "characters",
    scoreLabel: "SCOPE SCORE",
    scoreHelp: "Each detected element is worth 25 points. This score does not measure model response quality.",
    waiting: "Waiting for a prompt",
    early: "Core elements are missing",
    developing: "The scope is taking shape",
    almost: "Almost ready",
    clear: "The scope looks clear",
    found: "Explicit signal found",
    missing: "No explicit signal found",
    criteria: {
      purpose: {
        title: "Purpose",
        description: "The requested action is stated clearly.",
        tip: "Add a direct action such as create, analyze, or compare.",
      },
      context: {
        title: "Context",
        description: "An audience, role, or use case is described.",
        tip: "State who it is for, the situation, or the information to use.",
      },
      constraint: {
        title: "Constraint",
        description: "A limit, tone, or point to avoid is defined.",
        tip: "Add a length, tone, requirement, or something to avoid.",
      },
      format: {
        title: "Output format",
        description: "The response structure or format is requested explicitly.",
        tip: "Specify an output format such as a list, table, JSON, or Markdown.",
      },
    },
    examplePrompt: `Act as a product strategist.

Create a remote retrospective meeting guide for early-stage software teams.

Context: The team has 6 people and the meeting will last 45 minutes.

Use 3 sections: preparation, meeting flow, and follow-up. Include at most 4 bullets per section and avoid technical jargon.

Format the output with Markdown headings and bullet points.`,
  },
} as const;

const criteria: readonly Criterion[] = ["purpose", "context", "constraint", "format"];

function normalizePrompt(value: string, locale: Locale) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function containsSignal(prompt: string, candidates: readonly string[]) {
  const paddedPrompt = ` ${prompt} `;
  return candidates.some((candidate) => paddedPrompt.includes(` ${candidate} `));
}

function inspectPrompt(value: string, locale: Locale): CriterionResult[] {
  const normalized = normalizePrompt(value, locale);

  return criteria.map((id) => ({
    id,
    found: normalized.length > 0 && containsSignal(normalized, signals[locale][id]),
  }));
}

function getScoreSummary(score: number, locale: Locale) {
  const text = copy[locale];
  if (score === 0) return text.waiting;
  if (score <= 25) return text.early;
  if (score <= 50) return text.developing;
  if (score <= 75) return text.almost;
  return text.clear;
}

export default function PromptInspector({ locale }: { locale: Locale }) {
  const [prompt, setPrompt] = useState("");
  const text = copy[locale];
  const results = useMemo(() => inspectPrompt(prompt, locale), [locale, prompt]);
  const score = results.filter((result) => result.found).length * 25;
  const scoreSummary = getScoreSummary(score, locale);

  return (
    <section className={styles.inspector} id="prompt-inspector" aria-labelledby="prompt-inspector-title">
      <div className={styles.windowBar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span>prompt-scope.local</span>
        <span>NO NETWORK</span>
      </div>

      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>{text.eyebrow}</span>
          <h2 id="prompt-inspector-title">{text.title}</h2>
          <p>{text.description}</p>
        </div>
        <span className={styles.localBadge}><i aria-hidden="true" />{text.local}</span>
      </div>

      <div className={styles.workspace}>
        <div className={styles.editor}>
          <div className={styles.editorLabel}>
            <label htmlFor={`prompt-input-${locale}`}>{text.inputLabel}</label>
            <span>{prompt.length} {text.character}</span>
          </div>
          <textarea
            id={`prompt-input-${locale}`}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={text.placeholder}
            aria-describedby={`prompt-help-${locale}`}
            spellCheck="true"
          />
          <p className={styles.inputHelp} id={`prompt-help-${locale}`}>{text.inputHelp}</p>
          <div className={styles.actions}>
            <button type="button" onClick={() => setPrompt(text.examplePrompt)}>
              <span aria-hidden="true">+</span> {text.example}
            </button>
            <button type="button" onClick={() => setPrompt("")} disabled={!prompt}>
              {text.reset}
            </button>
          </div>
        </div>

        <div className={styles.report}>
          <div className={styles.score} aria-live="polite" aria-atomic="true">
            <span>{text.scoreLabel}</span>
            <strong>{score}<small>/100</small></strong>
            <p>{scoreSummary}</p>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label={text.scoreLabel}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={score}
            >
              <i style={{ width: `${score}%` }} />
            </div>
            <small>{text.scoreHelp}</small>
          </div>

          <ul className={styles.checklist}>
            {results.map((result, index) => {
              const criterion = text.criteria[result.id];

              return (
                <li className={result.found ? styles.found : ""} key={result.id}>
                  <span className={styles.checkIcon} aria-hidden="true">{result.found ? "✓" : "·"}</span>
                  <div>
                    <span className={styles.checkCode}>0{index + 1}</span>
                    <h3>{criterion.title}</h3>
                    <p>{result.found ? criterion.description : criterion.tip}</p>
                    <small>{result.found ? text.found : text.missing}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
