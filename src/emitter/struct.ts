import { GoStruct, StructRegistry } from "@/types/GoTypes";
import { toGoFieldName } from "./utils";

export function emitStruct(struct: GoStruct): string {
  let str = `type ${struct.name} struct {\n`;
  for (const f of struct.fields) {
    str += `\t${toGoFieldName(f.jsonTag)} ${f.goType} \`json:"${f.jsonTag}${f.omitempty ? ",omitempty" : ""}"\`\n`;
  }
  return str + "}";
}

export function buildImports(registry: StructRegistry): string {
  const needsTime = [...registry.values()]
    .flatMap((s) => s.fields)
    .some((f) => f.goType === "time.Time");

  return needsTime ? `import "time"\n\n` : "";
}