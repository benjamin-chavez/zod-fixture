// src/fixture/generators/bigint/index.ts

import { ZodBigInt } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, transform }) =>
		!transform.utils.checks(def.checks ?? []).has('multiple_of'),
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const min = checks.find('greater_than')?._zod.def.value;
		const max = checks.find('less_than')?._zod.def.value;

		return transform.utils.random.bigInt({ min, max });
	},
});

// export const BigIntMultipleOfGenerator = Generator({
// 	schema: ZodBigInt,
// 	filter: ({ def, transform }) =>
// 		transform.utils.checks(def.checks ?? []).has('multiple_of'),
// 	output: ({ def, transform }) => {
// 		const checks = transform.utils.checks(def.checks ?? []);
//
// 		const minRaw =
// 			checks.find('greater_than')?._zod.def.value ??
// 			transform.defaults.bigint.min;
// 		const maxRaw =
// 			checks.find('less_than')?._zod.def.value ?? transform.defaults.bigint.max;
//
// 		const multipleOf = checks.find('multiple_of')?._zod.def.value ?? 1n;
//
// 		const min = minRaw / multipleOf;
// 		const max = maxRaw / multipleOf;
//
// 		return transform.utils.random.bigInt({ min, max }) * multipleOf;
// 	},
// });

// export const BigIntMultipleOfGenerator = Generator({
// 	schema: ZodBigInt,
// 	filter: ({ def, transform }) =>
// 		transform.utils.checks(def.checks ?? []).has('multiple_of'),
// 	output: ({ def, transform }) => {
// 		const checks = transform.utils.checks(def.checks ?? []);
//
// 		const minRaw = checks.find('greater_than')?._zod.def.value;
// 		const maxRaw = checks.find('less_than')?._zod.def.value;
// 		const multipleOfRaw = checks.find('multiple_of')?._zod.def.value;
//
// 		const minValue =
// 			minRaw !== undefined ? BigInt(minRaw) : transform.defaults.bigint.min;
// 		const maxValue =
// 			maxRaw !== undefined ? BigInt(maxRaw) : transform.defaults.bigint.max;
// 		const multipleOf = multipleOfRaw !== undefined ? BigInt(multipleOfRaw) : 1n;
//
// 		const min = minValue / multipleOf;
// 		const max = maxValue / multipleOf;
//
// 		return transform.utils.random.bigInt({ min, max }) * multipleOf;
// 	},
// });

export const BigIntMultipleOfGenerator = Generator({
	schema: ZodBigInt,
	filter: ({ def, transform }) =>
		transform.utils.checks(def.checks ?? []).has('multiple_of'),
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		const minRaw = checks.find('greater_than')?._zod.def.value;
		const maxRaw = checks.find('less_than')?._zod.def.value;
		const multipleOfRaw = checks.find('multiple_of')?._zod.def.value;

		const minValue =
			minRaw !== undefined ? BigInt(minRaw) : transform.defaults.bigint.min;
		const maxValue =
			maxRaw !== undefined ? BigInt(maxRaw) : transform.defaults.bigint.max;
		const multipleOf = multipleOfRaw !== undefined ? BigInt(multipleOfRaw) : 1n;

		const min = minValue / multipleOf;
		const max = maxValue / multipleOf;

		return transform.utils.random.bigInt({ min, max }) * multipleOf;
	},
});
