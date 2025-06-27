import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { Elysia } from "elysia";

import { Config } from "@server/helpers/config";
import { createHttpAdapter, onError } from "@server/helpers/elysia";
import { plugins, serveStatic } from "@server/helpers/plugins";
import { Path } from "@shared/constants";

const { PORT } = Config;

const app = new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
  .onError(c => onError(c))
  .use(plugins);

if (existsSync(Path.Public)) app.use(serveStatic);

const server = createServer(createHttpAdapter(app));

server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
