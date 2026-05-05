import { StructRegistry, EnumRegistry } from "@/types/GoTypes";
import { buildImports } from "./struct";
import { buildBody } from "./utils";

export function emitFile(
  registry: StructRegistry,
  enums: EnumRegistry,
): string {
  const imports = buildImports(registry);
  const body = buildBody(registry, enums);
  return `package models\n\n${imports}${body}\n`;
}
