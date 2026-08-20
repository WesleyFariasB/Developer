"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projects.data";
import styles from "./ProjectsSection.module.css";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const publishedProjects = projects.filter((project) => project.isPublished !== false);

export default function ProjectsSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const focusedBeforeModalRef = useRef<HTMLElement | null>(null);
  const activeProject = activeProjectIndex === null ? null : publishedProjects[activeProjectIndex];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion()) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const cardContent = card.firstElementChild;
        if (!(cardContent instanceof HTMLElement)) return;

        gsap.fromTo(
          cardContent,
          { autoAlpha: 0.35 },
          {
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              end: "top 58%",
              invalidateOnRefresh: true,
              scrub: 0.2,
              start: "top bottom",
              trigger: card,
            },
          },
        );

        ScrollTrigger.create({
          end: "bottom bottom",
          endTrigger: section,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          pinType: "fixed",
          pin: card,
          pinSpacing: false,
          start: "center center",
          trigger: card,
        });
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    void document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  const closeModal = useCallback(() => {
    setActiveProjectIndex(null);
    window.requestAnimationFrame(() => focusedBeforeModalRef.current?.focus());
  }, []);

  const openProject = useCallback((index: number, trigger: HTMLButtonElement) => {
    focusedBeforeModalRef.current = trigger;
    setActiveImageIndex(0);
    setActiveProjectIndex(index);
  }, []);

  const showPrevious = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((index) => (index - 1 + activeProject.images.length) % activeProject.images.length);
  }, [activeProject]);

  const showNext = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((index) => (index + 1) % activeProject.images.length);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject, closeModal]);

  return (
    <section ref={sectionRef} id="projetos" className={styles.section} aria-label="Projetos em destaque">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow} data-reveal>(Projetos em destaque)</p>
          <h2 id="projetos-title" className={styles.title} data-reveal data-reveal-delay="1">Projetos</h2>
          <p className={styles.introduction} data-reveal data-reveal-delay="2">
            Produtos digitais desenvolvidos para resolver problemas de negócio, melhorar a
            experiência do usuário e gerar resultados mensuráveis, em projetos independentes e em
            colaboração com equipes.
          </p>
        </header>

        <div className={styles.stack}>
          {publishedProjects.map((project, index) => (
            <article
              className={styles.stickyItem}
              aria-labelledby={`project-${project.slug}`}
              key={project.slug}
              style={{ "--project-index": index } as CSSProperties}
            >
              <div className={styles.card} ref={(element) => { cardRefs.current[index] = element; }}>
                <h3 id={`project-${project.slug}`} className="sr-only">{project.title}</h3>
                {project.isPlaceholder ? (
                  <div className={`${styles.cardButton} ${styles.placeholderCard}`}>
                    <span className={styles.cardCopy}>
                      <span className={styles.category}>{project.category}</span>
                      <span className={styles.cardFooter}>
                        <span className={styles.projectName}>{project.title}</span>
                        <span className={styles.summary}>{project.summary}</span>
                        <span className={styles.placeholderNote}>Disponível para a próxima parceria.</span>
                      </span>
                    </span>
                    <span className={`${styles.imageFrame} ${styles.placeholderVisual}`} aria-hidden="true">
                      <span /><span /><span />
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={(event) => openProject(index, event.currentTarget)}
                    aria-label={`Abrir projeto ${project.title}`}
                  >
                    <span className={styles.cardCopy}>
                      <span className={styles.category}>{project.category}</span>
                      <span className={styles.cardFooter}>
                        <span className={styles.projectName}>{project.title}</span>
                        <span className={styles.summary}>{project.summary}</span>
                        {project.technologies && (
                          <span className={styles.technologies}>{project.technologies.join(" · ")}</span>
                        )}
                        <span className={styles.cta}>Ver projeto <span aria-hidden="true">↗</span></span>
                      </span>
                    </span>
                    <span className={styles.imageFrame}>
                      <Image
                        src={project.image!}
                        alt={project.imageAlt!}
                        fill
                        sizes="(min-width: 800px) 50vw, 100vw"
                        className="object-cover"
                        priority={index === 0}
                        quality={95}
                      />
                    </span>
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={dialogRef}
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-help"
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalCategory}>{activeProject.category}</p>
                <h3 id="project-modal-title">{activeProject.title}</h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className={styles.closeButton}
                aria-label="Fechar galeria"
              >
                Fechar
              </button>
            </div>

            <div className={styles.modalImage}>
              <Image
                src={activeProject.images[activeImageIndex].src}
                alt={activeProject.images[activeImageIndex].alt}
                width={1600}
                height={900}
                sizes="90vw"
                className="max-h-[72vh] w-full object-contain"
                quality={95}
              />
              {activeProject.images.length > 1 && (
                <>
                  <button type="button" onClick={showPrevious} className={styles.previousButton} aria-label="Imagem anterior">←</button>
                  <button type="button" onClick={showNext} className={styles.nextButton} aria-label="Próxima imagem">→</button>
                </>
              )}
            </div>

            {activeProject.images.length > 1 && (
              <div className={styles.thumbnails} aria-label="Imagens do projeto">
                {activeProject.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`${styles.thumbnail} ${index === activeImageIndex ? styles.thumbnailSelected : ""}`}
                    aria-label={`Abrir imagem ${index + 1} de ${activeProject.title}`}
                    aria-pressed={index === activeImageIndex}
                  >
                    <Image src={image.src} alt={image.alt} fill sizes="96px" className="object-cover" quality={75} />
                  </button>
                ))}
              </div>
            )}

            <div id="project-modal-help" className={styles.modalHelp}>
              <span>{activeImageIndex + 1} / {activeProject.images.length}</span>
              <span>Use ESC para fechar</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
