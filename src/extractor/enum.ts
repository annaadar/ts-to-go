import { EnumRegistry, GoEnumValue } from "@/types/GoTypes";
import ts from "typescript";

// construct EnumRegistry from EnumDeclaration
export function visitEnum(node: ts.EnumDeclaration, registry: EnumRegistry): void {
  const values: GoEnumValue[] = [];

  // check the first member to determine the enum kind
  const kind = getEnumKind(node);

  node.members.forEach((member, index) => {
    const name = member.name.getText();
    const value = member.initializer
      ? member.initializer.getText()
      : index.toString();  // numeric enums auto-increment from 0

    values.push({ name, value });
  });

  registry.set(node.name.text, { name: node.name.text, kind, values });
}

// determine enum kind based on the first member
function getEnumKind(node: ts.EnumDeclaration): "string" | "int" | "float64" {
  const firstValue = node.members[0]?.initializer;
  if (!firstValue) return "int";
  if (ts.isStringLiteral(firstValue)) return "string";
  if (ts.isNumericLiteral(firstValue)) {
    return firstValue.getText().includes(".") ? "float64" : "int";
  }
  return "int";
}