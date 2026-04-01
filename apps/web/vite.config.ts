import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: "all",
    proxy: {
      "/v1": {
        target: "http://localhost:3001",
        changeOrigin: true
      },
      "/auth": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: "dist"
  }
});
