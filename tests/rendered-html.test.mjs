import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the c0denail portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="tr"/i);
  assert.match(html, /<title>Emirhan Tuncer — Creative Developer<\/title>/i);
  assert.match(html, /Fikri/);
  assert.match(html, /c0denail/);
  assert.match(html, /Hizmetler/);
  assert.match(html, /Paketler/);
  assert.match(html, /Lab \/ Teknik Günlük/);
  assert.match(html, /Tüm Lab(?:’|')i gör/);
  assert.match(html, /href="\/lab(?:#prompt-inspector)?"/i);
  assert.match(html, /Prompt Kapsam Denetleyicisi/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("server-renders localized Lab routes and the prompt inspector", async () => {
  const [trResponse, enResponse] = await Promise.all([
    render("/lab"),
    render("/en/lab"),
  ]);

  assert.equal(trResponse.status, 200);
  assert.equal(enResponse.status, 200);
  assert.match(trResponse.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(enResponse.headers.get("content-type") ?? "", /^text\/html\b/i);

  const [trHtml, enHtml] = await Promise.all([
    trResponse.text(),
    enResponse.text(),
  ]);

  assert.match(trHtml, /<html lang="tr"/i);
  assert.match(trHtml, /<h1\b[^>]*>[\s\S]*?Lab\s*\/[\s\S]*?Teknik Günlük[\s\S]*?<\/h1>/i);
  assert.match(trHtml, /Çalışan küçük araçlar, erken prototipler/);
  assert.match(trHtml, /Prompt Kapsam Denetleyicisi/);
  assert.match(trHtml, /İsteğini göndermeden önce dört temel yapısal öğeyi kontrol et/);
  assert.match(trHtml, /Denetlenecek prompt/);
  assert.match(trHtml, /KAPSAM PUANI/);

  assert.match(enHtml, /<html lang="en"/i);
  assert.match(enHtml, /<h1\b[^>]*>[\s\S]*?Lab\s*\/[\s\S]*?Technical Journal[\s\S]*?<\/h1>/i);
  assert.match(enHtml, /Small working tools, early prototypes/);
  assert.match(enHtml, /Prompt Scope Inspector/);
  assert.match(enHtml, /Check four essential structural elements before sending your request/);
  assert.match(enHtml, /Prompt to inspect/);
  assert.match(enHtml, /SCOPE SCORE/);
});

test("keeps both locales and interactive features wired to the shared client page", async () => {
  const [
    page,
    trLayout,
    enLayout,
    enPage,
    homeUi,
    css,
    packageJson,
    labPage,
    labCard,
    promptInspector,
    labData,
    i18n,
    trLabRoute,
    enLabRoute,
  ] = await Promise.all([
    readFile(new URL("../app/components/HomePage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(tr)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(en)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(en)/en/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/home-ui.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LabPage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LabCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/PromptInspector.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/lab.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/(tr)/lab/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/(en)/en/lab/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /use client/);
  assert.match(page, /quick_quote --interactive/);
  assert.match(page, /localStorage\.setItem/);
  assert.match(page, /otherLocale\(locale\)/);
  assert.match(page, /labHref\(locale\)/);
  assert.match(page, /<LabCard\b/);
  assert.match(trLayout, /lang="tr"/);
  assert.match(enLayout, /lang="en"/);
  assert.match(enPage, /locale="en"/);
  assert.match(homeUi, /What can we build\?/);
  assert.match(homeUi, /Ne inşa edebiliriz\?/);
  assert.match(css, /:root\[data-theme="light"\]/);
  assert.match(css, /\.language-switch/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(labPage, /<PromptInspector\b/);
  assert.match(labPage, /getLabEntries\s*\(\s*locale\s*\)/);
  assert.match(labCard, /labHref\(locale\)/);
  assert.match(promptInspector, /use client/);
  assert.match(promptInspector, /<textarea\b/);
  assert.match(labData, /id:\s*["']prompt-inspector["']/);
  assert.match(labData, /Prompt Kapsam Denetleyicisi/);
  assert.match(labData, /Prompt Scope Inspector/);
  assert.match(i18n, /export function labHref\s*\(\s*locale:\s*Locale\s*\)/);
  assert.match(i18n, /locale === ["']tr["']\s*\?\s*["']\/lab["']\s*:\s*["']\/en\/lab["']/);
  assert.match(trLabRoute, /const locale\s*=\s*["']tr["']/);
  assert.match(enLabRoute, /const locale\s*=\s*["']en["']/);
  assert.match(trLabRoute, /<LabPage\s+locale=\{locale\}/);
  assert.match(enLabRoute, /<LabPage\s+locale=\{locale\}/);
});
