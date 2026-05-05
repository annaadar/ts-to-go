import { GoField, StructRegistry } from "@/types/GoTypes";
import { generateGoField } from "./utils";
import ts from "typescript";

// construct StructRegistry from InterfaceDeclaration
export function visitInterface(
  node: ts.InterfaceDeclaration,
  registry: StructRegistry,
) {
  const name = node.name.text;
  const fields: GoField[] = [];

  for (const member of node.members) {
    if (ts.isPropertySignature(member) && member.type) {
      fields.push(generateGoField(member));
    }
  }
  registry.set(name, { name, fields });
}
