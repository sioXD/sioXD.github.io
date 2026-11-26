import process from 'node:process';
import { svelteDevtools } from '@sveltejs/vite-devtools-svelte';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const basePath = process.argv.includes('dev')
	? ''
	: ((process.env.BASE_PATH as `/${string}` | '' | undefined) ?? '');

export default defineConfig({
	plugins: [
		svelteDevtools(),
		enhancedImages(),
		sveltekit({
			preprocess: vitePreprocess(),
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				precompress: false,
				strict: true
			}),
			paths: {
				base: basePath
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: ['src/lib/styles']
			}
		}
	},
	devtools: { apply: 'serve', clientAuth: true }
});
