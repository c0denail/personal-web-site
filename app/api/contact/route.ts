import { NextResponse } from "next/server";
import type { Locale } from "../../i18n";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestLog = new Map<string, number[]>();

const API_COPY = {
  tr: {
    invalidRequest: "Geçersiz istek.",
    invalidLocale: "Desteklenmeyen dil seçeneği.",
    rateLimit: "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.",
    invalidForm: "Geçersiz form verisi.",
    invalidFields: "Lütfen zorunlu alanları geçerli bilgilerle doldurun.",
    serviceUnavailable:
      "Gönderim servisi şu anda hazır değil. Lütfen doğrudan e-posta gönderin.",
    serviceUnreachable:
      "Gönderim servisine ulaşılamadı. Lütfen biraz sonra tekrar deneyin.",
    sendFailed: "Mesaj gönderilemedi. Lütfen biraz sonra tekrar deneyin.",
  },
  en: {
    invalidRequest: "Invalid request.",
    invalidLocale: "Unsupported language selection.",
    rateLimit: "Too many attempts were made. Please try again later.",
    invalidForm: "Invalid form data.",
    invalidFields: "Please complete all required fields with valid information.",
    serviceUnavailable:
      "The delivery service is not available right now. Please email us directly.",
    serviceUnreachable:
      "The delivery service could not be reached. Please try again later.",
    sendFailed: "Your message could not be sent. Please try again later.",
  },
} satisfies Record<Locale, Record<string, string>>;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
  locale?: unknown;
};

function isLocale(value: unknown): value is Locale {
  return value === "tr" || value === "en";
}

function getHeaderLocale(request: Request): Locale {
  return request.headers.get("accept-language")?.toLowerCase().startsWith("en")
    ? "en"
    : "tr";
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  if (requestLog.size > 5000) {
    requestLog.clear();
  }

  const recentRequests = (requestLog.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(identifier, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(identifier, recentRequests);
  return false;
}

export async function POST(request: Request) {
  const headerLocale = getHeaderLocale(request);
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json(
          { message: API_COPY[headerLocale].invalidRequest },
          { status: 403 },
        );
      }
    } catch {
      return NextResponse.json(
        { message: API_COPY[headerLocale].invalidRequest },
        { status: 403 },
      );
    }
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const identifier = forwardedFor?.split(",")[0]?.trim() || "unknown";

  let payload: ContactRequest;

  try {
    const parsedPayload: unknown = await request.json();

    if (
      !parsedPayload ||
      typeof parsedPayload !== "object" ||
      Array.isArray(parsedPayload)
    ) {
      throw new Error("Invalid payload");
    }

    payload = parsedPayload as ContactRequest;
  } catch {
    return NextResponse.json(
      { message: API_COPY[headerLocale].invalidForm },
      { status: 400 },
    );
  }

  if (payload.locale !== undefined && !isLocale(payload.locale)) {
    return NextResponse.json(
      { message: API_COPY[headerLocale].invalidLocale },
      { status: 400 },
    );
  }

  const locale: Locale = isLocale(payload.locale) ? payload.locale : "tr";
  const copy = API_COPY[locale];

  if (isRateLimited(identifier)) {
    return NextResponse.json({ message: copy.rateLimit }, { status: 429 });
  }

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160).toLowerCase();
  const company = clean(payload.company, 120);
  const service = singleLine(clean(payload.service, 120));
  const budget = singleLine(clean(payload.budget, 80));
  const message = clean(payload.message, 4000);
  const website = clean(payload.website, 200);

  // This field is hidden from real users. Bots commonly fill it in.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !EMAIL_PATTERN.test(email) || !service || !budget || message.length < 10) {
    return NextResponse.json(
      { message: copy.invalidFields },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "info@c0denail.com";

  if (!apiKey || !fromEmail) {
    console.error("Contact form email configuration is missing.");
    return NextResponse.json(
      { message: copy.serviceUnavailable },
      { status: 503 },
    );
  }

  const emailText = [
    "Yeni proje talebi",
    "",
    `İsim: ${name}`,
    `E-posta: ${email}`,
    `Şirket / marka: ${company || "Belirtilmedi"}`,
    `İlgilenilen hizmet: ${service}`,
    `Bütçe: ${budget}`,
    `Dil: ${locale === "tr" ? "Türkçe (tr)" : "English (en)"}`,
    "",
    "Proje notu:",
    message,
  ].join("\n");

  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${crypto.randomUUID()}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Yeni proje talebi — ${service}`,
        text: emailText,
      }),
    });
  } catch (error) {
    console.error("Resend email request could not be completed.", error);
    return NextResponse.json(
      { message: copy.serviceUnreachable },
      { status: 502 },
    );
  }

  if (!resendResponse.ok) {
    const providerError = await resendResponse.text();
    console.error("Resend email request failed.", resendResponse.status, providerError.slice(0, 500));
    return NextResponse.json(
      { message: copy.sendFailed },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
