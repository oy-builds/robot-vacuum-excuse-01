import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vacuum's excuse, in its own voice.
const LINE =
  "I left that dust bunny alive — it unionized with the cat hair and I don't negotiate with crumbs.";

const MAX_CHARS = 120;

function main(): void {
  // Gate: UTF-8 text, 1-120 characters, not only whitespace, single line.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
