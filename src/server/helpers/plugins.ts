import { existsSync } from "node:fs";
import { staticPlugin } from "@elysiajs/static";
import { API_URL_DEV, API_URL_PROD, Path } from "@shared/constants";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

export const plugins = new Elysia().use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        baseUri: ["'self'"],
        childSrc: ["'self'"],
        connectSrc: ["'self'", API_URL_DEV, API_URL_PROD],
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", "data:"],
        manifestSrc: ["'self'"],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'"],
        scriptSrcAttr: ["'none'"],
        scriptSrcElem: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        styleSrcAttr: ["'self'", "'unsafe-inline'"],
        styleSrcElem: ["'self'", "'unsafe-inline'"],
        upgradeInsecureRequests: [],
        workerSrc: ["'self'"],
      },
    },
  }),
);

if (existsSync(Path.Public)) {
  const serveStatic = new Elysia()
    .use(
      staticPlugin({
        prefix: "/",
        assets: Path.Public,
        indexHTML: true,
        alwaysStatic: true,
        noCache: true,
      }),
    )
    // SPA index.html fallback to enable client-side routing
    .get("*", ({ path }) => {
      const url = path.split("/").pop();
      if (url && !url.includes(".")) return Bun.file(`${Path.Public}/index.html`);
    });
  plugins.use(serveStatic);
}
