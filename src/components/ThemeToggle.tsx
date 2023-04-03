import { Component, createEffect, createSignal, onMount } from 'solid-js';
import CarbonSun from '~icons/carbon/sun';
import CarbonMoon from '~icons/carbon/moon';
import { ToggleButton } from '@kobalte/core';

const ThemeToggle: Component = () => {
  const [isDark, setIsDark] = createSignal<boolean>(false);

  onMount(() => {
    setIsDark(localStorage.getItem('theme') === 'dark');
  });

  createEffect(() => {
    if (isDark()) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });

  function toggleTheme() {
    setIsDark(!isDark());
    localStorage.setItem('theme', isDark() ? 'dark' : 'light');
  }

  return (
    <ToggleButton.Root
      isPressed={isDark()}
      onPressedChange={toggleTheme}
      class="h-8 w-8"
      aria-label="Mute"
    >
      {(state) =>
        state.isPressed() ? (
          <CarbonMoon class="h-full w-full" />
        ) : (
          <CarbonSun class="h-full w-full" />
        )
      }
    </ToggleButton.Root>
  );
};

export default ThemeToggle;
