import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 1. Plugins
  plugins: [],

  // 2. Build Configuration (Library Mode)
  build: {
    lib: {
      // Your main entry point (where you export your JS/SASS)
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VicUiKit',
      // Output file names
      fileName: (format) => `vic-ui-kit.${format}.js`,
      formats: ['es', 'umd'],
    },
    // CSS-specific settings
    cssCodeSplit: false, // Set to true if you want separate CSS files per component
    sourcemap: true,
    minify: 'terser', // High-quality minification
    rollupOptions: {
      // Ensure any heavy external dependencies aren't bundled
      external: [], 
      output: {
        globals: {},
      },
    },
  },

  // 3. SASS / PostCSS Settings
  css: {
    preprocessorOptions: {
      scss: {
        // This makes your variables available in every file without manual @import
        additionalData: `@use "src/styles/variables" as *;`,
      },
    },
    devSourcemap: true,
  },

  // 4. Server settings for development
  server: {
    port: 3000,
    open: true,
  },
});
