import type { ZodType } from '@/internal/zod';
import type { Runner } from './runner';

// #region context
export interface Context {
	path: (string | number)[];
}
// #endregion context

export interface ZodConstructor<TSchema extends ZodType> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (...args: any[]): TSchema;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create(...args: any[]): TSchema;
}

export type ZodConstructorOrSchema<TSchema extends ZodType> =
	| TSchema
	| ZodConstructor<TSchema>;

export function isZodConstructor(
	schema: ZodConstructorOrSchema<ZodType>,
): schema is ZodConstructor<ZodType> {
	return typeof schema === 'function';
}

// #region filter
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Filter<TSchema extends ZodType = any> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Runner;
	context: Context;
}) => boolean;
// #endregion filter

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Generator<TSchema extends ZodType = any> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Runner;
	context: Context;
}) => unknown;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Definition<TSchema extends ZodType = any> {
	schema?: ZodConstructorOrSchema<TSchema>;
	filter?: Filter<TSchema>;
	output: Generator<TSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Generator<TSchema extends ZodType = any>(
	definition: Definition<TSchema>,
): Definition<TSchema> {
	return definition;
}

export type { Filter };
