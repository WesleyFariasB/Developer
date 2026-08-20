"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./ContactFooter.module.css";

const whatsappUrl =
  "https://api.whatsapp.com/send?phone=5583986036971&text=Ol%C3%A1%2C%20quero%20falar%20sobre%20um%20projeto";

const contactLinks = [
  {
    label: "Baixar currículo",
    href: "/curriculo-wesley-farias.pdf",
    ariaLabel: "Baixar currículo de Wesley Farias",
    download: true,
  },
  {
    label: "E-mail",
    href: "mailto:wesleyfariasbe@gmail.com",
    ariaLabel: "Enviar e-mail para Wesley Farias",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wesleyfariasbe/",
    ariaLabel: "Abrir LinkedIn de Wesley Farias",
  },
  {
    label: "GitHub",
    href: "https://github.com/WesleyFariasB",
    ariaLabel: "Abrir GitHub de Wesley Farias",
  },
  {
    label: "WhatsApp",
    href: whatsappUrl,
    ariaLabel: "Entrar em contato com Wesley Farias pelo WhatsApp",
  },
] as const;

const metrics = [
  { label: "Anos de experiência", suffix: "+", target: 3 },
  { label: "Projetos entregues", suffix: "+", target: 20 },
  { label: "Clientes atendidos", suffix: "+", target: 10 },
  { label: "Comprometido com resultados", suffix: "%", target: 100 },
] as const;

export default function ContactFooter() {
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const [metricValues, setMetricValues] = useState(() => metrics.map(() => 0));

  useEffect(() => {
    const metricsElement = metricsRef.current;
    if (!metricsElement) return undefined;

    let animationFrame = 0;
    let hasStarted = false;
    let observer: IntersectionObserver | undefined;

    const showFinalValues = () => setMetricValues(metrics.map(({ target }) => target));

    const startCounting = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        showFinalValues();
        return;
      }

      const startedAt = window.performance.now();
      const duration = 900;
      const update = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        setMetricValues(metrics.map(({ target }) => Math.round(target * easedProgress)));

        if (progress < 1) animationFrame = window.requestAnimationFrame(update);
      };

      animationFrame = window.requestAnimationFrame(update);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          startCounting();
          observer?.disconnect();
        },
        { threshold: 0.35 },
      );
      observer.observe(metricsElement);
    } else {
      startCounting();
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
    };
  }, []);

  return (
    <footer id="contato" className={styles.footer} aria-labelledby="contato-title">
      <div className={styles.primaryContent}>
        <p className={styles.eyebrow} data-reveal>Contato</p>

        <figure className={styles.portrait} data-reveal="scale" data-reveal-delay="1">
          <Image
            src="/images/about.png"
            alt="Retrato de Wesley Farias"
            fill
            sizes="(min-width: 1024px) 21vw, (min-width: 768px) 28vw, 88vw"
            className={styles.portraitImage}
          />
        </figure>

        <div className={styles.mainContent}>
          <p className={styles.question} data-reveal data-reveal-delay="1">
            Tem um produto, sistema ou desafio técnico que precisa evoluir?
          </p>

          <div className={styles.messageContent} data-reveal data-reveal-delay="2">
            <h2 id="contato-title" className={styles.title}>
              Vamos construir o que vem a seguir.
            </h2>

            <div ref={metricsRef} className={styles.metrics} aria-label="Indicadores profissionais">
              {metrics.map((metric, index) => (
                <dl className={styles.metric} key={metric.label}>
                  <dd className={styles.metricValue} aria-label={`${metric.target}${metric.suffix}`}>
                    {metricValues[index]}{metric.suffix}
                  </dd>
                  <dt className={styles.metricLabel}>{metric.label}</dt>
                </dl>
              ))}
            </div>

            <p className={styles.availability}>
              Disponível para oportunidades 100% remotas no Brasil, com contratação CLT ou PJ, como
              Engenheiro de Software, Desenvolvedor Full Stack, Desenvolvedor Front-End ou
              Desenvolvedor Back-End.
            </p>

            <div className={styles.contactActions}>
              <a
                className={styles.primaryAction}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Entrar em contato com Wesley Farias pelo WhatsApp"
              >
                <span>Vamos conversar</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>

              <nav className={styles.contactNav} aria-label="Canais de contato de Wesley Farias">
                <ul className={styles.contactList}>
                  {contactLinks.map((link) => {
                    const isExternal = link.href.startsWith("https://");

                    return (
                      <li key={link.label}>
                        <a
                          className={styles.secondaryAction}
                          href={link.href}
                          aria-label={link.ariaLabel}
                          {...("download" in link && link.download ? { download: true } : {})}
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          <span>{link.label}</span>
                          <FiArrowUpRight aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.signature} data-reveal>
        <p className={styles.name}>Wesley Farias</p>
        <p className={styles.role}>
          Desenvolvedor Full Stack Pleno · Front-End · Back-End · Mobile
        </p>
        <p className={styles.copyright}>© 2026 Wesley Farias</p>
      </div>
    </footer>
  );
}
