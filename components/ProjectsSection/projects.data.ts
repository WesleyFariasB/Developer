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
    category: "E-commerce",
    title: "Top Brasil Presentes",
    summary: "Experiência comercial responsiva para apresentação de produtos e navegação clara.",
    image: imagePath("mockup2.png"),
    imageAlt: "Top Brasil Presentes — visão principal",
    images: [
      { alt: "Top Brasil Presentes — visão principal", src: imagePath("mockup2.png") },
      { alt: "Top Brasil Presentes — seção 1", src: imagePath("projeto31.png") },
      { alt: "Top Brasil Presentes — seção 2", src: imagePath("projeto32.png") },
      { alt: "Top Brasil Presentes — seção 3", src: imagePath("projeto33.png") },
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "React Native"],
  },
  {
    slug: "software-gestao-empresarial",
    category: "Sistema",
    title: "Software de gestão empresarial",
    summary:
      "Centraliza e integra dados, processos e setores em uma única plataforma para facilitar decisões e automatizar rotinas.",
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
    technologies: ["React.js", "Node.js", "APIs REST"],
  },
  {
    slug: "paula-correa",
    category: "Landing page",
    title: "Paula Corrêa",
    summary: "Landing page profissional com foco em posicionamento, confiança e conversão.",
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
  },
  {
    slug: "donkere",
    category: "Portfólio profissional",
    title: "Donkere",
    summary: "Portfólio visual para marca criativa com narrativa, impacto e apresentação de serviços.",
    image: imagePath("mockup4.png"),
    imageAlt: "Donkere — visão principal",
    images: [
      { alt: "Donkere — visão principal", src: imagePath("mockup4.png") },
      { alt: "Donkere — seção 1", src: imagePath("projeto10.png") },
      { alt: "Donkere — seção 2", src: imagePath("projeto11.png") },
      { alt: "Donkere — seção 3", src: imagePath("projeto12.png") },
    ],
  },
  {
    slug: "amalfis",
    category: "Blog",
    title: "Amalfis",
    summary: "Blog institucional com hierarquia visual, leitura fluida e estrutura preparada para conteúdo.",
    image: imagePath("mockup3.png"),
    imageAlt: "Amalfis — visão principal",
    images: [
      { alt: "Amalfis — visão principal", src: imagePath("mockup3.png") },
      { alt: "Amalfis — seção 1", src: imagePath("projeto21.png") },
      { alt: "Amalfis — seção 2", src: imagePath("projeto22.png") },
      { alt: "Amalfis — seção 3", src: imagePath("projeto23.png") },
      { alt: "Amalfis — seção 4", src: imagePath("Projeto24.png") },
    ],
  },
  {
    slug: "inteligencia-que-conecta",
    category: "Automação IA",
    title: "Inteligência que conecta",
    summary: "Soluções personalizadas para automatizar processos, economizar tempo e impulsionar resultados.",
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
