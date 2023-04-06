import { createLocalStorage } from "@solid-primitives/storage";
import { createEffect } from "solid-js";

const [store, setStore] = createLocalStorage({
	prefix: "solid-docs-next-next",
});

createEffect(() => {
	console.log(store.framework, store.jsTs);
});

export const frameworks = [
	"react",
	"vue",
	"angular",
	"svelte",
	"none",
] as const;
export type framework = (typeof frameworks)[number];
export type jsTs = "js" | "ts";

function setFramework(framework: framework) {
	setStore("framework", framework);
}
function setJsTs(jsTs: jsTs) {
	setStore("jsTs", jsTs);
}

function framework(): framework {
	return store.framework as framework;
}

function jsTs(): jsTs {
	return store.jsTs as jsTs;
}

export default [
	{ framework, jsTs },
	{ setFramework, setJsTs },
] as const;
