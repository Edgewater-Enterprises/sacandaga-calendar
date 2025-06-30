import { Config } from "@server/helpers/config";
import { onError } from "@server/helpers/error";
import { plugins } from "@server/helpers/plugins";
import { Elysia } from "elysia";

const { PORT } = Config;

new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
  .onError(c => onError(c))
  .use(plugins)
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
