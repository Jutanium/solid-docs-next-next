import type { JSX } from "solid-js/jsx-runtime";

import preferences from "./Preferences/usePreferences";
import { Dynamic, Match, Switch } from "solid-js/web";
import type { framework } from "./Preferences/usePreferences";
import { frameworks } from "./Preferences/usePreferences";

type Framework = Omit<framework, "none">;

export default function FrameworkAside(props: {
	vue?: JSX.Element;
	react?: JSX.Element;
	angular?: JSX.Element;
	svelte?: JSX.Element;
}) {
	const [{ framework }, { setFramework }] = preferences;

	return (
		<Switch>
			{["vue", "react", "angular", "svelte"].map((f) => (
				<Match when={framework() === f}>{props[f]}</Match>
			))}
		</Switch>
	);
}
