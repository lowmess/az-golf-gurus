/** @type {import("prettier").Config} */
export default {
	extends: ['prettier-config-lowmess'],
	plugins: ['prettier-plugin-astro'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
