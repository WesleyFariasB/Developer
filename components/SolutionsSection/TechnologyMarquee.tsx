import type { CSSProperties } from "react";
import { technologies, type Technology } from "./technologies.data";
import styles from "./SolutionsSection.module.css";

function TechnologyItem({ technology }: { technology: Technology }) {
  const Icon = technology.icon;

  return (
    <li className={styles.technologyItem}>
      <span
        className={styles.technologyIcon}
        style={{ "--technology-color": technology.color } as CSSProperties}
        aria-hidden="true"
      >
        <Icon />
      </span>
      <span className={styles.technologyName}>{technology.name}</span>
    </li>
  );
}

function TechnologyGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.technologyGroup} aria-hidden={hidden || undefined}>
      {technologies.map((technology) => (
        <TechnologyItem key={technology.name} technology={technology} />
      ))}
    </ul>
  );
}

export default function TechnologyMarquee() {
  return (
    <div
      className={styles.technologyMarquee}
      role="region"
      aria-label="Tecnologias principais"
      tabIndex={0}
    >
      <div className={styles.technologyTrack}>
        <TechnologyGroup />
        <TechnologyGroup hidden />
      </div>
    </div>
  );
}
