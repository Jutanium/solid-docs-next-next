import { JSXElement, Show } from "solid-js";
import type { ParentProps } from "solid-js";
import preferences from "./usePreferences";

export default function IfTS(props: ParentProps<{ fallback?: JSXElement }>) {
  const [{ jsTs }] = preferences;

  return (
    <Show when={jsTs() == "ts"} fallback={props.fallback}>
      {props.children}
    </Show>
  );
}
