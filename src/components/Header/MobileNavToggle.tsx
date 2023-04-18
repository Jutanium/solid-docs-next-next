import { Component, createEffect, createSignal } from "solid-js";
import IconHamburger from "~icons/heroicons-solid/bars-3";
import { ToggleButton } from "@kobalte/core";
import styles from "./MobileNavToggle.module.css";

const MobileNavToggle: Component = () => {
  const [isOpen, setIsOpen] = createSignal<boolean>(false);

  createEffect(() => {
    if (isOpen()) {
      document.body.classList.add("mobile-menu");
    } else {
      document.body.classList.remove("mobile-menu");
    }
  });

  function toggleMenu() {
    setIsOpen(!isOpen());
  }

  return (
    <ToggleButton.Root
      isPressed={isOpen()}
      onPressedChange={toggleMenu}
      class={styles.button}
      aria-label="Open mobile menu"
    >
      <IconHamburger width="24" height="24" aria-hidden="true" />
    </ToggleButton.Root>
  );
};

export default MobileNavToggle;
