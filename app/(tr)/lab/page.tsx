import type { Metadata } from "next";
import LabPage from "../../components/LabPage";
import { labHref, localeConfig } from "../../i18n";

const locale = "tr" as const;
const title = "Lab / Teknik Günlük — Emirhan Tuncer";
const description =
  "Çalışan küçük araçlar, yapay zekâ deneyleri, oyun prototipleri ve dürüst teknik notlar.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["teknik günlük", "AI deneyleri", "web demoları", "oyun prototipleri", "prompt tasarımı"],
  alternates: {
    canonical: labHref(locale),
    languages: {
      "tr-TR": labHref("tr"),
      "en-US": labHref("en"),
    },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: labHref(locale),
    locale: localeConfig[locale].openGraphLocale,
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "c0denail Lab / Teknik Günlük" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function TurkishLabPage() {
  return <LabPage locale={locale} />;
}
