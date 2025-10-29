import { defineConfig } from "vite";
import { presetIcons } from "@unocss/preset-icons";
import { sveltekit } from "@sveltejs/kit/vite";
import unocss from "unocss/vite";

export default defineConfig({
	plugins: [
		unocss({
			presets: [presetIcons()],
		}),
		sveltekit(),
	],
});
