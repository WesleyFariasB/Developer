import type { IconType } from "react-icons";
import {
  SiAmazon,
  SiAndroid,
  SiApple,
  SiSharp,
  SiDocker,
  SiDotnet,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { LuDatabase } from "react-icons/lu";

export type Technology = {
  color: string;
  icon: IconType;
  name: string;
};

export const technologies: readonly Technology[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
  { name: "React.js", icon: SiReact, color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "React Native", icon: SiReact, color: "#61dafb" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "NestJS", icon: SiNestjs, color: "#e0234e" },
  { name: "C#", icon: SiSharp, color: "#512bd4" },
  { name: ".NET", icon: SiDotnet, color: "#512bd4" },
  { name: "Java", icon: FaJava, color: "#f89820" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "SQL", icon: LuDatabase, color: "#2563eb" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "AWS", icon: SiAmazon, color: "#ff9900" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "Vercel", icon: SiVercel, color: "#111111" },
  { name: "Android", icon: SiAndroid, color: "#3ddc84" },
  { name: "iOS / Apple", icon: SiApple, color: "#111111" },
];
