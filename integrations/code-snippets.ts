/*
    Code forked from:
    https://github.com/withastro/docs/blob/main/integrations/astro-code-snippets.ts
*/
import type { AstroIntegration } from "astro";
import type { BlockContent, Parent, Root } from "mdast";
import type { Plugin, Transformer } from "unified";
import { visit } from "unist-util-visit";
import type { BuildVisitor } from "unist-util-visit/complex-types";
import { makeComponentNode } from "./utils/makeComponentNode";

const CodeSnippetTagname = "AutoImportedCodeSnippet";
export const codeSnippetAutoImport: Record<string, [string, string][]> = {
  "~/components/CodeSnippet/CodeSnippet.astro": [
    ["default", CodeSnippetTagname],
  ],
};

export interface CodeSnippetWrapper extends Parent {
  type: "codeSnippetWrapper";
  children: BlockContent[];
}

declare module "mdast" {
  interface BlockContentMap {
    codeSnippetWrapper: CodeSnippetWrapper;
  }
}

export function remarkCodeSnippets(): Plugin<[], Root> {
  const visitor: BuildVisitor<Root, "code"> = (code, index, parent) => {
    if (index === null || parent === null) return;

    const metaTitle = parseTitle(code.meta || "");

    code.value = preprocessCode(code.value);

    const attributes = {
      title: encodeMarkdownStringProp(metaTitle),
      code: encodeMarkdownStringProp(code.value),
    };

    const codeSnippetWrapper = makeComponentNode(
      CodeSnippetTagname,
      { attributes },
      code
    );

    parent.children.splice(index, 1, codeSnippetWrapper);
  };

  const transformer: Transformer<Root> = (tree) => {
    visit(tree, "code", visitor);
  };

  return function attacher() {
    return transformer;
  };
}

function parseTitle(meta: string) {
  // Try to find the meta property `title="..."` or `title='...'`,
  // store its value and remove it from meta
  let title: string | undefined;
  meta = meta.replace(
    /(?:\s|^)title\s*=\s*(["'])(.*?)(?<!\\)\1/,
    (_, __, content) => {
      title = content;
      return "";
    }
  );

  return title;
}

/**
 * Preprocesses the given raw code snippet before being handed to the syntax highlighter.
 *
 * Does the following things:
 * - Trims empty lines at the beginning or end of the code block
 * - Normalizes whitespace and line endings
 */
export function preprocessCode(code: string) {
  // Split the code into lines and remove any empty lines at the beginning & end
  const lines = code.split(/\r?\n/);

  while (lines.length > 0 && lines[0].trim().length === 0) {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) {
    lines.pop();
  }

  // If only one line is left, trim any leading indentation
  if (lines.length === 1) lines[0] = lines[0].trimStart();

  // Rebuild code with normalized line endings
  let preprocessedCode = lines.join("\n");

  // Convert tabs to 2 spaces
  preprocessedCode = preprocessedCode.replace(/\t/g, "  ");

  return preprocessedCode;
}

/** Encodes an optional string to allow passing it through Markdown/MDX component props */
export function encodeMarkdownStringProp(input: string | undefined) {
  return (input !== undefined && encodeURIComponent(input)) || undefined;
}

/** Encodes an optional string array to allow passing it through Markdown/MDX component props */
export function encodeMarkdownStringArrayProp(arrInput: string[] | undefined) {
  if (arrInput === undefined) return undefined;
  return (
    arrInput.map((input) => encodeURIComponent(input)).join(",") || undefined
  );
}

export function astroCodeSnippets(): AstroIntegration {
  return {
    name: "@astrojs/code-snippets",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkCodeSnippets()],
          },
        });
      },
    },
  };
}
