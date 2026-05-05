import { GoEnum } from "@/types/GoTypes";

export function emitEnum(goEnum: GoEnum): string {
  const typeLine = `type ${goEnum.name} ${goEnum.kind}`;
  const values = goEnum.values
    .map((v) => `\t${goEnum.name}${v.name} ${goEnum.name} = ${v.value}`)
    .join("\n");

  return `${typeLine}\n\nconst (\n${values}\n)`;
}