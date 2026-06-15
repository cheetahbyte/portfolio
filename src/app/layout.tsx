import type { Metadata } from "next";
import localFont from "next/font/local";

import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const interTight = localFont({
  src: "../../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2",
  variable: "--font-inter-tight",
  display: "swap",
  weight: "100 900",
});

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", stored ? stored === "dark" : prefersDark);
  } catch {}
})();`;

export const metadata: Metadata = {
  title: "Leonhard Breuer | Portfolio",
  description:
    "Computer science student in Germany, building things for the web",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%91%8B%3C/text%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
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
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script>{themeScript}</script>
      </head>
      <body className="flex min-h-screen w-full flex-col transition-colors duration-700 ease-in-out">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
