import ts from "typescript";
import { DEFAULT, mapArrayType, mapPrimitiveType, mapTypeReference, mapUnionType } from "./utils";

/** maps typescript types to go types
 * @param typeNode - the typescript type node to map
 * @return string - the corresponding go type
 * @example
 * // maps string to string
 * mapType(ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)); // returns "string"
 */
export function mapType(typeNode: ts.TypeNode): string {
  // handle any primitive types
  let primitive = mapPrimitiveType(typeNode);
  if (primitive) return primitive;
  //handle arrays
  if (ts.isArrayTypeNode(typeNode)) {
    // recursively map the element type and prefix with []
    return mapArrayType(typeNode);
  }
  //handle union types (for optional fields)
  if (ts.isUnionTypeNode(typeNode)) {
    return mapUnionType(typeNode);
  }
  // handle type references (for custom types)
  if (ts.isTypeReferenceNode(typeNode)) {
    return mapTypeReference(typeNode);
  }
  // default case, fall back to empty interface for unsupported types
  return DEFAULT;
}

