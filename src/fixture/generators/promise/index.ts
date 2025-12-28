// src/fixture/generators/promise/index.ts

import { ZodPromise } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const PromiseGenerator = Generator({
	schema: ZodPromise,
	output: ({ def, transform, context }) => {
		// TODO: this fallback isn't correct but architecting something that is
		// would probably be a major refactor.
		let result = undefined;
		const innerType = (def as any).innerType;

		transform.utils.recursionCheck(innerType, () => {
			result = transform.fromSchema(innerType, context);
		});

		return Promise.resolve(result);
	},
});
