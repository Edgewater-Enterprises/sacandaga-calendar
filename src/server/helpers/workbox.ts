import { HASH_REGEX, Path } from "@shared/constants";
import { injectManifest } from "workbox-build";

const outDir = Path.Public;

console.log("Injecting build manifest into sw.js...");

const { count } = await injectManifest({
  globDirectory: outDir,
  globPatterns: ["**/*.*"],
  swSrc: `${outDir}/sw.js`,
  swDest: `${outDir}/sw.js`,
  maximumFileSizeToCacheInBytes: 5000000,
  dontCacheBustURLsMatching: HASH_REGEX,
});

console.log(`${count} URLs were injected ✅`);
