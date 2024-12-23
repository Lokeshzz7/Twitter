import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

// Load environment variables from a `.env` file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://twitter-xi-six.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    },
  },
});
