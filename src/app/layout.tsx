import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://orientgroup.al"),

  title: {
    default: "ORIENT GROUP",
    template: "%s | ORIENT GROUP",
  },

  description: "Projects & design, construction and fiber internet services.",

  icons: {
    icon: "/logo-square.png",
    shortcut: "/logo-square.png",
    apple: "/logo-square.png",
  },

  openGraph: {
    type: "website",
    url: "https://orientgroup.al",
    title: "ORIENT GROUP",
    description: "Projects & design, construction and fiber internet services.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ORIENT GROUP",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ORIENT GROUP",
    description: "Projects & design, construction and fiber internet services.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body className="min-h-screen bg-neutral-950 text-white antialiased">
        <Suspense fallback={<div className="h-[72px]" />}>
          <Header />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}
