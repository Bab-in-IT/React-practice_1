import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: { plugins: [["babel-plugin-react-compiler"]] },
    }),
  ],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/art/styles"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@styles/variables" as *;
        @use "@styles/mixins" as *;
        `,
      },
    },
  },
});
