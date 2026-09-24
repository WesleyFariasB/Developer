import "@testing-library/jest-dom";
import React from "react";

jest.mock("gsap", () => {
  const timeline = {
    to: jest.fn().mockReturnThis(),
  };

  return {
    gsap: {
      context: (callback: () => void) => {
        callback();
        return { revert: jest.fn() };
      },
      fromTo: jest.fn(),
      matchMedia: jest.fn(() => ({ add: jest.fn(), revert: jest.fn() })),
      registerPlugin: jest.fn(),
      set: jest.fn(),
      timeline: jest.fn(() => timeline),
    },
  };
});

jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: jest.fn(),
    getById: jest.fn(() => ({ kill: jest.fn() })),
    refresh: jest.fn(),
  },
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, fill, priority, quality, sizes, src, ...props }: Record<string, unknown>) => {
    const imageSrc =
      typeof src === "string"
        ? src
        : src && typeof src === "object" && "src" in src && typeof src.src === "string"
          ? src.src
          : "";

    return React.createElement("img", {
      ...props,
      alt: typeof alt === "string" ? alt : "",
      src: imageSrc,
    });
  },
}));

if (typeof window !== "undefined") {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [0];

    constructor(private readonly callback: IntersectionObserverCallback) {}

    disconnect = jest.fn();
    observe = jest.fn((target: Element) => {
      this.callback(
        [
          {
            boundingClientRect: target.getBoundingClientRect(),
            intersectionRatio: 1,
            intersectionRect: target.getBoundingClientRect(),
            isIntersecting: true,
            rootBounds: null,
            target,
            time: Date.now(),
          },
        ],
        this,
      );
    });
    takeRecords = jest.fn(() => []);
    unobserve = jest.fn();
  }

  class MockResizeObserver implements ResizeObserver {
    disconnect = jest.fn();
    observe = jest.fn();
    unobserve = jest.fn();
  }

  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(window, "ResizeObserver", {
    configurable: true,
    value: MockResizeObserver,
  });

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn((query: string) => ({
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });

  Object.defineProperty(window, "scrollTo", {
    configurable: true,
    value: jest.fn(),
  });

  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: jest.fn(),
  });

  Object.defineProperty(Element.prototype, "setPointerCapture", {
    configurable: true,
    value: jest.fn(),
  });

  Object.defineProperty(Element.prototype, "releasePointerCapture", {
    configurable: true,
    value: jest.fn(),
  });

  Object.defineProperty(Element.prototype, "hasPointerCapture", {
    configurable: true,
    value: jest.fn(() => true),
  });

  window.requestAnimationFrame = (callback: FrameRequestCallback) =>
    window.setTimeout(() => callback(performance.now()), 0);
  window.cancelAnimationFrame = (id: number) => window.clearTimeout(id);
}
