import ts from "typescript";

export interface ParsedProgram {
  program: ts.Program;
  typeChecker: ts.TypeChecker;
  sourceFiles: ts.SourceFile[];
}