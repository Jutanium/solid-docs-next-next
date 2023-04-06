import { createMutationObserver } from "@solid-primitives/mutation-observer";
import { createSignal } from "solid-js";

// https://github.com/codemirror/theme-one-dark/blob/main/src/one-dark.ts

const [isDark, setIsDark] = createSignal(false);

createMutationObserver(
	() => document.documentElement,
	{ attributes: true },
	(mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === "data-theme") {
				setIsDark(
					document.documentElement.getAttribute("data-theme") === "dark"
				);
			}
		});
	}
);

export { isDark };
