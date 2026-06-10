import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import AppRoutes, { PRERENDER_ROUTES } from "./routes";
import { BLOG_POSTS } from "./blog/posts";

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}

// Full set of routes to prerender, including dynamic blog post URLs.
export const ALL_PRERENDER_ROUTES = [
  ...PRERENDER_ROUTES,
  ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
];
