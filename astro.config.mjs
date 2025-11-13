// @ts-check
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://shreyadimri.github.io',

  vite: {
  plugins: [tailwindcss()],
  },

  integrations: [react()],
});