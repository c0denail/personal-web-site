export const locales = ["tr", "en"] as const;

export type Locale = (typeof locales)[number];

export const localeConfig: Record<
  Locale,
  { htmlLang: string; openGraphLocale: string; numberLocale: string }
> = {
  tr: { htmlLang: "tr", openGraphLocale: "tr_TR", numberLocale: "tr-TR" },
  en: { htmlLang: "en", openGraphLocale: "en_US", numberLocale: "en-US" },
};

export function homeHref(locale: Locale) {
  return locale === "tr" ? "/" : "/en";
}

export function projectHref(locale: Locale, slug: string) {
  return locale === "tr" ? `/projeler/${slug}` : `/en/projects/${slug}`;
}

export function labHref(locale: Locale) {
  return locale === "tr" ? "/lab" : "/en/lab";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "tr" ? "en" : "tr";
}
