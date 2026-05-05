export interface GoField {
  name: string;
  goType: string;
  jsonTag: string;
  omitempty: boolean;
}

export interface GoStruct {
  name: string;
  fields: GoField[];
}
export interface GoEnumValue {
  name: string;
  value: string;
}

export interface GoEnum {
  name: string;
  kind: "string" | "int" | "float64";
  values: GoEnumValue[];
}

export type EnumRegistry = Map<string, GoEnum>;
export type StructRegistry = Map<string, GoStruct>;
