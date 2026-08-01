import type { Metadata } from "next";
import LabPage from "../../../components/LabPage";
import { labHref, localeConfig } from "../../../i18n";

const locale = "en" as const;
const title = "Lab / Technical Journal — Emirhan Tuncer";
const description =
  "Small working tools, AI experiments, game prototypes, and honest technical notes from the build process.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["technical journal", "AI experiments", "web demos", "game prototypes", "prompt design"],
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
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "c0denail Lab / Technical Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function EnglishLabPage() {
  return <LabPage locale={locale} />;
}
