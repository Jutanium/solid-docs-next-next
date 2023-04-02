module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: [
		"@typescript-eslint",
		"astro",
		"jsx-a11y",
		"solid",
		"simple-import-sort",
	],
	root: true,
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ["*.astro"],
			// Allows Astro components to be parsed.
			parser: "astro-eslint-parser",
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
			rules: {},
		},
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"plugin:astro/recommended",
		"plugin:solid/typescript",
	],
	rules: {
		"no-undef": "off",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
	},
};
