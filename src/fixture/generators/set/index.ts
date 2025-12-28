// src/fixture/generators/set/index.ts

import { ZodSet } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { InferZodType } from '@/internal/zod';

export const SetGenerator = Generator({
	schema: ZodSet,
	output: ({ def, transform, context }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const sizeEquals = checks.find('size_equals')?._zod.def.size;
		const userDefinedMin =
			sizeEquals ?? checks.find('min_size')?._zod.def.minimum;
		const userDefinedMax =
			sizeEquals ?? checks.find('max_size')?._zod.def.maximum;

		const min = transform.utils.resolveValue({
			initial: userDefinedMin,
			fallback: transform.defaults.set.min,
			conflict: userDefinedMax,
			resolve: (options) => Math.min(options.fallback, options.conflict),
		});

		const max = transform.utils.resolveValue({
			initial: userDefinedMax,
			fallback: transform.defaults.set.max,
			conflict: userDefinedMin,
			resolve: (options) => Math.max(options.fallback, options.conflict),
		});

		const result = new Set<InferZodType<typeof def.valueType>>();

		transform.utils.ifNotNever((def as any).valueType, (valueType) => {
			transform.utils.recursionCheck(valueType, () => {
				transform.utils.n(
					() => {
						result.add(
							transform.fromSchema(valueType, {
								...context,
								path: [...context.path, result.size],
							}),
						);
					},
					{ min, max },
				);
			});
		});

		return result;
	},
});
