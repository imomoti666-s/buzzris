import { cp, mkdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = resolve(root, "dist");
const files = [
  "index.html",
  "manifest.webmanifest",
  "service-worker.js",
  "README.md",
  "CHANGELOG_v0_30_0.md",
  "CARD_AUDIT_v0_27_8.md",
  "assets"
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const file of files) {
  await stat(resolve(root, file));
  await cp(resolve(root, file), resolve(out, file), { recursive: true });
}

console.log(`Built ${files.length} files into ${out}`);
