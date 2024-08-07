import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
	},
	server: {
		port: 3000
	}
}) as UserConfigExport;
