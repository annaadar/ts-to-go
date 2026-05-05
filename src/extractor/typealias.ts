import { GoField, StructRegistry } from "@/types/GoTypes";
import { generateGoField } from "./utils";
import ts from "typescript";

// construct StructRegistry from TypeAliasDeclaration
export function visitTypeAlias(
  node: ts.TypeAliasDeclaration,
  registry: StructRegistry,
): void {
  // type Foo = { ... }
  if (!ts.isTypeLiteralNode(node.type)) return; // skip type Foo = string etc.

  const fields: GoField[] = [];

  for (const member of node.type.members) {
    if (ts.isPropertySignature(member) && member.type) {
      fields.push(generateGoField(member));
    }
  }

  registry.set(node.name.text, { name: node.name.text, fields });
}