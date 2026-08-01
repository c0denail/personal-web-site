"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";
import styles from "./chatbot.module.css";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

class ChatResponseError extends Error {}

const CHAT_COPY = {
  tr: {
    welcome:
      "Merhaba, ben c0denail proje asistanıyım. İhtiyacını anlat; uygun hizmeti, paketi ve sonraki adımı birlikte netleştirelim.",
    quickPrompts: [
      "Bana uygun paketi bul",
      "Web sitesi seçenekleri",
      "E-ticaret özellikleri",
      "AI ajanı geliştirmek istiyorum",
      "Mobil uygulama paketleri",
      "İşletmemi otomatikleştirmek istiyorum",
      "Oyun projesi planlıyorum",
      "Finans sistemi paketleri",
      "Tüm başlangıç fiyatları",
      "Teslim süreleri",
      "Hangi teknolojiler kullanılıyor?",
      "Proje süreci nasıl işliyor?",
      "Yayın sonrası destek var mı?",
      "Hazır tema kullanılıyor mu?",
      "Ek modüller neler?",
      "İletişime geçmek istiyorum",
    ],
    assistantLabel: "c0denail proje asistanı",
    status: "Proje danışmanı · çevrimiçi",
    resetLabel: "Yeni sohbet başlat",
    resetTitle: "Yeni sohbet",
    closeLabel: "Sohbeti kapat",
    loadingLabel: "Yanıt hazırlanıyor",
    quickStart: "Hızlı başlangıç",
    quoteLabel: "Detaylı teklif için",
    contactButton: "İletişim formuna git",
    placeholder: "Projenle ilgili bir şey sor…",
    messageLabel: "Mesajın",
    sendLabel: "Mesajı gönder",
    send: "Gönder",
    disclaimer:
      "Yanıtlar sitedeki içeriklerle sınırlıdır; kesin kapsam görüşmede netleşir.",
    launcherTitle: "Bir fikrin mi var?",
    launcherSubtitle: "Asistana sor",
    openLabel: "Proje asistanını aç",
    responseError: "Yanıt alınamadı.",
    genericError: "Şu anda yanıt oluşturamıyorum. Lütfen tekrar dene.",
  },
  en: {
    welcome:
      "Hi, I’m the c0denail project assistant. Tell me what you need and I’ll help you narrow down the right service, package, and next step.",
    quickPrompts: [
      "Help me choose a package",
      "Website options",
      "E-commerce features",
      "I want to build an AI agent",
      "Mobile app packages",
      "I want to automate my business",
      "I’m planning a game project",
      "Finance system packages",
      "All starting prices",
      "Delivery timelines",
      "Which technologies do you use?",
      "How does the project process work?",
      "Is post-launch support available?",
      "Do you use ready-made themes?",
      "What add-ons are available?",
      "I’d like to get in touch",
    ],
    assistantLabel: "c0denail project assistant",
    status: "Project consultant · online",
    resetLabel: "Start a new chat",
    resetTitle: "New chat",
    closeLabel: "Close chat",
    loadingLabel: "Preparing a response",
    quickStart: "Quick start",
    quoteLabel: "For a detailed quote",
    contactButton: "Go to the contact form",
    placeholder: "Ask something about your project…",
    messageLabel: "Your message",
    sendLabel: "Send message",
    send: "Send",
    disclaimer:
      "Answers are limited to the content on this site; the final scope is confirmed during a call.",
    launcherTitle: "Have an idea?",
    launcherSubtitle: "Ask the assistant",
    openLabel: "Open project assistant",
    responseError: "No response was received.",
    genericError: "I can’t generate a response right now. Please try again.",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

function getStartMessage(locale: Locale): Message {
  return {
    id: "welcome",
    role: "assistant",
    content: CHAT_COPY[locale].welcome,
  };
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function RobotMascot({ thinking = false }: { thinking?: boolean }) {
  return (
    <span className={styles.robot} aria-hidden="true">
      {thinking && (
        <span className={styles.thinkingBubble}>
          <i />
          <i />
          <i />
        </span>
      )}
      <span className={styles.antenna}>
        <i />
      </span>
      <span className={styles.head}>
        <span className={`${styles.ear} ${styles.earLeft}`} />
        <span className={`${styles.ear} ${styles.earRight}`} />
        <span className={styles.face}>
          <i className={styles.eyeLeft} />
          <i className={styles.eyeRight} />
        </span>
        <span className={styles.chatTail} />
      </span>
      <span className={styles.body}>
        <span className={styles.chest}>&gt;_</span>
        <i className={`${styles.arm} ${styles.armLeft}`} />
        <i className={`${styles.arm} ${styles.armRight}`} />
        <i className={`${styles.leg} ${styles.legLeft}`} />
        <i className={`${styles.leg} ${styles.legRight}`} />
      </span>
    </span>
  );
}

export default function Chatbot({ locale }: { locale: Locale }) {
  const copy = CHAT_COPY[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([getStartMessage(locale)]);
  const [visitorId, setVisitorId] = useState("guest");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const localeRef = useRef(locale);
  localeRef.current = locale;

  useEffect(() => {
    const stored = window.localStorage.getItem("c0denail-chat-visitor");
    if (stored) {
      setVisitorId(stored);
      return;
    }

    const created =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : makeId("visitor");
    window.localStorage.setItem("c0denail-chat-visitor", created);
    setVisitorId(created);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, isLoading, messages]);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 220);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim();
    if (!content || isLoading) return;
    const requestLocale = locale;

    const userMessage: Message = {
      id: makeId("user"),
      role: "user",
      content: content.slice(0, 1200),
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const [response] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            locale: requestLocale,
            messages: nextMessages
              .filter((message) => !message.isError)
              .slice(-12)
              .map(({ role, content: messageContent }) => ({
                role,
                content: messageContent,
              })),
          }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, 650)),
      ]);
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
      };

      if (!response.ok || !result.message) {
        throw new ChatResponseError(result.message || copy.responseError);
      }

      if (localeRef.current !== requestLocale) return;

      setMessages((current) => [
        ...current,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: result.message!,
        },
      ]);
    } catch (error) {
      if (localeRef.current !== requestLocale) return;
      setMessages((current) => [
        ...current,
        {
          id: makeId("error"),
          role: "assistant",
          content:
            error instanceof ChatResponseError
              ? error.message
              : copy.genericError,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const resetChat = () => {
    setMessages([getStartMessage(locale)]);
    setInput("");
    setIsLoading(false);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const openContact = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 180);
  };

  const hasConversation = messages.some((message) => message.role === "user");

  return (
    <aside className={styles.chatbot} aria-label={copy.assistantLabel}>
      <section
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        id="c0denail-chat-panel"
        aria-hidden={!isOpen}
      >
        <header className={styles.panelHeader}>
          <span className={styles.headerAvatar}>
            <RobotMascot thinking={isLoading} />
          </span>
          <span className={styles.headerCopy}>
            <strong>c0denail assistant</strong>
            <small>
              <i /> {copy.status}
            </small>
          </span>
          <button
            className={styles.resetButton}
            type="button"
            onClick={resetChat}
            aria-label={copy.resetLabel}
            title={copy.resetTitle}
          >
            ↻
          </button>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={copy.closeLabel}
          >
            ×
          </button>
        </header>

        <div className={styles.messages} aria-live="polite">
          {messages.map((message) => (
            <div
              className={`${styles.messageRow} ${
                message.role === "user" ? styles.messageRowUser : ""
              }`}
              key={message.id}
            >
              {message.role === "assistant" && (
                <span className={styles.messageAvatar}>
                  <RobotMascot />
                </span>
              )}
              <p
                className={`${styles.message} ${
                  message.role === "user" ? styles.userMessage : styles.assistantMessage
                } ${message.isError ? styles.errorMessage : ""}`}
              >
                {message.id === "welcome" ? copy.welcome : message.content}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className={styles.messageRow}>
              <span className={styles.messageAvatar}>
                <RobotMascot thinking />
              </span>
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <span className={styles.typingDots} aria-label={copy.loadingLabel}>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {!hasConversation && (
          <div className={styles.quickArea}>
            <span>{copy.quickStart}</span>
            <div className={styles.quickPrompts}>
              {copy.quickPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => void sendMessage(prompt)}
                  disabled={isLoading}
                >
                  {prompt} <i>↗</i>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.contactStrip}>
          <span>{copy.quoteLabel}</span>
          <button type="button" onClick={openContact}>
            {copy.contactButton} <i>↗</i>
          </button>
        </div>

        <form className={styles.composer} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={1200}
            placeholder={copy.placeholder}
            aria-label={copy.messageLabel}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label={copy.sendLabel}
          >
            <span>{copy.send}</span>
            <i>↑</i>
          </button>
        </form>
        <small className={styles.disclaimer}>
          {copy.disclaimer}
        </small>
      </section>

      <button
        className={`${styles.launcher} ${isOpen ? styles.launcherOpen : ""}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? copy.closeLabel : copy.openLabel}
        aria-controls="c0denail-chat-panel"
        aria-expanded={isOpen}
      >
        <span className={styles.launcherLabel}>
          <strong>{copy.launcherTitle}</strong>
          <small>{copy.launcherSubtitle}</small>
        </span>
        <RobotMascot thinking={isLoading} />
      </button>
    </aside>
  );
}
