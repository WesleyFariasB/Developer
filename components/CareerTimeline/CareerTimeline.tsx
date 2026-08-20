"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineItem from "./TimelineItem";
import { careerTimelineItems } from "./career-timeline.data";
import styles from "./CareerTimeline.module.css";

type TimelineState = "future" | "active" | "completed";

const scrollTriggerId = "career-timeline-progress";

export default function CareerTimeline() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const orbRef = useRef<HTMLSpanElement | null>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    const progressLine = progressRef.current;
    const orb = orbRef.current;
    const markers = markerRefs.current.filter(
      (marker): marker is HTMLSpanElement => marker instanceof HTMLSpanElement,
    );

    if (!timeline || !progressLine || !orb || markers.length !== careerTimelineItems.length) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    const setItemState = (index: number, state: TimelineState) => {
      const item = itemRefs.current[index];

      if (item && item.dataset.timelineState !== state) {
        item.dataset.timelineState = state;
      }
    };

    const resetItemStates = () => {
      itemRefs.current.forEach((item) => {
        if (item) item.dataset.timelineState = "future";
      });
    };

    const updateGeometry = () => {
      const firstMarker = markers[0];
      const lastMarker = markers.at(-1);

      if (!firstMarker || !lastMarker) return 0;

      const timelineBounds = timeline.getBoundingClientRect();
      const firstBounds = firstMarker.getBoundingClientRect();
      const lastBounds = lastMarker.getBoundingClientRect();
      const start = firstBounds.top - timelineBounds.top + firstBounds.height / 2;
      const end = lastBounds.top - timelineBounds.top + lastBounds.height / 2;
      const travel = Math.max(0, end - start);

      timeline.style.setProperty("--career-line-start", `${start}px`);
      timeline.style.setProperty("--career-line-length", `${travel}px`);

      return travel;
    };

    let context: gsap.Context | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeFrame = 0;
    let initialRefreshFrame = 0;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const destroyAnimation = () => {
      context?.revert();
      context = null;
      resizeObserver?.disconnect();
      resizeObserver = null;

      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = 0;
      }

      if (initialRefreshFrame) {
        window.cancelAnimationFrame(initialRefreshFrame);
        initialRefreshFrame = 0;
      }
    };

    const setupAnimation = () => {
      destroyAnimation();
      resetItemStates();
      updateGeometry();

      if (motionQuery.matches) {
        gsap.set([progressLine, orb], { clearProps: "transform" });
        return;
      }

      context = gsap.context(() => {
        const firstMarker = markers[0];
        const lastMarker = markers.at(-1);

        if (!firstMarker || !lastMarker) return;

        gsap.set(progressLine, {
          scaleY: 0,
          transformOrigin: "top center",
          xPercent: -50,
        });
        gsap.set(orb, { xPercent: -50, y: 0, yPercent: -50 });

        const progressTimeline = gsap.timeline({
          scrollTrigger: {
            id: scrollTriggerId,
            trigger: firstMarker,
            start: "center center",
            endTrigger: lastMarker,
            end: "center center",
            scrub: 0.35,
            invalidateOnRefresh: true,
            onRefreshInit: updateGeometry,
          },
        });

        progressTimeline
          .to(progressLine, { duration: 1, ease: "none", scaleY: 1 }, 0)
          .to(
            orb,
            {
              duration: 1,
              ease: "none",
              y: () => updateGeometry(),
            },
            0,
          );

        markers.forEach((marker, index) => {
          const nextMarker = markers[index + 1];
          const isLastMarker = index === markers.length - 1;

          ScrollTrigger.create({
            trigger: marker,
            start: "center center",
            endTrigger: nextMarker ?? marker,
            end: isLastMarker ? "bottom top" : "center center",
            invalidateOnRefresh: true,
            onEnter: () => setItemState(index, "active"),
            onEnterBack: () => setItemState(index, "active"),
            onLeave: () => setItemState(index, isLastMarker ? "active" : "completed"),
            onLeaveBack: () => setItemState(index, "future"),
          });
        });

        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(() => {
            if (resizeFrame) return;

            resizeFrame = window.requestAnimationFrame(() => {
              resizeFrame = 0;
              updateGeometry();
              ScrollTrigger.refresh();
            });
          });
          resizeObserver.observe(timeline);
        }

        initialRefreshFrame = window.requestAnimationFrame(() => {
          initialRefreshFrame = 0;
          updateGeometry();
          ScrollTrigger.refresh();
        });
      }, timeline);
    };

    const handleMotionPreferenceChange = () => setupAnimation();

    setupAnimation();
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);
      destroyAnimation();
      ScrollTrigger.getById(scrollTriggerId)?.kill();
    };
  }, []);

  return (
    <section id="trajetoria" className={styles.section} aria-labelledby="trajetoria-title">
      <div className="page-shell">
        <header className={styles.header}>
          <p className={styles.eyebrow} data-reveal>(Minha trajetória)</p>
          <h2 id="trajetoria-title" className={styles.title} data-reveal data-reveal-delay="1">
            Da formação à construção de produtos digitais.
          </h2>
          <p className={styles.introduction} data-reveal data-reveal-delay="2">
            Uma jornada construída entre aprendizado, projetos nacionais e internacionais e a
            evolução de produtos web e mobile.
          </p>
        </header>

        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.baseLine} />
            <span className={styles.progressLine} ref={progressRef} />
            <span className={styles.orb} ref={orbRef} />
          </div>

          <ol className={styles.list}>
            {careerTimelineItems.map((item, index) => (
              <TimelineItem
                item={item}
                itemRef={(element) => {
                  itemRefs.current[index] = element;
                }}
                key={item.id}
                markerRef={(element) => {
                  markerRefs.current[index] = element;
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
