import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path';
import { cpSync } from 'fs';

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      {
        name: 'copy-assets',
        apply: 'build',
        writeBundle() {
          cpSync('src/assets', 'dist/assets', { recursive: true });
        }
      }
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      cssCodeSplit: false,
      sourcemap: true,
      cssMinify: 'esbuild',
      minify: 'esbuild',

      watch: {
        exclude: 'node_modules/**',
      },
      
      // FIX 1: Changed from rolldownOptions to rollupOptions
      rollupOptions: {
        input: [
          resolve(__dirname, 'src/scripts/toolkit.js'),
          resolve(__dirname, 'src/scripts/toolkit-new.js'),
        ],
        output: {
          globals: {
            'jquery': '$',
            '$': '$'
          },
          entryFileNames: '[name].min.js',
          chunkFileNames: '[name].min.js',
          assetFileNames: '[name].[ext]'
        }
      },
      
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: ['node_modules'],  
        },
      },
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },

    server: {
      host: env.VITE_APP_HOST ?? "local.wgtn.ac.nz",
      port: env.VITE_APP_PORT ? Number(env.VITE_APP_PORT) : 8080,
    },
  }
});
