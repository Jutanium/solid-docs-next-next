/*
    Code forked from:
    https://github.com/withastro/docs/blob/main/integrations/astro-code-snippets.ts
*/
import type { AstroIntegration } from 'astro';
import type { BlockContent, Parent, Root } from 'mdast';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import type { BuildVisitor } from 'unist-util-visit/complex-types';
import { makeComponentNode } from './utils/makeComponentNode';

const CodeSnippetTagname = 'AutoImportedCodeSnippet';
export const codeSnippetAutoImport: Record<string, [string, string][]> = {
	'~/components/CodeSnippet/CodeSnippet.astro': [['default', CodeSnippetTagname]],
};

export interface CodeSnippetWrapper extends Parent {
	type: 'codeSnippetWrapper';
	children: BlockContent[];
}

declare module 'mdast' {
	interface BlockContentMap {
		codeSnippetWrapper: CodeSnippetWrapper;
	}
}

export function remarkCodeSnippets(): Plugin<[], Root> {
	const visitor: BuildVisitor<Root, 'code'> = (code, index, parent) => {
		if (index === null || parent === null) return;

		const codeSnippetWrapper = makeComponentNode(CodeSnippetTagname, {} , code);

		parent.children.splice(index, 1, codeSnippetWrapper);
	};

	const transformer: Transformer<Root> = (tree) => {
		visit(tree, 'code', visitor);
	};

	return function attacher() {
		return transformer;
	};
}

export function astroCodeSnippets(): AstroIntegration {
	return {
		name: '@astrojs/code-snippets',
		hooks: {
			'astro:config:setup': ({ updateConfig }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [remarkCodeSnippets()],
					},
				});
			},
		},
	};
}