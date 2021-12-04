import reactRefresh from '@vitejs/plugin-react-refresh'
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
  plugins: [tsconfigPaths(), reactRefresh(), svgrPlugin()]
})
