import { LuArrowUpRight, LuMapPin } from "react-icons/lu";
import type { CareerTimelineItem } from "./career-timeline.data";
import styles from "./CareerTimeline.module.css";

type TimelineItemProps = {
  item: CareerTimelineItem;
  itemRef: (element: HTMLLIElement | null) => void;
  markerRef: (element: HTMLSpanElement | null) => void;
};

export default function TimelineItem({ item, itemRef, markerRef }: TimelineItemProps) {
  const Icon = item.icon;
  const isOpen = item.status === "open";

  return (
    <li
      ref={itemRef}
      className={styles.item}
      data-side={item.side}
      data-status={item.status}
      data-timeline-state="future"
    >
      <article className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.itemNumber}>{item.id}</span>
          <span className={styles.icon} aria-hidden="true">
            <Icon />
          </span>
        </div>

        <div className={styles.meta}>
          <time className={styles.period}>{item.period}</time>
          {item.statusLabel && <span className={styles.statusLabel}>{item.statusLabel}</span>}
        </div>

        <h3 className={styles.cardTitle}>{item.title}</h3>

        {item.organization && <p className={styles.organization}>{item.organization}</p>}

        {item.location && (
          <p className={styles.location}>
            <LuMapPin aria-hidden="true" />
            <span>{item.location}</span>
          </p>
        )}

        <div className={styles.content}>
          <p className={styles.summary}>{item.summary}</p>

          {item.details?.map((detail) => (
            <p className={styles.detail} key={detail}>
              {detail}
            </p>
          ))}

          {item.highlights && (
            <ul className={styles.highlights} aria-label="Resultados comprovados">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>

        {isOpen && (
          <div className={styles.technologyGroup}>
            <p className={styles.technologyLabel}>Tecnologias e competências</p>
            <ul className={styles.technologies}>
              {item.technologies.map((technology) => (
                <li className={styles.technology} key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.cta && (
          <a className={styles.cta} href={item.cta.href}>
            <span>{item.cta.label}</span>
            <LuArrowUpRight aria-hidden="true" />
          </a>
        )}
      </article>

      <div className={styles.nodeArea} aria-hidden="true">
        <span className={styles.connector} />
        <span
          ref={markerRef}
          className={styles.marker}
          data-open={isOpen || undefined}
        >
          {!isOpen && <span className={styles.markerCore} />}
        </span>
      </div>
    </li>
  );
}
