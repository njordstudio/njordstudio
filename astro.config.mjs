import { defineConfig, squooshImageService } from 'astro/config';
import mdx from '@astrojs/mdx';



// https://astro.build/config
export default defineConfig({
  site: 'https://njordstudio.com',
  integrations: [mdx()],
  output: 'static',
  image: {
    service: squooshImageService(),
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