import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import Icons from "unplugin-icons/vite";
import mdx from "@astrojs/mdx";

export default defineConfig({
  /* TODO: Update site property if we end up using another domain */
  site: "https://docs.solidjs.com/",
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
