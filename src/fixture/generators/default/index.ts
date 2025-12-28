// src/fixture/generators/default/index.ts

import { ZodDefault } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DefaultGenerator = Generator({
	schema: ZodDefault,
	output: ({ def }) => {
		const defaultVal = (def as any).defaultValue;
		// Always return the default value
		return typeof defaultVal === 'function' ? defaultVal() : defaultVal;
	},
});

// ZodPrefault is new in v4 - same structure as ZodDefault
export const PrefaultGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodPrefault',
	output: ({ def }) => {
		const defaultVal = (def as any).defaultValue;
		return typeof defaultVal === 'function' ? defaultVal() : defaultVal;
	},
});
