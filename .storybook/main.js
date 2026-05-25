// .storybook/main.js
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Create an ESM compatible equivalent of __dirname and require.resolve
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getAbsolutePath(value) {
  // Resolves the absolute path to the package directory using modern ESM routing
  return dirname(fileURLToPath(import.meta.resolve(join(value, "package.json"))));
}

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  
  // addons: [
  //   getAbsolutePath("@storybook/addon-interactions"),
  // ],
  
  framework: {
    name: getAbsolutePath("@storybook/html-vite"),
    options: {},
  },
};

export default config;
