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
      "Web experiences, AI agents, games, and mobile applications for brands and startups.",
    applicationName: "c0denail",
    keywords: [
      "Emirhan Tuncer",
      "creative developer",
      "web design",
      "web development",
      "digital product",
      "AI automation",
    ],
    authors: [{ name: "Emirhan Tuncer" }],
    creator: "Emirhan Tuncer",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Emirhan Tuncer — Creative Developer",
      description: "Ideas into code, code into products. Design × Code × AI.",
      type: "website",
      locale: "en_US",
      url: "/en",
      images: [{ url: "/og.png", width: 1730, height: 909, alt: "c0denail Lab / Technical Journal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Emirhan Tuncer — Creative Developer",
      description: "Ideas into code, code into products. Design × Code × AI.",
      images: ["/og.png"],
    },
  };
}

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
