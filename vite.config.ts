import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const mainMenuRoot = path.resolve(__dirname, 'Main Menu');

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(mainMenuRoot, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig({
  root: mainMenuRoot,
  plugins: [figmaAssetResolver(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(mainMenuRoot, 'src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
});
