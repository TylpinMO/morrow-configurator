import { readFile, writeFile } from "node:fs/promises";

const configPath = new URL("../dist/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(configPath, "utf8"));

if (Array.isArray(config.compatibility_flags) && config.compatibility_flags.length === 0) {
  delete config.compatibility_flags;
  await writeFile(configPath, JSON.stringify(config));
}
