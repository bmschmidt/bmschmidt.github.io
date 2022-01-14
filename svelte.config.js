import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import md from 'vite-plugin-markdown';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs'
		}),
		vite: {
			plugins: [md.plugin({ mode: 'html' })],

			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;'
					}
				}
			}
		},

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
