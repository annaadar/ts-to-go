import ts from "typescript";
import { EnumRegistry, StructRegistry } from "@/types/GoTypes";
import { ParsedProgram } from "@/types/ParsedProgram";
import { visitInterface } from "./interfaces";
import { visitTypeAlias } from "./typealias";
import { visitEnum } from "./enum";

export function extractStructs(parsed: ParsedProgram): {
  structRegistry: StructRegistry;
  enumRegistry: EnumRegistry;
} {
  const structRegistry: StructRegistry = new Map();
  const enumRegistry: EnumRegistry = new Map();
  for (const sourceFile of parsed.sourceFiles) {
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        visitInterface(node, structRegistry);
      } else if (ts.isTypeAliasDeclaration(node)) {
        visitTypeAlias(node, structRegistry);
      } else if (ts.isEnumDeclaration(node)) {
        visitEnum(node, enumRegistry);
      }
    });
  }

  return { structRegistry, enumRegistry };
}
