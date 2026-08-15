import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

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
  metadataBase: new URL("https://luckynumberpick.com"),

  title: {
    default: "Lucky Number Picker",
    template: "%s | Lucky Number Picker",
  },

  description:
    "Lucky Number Picker provides daily lucky number predictions and official results for Hong Kong, Singapore, Sydney, and Toto Macau.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Lucky Number Picker",
    description:
      "Daily lucky number predictions and official results for Hong Kong, Singapore, Sydney, and Toto Macau.",
    url: "https://luckynumberpick.com",
    siteName: "Lucky Number Picker",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Lucky Number Picker",
    description:
      "Daily lucky number predictions and official results for Hong Kong, Singapore, Sydney, and Toto Macau.",
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

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}