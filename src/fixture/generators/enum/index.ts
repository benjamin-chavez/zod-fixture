// src/fixture/generators/enum/index.ts

import { ZodEnum, ZodNativeEnum } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const EnumGenerator = Generator({
	schema: ZodEnum,
	output: ({ def, transform }) => {
		const entries = (def as any).entries ?? {};

		// Filter out reverse mappings for numeric enums (keys that are numbers)
		const values = Object.keys(entries)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => entries[key]);

		return transform.utils.random.from(values);
	},
});
