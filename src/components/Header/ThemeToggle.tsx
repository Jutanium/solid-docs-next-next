import { Component, createEffect, createSignal, onMount } from "solid-js";
import IconSun from "~icons/heroicons-solid/sun";
import IconMoon from "~icons/heroicons-solid/moon";
import { ToggleButton } from "@kobalte/core";
import styles from "./ThemeToggle.module.css";

const ThemeToggle: Component = () => {
  const [isDark, setIsDark] = createSignal<boolean>(false);

  onMount(() => {
    setIsDark(localStorage.getItem("theme") === "dark");
  });

  createEffect(() => {
    if (isDark()) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  });

  function toggleTheme() {
    setIsDark(!isDark());
    localStorage.setItem("theme", isDark() ? "dark" : "light");
  }

  return (
    <ToggleButton.Root
      isPressed={isDark()}
      onPressedChange={toggleTheme}
      class={styles.button}
      aria-label="Use dark theme"
    >
      {(state) =>
        state.isPressed() ? (
          <IconMoon width="24px" height="24px" aria-hidden="true" />
        ) : (
          <IconSun width="24px" height="24px" aria-hidden="true" />
        )
      }
    </ToggleButton.Root>
  );
};

export default ThemeToggle;
