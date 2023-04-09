import { isDark } from "../useTheme";
import logoDark from "../../assets/logo-dark.png";
import logoLight from "../../assets/logo-light.png";
import sLogo from "../../assets/s-logo.svg";
import styles from "./Logo.module.css";
import { createEffect } from "solid-js";

export default function Logo() {
	createEffect(() => {
		console.log(isDark());
	});
	return (
		<div class={styles.div}>
			<img class={styles.s} src={sLogo} />
			<img class={styles.name} src={isDark() ? logoDark : logoLight} />
		</div>
	);
}
