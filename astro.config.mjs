import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { imageService } from "@unpic/astro/service";



// https://astro.build/config
export default defineConfig({
  site: 'https://njordstudio.com',
  integrations: [
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  output: 'static',
  image: {
    service: imageService({
      fallbackService: "squooshImageService",
      placeholder: "blurhash",
      layout: "constrained",
    }),
  },
  // Workaround to fix bug in WSL
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});