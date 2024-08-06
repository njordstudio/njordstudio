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
    server: {
      watch: {
        usePolling: true,
      },
    },
    ssr: {
      noExternal: ['sharp'] //  included in the server-side rendering (SSR) build process
    }
  },
  image: {
    service: passthroughImageService()
  }
});