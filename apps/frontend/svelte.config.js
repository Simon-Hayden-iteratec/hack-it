import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import tsConfigBase from '../../tsconfig.base.json' assert { type: 'json' };

/** @type Record<string, string> */
const flattened = {};
Object.entries(tsConfigBase.compilerOptions.paths).forEach(([alias, target]) => {
	flattened[alias] = target[0];
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),

		alias: flattened
	}
};

export default config;
