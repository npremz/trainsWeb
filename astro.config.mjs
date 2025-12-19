import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import node from '@astrojs/node'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
   output: 'server',
   adapter: node({
     mode: 'standalone',
   }),
   integrations: [react(), markdoc(), keystatic()],
   vite: {
     plugins: [tailwindcss()],
   },
})
