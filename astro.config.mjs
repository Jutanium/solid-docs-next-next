import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), mdx()],
  vite: {
    plugins: [
      Icons({
        compiler: "solid",
      }),
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});
