// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import node from "@astrojs/node";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://altoby.com",
  output: "server",

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Satoshi",
      cssVariable: "--font-body",
      options: {
        variants: [
          {
            weight: "300 900",
            style: "normal",
            src: ["./src/assets/fonts/Satoshi-Variable.woff2"],
          },
          {
            weight: "300 900",
            style: "italic",
            src: ["./src/assets/fonts/Satoshi-VariableItalic.woff2"],
          },
        ],
      },
    },
  ],

  adapter: node({
    mode: "standalone",
  }),

  integrations: [preact(), sitemap()],
});