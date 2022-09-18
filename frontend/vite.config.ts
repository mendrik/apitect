import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 5000
  },
  build: {
    outDir: 'build'
  },
  plugins: [tsconfigPaths(), react(), svgrPlugin()]
})
