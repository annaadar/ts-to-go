import { PropertySignature } from "typescript";
import { GoField } from "@/types/GoTypes";
import { mapType } from "../typeMapper";
// helper function to generate GoField from PropertySignature. used in visitInterface and visitTypeAlias
export function generateGoField(member: PropertySignature): GoField {
  if (!member.type) {
    throw new Error(`Property ${member.name.getText()} has no type annotation`);
  }
  const fieldName = member.name.getText();
  const optional = !!member.questionToken;
  const goType = optional ? "*" + mapType(member.type) : mapType(member.type);
  return { name: fieldName, goType, jsonTag: fieldName, omitempty: optional };
}


