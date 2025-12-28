// src/fixture/generators/object/index.ts

import type { InferZodType } from '@/internal/zod';
import { ZodObject, ZodRecord } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import { z } from 'zod';

export const ObjectGenerator = Generator({
	schema: ZodObject,
	output: ({ def, transform, context }) => {
		const shape = def.shape;
		const result: Record<string, unknown> = {};

		for (const key in shape) {
			transform.utils.ifNotNever(shape[key], (schema) => {
				transform.utils.recursionCheck(schema, () => {
					result[key] = transform.fromSchema(schema, {
						...context,
						path: [...context.path, key],
					});
				});
			});
		}
		// v4: catchall only exists for passthrough/strict/catchall modes
		const catchall = (def as any).catchall;
		const passthrough = catchall && catchall.constructor.name !== 'ZodNever';

		if (passthrough) {
			const key = transform.utils.random.lorem(1, 'word');
			const type =
				catchall.constructor.name === 'ZodUnknown' ? z.any() : catchall;
			result[key] = transform.fromSchema(type, {
				...context,
				path: [...context.path, key],
			});
		}

		return result;
	},
});

export const RecordGenerator = Generator({
	schema: ZodRecord,
	output: ({ def, transform, context }) => {
		const result: Record<
			InferZodType<typeof def.keyType>,
			InferZodType<typeof def.valueType>
		> = {};

		transform.utils.ifNotNever((def as any).keyType, (keyType) => {
			transform.utils.ifNotNever((def as any).valueType, (valueType) => {
				transform.utils.recursionCheck(valueType, () => {
					transform.utils.n(() => {
						const key = transform.fromSchema(keyType, context) as
							| string
							| number;
						const value = transform.fromSchema(valueType, {
							...context,
							path: [...context.path, key],
						});

						result[key] = value;
					});
				});
			});
		});

		return result;
	},
});
