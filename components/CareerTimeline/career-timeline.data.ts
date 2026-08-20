import type { IconType } from "react-icons";
import {
  LuGraduationCap,
  LuLaptopMinimalCheck,
  LuRadar,
  LuShoppingBag,
  LuUsersRound,
} from "react-icons/lu";

export type TimelineStatus = "completed" | "current" | "open";
export type TimelineSide = "left" | "right";

export type CareerTimelineItem = {
  details?: readonly string[];
  icon: IconType;
  id: string;
  highlights?: readonly string[];
  location?: string;
  organization?: string;
  period: string;
  side: TimelineSide;
  status: TimelineStatus;
  statusLabel?: string;
  summary: string;
  technologies: readonly string[];
  title: string;
  cta?: {
    href: string;
    label: string;
  };
};

export const careerTimelineItems: readonly CareerTimelineItem[] = [
  {
    id: "01",
    period: "jun de 2024 — dez de 2026 (previsão)",
    title: "Tecnologia em Sistemas para Internet",
    organization: "Estácio",
    status: "current",
    statusLabel: "Em andamento",
    side: "left",
    summary:
      "Formação voltada ao desenvolvimento e à evolução de software, com atuação e aprendizado em desenvolvimento Front-End, Back-End e Mobile, além de fundamentos de arquitetura de software, estruturas de dados, bancos de dados, computação em nuvem, CI/CD e metodologias ágeis.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "APIs REST",
      "SQL",
      "MySQL",
      "SQL Server",
      "Arquitetura de Software",
      "AWS",
      "Metodologias Ágeis",
    ],
    icon: LuGraduationCap,
  },
  {
    id: "02",
    period: "fev de 2024 — atual",
    title: "Desenvolvedor Full Stack Freelancer",
    organization: "Workana",
    location: "Remoto",
    status: "current",
    statusLabel: "Atual",
    side: "right",
    summary:
      "Atuação em projetos nacionais e internacionais, com foco predominante no Front-End de sites, sistemas e soluções digitais. Participação desde o levantamento de requisitos e planejamento técnico até desenvolvimento, integração, testes, deploy e manutenção.",
    details: [
      "Desenvolvimento com React.js, Next.js, TypeScript, Node.js e NestJS, além de experiências em diferentes projetos com WordPress, React Native e Expo, Java e Spring Boot e C#/.NET.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "APIs REST",
      "WordPress",
      "React Native",
      "Expo",
      "Jest",
      "Cypress",
      "Docker",
      "Vercel",
    ],
    icon: LuLaptopMinimalCheck,
  },
  {
    id: "03",
    period: "jun de 2025 — fev de 2026",
    title: "Desenvolvedor Full Stack e Mobile",
    organization: "Top Brasil Presentes",
    location: "João Pessoa, Paraíba",
    status: "completed",
    side: "left",
    summary:
      "Atuação na modernização do ecossistema digital da empresa, incluindo e-commerce B2B, plataforma de compras, site e aplicativo. Responsável principalmente pela evolução do Front-End e do aplicativo, além da participação na migração de serviços em Java e Spring Boot para Node.js e NestJS.",
    details: [
      "Desenvolvimento com React.js, Next.js, TypeScript, React Native e Expo, integração com APIs REST, autenticação, bancos de dados, serviços externos e APIs de pagamento.",
    ],
    highlights: [
      "redução de até 43% no tempo de carregamento das páginas principais;",
      "melhoria da estabilidade visual em mais de 15 telas;",
      "redução aproximada de 0,05 no CLS;",
      "contribuição técnica para um crescimento de 21% no faturamento digital em três meses;",
      "evolução do aplicativo multiplataforma para Android e iOS.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Java",
      "Spring Boot",
      "React Native",
      "Expo",
      "AsyncStorage",
      "PostgreSQL",
      "MongoDB",
      "SQL Server",
      "AWS",
      "Jest",
      "APIs REST",
    ],
    icon: LuShoppingBag,
  },
  {
    id: "04",
    period: "fev de 2026 — jul de 2026",
    title: "Desenvolvedor Front-end",
    organization: "Clou Business",
    location: "Luanda, Angola · Remoto",
    status: "completed",
    side: "right",
    summary:
      "Atuação em uma equipe internacional na construção de um CRM inteligente e de um sistema de faturação SaaS, desenvolvendo módulos de leads, atendimento, campanhas, relatórios, billing, dashboards, formulários e integrações.",
    details: [
      "Assumi a responsabilidade técnica pela reestruturação e conclusão do Front-End, apoiando a equipe com definição de padrões, distribuição e acompanhamento de tarefas, code review, controle de merges e organização das entregas.",
      "Implementação e manutenção de testes de componentes, integrações e fluxos, contribuindo para uma evolução mais segura do produto.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Query",
      "Zustand",
      "APIs REST",
      "NestJS",
      "Jest",
      "React Testing Library",
      "Cypress",
      "Git",
      "GitHub",
      "GitFlow",
      "Vercel",
    ],
    icon: LuUsersRound,
  },
  {
    id: "05",
    period: "Agora",
    title: "O próximo capítulo pode ser com sua equipe.",
    organization: "Disponível para uma nova oportunidade",
    status: "open",
    statusLabel: "Próximo capítulo",
    side: "left",
    summary:
      "Busco oportunidades 100% remotas no Brasil como Desenvolvedor Full Stack, Front-End React/Next.js ou Mobile React Native, contribuindo com experiência em produtos SaaS, CRM, e-commerce, APIs e aplicações web e mobile.",
    details: [
      "Disponibilidade imediata para contratação CLT ou PJ, com foco em React.js, Next.js, TypeScript, Node.js, NestJS e React Native.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "React Native",
      "APIs REST",
      "Java",
      "Spring Boot",
      "JavaScript",
    ],
    cta: {
      href: "#contato",
      label: "Vamos conversar",
    },
    icon: LuRadar,
  },
];
