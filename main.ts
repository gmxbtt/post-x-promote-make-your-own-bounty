// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
//
// The entry itself is the X post: one post of Derr's own on X that quotes
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of his
// own attached, make.fun / @makefunai and his play code in its text.
// POST.json names that post, and the house reads its replies, reposts and
// quotes from X. This program's only job is to hand POST.json to the gate:
// it copies POST.json from the repository root to /output/POST.json, where
// the gate reads it. Nothing this program writes about the post is scored.
//
// The live post (verified 25 Nov 2026, 00:31-00:34 WIB): a quote of the
// make.fun post above, photo attached, from @kenneloutis0:
// https://x.com/kenneloutis0/status/2125191777066054054
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SOURCE_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const TARGET_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const FILE_NAME = 'POST.json';

const sourcePath = resolve(join(SOURCE_DIR, FILE_NAME));
const targetPath = resolve(join(TARGET_DIR, FILE_NAME));

// The submission must name a real post, so refuse an empty or placeholder
// address instead of handing the gate a file it will reject.
function loadSubmission(): { url: string } {
  if (!existsSync(sourcePath)) {
    throw new Error(`submission file missing: ${sourcePath}`);
  }
  const parsed: unknown = JSON.parse(readFileSync(sourcePath, 'utf8'));
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    typeof (parsed as { url?: unknown }).url !== 'string'
  ) {
    throw new Error('POST.json must be an object with a string "url" field');
  }
  const address = (parsed as { url: string }).url.trim();
  if (!address.startsWith('https://x.com/') || address.includes('<')) {
    throw new Error(`POST.json holds no real post address: ${address}`);
  }
  return { url: address };
}

function main(): void {
  const submission = loadSubmission();
  mkdirSync(TARGET_DIR, { recursive: true });
  copyFileSync(sourcePath, targetPath);
  console.log(`POST.json delivered to ${targetPath}: ${submission.url}`);
}

try {
  main();
} catch (err) {
  console.error(`POST.json could not be delivered: ${(err as Error).message}`);
  process.exit(1);
}
