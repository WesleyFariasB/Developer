import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-primary",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wesley Farias | Full Stack com Next.js e NestJS",
  description:
    "Desenvolvedor Full Stack com foco em React.js, Next.js, TypeScript, Node.js e NestJS. Desenvolvimento de aplicações web modernas, performáticas, escaláveis e otimizadas para SEO.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "APIs REST",
    "SSR",
    "SSG",
    "SEO técnico",
    "backend escalável",
  ],
  openGraph: {
    title: "Wesley Farias | Full Stack com Next.js e NestJS",
    description:
      "Aplicações web modernas, escaláveis e orientadas a performance com React.js, Next.js, Node.js e NestJS.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/about.png",
        width: 1024,
        height: 1031,
        alt: "Retrato de Wesley Farias, desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Wesley Farias | Full Stack com Next.js e NestJS",
    description:
      "Projetos web com React.js, Next.js, TypeScript, Node.js e NestJS, com foco em SEO técnico e performance.",
    images: ["/images/about.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable} bg-white text-ink antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
