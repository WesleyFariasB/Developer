"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import AOS from "aos";
import FloatingAssistant from "@/components/FloatingAssistant";

type NavLink = {
  label: string;
  href: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  visual: ProjectImage;
};

type ProjectImage = {
  alt: string;
  src: string;
};

type Project = {
  tag: string;
  title: string;
  description: string;
  href: string;
  images: ProjectImage[];
};

const imagePath = (fileName: string) => `/images/${fileName}`;

const navLinks: NavLink[] = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Stack", href: "#stack" },
];

const services: Service[] = [
  {
    id: "01",
    title: "Arquitetura Front-end com React.js e Next.js",
    description:
      "Planejamento e implementação de interfaces modernas com componentização, design system, SSR e SSG no App Router para melhorar performance, UX e SEO técnico.",
    visual: {
      alt: "Interface web para arquitetura front-end com React e Next.js",
      src: imagePath("arquitetura_frontend.png"),
    },
  },
  {
    id: "02",
    title: "Back-end escalável com Node.js e NestJS",
    description:
      "Desenvolvimento de APIs REST com arquitetura modular, validação, organização por domínio e foco em manutenção para sustentar aplicações de médio e grande porte.",
    visual: {
      alt: "Arquitetura back-end com Node.js e NestJS",
      src: imagePath("backend_node_nestjs.png"),
    },
  },
  {
    id: "03",
    title: "Autenticação e integração com bancos de dados",
    description:
      "Implementação de autenticação segura, controle de acesso e integração com bancos de dados relacionais e não relacionais, mantendo consistência e boa observabilidade.",
    visual: {
      alt: "Autenticação segura integrada com bancos de dados",
      src: imagePath("autenticação_bancodedados.png"),
    },
  },
  {
    id: "04",
    title: "SEO técnico e performance web",
    description:
      "Otimização de Core Web Vitals, metadata SEO, renderização híbrida e carregamento inteligente de assets para melhorar descoberta orgânica e velocidade real de navegação.",
    visual: {
      alt: "SEO técnico e performance para aplicações web",
      src: imagePath("seotecnico_perfomance.png"),
    },
  },
];

const projectShowcase: Project[] = [
  {
    tag: "Landing Page",
    title: "Paula Corrêa",
    description: "Landing page profissional com foco em posicionamento, confiança e conversão.",
    href: "#",
    images: [
      { alt: "Paula Corrêa - visão principal", src: imagePath("mockup1.png") },
      { alt: "Paula Corrêa - seção 1", src: imagePath("projeto1.png") },
      { alt: "Paula Corrêa - seção 2", src: imagePath("projeto2.png") },
      { alt: "Paula Corrêa - seção 3", src: imagePath("projeto3.png") },
      { alt: "Paula Corrêa - seção 4", src: imagePath("projeto4.png") },
      { alt: "Paula Corrêa - seção 5", src: imagePath("projeto5.png") },
    ],
  },
  {
    tag: "E-commerce",
    title: "Top Brasil Presentes",
    description: "Experiência comercial responsiva para apresentação de produtos e navegação clara.",
    href: "#",
    images: [
      { alt: "Top Brasil Presentes - visão principal", src: imagePath("mockup2.png") },
      { alt: "Top Brasil Presentes - seção 1", src: imagePath("projeto31.png") },
      { alt: "Top Brasil Presentes - seção 2", src: imagePath("projeto32.png") },
      { alt: "Top Brasil Presentes - seção 3", src: imagePath("projeto33.png") },
    ],
  },
  {
    tag: "Automação IA",
    title: "Inteligência que conecta",
    description: "Soluções personalizadas para automarizar processos, econimizar tempo e impulsionar resultados.",
    href: "#",
    images: [
      {
        alt: "Automacao IA - visao principal",
        src: imagePath("IA_Principal.png"),
      },
      { alt: "Automacao IA - tela 1", src: imagePath("IA_2.png") },
      { alt: "Automacao IA - tela 2", src: imagePath("IA_3.png") },
    ],
  },
  {
    tag: "Portfólio Profissional",
    title: "Donkere",
    description: "Portfólio visual para marca criativa com narrativa, impacto e apresentação de serviços.",
    href: "#",
    images: [
      { alt: "Donkere - visão principal", src: imagePath("mockup4.png") },
      { alt: "Donkere - seção 1", src: imagePath("projeto10.png") },
      { alt: "Donkere - seção 2", src: imagePath("projeto11.png") },
      { alt: "Donkere - seção 3", src: imagePath("projeto12.png") },
    ],
  },
  {
    tag: "Sistema",
    title: "Software de gestão empresarial",
    description: "Centraliza e integra todos os dados, processos e setores de uma empresa em uma única plataforma, automatizando rotinas e facilitando a tomada de decisões.",
    href: "#",
    images: [
      {
        alt: "Software de gestao empresarial - visao principal",
        src: imagePath("Software-Wesley.png"),
      },
      { alt: "Software de gestao empresarial - tela 1", src: imagePath("s1.png") },
      { alt: "Software de gestao empresarial - tela 2", src: imagePath("s2.png") },
      { alt: "Software de gestao empresarial - tela 3", src: imagePath("s3.png") },
      { alt: "Software de gestao empresarial - tela 4", src: imagePath("s4.png") },
      { alt: "Software de gestao empresarial - tela 5", src: imagePath("s5.png") },
      { alt: "Software de gestao empresarial - tela 6", src: imagePath("s6.png") },
      { alt: "Software de gestao empresarial - tela 7", src: imagePath("s7.png") },
      { alt: "Software de gestao empresarial - tela 8", src: imagePath("s8.png") },
    ],
  },
  {
    tag: "Blog",
    title: "Amalfis",
    description: "Blog institucional com hierarquia visual, leitura fluida e estrutura preparada para conteúdo.",
    href: "#",
    images: [
      { alt: "Amalfis - visão principal", src: imagePath("mockup3.png") },
      { alt: "Amalfis - seção 1", src: imagePath("projeto21.png") },
      { alt: "Amalfis - seção 2", src: imagePath("projeto22.png") },
      { alt: "Amalfis - seção 3", src: imagePath("projeto23.png") },
      { alt: "Amalfis - seção 4", src: imagePath("Projeto24.png") },
    ],
  },
];

const projectLoopCopies = 3;
const projectDragThreshold = 8;
const serviceAutoAdvanceDuration = 5200;

const projectMarqueeRows = [
  [0, 1, 2],
  [3, 4, 5],
].map((row) =>
  row.map((projectIndex) => ({
    project: projectShowcase[projectIndex],
    projectIndex,
  })),
);

const stackTags = [
  "React.js",
  "Next.js (App Router)",
  "TypeScript",
  "Node.js",
  "NestJS",
  "APIs REST",
  "Arquitetura modular",
  "Backend escalável",
  "Autenticação",
  "Integração com bancos de dados",
  "Performance web",
  "SEO técnico",
  "SSR e SSG",
  "Core Web Vitals",
  "Git e GitHub",
];

const approvalAvatars: ProjectImage[] = [
  { alt: "Cliente que aprovou o trabalho", src: imagePath("avatar-client-1.jpg") },
  { alt: "Cliente que aprovou o trabalho", src: imagePath("avatar-client-2.jpg") },
  { alt: "Cliente que aprovou o trabalho", src: imagePath("avatar-client-3.jpg") },
];

const aboutMetrics = [
  { value: 3, suffix: "+", label: "Anos de experiência" },
  { value: 20, suffix: "+", label: "Projetos entregues" },
  { value: 10, suffix: "+", label: "Clientes atendidos" },
  { value: 100, suffix: "%", label: "Comprometido com resultados" },
];

const specialtyCards = [
  {
    title: "Desenvolvimento",
    text: "Sites, plataformas e aplicações com interfaces modernas e experiências eficientes.",
  },
  {
    title: "Back-end e APIs",
    text: "APIs completas, integrações e sistemas escaláveis com foco em performance.",
  },
  {
    title: "Produto completo",
    text: "Da arquitetura ao deploy, entregando soluções digitais de ponta a ponta.",
  },
];

const criticalImageSources = Array.from(
  new Set([
    imagePath("about.png"),
    ...approvalAvatars.map((avatar) => avatar.src),
    ...services.map((service) => service.visual.src),
    ...projectShowcase.map((project) => project.images[0].src),
  ]),
);

function SiteSkeleton() {
  return (
    <div
      className="fixed inset-0 z-[80] bg-white"
      aria-hidden="true"
    >
      <div className="page-shell py-8">
        <div className="flex items-center justify-between">
          <div className="skeleton-shimmer h-8 w-8 rounded-full" />
          <div className="hidden gap-4 md:flex">
            <div className="skeleton-shimmer h-3 w-16 rounded-full" />
            <div className="skeleton-shimmer h-3 w-16 rounded-full" />
            <div className="skeleton-shimmer h-3 w-16 rounded-full" />
          </div>
          <div className="skeleton-shimmer h-3 w-24 rounded-full" />
        </div>

        <div className="grid min-h-[72vh] items-center gap-10 pt-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="skeleton-shimmer h-3 w-24 rounded-full" />
              <div className="flex -space-x-2">
                <div className="skeleton-shimmer h-7 w-7 rounded-full border-2 border-white" />
                <div className="skeleton-shimmer h-7 w-7 rounded-full border-2 border-white" />
                <div className="skeleton-shimmer h-7 w-7 rounded-full border-2 border-white" />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="skeleton-shimmer h-14 w-full max-w-2xl rounded-2xl" />
              <div className="skeleton-shimmer h-14 w-full max-w-xl rounded-2xl" />
              <div className="skeleton-shimmer h-5 w-full max-w-2xl rounded-full" />
              <div className="skeleton-shimmer h-5 w-4/5 max-w-xl rounded-full" />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="skeleton-shimmer h-10 w-40 rounded-full" />
              <div className="skeleton-shimmer h-9 w-9 rounded-full" />
              <div className="skeleton-shimmer h-9 w-9 rounded-full" />
              <div className="skeleton-shimmer h-9 w-9 rounded-full" />
            </div>
          </div>

          <div className="relative hidden min-h-[460px] lg:block">
            <div className="skeleton-shimmer absolute right-[-8vw] top-0 h-[520px] w-[640px] rounded-[54px]" />
            <div className="skeleton-shimmer absolute right-[6vw] top-28 h-32 w-56 rounded-[28px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [isServicesInView, setIsServicesInView] = useState(false);
  const [serviceProgressKey, setServiceProgressKey] = useState(0);
  const [metricValues, setMetricValues] = useState(() => aboutMetrics.map(() => 0));
  const [isLoading, setIsLoading] = useState(true);
  const projectTrackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectLoopWidthsRef = useRef<number[]>([]);
  const projectOffsetsRef = useRef<number[]>([0, 0]);
  const projectDirectionRef = useRef(1);
  const projectHoveringRef = useRef(false);
  const projectPausedRef = useRef(false);
  const projectResumeTimeoutRef = useRef<number | null>(null);
  const projectPointerRef = useRef<{
    lastX: number;
    moved: boolean;
    pointerId: number;
    projectIndex: number | null;
    rowIndex: number;
    startX: number;
  } | null>(null);
  const projectDragMovedRef = useRef(false);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const metricsStartedRef = useRef(false);

  const activeProject = useMemo(
    () =>
      activeProjectIndex !== null ? projectShowcase[activeProjectIndex] : null,
    [activeProjectIndex],
  );

  useEffect(() => {
    AOS.init({ once: false, mirror: true, duration: 900, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const minimumLoadingTime = new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    const imagePreloads = criticalImageSources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = src;
        }),
    );

    Promise.all([minimumLoadingTime, Promise.all(imagePreloads)]).then(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const renderProjectTracks = useCallback(() => {
    projectTrackRefs.current.forEach((track, index) => {
      if (!track) return;

      const loopWidth = projectLoopWidthsRef.current[index] || track.scrollWidth / projectLoopCopies;
      if (!loopWidth) return;

      const offset = ((projectOffsetsRef.current[index] % loopWidth) + loopWidth) % loopWidth;
      const x = index === 0 ? -offset : -loopWidth + offset;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    });
  }, []);

  const pauseProjectMotion = useCallback((resumeDelay = 0) => {
    if (projectResumeTimeoutRef.current) {
      window.clearTimeout(projectResumeTimeoutRef.current);
      projectResumeTimeoutRef.current = null;
    }

    projectPausedRef.current = true;

    if (resumeDelay > 0) {
      projectResumeTimeoutRef.current = window.setTimeout(() => {
        if (!projectHoveringRef.current && !projectPointerRef.current) {
          projectPausedRef.current = false;
        }
        projectResumeTimeoutRef.current = null;
      }, resumeDelay);
    }
  }, []);

  const resumeProjectMotion = useCallback(() => {
    if (projectPointerRef.current) return;

    if (projectResumeTimeoutRef.current) {
      window.clearTimeout(projectResumeTimeoutRef.current);
      projectResumeTimeoutRef.current = null;
    }

    projectPausedRef.current = false;
  }, []);

  const nudgeProjectRows = useCallback(
    (direction: number) => {
      pauseProjectMotion(900);
      projectOffsetsRef.current = projectOffsetsRef.current.map(
        (offset) => offset + direction * 420,
      );
      renderProjectTracks();
    },
    [pauseProjectMotion, renderProjectTracks],
  );

  const openProjectModal = useCallback((projectIndex: number) => {
    if (!projectShowcase[projectIndex]) return;

    setActiveImageIndex(0);
    setActiveProjectIndex(projectIndex);
  }, []);

  const handleProjectPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, rowIndex: number) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const target = event.target;
      const projectButton =
        target instanceof Element
          ? target.closest<HTMLButtonElement>("[data-project-index]")
          : null;
      const nextProjectIndex =
        projectButton?.dataset.projectIndex !== undefined
          ? Number(projectButton.dataset.projectIndex)
          : null;

      pauseProjectMotion();
      projectDragMovedRef.current = false;
      projectPointerRef.current = {
        lastX: event.clientX,
        moved: false,
        pointerId: event.pointerId,
        projectIndex: Number.isInteger(nextProjectIndex) ? nextProjectIndex : null,
        rowIndex,
        startX: event.clientX,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pauseProjectMotion],
  );

  const handleProjectPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const pointer = projectPointerRef.current;
      if (!pointer || pointer.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - pointer.lastX;
      const totalX = event.clientX - pointer.startX;
      if (Math.abs(totalX) > projectDragThreshold) {
        pointer.moved = true;
        projectDragMovedRef.current = true;
        event.preventDefault();
      }

      if (deltaX !== 0) {
        const dragDirection = pointer.rowIndex === 0 ? -1 : 1;
        projectOffsetsRef.current[pointer.rowIndex] += deltaX * dragDirection;
        pointer.lastX = event.clientX;
        renderProjectTracks();
      }
    },
    [renderProjectTracks],
  );

  const finishProjectPointer = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const pointer = projectPointerRef.current;
      if (!pointer || pointer.pointerId !== event.pointerId) return;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const shouldOpenProject =
        event.type === "pointerup" && !pointer.moved && pointer.projectIndex !== null;

      projectPointerRef.current = null;
      pauseProjectMotion(900);

      if (pointer.moved) {
        window.setTimeout(() => {
          projectDragMovedRef.current = false;
        }, 120);
      } else {
        projectDragMovedRef.current = false;
      }

      if (shouldOpenProject && pointer.projectIndex !== null) {
        openProjectModal(pointer.projectIndex);
      }
    },
    [openProjectModal, pauseProjectMotion],
  );

  const handleProjectClick = useCallback(
    (event: ReactMouseEvent<HTMLButtonElement>, projectIndex: number) => {
      if (projectDragMovedRef.current) {
        event.preventDefault();
        return;
      }

      openProjectModal(projectIndex);
    },
    [openProjectModal],
  );

  const selectService = useCallback((index: number) => {
    setActiveServiceIndex(index);
    setServiceProgressKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tracks = projectTrackRefs.current.filter(Boolean) as HTMLDivElement[];

    if (tracks.length === 0) {
      return undefined;
    }

    let frame = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let scrollFrame = 0;

    const measureTracks = () => {
      projectTrackRefs.current.forEach((track, index) => {
        if (track) {
          projectLoopWidthsRef.current[index] = track.scrollWidth / projectLoopCopies;
        }
      });
    };

    const animateTracks = (time: number) => {
      const deltaTime = Math.min(time - lastTime, 48);
      lastTime = time;

      if (!projectPausedRef.current) {
        const autoDistance = deltaTime * 0.05 * projectDirectionRef.current;
        projectOffsetsRef.current = projectOffsetsRef.current.map(
          (offset) => offset + autoDistance,
        );
        renderProjectTracks();
      }

      frame = window.requestAnimationFrame(animateTracks);
    };

    const handleScroll = () => {
      if (scrollFrame) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY;

        if (deltaY !== 0) {
          projectDirectionRef.current = deltaY > 0 ? 1 : -1;
          const scrollDistance = Math.abs(deltaY) * 0.34 * projectDirectionRef.current;
          projectOffsetsRef.current = projectOffsetsRef.current.map(
            (offset) => offset + scrollDistance,
          );
          renderProjectTracks();
          lastScrollY = currentScrollY;
        }
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      measureTracks();
      renderProjectTracks();
    });

    tracks.forEach((track) => resizeObserver.observe(track));
    measureTracks();
    renderProjectTracks();

    if (!reducedMotion) {
      frame = window.requestAnimationFrame(animateTracks);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (projectResumeTimeoutRef.current) {
        window.clearTimeout(projectResumeTimeoutRef.current);
        projectResumeTimeoutRef.current = null;
      }
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [renderProjectTracks]);

  useEffect(() => {
    const section = servicesSectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsServicesInView(isVisible);

        if (isVisible) {
          setActiveServiceIndex(0);
          setServiceProgressKey((key) => key + 1);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isServicesInView) return undefined;

    const timeout = window.setTimeout(() => {
      setActiveServiceIndex((index) => (index + 1) % services.length);
      setServiceProgressKey((key) => key + 1);
    }, serviceAutoAdvanceDuration);

    return () => window.clearTimeout(timeout);
  }, [activeServiceIndex, isServicesInView, serviceProgressKey]);

  useEffect(() => {
    const section = aboutSectionRef.current;
    if (!section) return undefined;

    const animateMetrics = () => {
      if (metricsStartedRef.current) return;
      metricsStartedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setMetricValues(aboutMetrics.map((metric) => metric.value));
        return;
      }

      const duration = 2600;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setMetricValues(aboutMetrics.map((metric) => Math.round(metric.value * eased)));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animateMetrics();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => {
    setActiveProjectIndex(null);
    setActiveImageIndex(0);
  }, []);

  const showPrevious = useCallback(() => {
    if (!activeProject) {
      return;
    }
    setActiveImageIndex(
      (prevIndex) => (prevIndex - 1 + activeProject.images.length) % activeProject.images.length,
    );
  }, [activeProject]);

  const showNext = useCallback(() => {
    if (!activeProject) {
      return;
    }
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % activeProject.images.length);
  }, [activeProject]);

  useEffect(() => {
    if (activeProject === null) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, closeModal, showNext, showPrevious]);

  return (
    <>
    {isLoading && <SiteSkeleton />}

    <div
      className={`min-h-screen bg-white text-ink transition-opacity duration-500 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
      aria-busy={isLoading}
    >
      <a
        href="#conteudo"
        className="sr-only absolute left-4 top-4 z-[60] rounded-md bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>

      <header
        className="page-shell flex items-center justify-between pt-8 text-sm font-medium"
        data-aos="fade-down"
      >
        <div className="flex items-center gap-2">
          <span className="brand-mark brand-mark--site">
            W
          </span>
        </div>

        <nav className="hidden gap-6 text-sm text-ink/80 md:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md outline-none transition-all duration-200 hover:text-ink hover:underline hover:underline-offset-8 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto%20web"
          target="_blank"
          rel="noreferrer"
          className="rounded-md text-sm font-semibold underline underline-offset-8 outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
        >
          Fale comigo
        </a>
      </header>

      <main id="conteudo">
        <section
          id="projetos"
          className="page-shell relative isolate pb-20 pt-24 md:pt-32"
          data-aos="fade-in"
        >
          <div className="hero-tech-shell" aria-hidden="true">
            <div className="hero-tech">
              <div className="hero-tech__halo" />
              <div className="hero-tech__orb hero-tech__orb--primary" />
              <div className="hero-tech__orb hero-tech__orb--secondary" />
              <div className="hero-tech__ring hero-tech__ring--one" />
              <div className="hero-tech__ring hero-tech__ring--two" />
              <div className="hero-tech__ring hero-tech__ring--three" />
              <div className="hero-tech__panel hero-tech__panel--one">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-tech__panel hero-tech__panel--two">
                <span />
                <span />
              </div>
              <div className="hero-tech__node hero-tech__node--one" />
              <div className="hero-tech__node hero-tech__node--two" />
              <div className="hero-tech__node hero-tech__node--three" />
              <div className="hero-tech__node hero-tech__node--four" />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
                <span className="font-semibold tracking-[0.3em] text-[#d3a52f]">★★★★★</span>
                <div className="flex -space-x-2" aria-label="Pessoas que aprovaram o trabalho">
                  {approvalAvatars.map((avatar, index) => (
                    <span
                      key={avatar.src}
                      className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-mist shadow-sm"
                    >
                      <Image
                        src={avatar.src}
                        alt={`${avatar.alt} ${index + 1}`}
                        fill
                        sizes="28px"
                        className="object-cover"
                        quality={100}
                      />
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-semibold">
                  Projetos desenvolvidos para negócios em todo o Brasil.
                </span>
              </div>

              <div className="mt-8 max-w-[900px]">
                <h1 className="text-[2.25rem] font-bold leading-[1.12] tracking-[-0.02em] text-ink sm:text-5xl sm:leading-[1.04] md:text-6xl md:leading-[1.02] xl:text-[3rem]">
                  Transformo ideias em sites, sistemas e aplicativos de alta performance.
                </h1>
                <p className="mt-5 text-base leading-relaxed text-graphite md:text-lg">
                  Desenvolvo produtos digitais completos, conectando design, experiência do usuário, regras de negócio, APIs e bancos de dados. Cada solução é construída para oferecer estabilidade, facilidade de uso e estrutura preparada para novos recursos.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1%2C%20tenho%20interesse%20em%20desenvolver%20um%20projeto"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-ink px-6 py-2 text-sm font-semibold text-white outline-none transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                  >
                    Solicitar orçamento
                  </a>

                  <div className="flex items-center gap-3 text-ink">
                    <a
                      href="https://www.linkedin.com/in/wesleyfariasbe/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/30 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5H4.5v15H.5v-15zm7 0h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4.1 0 4.9 2.6 4.9 6v9H16v-8c0-1.9 0-4.3-2.7-4.3-2.7 0-3.1 2.1-3.1 4.1v8.2H7.5v-15z" />
                      </svg>
                    </a>

                    <a
                      href="https://www.instagram.com/visualswf/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/30 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
                        <path d="M20.4 6.2a5 5 0 0 0-2.8-2.8C16.4 3 15 3 12 3s-4.4 0-5.6.4a5 5 0 0 0-2.8 2.8C3 7.4 3 8.8 3 12s0 4.6.4 5.8a5 5 0 0 0 2.8 2.8C7.4 21 8.8 21 12 21s4.6 0 5.8-.4a5 5 0 0 0 2.8-2.8C21 16.6 21 15.2 21 12s0-4.6-.4-5.8zM19.3 18a3.3 3.3 0 0 1-1.8 1.8c-.8.3-2 .3-5.5.3s-4.7 0-5.5-.3A3.3 3.3 0 0 1 4.7 18c-.3-.8-.3-2-.3-5.5s0-4.7.3-5.5a3.3 3.3 0 0 1 1.8-1.8c.8-.3 2-.3 5.5-.3s4.7 0 5.5.3a3.3 3.3 0 0 1 1.8 1.8c.3.8.3 2 .3 5.5s0 4.7-.3 5.5z" />
                      </svg>
                    </a>

                    <a
                      href="https://github.com/WesleyFariasB"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/30 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                        <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.4 2.9 8.1 6.9 9.4.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7-.8 2-1.2.1-.8.4-1.2.7-1.5-2.2-.2-4.5-1.1-4.5-5.1 0-1.1.4-2.1 1.1-2.8-.1-.2-.5-1.3.1-2.6 0 0 .9-.3 2.9 1.1a9.9 9.9 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.3.2 2.4.1 2.6.7.7 1.1 1.7 1.1 2.8 0 4-2.3 4.9-4.5 5.1.4.4.8 1 .8 2.1v3.2c0 .3.2.6.7.5 4-1.3 6.9-5 6.9-9.4C22 6.6 17.5 2 12 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden min-h-[520px] lg:block" aria-hidden="true" />
          </div>

          <div className="mt-24 flex items-center justify-between text-sm text-ink/70">
            <span>(Projetos em destaque)</span>
          </div>

          <div
            className="project-marquee-shell mt-5"
            onMouseEnter={() => {
              projectHoveringRef.current = true;
              pauseProjectMotion();
            }}
            onMouseLeave={() => {
              projectHoveringRef.current = false;
              resumeProjectMotion();
            }}
            onPointerEnter={() => {
              projectHoveringRef.current = true;
              pauseProjectMotion();
            }}
            onPointerLeave={() => {
              projectHoveringRef.current = false;
              resumeProjectMotion();
            }}
            onFocus={() => {
              projectHoveringRef.current = true;
              pauseProjectMotion();
            }}
            onBlur={(event) => {
              const nextTarget = event.relatedTarget;
              if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                projectHoveringRef.current = false;
                pauseProjectMotion(900);
              }
            }}
          >
            <button
              type="button"
              onClick={() => nudgeProjectRows(-1)}
              className="project-marquee__control project-marquee__control--prev"
              aria-label="Voltar projetos"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => nudgeProjectRows(1)}
              className="project-marquee__control project-marquee__control--next"
              aria-label="Avançar projetos"
            >
              &rarr;
            </button>

            <div className="space-y-5">
              {projectMarqueeRows.map((row, rowIndex) => (
                <div
                  key={`project-marquee-${rowIndex}`}
                  className="project-marquee"
                  aria-label={`Linha ${rowIndex + 1} de projetos em destaque`}
                  onPointerDown={(event) => handleProjectPointerDown(event, rowIndex)}
                  onPointerMove={handleProjectPointerMove}
                  onPointerUp={finishProjectPointer}
                  onPointerCancel={finishProjectPointer}
                  onPointerLeave={(event) => {
                    if (projectPointerRef.current?.pointerId === event.pointerId) {
                      finishProjectPointer(event);
                    }
                  }}
              >
                  <div
                    ref={(node) => {
                      projectTrackRefs.current[rowIndex] = node;
                    }}
                    className="project-marquee__track"
                  >
                    {Array.from({ length: projectLoopCopies }).flatMap((_, copyIndex) =>
                      row.map(({ project, projectIndex }) => (
                        <button
                          key={`${rowIndex}-${copyIndex}-${projectIndex}-${project.title}`}
                          type="button"
                          data-project-index={projectIndex}
                          onClick={(event) => handleProjectClick(event, projectIndex)}
                          className="project-marquee__item group rounded-3xl text-left outline-none transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                          aria-label={`Abrir projeto ${project.title}`}
                        >
                          <article className="relative overflow-hidden rounded-3xl bg-white transition-all duration-300 group-hover:shadow-card">
                            <span className="absolute left-4 top-4 z-10 inline-flex translate-y-2 rounded-full border border-ink/10 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/70 opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                              {project.tag}
                            </span>
                            <div className="relative h-80 w-full md:h-[26rem] xl:h-[24rem]">
                              <Image
                                src={project.images[0].src}
                                alt={project.images[0].alt}
                                fill
                                sizes="(max-width: 768px) 82vw, 31vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                quality={100}
                                priority={rowIndex === 0 && copyIndex === 0 && projectIndex < 2}
                              />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-ink/80 via-ink/45 to-transparent p-5 pt-16 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                              <h3 className="text-lg font-bold">{project.title}</h3>
                              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                                {project.description}
                              </p>
                              <span className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.18em]">
                                Ver projeto
                              </span>
                            </div>
                          </article>
                        </button>
                      )),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="servicos"
          ref={servicesSectionRef}
          className="page-shell border-t border-fog py-16"
        >
          <div className="text-sm text-ink/70">
            (Como posso ajudar?)
          </div>

          <div className="mt-4 grid items-stretch gap-10 lg:grid-cols-2">
            <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-fog md:min-h-[480px] lg:h-full lg:min-h-0">
              {services.map((service, index) => {
                const isActive = activeServiceIndex === index;

                return (
                  <Image
                    key={service.visual.src}
                    src={service.visual.src}
                    alt={isActive ? service.visual.alt : ""}
                    aria-hidden={!isActive}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={`solution-image object-cover transition-[opacity,transform] duration-500 ease-out ${
                      isActive ? "scale-100 opacity-100" : "scale-[1.015] opacity-0"
                    }`}
                    quality={100}
                    loading={index === 0 ? undefined : "lazy"}
                    priority={index === 0}
                  />
                );
              })}
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
                Soluções digitais completas para marcas que precisam de performance, escala e
                consistência técnica.
              </h2>

              <div>
                {services.map((service, index) => {
                  const isActive = activeServiceIndex === index;
                  const shouldAnimateProgress = isActive && isServicesInView;

                  return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => selectService(index)}
                    className={`grid w-full grid-cols-[48px_1fr] gap-1 py-8 text-left outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#2563eb]/30 focus-visible:ring-offset-4 ${
                      index === services.length - 1 ? "" : "border-b border-fog"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div
                      className={`text-sm font-semibold transition-colors duration-200 ${
                        isActive ? "text-[#2563eb]" : "text-ink/60"
                      }`}
                    >
                      {service.id}
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
                          isActive ? "text-[#2563eb]" : "text-ink/80"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">{service.description}</p>
                      <div
                        key={`${service.id}-${shouldAnimateProgress ? serviceProgressKey : "idle"}`}
                        className={`service-progress ${
                          shouldAnimateProgress ? "service-progress--active" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <span className="service-progress__fill" />
                        <span className="service-progress__dot" />
                      </div>
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          ref={aboutSectionRef}
          className="page-shell border-t border-fog py-20"
          data-aos="fade-up"
        >
          <div className="overflow-hidden rounded-[28px] bg-mist p-5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.1fr_1.18fr] lg:items-center">
              <div className="relative mx-auto min-h-[420px] w-full max-w-[320px] overflow-hidden rounded-[18px] bg-white shadow-card lg:-my-12">
                <Image
                  src={imagePath("about.png")}
                  alt="Retrato de Wesley Farias"
                  fill
                  sizes="(max-width: 1024px) 80vw, 24vw"
                  className="object-cover"
                  quality={95}
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563eb]">Sobre</p>
                <h2 className="mt-3 max-w-xl text-2xl font-bold leading-tight tracking-[-0.01em] md:text-4xl">
                  Transformo ideias em produtos digitais funcionais e escaláveis.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-graphite md:text-base">
                  Atuo com React.js, Next.js, TypeScript, Node.js e NestJS na construção de interfaces,
                  APIs e sistemas completos. Tenho experiência em todas as etapas do desenvolvimento,
                  da arquitetura à entrega, com foco em código organizado, qualidade técnica e
                  escalabilidade.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                  {aboutMetrics.map((metric, index) => (
                    <div key={metric.label}>
                      <div className="text-2xl font-bold text-ink md:text-3xl">
                        {metricValues[index]}
                        {metric.suffix}
                      </div>
                      <p className="mt-1 text-xs leading-snug text-graphite">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">Minhas especialidades</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
                  {specialtyCards.map((card, index) => (
                    <article key={card.title} className="rounded-2xl bg-white p-5 shadow-card">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-xs font-bold text-[#2563eb]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h4 className="mt-4 text-sm font-bold text-ink">{card.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">{card.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white pt-6 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-3xl font-bold tracking-[-0.02em] text-ink md:text-4xl">
                <span className="font-bold">Wesley Farias</span>{" "}
                <span className="font-normal">|</span>{" "}
                <span className="font-bold">Engenheiro de Software</span>
              </h3>
              <a
                href="#projetos"
                className="inline-flex self-start rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white outline-none transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
              >
                Ver projetos →
              </a>
            </div>
          </div>
        </section>

        <section id="stack" className="page-shell border-t border-fog py-12">
          <div className="text-sm text-ink/70">(Stack e Especialidades)</div>

          <div className="marquee mt-6 rounded-[28px] bg-white py-4">
            <div className="marquee__track">
              {[...stackTags, ...stackTags].map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="mx-5 inline-flex items-center rounded-full border border-ink/10 bg-mist px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/20 hover:bg-white hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-fog">
        <div className="page-shell flex flex-col items-start justify-between gap-4 py-10 text-sm text-ink/70 sm:flex-row sm:items-center">
          <span>{new Date().getFullYear()} © Wesley Farias</span>
          <a
            href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto"
            className="rounded-md underline underline-offset-4 outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
          >
            Contato
          </a>
        </div>
      </footer>

      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-6 py-10">
          <div
            className="relative w-full max-w-4xl rounded-[32px] bg-white p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Galeria do projeto ${activeProject.title}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{activeProject.tag}</p>
                <h3 className="text-lg font-semibold">{activeProject.title}</h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                aria-label="Fechar galeria"
              >
                Fechar
              </button>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-3xl">
              <Image
                src={activeProject.images[activeImageIndex].src}
                alt={activeProject.images[activeImageIndex].alt}
                width={1600}
                height={900}
                sizes="90vw"
                className="max-h-[72vh] w-full object-contain"
                quality={100}
              />

              {activeProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-ink shadow-card outline-none transition-all duration-200 hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                    aria-label="Imagem anterior"
                  >
                    &larr;
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-ink shadow-card outline-none transition-all duration-200 hover:bg-white hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                    aria-label="Proxima imagem"
                  >
                    &rarr;
                  </button>
                </>
              )}
            </div>

            {activeProject.images.length > 1 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Imagens do projeto">
                {activeProject.images.map((image, index) => {
                  const isSelected = activeImageIndex === index;

                  return (
                    <button
                      key={`${activeProject.title}-${image.src}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-16 w-24 flex-none overflow-hidden rounded-xl border outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-2 ${
                        isSelected
                          ? "border-ink opacity-100"
                          : "border-ink/10 opacity-70 hover:border-ink/30 hover:opacity-100"
                      }`}
                      aria-label={`Abrir imagem ${index + 1} de ${activeProject.title}`}
                      aria-pressed={isSelected}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                        quality={75}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
              <span>
                {activeImageIndex + 1} / {activeProject.images.length}
              </span>
              <span>Use ESC para fechar</span>
            </div>
          </div>
        </div>
      )}

      <FloatingAssistant />
    </div>
    </>
  );
}
