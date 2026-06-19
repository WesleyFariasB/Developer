import { siteKnowledge, whatsappUrl } from "@/lib/siteKnowledge";

const budgetWhatsAppUrl = `${whatsappUrl}&text=Ol%C3%A1%2C%20quero%20solicitar%20um%20or%C3%A7amento`;

function normalizeQuestion(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const servicesReply = [
  "Wesley oferece soluções digitais completas para marcas que precisam de performance, escala e consistência técnica.",
  "",
  ...siteKnowledge.services.map(
    (service) => `- **${service.title}:** ${service.description}`,
  ),
  "",
  `Além disso, ele também atua com ${siteKnowledge.profile.deliverables.join(", ")}.`,
].join("\n");

const stackReply = [
  "A stack principal do Wesley combina front-end moderno, back-end escalável e cuidado com performance.",
  "",
  `- **Principais tecnologias:** ${siteKnowledge.stack.slice(0, 12).join(", ")}.`,
  "- **Front-end:** React.js, Next.js, TypeScript e Tailwind CSS.",
  "- **Back-end:** Node.js, NestJS, APIs REST, autenticação e bancos de dados.",
  "- **Qualidade:** SEO técnico, Core Web Vitals, arquitetura modular e Git/GitHub.",
].join("\n");

const budgetReply = [
  "Para pedir um orçamento, o melhor caminho é falar diretamente com Wesley e enviar um resumo do projeto.",
  "",
  "Inclua, se possível:",
  "- tipo de projeto: site, sistema, dashboard, e-commerce ou aplicativo;",
  "- objetivo principal;",
  "- prazo desejado;",
  "- referências ou funcionalidades importantes.",
  "",
  `WhatsApp: ${budgetWhatsAppUrl}`,
].join("\n");

const profileReply = [
  `${siteKnowledge.profile.name} é ${siteKnowledge.profile.roles
    .map((role) => `**${role}**`)
    .join(" e ")}.`,
  "",
  siteKnowledge.profile.professionalPositioning,
  "",
  "Ele cria produtos digitais completos, conectando design, UX, regras de negócio, APIs e bancos de dados com foco em performance, estabilidade e escalabilidade.",
].join("\n");

const projectsReply = [
  "Você pode ver os projetos na seção **Projetos** do site.",
  "",
  siteKnowledge.projects
    .map((project) => `- **${project.title}** (${project.tag}): ${project.description}`)
    .join("\n"),
  "",
  "Link: #projetos",
].join("\n");

const outOfScopeReply = [
  "Eu sou o assistente do site do Wesley Farias e só posso ajudar com informações sobre serviços, projetos, stack, experiência e contato profissional.",
  "",
  `Para falar diretamente com Wesley: ${whatsappUrl}`,
].join("\n");

const localReplies = new Map([
  ["como pedir um orcamento", budgetReply],
  ["como pedir orcamento", budgetReply],
  ["quem e wesley farias", profileReply],
  ["quem e wesley", profileReply],
  ["quem e o wesley", profileReply],
  ["quais servicos voce oferece", servicesReply],
  ["quais servicos ele oferece", servicesReply],
  ["quais servicos oferece", servicesReply],
  ["servicos", servicesReply],
  ["quais tecnologias voce usa", stackReply],
  ["quais tecnologias ele usa", stackReply],
  ["quais tecnologias usa", stackReply],
  ["tecnologias", stackReply],
  ["ver projetos", projectsReply],
]);

function isClearlyOutOfScope(normalizedQuestion: string) {
  return [
    /\bcapital\b/,
    /\bfranca\b/,
    /\bprevisao do tempo\b/,
    /\bclima\b/,
    /\bfutebol\b/,
    /\bresultado do jogo\b/,
    /\breceita\b/,
    /\bpiada\b/,
    /\bfilme\b/,
    /\bmusica\b/,
    /\bnoticia\b/,
  ].some((pattern) => pattern.test(normalizedQuestion));
}

export function getLocalAssistantReply(message: string) {
  const normalizedQuestion = normalizeQuestion(message);

  if (
    /\b(orcamento|proposta|contratar|contratacao|reuniao|briefing|preco|valor|custo)\b/.test(
      normalizedQuestion,
    ) ||
    normalizedQuestion.includes("falar com wesley") ||
    normalizedQuestion.includes("contato direto")
  ) {
    return budgetReply;
  }

  if (isClearlyOutOfScope(normalizedQuestion)) {
    return outOfScopeReply;
  }

  return localReplies.get(normalizedQuestion) ?? null;
}
