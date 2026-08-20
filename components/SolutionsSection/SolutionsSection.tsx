import TechnologyMarquee from "./TechnologyMarquee";
import {
  LuCloud,
  LuDatabase,
  LuGitBranch,
  LuMonitorSmartphone,
  LuServerCog,
  LuSparkles,
} from "react-icons/lu";
import { siteKnowledge } from "@/lib/siteKnowledge";
import styles from "./SolutionsSection.module.css";

const solutionIcons = {
  "01": LuMonitorSmartphone,
  "02": LuServerCog,
  "03": LuDatabase,
  "04": LuSparkles,
  "05": LuGitBranch,
  "06": LuCloud,
} as const;

export default function SolutionsSection() {
  return (
    <section id="servicos" className={styles.section} aria-labelledby="servicos-title">
      <div className="page-shell">
        <div className={styles.header}>
          <p className={styles.eyebrow} data-reveal>(Como posso ajudar?)</p>
          <h2 id="servicos-title" className={styles.title} data-reveal data-reveal-delay="1">
            Soluções digitais completas para produtos que precisam de performance, escala e
            consistência técnica.
          </h2>
          <p className={styles.introduction} data-reveal data-reveal-delay="2">
            Atuação Full Stack com especialidade em Front-End, desenvolvimento de APIs, dados,
            testes, DevOps e publicação de aplicações em nuvem.
          </p>
        </div>

        <div className={styles.solutionGrid}>
          {siteKnowledge.services.map((solution) => {
            const Icon = solutionIcons[solution.id];
            const note = "note" in solution ? solution.note : undefined;

            return (
              <article className={styles.solutionCard} data-reveal="scale" key={solution.id}>
                <span className={styles.cardNumber}>{solution.id}</span>
                <span className={styles.solutionIcon} aria-hidden="true">
                  <Icon />
                </span>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{solution.title}</h3>
                  <p className={styles.cardSubtitle}>{solution.subtitle}</p>
                  <p className={styles.cardDescription}>{solution.description}</p>
                  {note && <p className={styles.cardNote}>{note}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <TechnologyMarquee />
    </section>
  );
}
