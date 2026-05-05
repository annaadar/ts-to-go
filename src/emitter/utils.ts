import { EnumRegistry, StructRegistry } from "@/types/GoTypes";
import { emitEnum } from "./enum";
import { emitStruct } from "./struct";

export function toGoFieldName(name: string): string {
  // camelCase → PascalCase:  userId → UserId,  isActive → IsActive
  return name.charAt(0).toUpperCase() + name.slice(1);
}


export function buildBody(registry: StructRegistry, enums: EnumRegistry): string {
  const enumDeclarations = [...enums.values()].map(emitEnum).join("\n\n");
  const structs = [...registry.values()].map(emitStruct).join("\n\n");
  return [enumDeclarations, structs].filter(Boolean).join("\n\n");
}