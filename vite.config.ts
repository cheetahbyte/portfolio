import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    // Pass the output configuration here
    nitro({
      output: {
        dir: 'dist',          // The root output folder
        serverDir: 'dist/server',
        publicDir: 'dist/public'
      }
    }),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  // Note: Nitro usually overrides this, but keeping it
  // consistent with your nitro.output.dir is good practice.
  build: {
    outDir: "dist",
  }
})

export default config
