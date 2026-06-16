import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wesleyfariasb.github.io/Developer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wesley Farias | Full Stack com Next.js e NestJS",
  description:
    "Desenvolvedor Full Stack com foco em React.js, Next.js, TypeScript, Node.js e NestJS. Desenvolvimento de aplicações web modernas, performáticas, escaláveis e otimizadas para SEO.",
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
        width: 1200,
        height: 630,
        alt: "Wesley Farias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
