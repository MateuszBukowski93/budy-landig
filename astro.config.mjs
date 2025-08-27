import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),react()],
  site: "https://vbartalis.github.io",
  base: "/",
  vite: {
    server:{
      proxy:{
        '/dogapi': {
          target: 'https://dog.ceo',
          changeOrigin:true,
          rewrite:(path) => path.replace(/^\/dogapi/,''),
        },
      },
    },
  },
});
