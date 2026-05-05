import ts from "typescript";
import { mapType } from ".";

export const DEFAULT = "interface{}";

/** maps primitive typescript types to go types 
 * @example MyType = string; // maps to string
 * MyType = number; // maps to float64
 * MyType = boolean; // maps to bool
*/
export function mapPrimitiveType(typeNode: ts.TypeNode): string | undefined {
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return "string";
    case ts.SyntaxKind.NumberKeyword:
      return "float64";
    case ts.SyntaxKind.BooleanKeyword:
      return "bool";
  }
}

/** maps union types to go types 
 * @example
 * type MyType = string | null; // maps to *string
 * type MyType = string | number; // maps to interface{}
*/
export function mapUnionType(typeNode: ts.UnionTypeNode): string {
  const nonNull = typeNode.types.filter((t) => {
    if (ts.isLiteralTypeNode(t)) {
      return (
        t.literal.kind !== ts.SyntaxKind.NullKeyword &&
        t.literal.kind !== ts.SyntaxKind.UndefinedKeyword
      );
    }

    return (
      t.kind !== ts.SyntaxKind.NullKeyword &&
      t.kind !== ts.SyntaxKind.UndefinedKeyword
    );
  });

  if (nonNull.length === 1) {
    return "*" + mapType(nonNull[0]);
  }

  return "interface{}";
}

/** maps type references to go types 
 * @example
 * type MyDate = Date; // maps to time.Time
*/
export function mapTypeReference(typeNode: ts.TypeReferenceNode): string {
  // TODO: handle custom types more robustly, for now just return the name
  const name = typeNode.typeName.getText();
  // special case for Date type
  if (name === "Date") return "time.Time";
  if (name === "Record") {
    const args = typeNode.typeArguments;
    if (args && args.length === 2) {
      const key = mapType(args[0]);
      const value = mapType(args[1]);
      return `map[${key}]${value}`;
    }
  }
  return name;
}

/** maps array types to go types
 * @example
 * type MyArray = string[]; // maps to []string
 * TODO: handle multi-dimensional arrays and tuples, for now just return the element type with [] prefix
 */
export function mapArrayType(typeNode: ts.ArrayTypeNode): string {
  return "[]" + mapType(typeNode.elementType);
}
