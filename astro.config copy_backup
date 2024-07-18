import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";


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
  // Workaround to fix bug in WSL
  vite: {
    build: {
      rollupOptions: {
        external: ['@julian_cataldo/astro-lightbox']
      }
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  image: {
    service: passthroughImageService(),
  }
});