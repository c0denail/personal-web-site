import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Emirhan Tuncer — Creative Developer",
    description: "Ideas into code, code into products. Design × Code × AI.",
  },
};

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
