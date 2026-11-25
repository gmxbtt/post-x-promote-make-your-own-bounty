// post-x-promote entry: hand make.fun the URL of the X post that promotes
// make.fun's make-your-own-bounty announcement, so the promotion can be verified.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const INPUT = join(HERE, "POST.json");
const OUTPUT_DIR = "/output";
const OUTPUT = join(OUTPUT_DIR, "POST.json");

const raw = readFileSync(INPUT, "utf8");
const post = JSON.parse(raw) as { url?: unknown };
if (typeof post.url !== "string" || !post.url.startsWith("https://x.com/")) {
  throw new Error("POST.json must carry a valid https://x.com/ post URL");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT, `${JSON.stringify(post, null, 2)}\n`, "utf8");
console.log(`Wrote ${OUTPUT} for ${post.url}`);
