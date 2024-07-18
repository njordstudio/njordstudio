import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from "@astrojs/partytown";
import { astroConfig } from '@julian_cataldo/astro-lightbox';

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
  vite: {
    build: {
      rollupOptions: {
        external: ['@julian_cataldo/astro-lightbox'],
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
    ssr: {
      noExternal: ['@julian_cataldo/astro-lightbox'],
    },
  },
  image: {
    service: astroConfig.image?.service || passthroughImageService,
  },
  buildOptions: {
    rollupOptions: {
      external: ['@julian_cataldo/astro-lightbox']
    }
  }
});
