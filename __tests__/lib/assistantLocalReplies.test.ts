import { getLocalAssistantReply } from "@/lib/assistantLocalReplies";

describe("getLocalAssistantReply", () => {
  it("returns a services reply for normalized service questions", () => {
    const reply = getLocalAssistantReply("Quais serviços você oferece?");

    expect(reply).toContain("soluções digitais completas");
    expect(reply).toContain("Arquitetura Front-end");
  });

  it("returns a budget reply when the user asks about pricing", () => {
    const reply = getLocalAssistantReply("Como pedir um orçamento?");

    expect(reply).toContain("Solicitar orçamento no WhatsApp");
    expect(reply).toContain("tipo de projeto");
  });

  it("keeps clearly unrelated questions out of scope", () => {
    const reply = getLocalAssistantReply("Qual a previsão do tempo para amanhã?");

    expect(reply).toContain("só posso ajudar");
    expect(reply).toContain("Falar com Wesley no WhatsApp");
  });

  it("returns null for valid but unknown in-scope messages", () => {
    expect(getLocalAssistantReply("Quero entender melhor o processo técnico")).toBeNull();
  });
});
