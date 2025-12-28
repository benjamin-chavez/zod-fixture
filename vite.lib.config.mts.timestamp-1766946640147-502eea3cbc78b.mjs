// vite.lib.config.mts
import path from "path";
import dts from "file:///home/benchavez/Code%20(Ubuntu%20VM)/Projects/zod-fixture/node_modules/vite-plugin-dts/dist/index.mjs";
import { defineConfig } from "file:///home/benchavez/Code%20(Ubuntu%20VM)/Projects/zod-fixture/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "/home/benchavez/Code (Ubuntu VM)/Projects/zod-fixture";
var vite_lib_config_default = defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "zod-fixture": path.resolve(__vite_injected_original_dirname, "./src/public.ts")
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    target: "esnext",
    lib: {
      entry: "./src/public.ts",
      name: "zod-fixture",
      formats: ["es", "umd"],
      fileName: (format) => `zod-fixture.${format}.${format === "umd" ? "cjs" : "js"}`
    },
    rollupOptions: {
      external: ["randexp"]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext"
    }
  },
  test: {
    setupFiles: ["./.vitest/extend.ts"]
  }
});
export {
  vite_lib_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5saWIuY29uZmlnLm10cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2JlbmNoYXZlei9Db2RlIChVYnVudHUgVk0pL1Byb2plY3RzL3pvZC1maXh0dXJlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9iZW5jaGF2ZXovQ29kZSAoVWJ1bnR1IFZNKS9Qcm9qZWN0cy96b2QtZml4dHVyZS92aXRlLmxpYi5jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2JlbmNoYXZlei9Db2RlJTIwKFVidW50dSUyMFZNKS9Qcm9qZWN0cy96b2QtZml4dHVyZS92aXRlLmxpYi5jb25maWcubXRzXCI7Ly8gdml0ZS5saWIuY29uZmlnLm10cztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5cdFx0XHQnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuXHRcdFx0J3pvZC1maXh0dXJlJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3B1YmxpYy50cycpLFxuXHRcdH0sXG5cdH0sXG5cdHBsdWdpbnM6IFtcblx0XHRkdHMoe1xuXHRcdFx0aW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcblx0XHR9KSxcblx0XSxcblx0YnVpbGQ6IHtcblx0XHR0YXJnZXQ6ICdlc25leHQnLFxuXHRcdGxpYjoge1xuXHRcdFx0ZW50cnk6ICcuL3NyYy9wdWJsaWMudHMnLFxuXHRcdFx0bmFtZTogJ3pvZC1maXh0dXJlJyxcblx0XHRcdGZvcm1hdHM6IFsnZXMnLCAndW1kJ10sXG5cdFx0XHRmaWxlTmFtZTogKGZvcm1hdCkgPT5cblx0XHRcdFx0YHpvZC1maXh0dXJlLiR7Zm9ybWF0fS4ke2Zvcm1hdCA9PT0gJ3VtZCcgPyAnY2pzJyA6ICdqcyd9YCxcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGV4dGVybmFsOiBbJ3JhbmRleHAnXSxcblx0XHR9LFxuXHR9LFxuXHRvcHRpbWl6ZURlcHM6IHtcblx0XHRlc2J1aWxkT3B0aW9uczoge1xuXHRcdFx0dGFyZ2V0OiAnZXNuZXh0Jyxcblx0XHR9LFxuXHR9LFxuXHR0ZXN0OiB7XG5cdFx0c2V0dXBGaWxlczogWycuLy52aXRlc3QvZXh0ZW5kLnRzJ10sXG5cdH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFVBQVU7QUFDakIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBSDdCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sMEJBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQTtBQUFBLE1BRU4sS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGlCQUFpQjtBQUFBLElBQ3pEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsSUFBSTtBQUFBLE1BQ0gsa0JBQWtCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxNQUFNLEtBQUs7QUFBQSxNQUNyQixVQUFVLENBQUMsV0FDVixlQUFlLE1BQU0sSUFBSSxXQUFXLFFBQVEsUUFBUSxJQUFJO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNkLFVBQVUsQ0FBQyxTQUFTO0FBQUEsSUFDckI7QUFBQSxFQUNEO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDYixnQkFBZ0I7QUFBQSxNQUNmLFFBQVE7QUFBQSxJQUNUO0FBQUEsRUFDRDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0wsWUFBWSxDQUFDLHFCQUFxQjtBQUFBLEVBQ25DO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
