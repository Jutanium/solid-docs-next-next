import ts from "typescript";
import { ESLint } from "eslint";
import { readFile, unlink, access } from "node:fs/promises";
import prettier from "prettier";

export function getTscOptions(): ts.CompilerOptions {
  const configFile = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    "tsconfig.json"
  );
  if (!configFile) throw Error("tsconfig.json not found");
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    process.cwd()
  );

  return {
    ...options,
    emitDeclarationOnly: false,
    noEmit: false,
    noEmitOnError: false,
    // packages from paths are being inlined to the output
    paths: {},
  };
}

export async function tsToJs(
  entryFile: string,
  options: ts.CompilerOptions,
  oldProgram?: ts.Program
) {
  const program = ts.createProgram([entryFile], options, undefined, oldProgram);
  program.emit();

  // ESlint doesn't do anything yet, but we're going to make a lint rule that adds line breaks between
  // functions. (Prettier can't do that)
  const eslint = new ESLint({
    fix: true,
    useEslintrc: false,
    overrideConfig: {
      plugins: ["solid"],
      extends: ["eslint:recommended", "plugin:solid/recommended"],
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      rules: {
        "padding-line-between-statements": "error",
        "padded-blocks": "error",
      },
      env: {
        es2022: true,
        node: true,
      },
    },
  });

  try {
    const newPath = entryFile.replace(".ts", ".js");

    const results = await eslint.lintFiles(newPath);

    await ESLint.outputFixes(results);
    const read = await readFile(newPath);
    const formatted = prettier.format(read.toString(), { parser: "babel" });

    try {
      await access(newPath);
      await unlink(newPath);
    } catch (e) {}

    return formatted;
  } catch (e) {
    console.error(e);
  }
}
