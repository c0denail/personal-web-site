"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./chatbot.module.css";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

const START_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Merhaba, ben c0denail proje asistanıyım. İhtiyacını anlat; uygun hizmeti, paketi ve sonraki adımı birlikte netleştirelim.",
};

const QUICK_PROMPTS = [
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
];

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

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE]);
  const [visitorId, setVisitorId] = useState("guest");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      const result = (await response.json()) as { message?: string };

      if (!response.ok || !result.message) {
        throw new Error(result.message || "Yanıt alınamadı.");
      }

      setMessages((current) => [
        ...current,
        {
          id: makeId("assistant"),
          role: "assistant",
          content: result.message!,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: makeId("error"),
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Şu anda yanıt oluşturamıyorum. Lütfen tekrar dene.",
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
    setMessages([START_MESSAGE]);
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
    <aside className={styles.chatbot} aria-label="c0denail proje asistanı">
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
              <i /> Proje danışmanı · çevrimiçi
            </small>
          </span>
          <button
            className={styles.resetButton}
            type="button"
            onClick={resetChat}
            aria-label="Yeni sohbet başlat"
            title="Yeni sohbet"
          >
            ↻
          </button>
          <button
            className={styles.closeButton}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Sohbeti kapat"
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
                {message.content}
              </p>
            </div>
          ))}

          {isLoading && (
            <div className={styles.messageRow}>
              <span className={styles.messageAvatar}>
                <RobotMascot thinking />
              </span>
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <span className={styles.typingDots} aria-label="Yanıt hazırlanıyor">
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
            <span>Hızlı başlangıç</span>
            <div className={styles.quickPrompts}>
              {QUICK_PROMPTS.map((prompt) => (
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
          <span>Detaylı teklif için</span>
          <button type="button" onClick={openContact}>
            İletişim formuna git <i>↗</i>
          </button>
        </div>

        <form className={styles.composer} onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={1200}
            placeholder="Projenle ilgili bir şey sor…"
            aria-label="Mesajın"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            aria-label="Mesajı gönder"
          >
            <span>Gönder</span>
            <i>↑</i>
          </button>
        </form>
        <small className={styles.disclaimer}>
          Yanıtlar sitedeki içeriklerle sınırlıdır; kesin kapsam görüşmede netleşir.
        </small>
      </section>

      <button
        className={`${styles.launcher} ${isOpen ? styles.launcherOpen : ""}`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Sohbeti kapat" : "Proje asistanını aç"}
        aria-controls="c0denail-chat-panel"
        aria-expanded={isOpen}
      >
        <span className={styles.launcherLabel}>
          <strong>Bir fikrin mi var?</strong>
          <small>Asistana sor</small>
        </span>
        <RobotMascot thinking={isLoading} />
      </button>
    </aside>
  );
}
