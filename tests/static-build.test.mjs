import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const output = new URL("../dist/", import.meta.url);

test("production build contains the configurator and its assets", async () => {
  await access(new URL("index.html", output));
  const html = await readFile(new URL("index.html", output), "utf8");
  assert.match(html, /Morrow 01 — Product configurator/);
  assert.match(html, /<div id="root"><\/div>/);

  const assets = await readdir(new URL("assets/", output));
  const script = assets.find((name) => name.endsWith(".js"));
  assert.ok(script, "expected a JavaScript bundle");
  const bundle = await readFile(new URL(`assets/${script}`, output), "utf8");
  assert.match(bundle, /Built for the work in front of you/);
});
