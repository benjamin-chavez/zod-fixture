// src/fixture/generators/effects/index.ts

import { Generator } from '@/transformer/generator';

// ZodPipe handles both transform and preprocess in v4
export const PipeGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodPipe',
	output: ({ def, transform, context }) => {
		const input = (def as any).in;
		const output = (def as any).out;

		if (input.constructor.name === 'ZodTransform') {
			return transform.fromSchema(output, context);
		}

		if (output.constructor.name === 'ZodTransform') {
			const initialValue = transform.fromSchema(input, context);
			const transformFn = output._def?.transform ?? output.def?.transform;
			if (typeof transformFn === 'function') {
				return transformFn(initialValue, {
					addIssue: transform.utils.noop,
					path: [],
				});
			}
			return initialValue;
		}

		return transform.fromSchema(input, context);
	},
});
