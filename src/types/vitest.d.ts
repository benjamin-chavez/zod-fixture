import type { ZodType } from 'zod';

interface CustomMatchers<R = unknown> {
	toReasonablySatisfy(schema: ZodType, iterations = 100): R;
}

declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
