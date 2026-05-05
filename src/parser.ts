import ts, { Program } from "typescript";
import { ParsedProgram } from "@/types/ParsedProgram.js";


/**from given file paths, parse into a ParsedProgram and filter for only source files.
 * @param filePaths - array of file paths to parse
 * @return ParsedProgram - the parsed program containing the program, type checker, and source files
 */
export function parseFiles(filePaths: string[]): ParsedProgram {
  let program: Program = ts.createProgram(filePaths, {
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.NodeNext,
  });
  let typeChecker = program.getTypeChecker();
  let sourceFiles = program
    .getSourceFiles()
    .filter((sf) => !sf.isDeclarationFile);
  return { program, typeChecker, sourceFiles };
}
