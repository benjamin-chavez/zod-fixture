// src/fixture/generators/date/index.ts

import { ZodDate } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DateGenerator = Generator({
	schema: ZodDate,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const minValue = checks.find('greater_than')?._zod.def.value;
		const maxValue = checks.find('less_than')?._zod.def.value;

		// Convert Date objects to timestamps, fall back to defaults
		const min =
			minValue instanceof Date
				? minValue.getTime()
				: transform.defaults.date.min;
		const max =
			maxValue instanceof Date
				? maxValue.getTime()
				: transform.defaults.date.max;

		return new Date(transform.utils.random.int({ min, max }));
	},
});
