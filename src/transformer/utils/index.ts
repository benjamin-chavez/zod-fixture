import type { ZodType } from '@/internal/zod';
import { ZodLazy } from '@/internal/zod';
import type { ZodConstructorOrSchema } from '../generator';
import { isZodConstructor } from '../generator';
import type { Runner } from '../runner';
import { Checks } from './Checks';
import { Randomization } from './Randomization';

export class Utils {
	recursion = new WeakMap<() => ZodType, number>();
	random: Randomization;

	constructor(private runner: Runner) {
		this.random = new Randomization(runner.defaults);
	}

	resolveValue<
		TInitial,
		TFallback extends NonNullable<TInitial>,
		TConflict extends NonNullable<TInitial>,
	>(
		config:
			| {
					initial: TInitial;
					fallback: TFallback;
			  }
			| {
					initial: TInitial;
					fallback: TFallback;
					conflict: TConflict;
					resolve: (config: {
						fallback: TFallback;
						conflict: TConflict;
					}) => NonNullable<TInitial>;
			  },
	): NonNullable<TInitial> {
		const { initial, fallback } = config;

		if (initial != null) return initial;

		if ('conflict' in config) {
			const { conflict, resolve } = config;

			return conflict != null ? resolve({ fallback, conflict }) : fallback;
		} else {
			return fallback;
		}
	}

	n<T>(
		factory: (index: number) => T,
		config: number | { min: number; max: number } = this.runner.defaults.array,
	): Array<T> {
		const length =
			typeof config === 'number' ? config : this.random.int(config);

		return Array.from({ length }, (_, i) => factory(i));
	}

	ifNotNever<TSchema extends ZodType>(
		schema: TSchema | null | undefined,
		action: (schema: TSchema) => unknown,
	) {
		if (!schema || schema.constructor.name === 'ZodNever') return;
		action(schema);
	}

	recursionCheck<TSchema extends ZodType>(
		schema: TSchema,
		action: (schema: TSchema) => unknown,
	) {
		if (this.isType(ZodLazy, schema)) {
			const count = this.recursion.get(schema._def.getter) ?? 0;
			const cap = this.random.int(this.runner.defaults.recursion);
			if (count >= cap) return;
		}
		action(schema);
	}

	isType<TSchema extends ZodType>(
		target: ZodConstructorOrSchema<TSchema>,
		schema: ZodType,
	): schema is TSchema {
		return isZodConstructor(target)
			? schema.constructor.name === target.name
			: // If our generator was created with an instance, make sure it matches
				// the schema we're trying to generate.
				// This is particularly important for z.custom schemas.
				schema === target;
	}

	// checks<TChecks extends { kind: string }[]>(checks: TChecks) {
	// 	return new Checks(checks);
	// }
	checks<TChecks extends { _zod: { def: { check: string } } }[]>(
		checks: TChecks,
	) {
		return new Checks(checks);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	noop() {}
}
