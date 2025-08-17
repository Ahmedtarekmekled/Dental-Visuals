import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ErrorSuppressor from "@/components/ErrorSuppressor";
import ErrorBoundary from "@/components/ErrorBoundary";
import { content } from "@/data";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import LenisClient from "@/components/LenisClient";

// Using Raqupine for distinctive headings and Inter for body text
const heading = localFont({
  src: "../public/fonts/Raqupine.otf",
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

/* 
// Uncomment this when local font files are added to /public/fonts/
import localFont from "next/font/local";

const heading = localFont({
  src: [
    {
      path: "../public/fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const body = localFont({
  src: [
    {
      path: "../public/fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SuisseIntl-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SuisseIntl-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
*/

export const metadata = {
  title: `${content.websiteInfo.name} — ${content.websiteInfo.type}`,
  description: content.websiteInfo.description,
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-touch-fullscreen": "yes",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    HandheldFriendly: "true",
    MobileOptimized: "width",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} font-body bg-garden-dark text-primary`}
      >
        <script src="/block-sentry.js" async></script>
        <ErrorSuppressor />
        <LenisClient />
        <ErrorBoundary>
          <NavBar />
          {children}
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
