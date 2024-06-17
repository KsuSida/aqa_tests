import js from '@eslint/js';
import globals from 'globals';

export default [
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			'no-console': 'warn',
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
		},
	},
];
