// src/fixture/generators/default/index.ts

import { ZodDefault } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DefaultGenerator = Generator({
	schema: ZodDefault,
	output: ({ def, transform }) => {
		const defaultVal = (def as any).defaultValue;
		// In v4, defaultValue might be a getter (property) or a function
		const value = typeof defaultVal === 'function' ? defaultVal() : defaultVal;
		return transform.utils.random.boolean()
			? value
			: transform.fromSchema((def as any).innerType);
	},
});

// ZodPrefault is new in v4 - same structure as ZodDefault
export const PrefaultGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodPrefault',
	output: ({ def, transform }) => {
		const defaultVal = (def as any).defaultValue;
		const value = typeof defaultVal === 'function' ? defaultVal() : defaultVal;
		return transform.utils.random.boolean()
			? value
			: transform.fromSchema((def as any).innerType);
	},
});
