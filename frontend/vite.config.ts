import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  server: {
    port: 5000
  },
  build: {
    outDir: 'build'
  },
  plugins: [reactRefresh(), svgrPlugin()]
})
