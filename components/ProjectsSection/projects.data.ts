export type ProjectImage = {
  alt: string;
  src: string;
};

export type PortfolioProject = {
  category: string;
  image?: string;
  imageAlt?: string;
  images: readonly ProjectImage[];
  isPlaceholder?: boolean;
  isPublished?: boolean;
  slug: string;
  summary: string;
  technologies?: readonly string[];
  title: string;
};

const imagePath = (fileName: string) => `/images/${fileName}`;

export const projects: readonly PortfolioProject[] = [
  {
    slug: "top-brasil-presentes",
    category: "Top Brasil Presentes",
    title: "E-commerce e plataforma B2B com foco em performance e experiência multiplataforma",
    summary: "Modernização de interfaces web e mobile, integrações com APIs e pagamentos, aplicação de SSR/SSG e otimizações de Core Web Vitals. A atuação contribuiu para reduzir em até 43% o tempo de carregamento, melhorar a estabilidade visual em 15+ telas e apoiar o crescimento do faturamento digital.",
    image: imagePath("mockup2.png"),
    imageAlt: "Top Brasil Presentes — visão principal",
    images: [
      { alt: "Top Brasil Presentes — visão principal", src: imagePath("mockup2.png") },
      { alt: "Top Brasil Presentes — seção 1", src: imagePath("projeto31.png") },
      { alt: "Top Brasil Presentes — seção 2", src: imagePath("projeto32.png") },
      { alt: "Top Brasil Presentes — seção 3", src: imagePath("projeto33.png") },
    ],
    technologies: ["React.js · React Native · Next.js · TypeScript · Node.js · NestJS · Tailwind CSS · Java · Spring Boot · MySQL"],
  },
  {
    slug: "software-gestao-empresarial",
    category: "Software de gestão empresarial",
    title: "Sistema de gestão empresarial com arquitetura full stack e integração via APIs",
    summary:
      "Centralização de dados, processos e fluxos operacionais em uma aplicação web integrada, com interface em React.js, serviços em Node.js e comunicação via APIs REST, priorizando organização, escalabilidade e evolução do produto.",
    image: imagePath("Software-Wesley.png"),
    imageAlt: "Software de gestão empresarial — visão principal",
    images: [
      { alt: "Software de gestão empresarial — visão principal", src: imagePath("Software-Wesley.png") },
      { alt: "Software de gestão empresarial — tela 1", src: imagePath("s1.png") },
      { alt: "Software de gestão empresarial — tela 2", src: imagePath("s2.png") },
      { alt: "Software de gestão empresarial — tela 3", src: imagePath("s3.png") },
      { alt: "Software de gestão empresarial — tela 4", src: imagePath("s4.png") },
      { alt: "Software de gestão empresarial — tela 5", src: imagePath("s5.png") },
      { alt: "Software de gestão empresarial — tela 6", src: imagePath("s6.png") },
      { alt: "Software de gestão empresarial — tela 7", src: imagePath("s7.png") },
      { alt: "Software de gestão empresarial — tela 8", src: imagePath("s8.png") },
    ],
    technologies: ["React.js · Next.js · TypeScript · JavaScript · Node.js · NestJS · Tailwind CSS · MySQL" ],
  },
  {
    slug: "paula-correa",
    category: "SITE INSTITUCIONAL",
    title: "Plataforma institucional moderna com blog dinâmico, alta performance e gestão de conteúdo.",
    summary: "Desenvolvida com Next.js, NestJS e MySQL, com sistema próprio para publicação de posts, gerenciamento de conteúdo e imagens.",
    image: imagePath("mockup1.png"),
    imageAlt: "Paula Corrêa — visão principal",
    images: [
      { alt: "Paula Corrêa — visão principal", src: imagePath("mockup1.png") },
      { alt: "Paula Corrêa — seção 1", src: imagePath("projeto1.png") },
      { alt: "Paula Corrêa — seção 2", src: imagePath("projeto2.png") },
      { alt: "Paula Corrêa — seção 3", src: imagePath("projeto3.png") },
      { alt: "Paula Corrêa — seção 4", src: imagePath("projeto4.png") },
      { alt: "Paula Corrêa — seção 5", src: imagePath("projeto5.png") },
    ],
    technologies: ["Next.js · React.js · TypeScript · Node.js · NestJS · MySQL · Tailwind CSS" ],
  },
  {
    slug: "healthcloud",
    category: "SAAS HEALTHCARE",
    title: "Plataforma SaaS White Label para gestão de clínicas, profissionais e operações de saúde.",
    summary: "Desenvolvida com React Native, Expo e ASP.NET Core, com arquitetura multi-tenant, autenticação segura, agenda inteligente e gestão completa da operação.",
    image: imagePath("HealthCloud_01.png"),
    imageAlt: "HealthCloud — visão principal",
    images: [
      { alt: "HealthCloud — visão principal", src: imagePath("HealthCloud_01.png") },
      { alt: "HealthCloud — tela 2", src: imagePath("HealthCloud_02.png") },
      { alt: "HealthCloud — tela 3", src: imagePath("HealthCloud_03.png") },
      { alt: "HealthCloud — tela 4", src: imagePath("HealthCloud_04.png") },
      { alt: "HealthCloud — tela 5", src: imagePath("HealthCloud_05.png") },
    ],
    technologies: ["React Native · Expo · TypeScript · ASP.NET Core · PostgreSQL · Redis · Async Storage"],
  },
  {
    slug: "inteligencia-que-conecta",
    category: "AUTOMAÇÃO & IA",
    title: "Solução de automação com IA para atendimento, qualificação de leads e vendas",
    summary: "Plataforma voltada à automação de conversas e processos comerciais, com fluxos para qualificação de leads, respostas automatizadas, integração com WhatsApp e suporte contínuo ao atendimento. A experiência foi construída com foco em usabilidade, responsividade e conversão.",
    image: imagePath("IA_Principal.png"),
    imageAlt: "Inteligência que conecta — visão principal",
    images: [
      { alt: "Inteligência que conecta — visão principal", src: imagePath("IA_Principal.png") },
      { alt: "Inteligência que conecta — tela 1", src: imagePath("IA_2.png") },
      { alt: "Inteligência que conecta — tela 2", src: imagePath("IA_3.png") },
    ],
  },
  {
    slug: "proximo-projeto-01",
    category: "Em desenvolvimento",
    title: "Próximo projeto",
    summary: "Um novo produto digital será apresentado aqui em breve.",
    images: [],
    isPlaceholder: true,
    isPublished: false,
  },
  {
    slug: "proximo-projeto-02",
    category: "Em desenvolvimento",
    title: "Próximo projeto",
    summary: "Espaço reservado para uma nova parceria e seu resultado digital.",
    images: [],
    isPlaceholder: true,
    isPublished: false,
  },
];
