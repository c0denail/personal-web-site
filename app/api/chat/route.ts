import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSiteAnswer } from "../../data/chatbot-knowledge";

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
  let body: { messages?: unknown; visitorId?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: "Geçersiz istek." }, { status: 400 });
  }

  const messages = normalizeMessages(body.messages);
  if (!messages.length || messages.at(-1)?.role !== "user") {
    return NextResponse.json(
      { message: "Göndermek için geçerli bir mesaj yazmalısın." },
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
      { message: "Kısa sürede çok fazla mesaj gönderildi. Birkaç dakika sonra tekrar dene." },
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
      message: getSiteAnswer(lastMessage, conversation),
      source: "site-content",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
