import React from "react";
import AOS from "aos";

const navLinks = [
  { label: "Projetos", href: "#latest-drops" },
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
];

const services = [
  {
    id: "01",
    title: "LANDING PAGE",
    description:
      "Desenvolvo landing pages focadas em conversão, com estrutura estratégica, design claro e mensagens que conduzem o usuário à ação. Arquitetura de conteúdo, hierarquia visual, performance e integrações com ferramentas de marketing trabalham juntas para transformar tráfego em resultados reais.",
  },
  {
    id: "02",
    title: "BLOG",
    description:
      "Faço blogs pensados para autoridade, SEO e crescimento orgânico. Estrutura editorial, performance técnica, escaneabilidade e experiência de leitura se unem para aumentar visibilidade, retenção e relevância ao longo do tempo.",
  },
  {
    id: "03",
    title: "E-COMMERCE",
    description:
      "Construo e-commerces orientados à performance, usabilidade e escala. Arquitetura de produto, fluxo de compra, otimização de conversão e integrações essenciais garantem experiências de compra eficientes e sustentáveis para o negócio.",
  },
  {
    id: "04",
    title: "PORTFÓLIO PROFISSIONAL",
    description:
      "Crio portfólios profissionais que comunicam valor com clareza e impacto. Estrutura narrativa, design estratégico e performance trabalham juntos para apresentar projetos, fortalecer posicionamento e gerar novas oportunidades.",
  },
  {
    id: "05",
    title: "Design & Social Media",
    description:
      "Criação de identidades visuais e narrativas digitais que elevam a percepção de marca. Design estratégico, edição dinâmica e presença constante trabalham juntos para conectar o seu negócio ao público certo, construir autoridade e transformar seguidores em clientes fiéis.",
  },
];

const projectShowcase = [
  {
    tag: "Landing Page",
    title: "Paula Corrêa",
    images: [
       {
        alt: "Paula Corrêa - principal",
        src: "images/mockup1.png",
      },
      {
        alt: "Paula Corrêa",
        src: "images/projeto1.png",
      },
      {
        alt: "Paula Corrêa",
        src: "images/projeto2.png",
      },
      {
        alt: "Paula Corrêa",
        src: "images/projeto3.png",
      },
      {
        alt: "Paula Corrêa",
        src: "images/projeto4.png",
      },
      {
        alt: "Paula Corrêa",
        src: "images/projeto5.png",
      },
    ],
  },
  {
    tag: "E-Commerce",
    title: "Top Brasil Presentes",
    images: [
      {
        alt: "Top Brasil Presentes",
        src: "images/mockup2.png",
      },
      {
        alt: "Top Brasil Presentes",
        src: "images/projeto31.png",
      },
      {
        alt: "Top Brasil Presentes",
        src: "images/projeto32.png",
      },
      {
        alt: "Top Brasil Presentes",
        src: "images/projeto33.png",
      },
    ],
  },
  {
    tag: "Blog",
    title: "Amalfis",
    images: [
       {
        alt: "Amalfis",
        src: "images/mockup3.png",
      },
      {
        alt: "Amalfis",
        src: "images/projeto21.png",
      },
      {
        alt: "Amalfis",
        src: "images/projeto22.png",
      },
      {
        alt: "Amalfis",
        src: "images/projeto23.png",
      },
      {
        alt: "Amalfis",
        src: "images/Projeto24.png",
      },
    ],
  },
  {
    tag: "Portifolio Profissional",
    title: "Donkere",
    images: [
       {
        alt: "Donkere",
        src: "images/mockup4.png",
      },
      {
        alt: "Donkere",
        src: "images/projeto10.png",
      },
      {
        alt: "Donkere",
        src: "images/projeto11.png",
      },
      {
        alt: "Donkere",
        src: "images/projeto12.png",
      },
    ],
  },
];

const skills = [
  "REACT.JS",
  "JavaScript",
  "TypeScript",
  "Next.js (SSR / SSG)",
  "C#",
  "ASP.NET Core",
  "SQL Server",
  "Entity Framework Core",
  "Arquitetura Front-end",
  "APIs REST (Integração Front-end / Back-end)",
  "Otimização de Performance (Core Web Vitals)",
  "Clean Code",
  "Git / GitHub",
  "SEO Técnico",
  "Wordpress",
];

function App() {
  React.useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const [activeProjectIndex, setActiveProjectIndex] = React.useState(null);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  const closeModal = () => {
    setActiveProjectIndex(null);
    setActiveImageIndex(0);
  };

  const showPrevious = () => {
    if (activeProjectIndex === null) return;
    const total = projectShowcase[activeProjectIndex].images.length;
    setActiveImageIndex((prev) => (prev - 1 + total) % total);
  };

  const showNext = () => {
    if (activeProjectIndex === null) return;
    const total = projectShowcase[activeProjectIndex].images.length;
    setActiveImageIndex((prev) => (prev + 1) % total);
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    if (activeProjectIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProjectIndex]);

  return (
    <div className="min-h-screen bg-white text-ink">
      <header
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8 text-sm font-medium"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-lg font-bold transition-transform duration-200 hover:scale-[1.03]">
            W
          </span>
        </div>

        <nav className="hidden gap-6 text-sm text-ink/80 md:flex">
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
          href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1,estou%20interessado%20em%20conhecer%20melhor%20seu%20trabalho"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold underline underline-offset-8 rounded-md outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
        >
          Fale Comigo
        </a>
      </header>

      <main>
        <section
          id="latest-drops"
          className="mx-auto w-full max-w-6xl px-6 pb-12 pt-14"
          data-aos="fade-in"
          data-aos-duration="3000"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
            <div className="flex -space-x-2">
              {[
                
              ].map((color, index) => (
                <span
                  key={color}
                  className={`h-8 w-8 rounded-full border-2 border-white ${color}`}
                  aria-hidden={index !== 0}
                />
              ))}
            </div>
            <span className="font-semibold tracking-[0.3em]">★★★★★</span>
            <span className="text-[10px] font-semibold">
              Mais de 10 empresas em todo o Brasil.
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight text-ink md:text-7xl">
              Sites que mudam seus resultados.
            </h1>
            <p className="mt-4 text-base text-graphite md:text-lg">
              Com visão estratégica, design funcional e foco em resultados. Desenvolvo sites que fortalecem marcas e impulsionam negócios.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1,estou%20interessado%20em%20conhecer%20melhor%20seu%20trabalho"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink px-6 py-2 text-sm font-semibold text-white outline-none transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
              >
                Faça seu orçamento
              </a>

              <div className="flex items-center gap-3 text-ink">
                <a
                  href="https://www.linkedin.com/in/wesleyfariasbe/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/30 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5H4.5v15H.5v-15zm7 0h3.8v2.1h.1c.5-1 1.8-2.1 3.8-2.1 4.1 0 4.9 2.6 4.9 6v9H16v-8c0-1.9 0-4.3-2.7-4.3-2.7 0-3.1 2.1-3.1 4.1v8.2H7.5v-15z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/visualswf/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 outline-none transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/30 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
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
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.4 2.9 8.1 6.9 9.4.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7-.8 2-1.2.1-.8.4-1.2.7-1.5-2.2-.2-4.5-1.1-4.5-5.1 0-1.1.4-2.1 1.1-2.8-.1-.2-.5-1.3.1-2.6 0 0 .9-.3 2.9 1.1a9.9 9.9 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.3.2 2.4.1 2.6.7.7 1.1 1.7 1.1 2.8 0 4-2.3 4.9-4.5 5.1.4.4.8 1 .8 2.1v3.2c0 .3.2.6.7.5 4-1.3 6.9-5 6.9-9.4C22 6.6 17.5 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between text-sm text-ink/70">
            <span>(Últimos Projetos)</span>
          </div>

          <div
            className="mt-5 grid gap-5 md:grid-cols-2"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            {projectShowcase.map((project, index) => (
              <button
                key={project.title}
                type="button"
                onClick={() => {
                  setActiveProjectIndex(index);
                  setActiveImageIndex(0);
                }}
                className="group text-left rounded-3xl outline-none transition-transform duration-200 hover:-translate-y-[2px] focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
              >
                <div className="relative overflow-hidden rounded-3xl bg-black shadow-card transition-all duration-300 group-hover:shadow-lg">
                  <span className="absolute left-4 top-4 inline-flex rounded-full border border-ink/10 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/70">
                    {project.tag}
                  </span>
                  <img
                    src={project.images[0].src}
                    alt={project.images[0].alt}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-80"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          id="services"
          className="mx-auto w-full max-w-6xl border-t border-fog px-6 py-16"
        >
          <div
            className="text-sm text-ink/70"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            (Serviços)
          </div>

          <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div 
              className="hidden md:block self-start rounded-[28px] bg-fog p-6"
              data-aos="fade-up-right"
              data-aos-duration="1500"
            >
              <div className="grid gap-6 sm:grid-cols-1" >
                <div className="overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
                    alt="Landing Page"
                    className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-lg">
                  <img 
                    src="images/Ficticio5.png"
                    alt="Blog"
                    className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-lg">
                  <img
                    src="images/mobile3.png"
                    alt="Analytics dashboard"
                    className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-lg">
                  <img
                    src="images/tablet.png"
                    alt="Profissional page"
                    className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-lg">
                  <img 
                    src="images/id10.png"
                    alt="Identidade visual"
                    className="h-60 w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8" data-aos="fade-up-left" data-aos-duration="1500">
              <h2 className="text-2xl font-semibold leading-snug md:text-3xl">
                Mais do que sites, desenvolvo soluções digitais completas para marcas que querem se destacar e performar.
              </h2>

              <div className="space-y-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="grid grid-cols-[48px_1fr] gap-1 border-b border-fog pb-20"
                  >
                    <div className="text-sm font-semibold text-ink/60">{service.id}</div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/80">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-graphite">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="mx-auto w-full max-w-5xl border-t border-fog px-6 py-16"
        >
          <div
            className="text-sm text-ink/70"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            (Sobre)
          </div>

          <div
            className="mt-8 flex flex-col items-start gap-8 md:items-center"
            data-aos="fade-up"
            data-aos-duration="1500" 
          >
            <img
              src="images/about.png"
              alt="Wesley Farias portrait"
              className="w-full max-w-md rounded-[28px] object-cover transition-all duration-300 hover:shadow-lg"
            />

            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
                Meu nome é Wesley Farias e eu crio sites que estabelecem novos padrões.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-graphite md:text-base">
                Sou desenvolvedor full stack, com sólida experiência na construção de sites e sistemas web. Atuo do planejamento à implementação, desenvolvendo interfaces em React e soluções robustas em C#/.NET, unindo arquitetura, performance e estratégia para criar produtos digitais completos e escaláveis.
              </p>

              <a
                href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1,estou%20interessado%20em%20conhecer%20melhor%20seu%20trabalho"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-md text-sm font-semibold underline underline-offset-4 outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
              >
                Fale comigo ↗
              </a>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto w-full max-w-6xl border-t border-fog px-6 py-12"
          data-aos="fade-left"
          data-aos-duration="3000"
        >
          <div className="text-sm text-ink/70">(Skills)</div>

          <div className="marquee mt-6 rounded-[28px] bg-white py-4">
            <div className="marquee__track">
              {[...skills, ...skills].map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="mx-5 inline-flex items-center rounded-full border border-ink/10 bg-mist px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 transition-all duration-200 hover:-translate-y-[1px] hover:border-ink/20 hover:bg-white hover:shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-fog" >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-ink/70 sm:flex-row sm:items-center">
          <span>2024 © Wesley Farias</span>
          <a
            href="https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1,estou%20interessado%20em%20conhecer%20melhor%20seu%20trabalho"
            className="rounded-md underline underline-offset-4 outline-none transition-opacity duration-200 hover:opacity-75 focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
          >
            Contato
          </a>
        </div>
      </footer>

      {activeProjectIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 px-6 py-10">
          <div className="relative w-full max-w-4xl rounded-[32px] bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {projectShowcase[activeProjectIndex].tag}
                </p>
                <h3 className="text-lg font-semibold">
                  {projectShowcase[activeProjectIndex].title}
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70 outline-none transition-all duration-200 hover:bg-ink hover:text-white hover:-translate-y-[1px] focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4 active:translate-y-0"
                aria-label="Fechar"
              >
                Close
              </button>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-3xl bg-black">
              <img
                  src={projectShowcase[activeProjectIndex].images[activeImageIndex].src}
  alt={projectShowcase[activeProjectIndex].images[activeImageIndex].alt}
  className="
    w-full
    object-contain
    bg-black
    max-h-[70vh]
    sm:max-h-[75vh]
    md:h-[420px] md:object-cover
  "
              />

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-ink shadow-card outline-none transition-all duration-200 hover:bg-white hover:-translate-y-[calc(50%+1px)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                aria-label="Imagem anterior"
              >
                ←
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-ink shadow-card outline-none transition-all duration-200 hover:bg-white hover:-translate-y-[calc(50%+1px)] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:ring-offset-4"
                aria-label="Próxima imagem"
              >
                →
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
              <span>
                {activeImageIndex + 1} / {projectShowcase[activeProjectIndex].images.length}
              </span>
              <span>Use ESC para fechar</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;