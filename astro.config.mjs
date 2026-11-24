import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://momoyeyu.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/momo-ui' : '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx()],
  markdown: { shikiConfig: { theme: 'github-dark-dimmed' } },
});
