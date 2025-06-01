import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

import { indexHtml } from "@server/helpers/elysia";
import { Path } from "@shared/constants";

export const plugins = new Elysia().use(cors()).use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				baseUri: ["'self'"],
				childSrc: ["'self'"],
				connectSrc: ["'self'"],
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
				workerSrc: ["'self'"]
			}
		}
	})
);

export const serveStatic = new Elysia()
	.use(
		staticPlugin({
			prefix: "/",
			assets: Path.Public,
			indexHTML: true,
			noCache: true,
			alwaysStatic: true
		})
	)
	.get("*", indexHtml);
