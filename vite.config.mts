import react from '@vitejs/plugin-react'

import path from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { config } from 'dotenv'

config()

export default defineConfig({
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      {
        find: '@containers',
        replacement: path.resolve(__dirname, 'src/containers')
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@src', replacement: path.resolve(__dirname, 'src') }
    ]
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1140,
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    open: true,
    port: 3000
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    createHtmlPlugin({
      // add environment variables to build
      // inject: { data: Object.assign({  }, process.env) },
    })
  ],
})
