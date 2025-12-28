// src/fixture/generators/array/index.ts

import { ZodArray } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const ArrayGenerator = Generator({
	schema: ZodArray,
	output: ({ def, transform, context }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const minCheck = checks.find('min_length')?._zod.def.minimum;
		const maxCheck = checks.find('max_length')?._zod.def.maximum;
		const lengthCheck = checks.find('length_equals')?._zod.def.length;

		const userDefinedMin = minCheck ?? lengthCheck;
		const userDefinedMax = maxCheck ?? lengthCheck;

		const min = transform.utils.resolveValue({
			initial: userDefinedMin,
			fallback: transform.defaults.array.min,
			conflict: userDefinedMax,
			resolve: (options) => Math.min(options.fallback, options.conflict),
		});

		const max = transform.utils.resolveValue({
			initial: userDefinedMax,
			fallback: transform.defaults.array.max,
			conflict: userDefinedMin,
			resolve: (options) => Math.max(options.fallback, options.conflict),
		});

		const result: unknown[] = [];

		transform.utils.ifNotNever((def as any).element, (schema) => {
			transform.utils.recursionCheck(schema, () => {
				transform.utils.n(
					(key) =>
						result.push(
							transform.fromSchema(schema, {
								...context,
								path: [...context.path, key],
							}),
						),
					{ min, max },
				);
			});
		});

		return result;
	},
});
