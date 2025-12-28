// src/fixture/generators/number/index.ts

import { ZodNumber } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const minCheck = checks.find('greater_than')?._zod.def ?? {
			value: transform.defaults.float.min,
			inclusive: true,
		};
		const maxCheck = checks.find('less_than')?._zod.def ?? {
			value: transform.defaults.float.max,
			inclusive: true,
		};

		const min = minCheck.inclusive ? minCheck.value : minCheck.value + 1;
		const max = maxCheck.inclusive ? maxCheck.value : maxCheck.value - 1;

		const multipleOf = checks.find('multiple_of')?._zod.def.value;
		const formatCheck = checks.find('number_format')?._zod.def;
		const isInt = formatCheck?.format === 'safeint';

		let result = isInt
			? transform.utils.random.int({ min, max })
			: transform.utils.random.float({ min, max });

		if (multipleOf !== undefined) {
			result = Math.round(result / multipleOf) * multipleOf;

			if (result < min) {
				result += multipleOf;
			}
			if (result > max) {
				result -= multipleOf;
			}

			if (multipleOf % 1 !== 0) {
				const decimals = multipleOf.toString().split('.')[1]?.length;
				result = Number(result.toFixed(decimals));
			}
		}

		return result;
	},
});

// Handle z.int() which creates ZodNumberFormat directly
export const NumberFormatGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodNumberFormat',
	output: ({ def, transform }) => {
		const checks = transform.utils.checks((def as any).checks ?? []);
		const format = (def as any).format;
		const isInt = format === 'safeint';

		const minCheck = checks.find('greater_than')?._zod.def ?? {
			value: isInt ? transform.defaults.int.min : transform.defaults.float.min,
			inclusive: true,
		};
		const maxCheck = checks.find('less_than')?._zod.def ?? {
			value: isInt ? transform.defaults.int.max : transform.defaults.float.max,
			inclusive: true,
		};

		const min = minCheck.inclusive ? minCheck.value : minCheck.value + 1;
		const max = maxCheck.inclusive ? maxCheck.value : maxCheck.value - 1;

		const multipleOf = checks.find('multiple_of')?._zod.def.value;

		let result = isInt
			? transform.utils.random.int({ min, max })
			: transform.utils.random.float({ min, max });

		if (multipleOf !== undefined) {
			result = Math.round(result / multipleOf) * multipleOf;

			if (result < min) {
				result += multipleOf;
			}
			if (result > max) {
				result -= multipleOf;
			}

			if (multipleOf % 1 !== 0) {
				const decimals = multipleOf.toString().split('.')[1]?.length;
				result = Number(result.toFixed(decimals));
			}
		}

		return result;
	},
});
