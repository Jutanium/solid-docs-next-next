import type { JSX } from "solid-js/jsx-runtime";

import preferences from "./Preferences/usePreferences";
import { Match, Switch } from "solid-js";
import type { framework } from "./Preferences/usePreferences";

type Framework = Exclude<framework, "none">;

type Props = { [K in Framework]?: JSX.Element };
export default function FrameworkAside(props: Props) {
	const [{ framework }, { setFramework }] = preferences;

	return (
		<Switch>
			{Object.keys(props).map((f) => (
				<Match when={framework() === f}>{props[f as Framework]}</Match>
			))}
		</Switch>
	);
}
