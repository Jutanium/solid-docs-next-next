import { For, createEffect } from "solid-js";
import { RadioGroup } from "@kobalte/core";
import type { Component } from "solid-js";
import IconJs from "~icons/logos/javascript";
import IconTs from "~icons/logos/typescript-icon";
import IconReact from "~icons/vscode-icons/file-type-reactjs";
import IconVue from "~icons/vscode-icons/file-type-vue";
import IconSvelte from "~icons/vscode-icons/file-type-svelte";
import IconAngular from "~icons/vscode-icons/file-type-angular";
import IconNone from "~icons/heroicons-outline/ban";
import IconChevron from "~icons/heroicons-outline/chevron-right";
import IconGear from "~icons/heroicons-solid/cog";
import { Dynamic } from "solid-js/web";
import preferences, { frameworks } from "./usePreferences";
import type { framework } from "./usePreferences";

import styles from "./Preferences.module.css";

const Preferences: Component = () => {
  const [{ jsTs, framework }, { setJsTs, setFramework }] = preferences;

  createEffect(() => {
    console.log(framework(), jsTs());
  });

  // const [jsTs, _setJsTs] = createSignal<"js" | "ts">();
  // const [framework, _setFramework] = createSignal<framework>("none");

  // const setJsTs = (value: "js" | "ts") => {
  // 	_setJsTs(value);
  // 	localStorage.setItem("jsTs", value);
  // };

  // const setFramework = (value: framework) => {
  // 	_setFramework(value);
  // 	localStorage.setItem("framework", value);
  // };

  // onMount(() => {
  // 	setJsTs((localStorage.getItem("jsTs") as "js" | "ts") || "js");
  // 	setFramework((localStorage.getItem("framework") as framework) || "none");
  // });

  const icons = {
    react: IconReact as Component,
    vue: IconVue as Component,
    angular: IconAngular as Component,
    svelte: IconSvelte as Component,
    none: IconNone as Component,
  };

  return (
    <details class={styles.preferencesDetails}>
      <summary>
        <div class={styles.summaryContainer}>
          <div class={styles.iconBackground}>
            <IconGear aria-hidden />
          </div>
          Preferences
        </div>
        <IconChevron class={styles.chevron} />
      </summary>
      <div class={styles.preferencesDivider}>
        <RadioGroup.Root
          value={jsTs()}
          onValueChange={(val) => setJsTs(val as "js" | "ts")}
        >
          <RadioGroup.Label class={styles.radioLabel}>
            Do you prefer JavaScript or TypeScript?
          </RadioGroup.Label>
          <div class={styles.groupContainer}>
            <RadioGroup.Item
              value="js"
              class={jsTs() === "js" ? styles.selected : undefined}
            >
              <RadioGroup.ItemInput />
              <RadioGroup.ItemControl>
                <IconJs />
                {/* <RadioGroup.ItemIndicator /> */}
              </RadioGroup.ItemControl>
              <RadioGroup.ItemLabel>JavaScript</RadioGroup.ItemLabel>
            </RadioGroup.Item>
            <RadioGroup.Item
              value="ts"
              class={jsTs() === "ts" ? styles.selected : undefined}
            >
              <RadioGroup.ItemInput />
              <RadioGroup.ItemControl>
                <IconTs />
                {/* <RadioGroup.ItemIndicator /> */}
              </RadioGroup.ItemControl>
              <RadioGroup.ItemLabel>TypeScript</RadioGroup.ItemLabel>
            </RadioGroup.Item>
          </div>
        </RadioGroup.Root>
        <RadioGroup.Root
          value={framework()}
          onValueChange={(val) => setFramework(val as framework)}
        >
          <RadioGroup.Label class={styles.radioLabel}>
            Are you coming from another framework?
          </RadioGroup.Label>
          <div class={styles.groupContainer}>
            <For each={frameworks}>
              {(value) => (
                <RadioGroup.Item
                  value={value}
                  class={framework() === value ? styles.selected : undefined}
                >
                  <RadioGroup.ItemInput />
                  <RadioGroup.ItemControl>
                    <Dynamic component={icons[value]} />
                    {/* <RadioGroup.ItemIndicator /> */}
                  </RadioGroup.ItemControl>
                  <RadioGroup.ItemLabel>{value}</RadioGroup.ItemLabel>
                </RadioGroup.Item>
              )}
            </For>
          </div>
        </RadioGroup.Root>
      </div>
    </details>
  );
};

export default Preferences;
