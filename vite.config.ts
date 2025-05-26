import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@pages": fileURLToPath(
        new URL("./src/components/pages", import.meta.url)
      ),
      "@templates": fileURLToPath(
        new URL("./src/components/templates", import.meta.url)
      ),
      "@organisms": fileURLToPath(
        new URL("./src/components/organisms", import.meta.url)
      ),
      "@molecules": fileURLToPath(
        new URL("./src/components/molecules", import.meta.url)
      ),
      "@atoms": fileURLToPath(
        new URL("./src/components/atoms", import.meta.url)
      ),
      "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
    },
  },
});
