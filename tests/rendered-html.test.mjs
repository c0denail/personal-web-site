import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps theme, contact and pricing interactions in the client page", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /use client/);
  assert.match(page, /mailto:/);
  assert.match(page, /quick_quote --interactive/);
  assert.match(page, /localStorage\.setItem/);
  assert.match(layout, /lang="tr"/);
  assert.match(css, /:root\[data-theme="light"\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
