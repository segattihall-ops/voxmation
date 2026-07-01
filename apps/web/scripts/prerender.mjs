// Static prerender: renders each marketing route to crawlable HTML using the
// SSR bundle, so non-JS crawlers and AI answer engines get real content + head.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const { render, ALL_PRERENDER_ROUTES } = await import(
  join(distDir, "server", "entry-server.js")
);

// Read the client-built index.html to harvest the hashed asset tags
// (module script, stylesheet, modulepreload) that Vite injected.
const clientHtml = readFileSync(join(distDir, "index.html"), "utf-8");

function matchAll(re) {
  return [...clientHtml.matchAll(re)].map((m) => m[0]);
}
const scriptTags = matchAll(/<script\b[^>]*type="module"[^>]*><\/script>/g);
const styleTags = matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g);
const preloadTags = matchAll(/<link\b[^>]*rel="modulepreload"[^>]*>/g);

const assetsHead = [...styleTags, ...preloadTags].join("\n    ");
const assetsBody = scriptTags.join("\n    ");

function page(head, bodyHtml) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${head}
    ${assetsHead}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
    ${assetsBody}
  </body>
</html>
`;
}

let count = 0;
for (const route of ALL_PRERENDER_ROUTES) {
  const { html, head } = render(route);
  const out =
    route === "/"
      ? join(distDir, "index.html")
      : join(distDir, route.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page(head, html), "utf-8");
  count++;
  console.log(`prerendered ${route} -> ${out.replace(distDir, "dist")}`);
}
console.log(`\n✓ prerendered ${count} routes`);
