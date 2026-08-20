"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import CareerTimeline from "@/components/CareerTimeline/CareerTimeline";
import ContactFooter from "@/components/ContactFooter/ContactFooter";
import FloatingAssistant from "@/components/FloatingAssistant";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ScrollReveal from "@/components/ScrollReveal";
import SolutionsSection from "@/components/SolutionsSection/SolutionsSection";
import { siteKnowledge } from "@/lib/siteKnowledge";

const navLinks = siteKnowledge.navigation;
const budgetUrl = siteKnowledge.ctas[0].href;
const contactUrl = siteKnowledge.ctas[1].href;

const socialLinks = [
  { href: "https://www.linkedin.com/in/wesleyfariasbe/", icon: FaLinkedinIn, label: "LinkedIn de Wesley Farias" },
  { href: "https://www.instagram.com/visualswf/", icon: FaInstagram, label: "Instagram de Wesley Farias" },
  { href: "https://github.com/WesleyFariasB", icon: FaGithub, label: "GitHub de Wesley Farias" },
] as const;

const clientAvatars = [
  { alt: "Cliente de projeto digital", src: "/images/avatar-client-1.jpg" },
  { alt: "Cliente de projeto digital", src: "/images/avatar-client-2.jpg" },
  { alt: "Cliente de projeto digital", src: "/images/avatar-client-3.jpg" },
] as const;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      setShowBackToTop(window.scrollY > 240);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ behavior: prefersReducedMotion() ? "auto" : "smooth", top: 0 });
  }, []);

  return (
    <div id="topo" className="min-h-screen bg-white text-ink">
      <ScrollReveal />
      <a
        href="#conteudo"
        className="sr-only absolute left-4 top-4 z-[80] rounded-md bg-white px-3 py-2 text-sm font-medium text-ink shadow-sm focus:not-sr-only focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
      >
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="page-shell site-header__inner">
          <a href="#topo" className="brand-link" aria-label="Voltar ao início">
            <span className="brand-mark brand-mark--site" aria-hidden="true">W</span>
            <span className="brand-link__name">Wesley Farias</span>
          </a>

          <nav className="site-nav" aria-label="Navegação principal">
            {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>

          <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="site-header__cta">
            Fale comigo
          </a>

          <button
            type="button"
            className="site-menu-toggle"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav id="mobile-navigation" className="site-mobile-nav" data-open={isMobileMenuOpen || undefined} aria-label="Navegação no celular" hidden={!isMobileMenuOpen}>
          <div className="page-shell">
            {navLinks.map((link) => <a key={link.label} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</a>)}
            <a href={contactUrl} target="_blank" rel="noopener noreferrer">Fale comigo <span aria-hidden="true">↗</span></a>
          </div>
        </nav>
      </header>

      <main id="conteudo">
        <section className="page-shell hero-section" aria-labelledby="hero-title">
          <div className="hero-tech-shell" aria-hidden="true">
            <div className="hero-tech">
              <div className="hero-tech__halo" />
              <div className="hero-tech__orb hero-tech__orb--primary" />
              <div className="hero-tech__orb hero-tech__orb--secondary" />
              <div className="hero-tech__ring hero-tech__ring--one" />
              <div className="hero-tech__ring hero-tech__ring--two" />
              <div className="hero-tech__ring hero-tech__ring--three" />
              <div className="hero-tech__panel hero-tech__panel--one"><span /><span /><span /></div>
              <div className="hero-tech__panel hero-tech__panel--two"><span /><span /></div>
              <div className="hero-tech__node hero-tech__node--one" />
              <div className="hero-tech__node hero-tech__node--two" />
              <div className="hero-tech__node hero-tech__node--three" />
              <div className="hero-tech__node hero-tech__node--four" />
            </div>
          </div>

          <div className="hero-section__content motion-reveal">
            <div className="hero-social-proof">
              <div className="hero-avatars" aria-hidden="true">
                {clientAvatars.map((avatar) => (
                  <span className="hero-avatar" key={avatar.src}>
                    <Image src={avatar.src} alt="" fill sizes="36px" quality={95} />
                  </span>
                ))}
              </div>
              <div>
                <div className="hero-stars" aria-label="Cinco estrelas"><span aria-hidden="true">★★★★★</span></div>
                <p>Projetos desenvolvidos para negócios nacionais e internacionais.</p>
              </div>
            </div>

            <h1 id="hero-title" className="hero-title">
              <span>Transformo ideias em sites</span>
              <span>sistemas e aplicativos</span>
              <span>de alta performance.</span>
            </h1>

            <p className="hero-summary">
              <span>Desenvolvo produtos digitais completos, conectando design, experiência do usuário,</span>
              <span>regras de negócio, APIs e bancos de dados para criar soluções estáveis,</span>
              <span>fáceis de usar e preparadas para novos recursos.</span>
            </p>

            <div className="hero-actions">
              <a href={budgetUrl} target="_blank" rel="noopener noreferrer" className="hero-budget">
                Solicitar orçamento <span aria-hidden="true">↗</span>
              </a>
              <div className="hero-social-links" aria-label="Redes sociais de Wesley Farias">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} key={label}>
                    <Icon aria-hidden="true" />
                    <span>{label.split(" ")[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />
        <CareerTimeline />
        <SolutionsSection />
      </main>

      {showBackToTop && (
        <button type="button" onClick={scrollToTop} className="back-to-top" aria-label="Voltar ao topo" title="Voltar ao topo">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" /></svg>
        </button>
      )}

      <FloatingAssistant />
      <ContactFooter />
    </div>
  );
}
