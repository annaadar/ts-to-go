import { parseFiles } from "./parser";
import { extractStructs } from "./extractor/index";
import { emitFile } from "./emitter/index";

const filePaths = process.argv.slice(2);

if (filePaths.length === 0) {
  console.error("Usage: npx tsx src/index.ts <file.ts> [file2.ts ...]");
  process.exit(1);
}

const parsed = parseFiles(filePaths);
const { structRegistry, enumRegistry } = extractStructs(parsed);
const output = emitFile(structRegistry, enumRegistry);

console.log(output);