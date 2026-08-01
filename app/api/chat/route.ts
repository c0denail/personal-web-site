import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSiteAnswer } from "../../data/chatbot-knowledge";
import type { Locale } from "../../i18n";

export const runtime = "nodejs";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 15;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;

const API_COPY = {
  tr: {
    invalidRequest: "Geçersiz istek.",
    invalidLocale: "Desteklenmeyen dil seçeneği.",
    missingMessage: "Göndermek için geçerli bir mesaj yazmalısın.",
    rateLimit:
      "Kısa sürede çok fazla mesaj gönderildi. Birkaç dakika sonra tekrar dene.",
  },
  en: {
    invalidRequest: "Invalid request.",
    invalidLocale: "Unsupported language selection.",
    missingMessage: "Please enter a valid message before sending.",
    rateLimit: "Too many messages were sent in a short time. Please try again in a few minutes.",
  },
} satisfies Record<Locale, Record<string, string>>;

const globalRateLimit = globalThis as typeof globalThis & {
  c0denailChatRateLimit?: Map<string, RateEntry>;
};

const rateLimitStore =
  globalRateLimit.c0denailChatRateLimit ??
  (globalRateLimit.c0denailChatRateLimit = new Map<string, RateEntry>());

function getRequestAddress(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

function isLocale(value: unknown): value is Locale {
  return value === "tr" || value === "en";
}

function getHeaderLocale(request: NextRequest): Locale {
  return request.headers.get("accept-language")?.toLowerCase().startsWith("en")
    ? "en"
    : "tr";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT) return true;
  current.count += 1;
  return false;
}

function normalizeMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_MESSAGES)
    .filter(
      (item): item is ChatMessage =>
        Boolean(
          item &&
            typeof item === "object" &&
            "role" in item &&
            (item.role === "user" || item.role === "assistant") &&
            "content" in item &&
            typeof item.content === "string",
        ),
    )
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((item) => item.content.length > 0);
}

export async function POST(request: NextRequest) {
  const headerLocale = getHeaderLocale(request);
  let body: { messages?: unknown; visitorId?: unknown; locale?: unknown };
  try {
    const parsedBody: unknown = await request.json();
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      throw new Error("Invalid request body");
    }
    body = parsedBody as typeof body;
  } catch {
    return NextResponse.json(
      { message: API_COPY[headerLocale].invalidRequest },
      { status: 400 },
    );
  }

  if (body.locale !== undefined && !isLocale(body.locale)) {
    return NextResponse.json(
      { message: API_COPY[headerLocale].invalidLocale },
      { status: 400 },
    );
  }

  const locale: Locale = isLocale(body.locale) ? body.locale : "tr";
  const copy = API_COPY[locale];

  const messages = normalizeMessages(body.messages);
  if (!messages.length || messages.at(-1)?.role !== "user") {
    return NextResponse.json(
      { message: copy.missingMessage },
      { status: 400 },
    );
  }

  const lastMessage = messages.at(-1)!.content;
  const rawVisitorId =
    typeof body.visitorId === "string" ? body.visitorId.slice(0, 100) : "guest";
  const requestAddress = getRequestAddress(request);
  const rateIdentifier = createHash("sha256")
    .update(`${requestAddress}:${rawVisitorId}`)
    .digest("hex");

  if (isRateLimited(rateIdentifier)) {
    return NextResponse.json(
      { message: copy.rateLimit },
      { status: 429 },
    );
  }

  const conversation = messages
    .filter((message) => message.role === "user")
    .slice(-3)
    .map((message) => message.content)
    .join(" ");

  return NextResponse.json(
    {
      message: getSiteAnswer(lastMessage, conversation, locale),
      source: "site-content",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
