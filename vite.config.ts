import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm(), topLevelAwait()],
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
});
