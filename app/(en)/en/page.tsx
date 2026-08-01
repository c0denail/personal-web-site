import type { Metadata } from "next";
import { HomePage } from "../../components/HomePage";

export const metadata: Metadata = {
  title: "Emirhan Tuncer — Creative Developer",
  description:
    "Web experiences, AI agents, games, and mobile applications for brands and startups.",
  alternates: {
    canonical: "/en",
    languages: {
      "tr-TR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Emirhan Tuncer — Creative Developer",
    description: "Ideas into code, code into products. Design × Code × AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emirhan Tuncer — Creative Developer",
    description: "Ideas into code, code into products. Design × Code × AI.",
  },
};

export default function EnglishHomePage() {
  return <HomePage key="en" locale="en" />;
}
