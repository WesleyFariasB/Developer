"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { getLocalAssistantReply } from "@/lib/assistantLocalReplies";
import { whatsappUrl } from "@/lib/siteKnowledge";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  content: string;
  id: string;
  role: ChatRole;
};

type MarkdownBlock =
  | { text: string; type: "heading" }
  | { items: string[]; type: "list" }
  | { text: string; type: "paragraph" };

const initialMessages: ChatMessage[] = [
  {
    content:
      "Olá! Sou o assistente do site do Wesley. Posso ajudar com serviços, projetos, stack, orçamento ou contato profissional.",
    id: "assistant-welcome",
    role: "assistant",
  },
];

const quickSuggestions = [
  "Quais serviços você oferece?",
  "Quais tecnologias você usa?",
  "Como pedir um orçamento?",
  "Ver projetos",
];

const requestCooldownMs = 1000;
const fallbackReply = "Tive uma instabilidade rápida. Aguarde alguns segundos e tente novamente.";
const rateLimitReply =
  "Recebi muitas solicitações em sequência. Aguarde alguns segundos e tente novamente.";

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getReplyFromResponse(value: unknown) {
  if (typeof value === "object" && value !== null && "reply" in value) {
    const reply = (value as { reply?: unknown }).reply;
    return typeof reply === "string" && reply.trim() ? reply.trim() : null;
  }

  return null;
}

function getErrorFromResponse(value: unknown) {
  if (typeof value === "object" && value !== null && "error" in value) {
    const error = (value as { error?: unknown }).error;
    return typeof error === "string" ? error : null;
  }

  return null;
}

function createRequestHistory(messages: ChatMessage[]) {
  return messages
    .filter(
      (message) =>
        message.id !== "assistant-welcome" &&
        (message.role === "assistant" || message.role === "user") &&
        message.content.trim(),
    )
    .map(({ content, role }) => ({
      content: content.trim(),
      role,
    }))
    .slice(-6);
}

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;

    blocks.push({
      text: paragraph.join(" ").replace(/\s+/g, " ").trim(),
      type: "paragraph",
    });
    paragraph = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;

    blocks.push({ items: listItems, type: "list" });
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({ text: headingMatch[1].trim(), type: "heading" });
      return;
    }

    const bulletMatch = trimmed.match(/^(?:[-*•]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      listItems.push(bulletMatch[1].trim());
      return;
    }

    flushList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();

  return blocks.length > 0 ? blocks : [{ text: content, type: "paragraph" }];
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const parts = text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).filter(Boolean);

  parts.forEach((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      nodes.push(<strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>);
      return;
    }

    if (/^https?:\/\//.test(part)) {
      nodes.push(
        <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>,
      );
      return;
    }

    nodes.push(part.replace(/\*/g, ""));
  });

  return nodes;
}

function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  if (isUser) {
    return <p>{content}</p>;
  }

  return (
    <div className="assistant-markdown">
      {parseMarkdown(content).map((block, index) => {
        if (block.type === "heading") {
          return <h4 key={`${block.text}-${index}`}>{renderInlineMarkdown(block.text)}</h4>;
        }

        if (block.type === "list") {
          return (
            <ul key={`list-${index}`}>
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
          );
        }

        return <p key={`${block.text}-${index}`}>{renderInlineMarkdown(block.text)}</p>;
      })}
    </div>
  );
}

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sendLockRef = useRef(false);
  const cooldownTimeoutRef = useRef<number | null>(null);
  const lastSubmissionRef = useRef<{ content: string; at: number } | null>(null);
  const hasConversationStarted = messages.some((message) => message.role === "user");
  const isBusy = isLoading || isCoolingDown;

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => inputRef.current?.focus(), 120);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current !== null) {
        window.clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  const releaseSendLock = () => {
    if (cooldownTimeoutRef.current !== null) {
      window.clearTimeout(cooldownTimeoutRef.current);
    }

    cooldownTimeoutRef.current = window.setTimeout(() => {
      sendLockRef.current = false;
      setIsCoolingDown(false);
      cooldownTimeoutRef.current = null;
    }, requestCooldownMs);
  };

  const sendMessage = async (content: string) => {
    const nextContent = content.replace(/\s+/g, " ").trim();
    if (!nextContent || sendLockRef.current || isBusy) return;

    const normalizedContent = nextContent.toLocaleLowerCase("pt-BR");
    const now = Date.now();
    const lastSubmission = lastSubmissionRef.current;

    if (
      lastSubmission?.content === normalizedContent &&
      now - lastSubmission.at < requestCooldownMs
    ) {
      return;
    }

    sendLockRef.current = true;
    setIsCoolingDown(true);
    lastSubmissionRef.current = { at: now, content: normalizedContent };

    const userMessage: ChatMessage = {
      content: nextContent,
      id: createMessageId(),
      role: "user",
    };
    const history = createRequestHistory(messages);
    const localReply = getLocalAssistantReply(nextContent);

    if (nextContent.toLocaleLowerCase("pt-BR") === "ver projetos") {
      document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
    }

    if (localReply) {
      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
        { content: localReply, id: createMessageId(), role: "assistant" },
      ]);
      setInput("");
      releaseSendLock();
      return;
    }

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsCoolingDown(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        body: JSON.stringify({ history, message: nextContent }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = await response.json().catch(() => null);
      const responseError = getErrorFromResponse(data);
      const reply =
        getReplyFromResponse(data) ?? (responseError === "rate_limit" ? rateLimitReply : fallbackReply);

      setMessages((currentMessages) => [
        ...currentMessages,
        { content: reply, id: createMessageId(), role: "assistant" },
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        { content: fallbackReply, id: createMessageId(), role: "assistant" },
      ]);
    } finally {
      setIsLoading(false);
      setIsCoolingDown(true);
      releaseSendLock();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    void sendMessage(suggestion);
  };

  return (
    <div className="floating-assistant">
      {isOpen && (
        <section
          id="assistant-chat"
          role="dialog"
          aria-label="Assistente de IA do site de Wesley Farias"
          className="floating-assistant__panel"
        >
          <div className="assistant-header">
            <div className="assistant-header__icon" aria-hidden="true">
              W
            </div>
            <div className="assistant-header__copy">
              <div className="assistant-header__eyebrow">
                <span aria-hidden="true" />
                Online
              </div>
              <p>Assistente Wesley AI</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="assistant-close"
              aria-label="Fechar assistente"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6.7 6.7 12 12m0 0 5.3 5.3M12 12l5.3-5.3M12 12l-5.3 5.3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div
            className="assistant-messages"
            aria-busy={isLoading}
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="assistant-messages__inner">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={message.id}
                    className={`assistant-message-row ${
                      isUser ? "assistant-message-row--user" : ""
                    }`}
                  >
                    <div
                      className={`assistant-message ${
                        isUser ? "assistant-message--user" : "assistant-message--assistant"
                      }`}
                    >
                      <MessageContent content={message.content} isUser={isUser} />
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="assistant-message-row">
                  <div className="assistant-typing" role="status">
                    <span className="assistant-typing__orb" aria-hidden="true" />
                    <span>Preparando resposta</span>
                    <span className="assistant-typing__dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="assistant-composer">
            <div
              className={`assistant-suggestions ${
                hasConversationStarted ? "assistant-suggestions--compact" : ""
              }`}
              aria-label="Perguntas rápidas"
            >
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isBusy}
                  className="assistant-suggestion"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="assistant-whatsapp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.7l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.2.3 2 3.2 4.9 4.4 2.9 1.1 2.9.7 3.4.7s1.8-.7 2-1.4c.3-.7.3-1.3.2-1.4Z"
                  fill="currentColor"
                />
                <path
                  d="M12 2.5a9.4 9.4 0 0 0-8.1 14.1l-1 3.7 3.8-1A9.4 9.4 0 1 0 12 2.5Zm0 17.1a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.2.6.6-2.1-.2-.3a7.7 7.7 0 1 1 6.1 3.1Z"
                  fill="currentColor"
                />
              </svg>
              Falar no WhatsApp
            </a>

            <form onSubmit={handleSubmit} className="assistant-form">
              <label htmlFor="assistant-message" className="sr-only">
                Mensagem para o assistente
              </label>
              <input
                ref={inputRef}
                id="assistant-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={700}
                placeholder="Digite sua dúvida..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isBusy || !input.trim()}
                aria-label="Enviar mensagem"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="m5 12 14-7-4 14-3-5-7-2Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <path
                    d="m12 14 7-9"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="assistant-launcher"
        aria-controls="assistant-chat"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar assistente de IA" : "Abrir assistente de IA"}
      >
        <span className="assistant-launcher__icon">
          W
        </span>
        <span>Assistente IA</span>
      </button>
    </div>
  );
}
