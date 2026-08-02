import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luckynumberpicker.com"),

  title: {
    default: "Lucky Number Picker",
    template: "%s | Lucky Number Picker",
  },

  description:
    "Lucky Number Picker menyediakan hasil resmi Hong Kong, Singapore, Sydney, dan Toto Macau yang diperbarui setiap hari. Prediksi harian eksklusif tersedia untuk Member Premium.",

  keywords: [
    "Lucky Number Picker",
    "Hong Kong",
    "Singapore",
    "Sydney Lotto",
    "Toto Macau",
    "Official Result",
    "Lottery Result",
    "Prediksi HK",
    "Prediksi Singapore",
    "Prediksi Sydney",
    "Prediksi Macau",
  ],

  authors: [
    {
      name: "Lucky Number Picker",
    },
  ],

  creator: "Lucky Number Picker",

  openGraph: {
    title: "Lucky Number Picker",
    description:
      "Official Result diperbarui setiap hari. Prediksi eksklusif tersedia untuk Member Premium.",
    url: "https://luckynumberpicker.com",
    siteName: "Lucky Number Picker",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950">
        <Navbar />

        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}