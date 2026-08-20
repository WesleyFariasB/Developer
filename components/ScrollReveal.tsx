"use client";

import { useEffect } from "react";

const revealSelector = "[data-reveal]";

export default function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    if (elements.length === 0) return undefined;

    const reveal = (element: HTMLElement) => {
      element.dataset.revealed = "true";
    };

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach(reveal);
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
