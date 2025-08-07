import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/dev-manager-desktop/", // <--- Đặt đúng tên repo ở đây!
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
