import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getRequestMetadataBase } from "../metadata-base";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: await getRequestMetadataBase(),
    title: "Emirhan Tuncer — Creative Developer",
    description:
      "Markalar ve girişimler için web deneyimleri, AI ajanları, oyunlar ve mobil uygulamalar.",
    applicationName: "c0denail",
    keywords: [
      "Emirhan Tuncer",
      "creative developer",
      "web tasarım",
      "web geliştirme",
      "dijital ürün",
      "AI otomasyon",
    ],
    authors: [{ name: "Emirhan Tuncer" }],
    creator: "Emirhan Tuncer",
    alternates: {
      canonical: "/",
      languages: {
        "tr-TR": "/",
        "en-US": "/en",
      },
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Emirhan Tuncer — Creative Developer",
      description: "Fikri koda, kodu ürüne. Tasarım × Kod × AI.",
      type: "website",
      locale: "tr_TR",
      url: "/",
      images: [{ url: "/og.png", width: 1730, height: 909, alt: "c0denail Lab / Technical Journal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Emirhan Tuncer — Creative Developer",
      description: "Fikri koda, kodu ürüne. Tasarım × Kod × AI.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
