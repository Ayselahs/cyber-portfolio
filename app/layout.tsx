import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "CyberSecurity Portfolio",
  description:
    "A showcase of hands-on cybersecurity projects focused on threat detection, system hardening, and network defense.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
