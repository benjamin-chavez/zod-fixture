// src/fixture/generators/index.ts

import { AnyGenerator } from './any';
import { ArrayGenerator } from './array';
import { BigIntGenerator, BigIntMultipleOfGenerator } from './bigint';
import { BooleanGenerator } from './boolean';
import { BrandedGenerator } from './branded';
import { DateGenerator } from './date';
import { DefaultGenerator, PrefaultGenerator } from './default';
import { PipeGenerator } from './effects';
import { EnumGenerator } from './enum';
import { FunctionGenerator } from './function';
import { IntersectionGenerator } from './intersection';
import { LazyGenerator } from './lazy';
import { LiteralGenerator } from './literal';
import { MapGenerator } from './map';
import { NanGenerator } from './nan';
import { NeverGenerator } from './never';
import { NullGenerator } from './null';
import { NullableGenerator } from './nullable';
import { NumberGenerator, NumberFormatGenerator } from './number';
import { ObjectGenerator, RecordGenerator } from './object';
import { OptionalGenerator } from './optional';
import { PromiseGenerator } from './promise';
import { ReadonlyGenerator } from './readonly';
import { SetGenerator } from './set';
import {
	Cuid2Generator,
	CuidGenerator,
	DateTimeGenerator,
	EmailGenerator,
	EmojiGenerator,
	IpGenerator,
	RegexGenerator,
	StringGenerator,
	UlidGenerator,
	UrlGenerator,
	UuidGenerator,
} from './string';
import { SymbolGenerator } from './symbol';
import { TupleGenerator } from './tuple';
import { UndefinedGenerator, VoidGenerator } from './undefined';
import { DiscriminatedUnionGenerator, UnionGenerator } from './union';
import { UnknownGenerator } from './unknown';

export const DEFAULT_FIXTURE_GENERATORS = [
	AnyGenerator,
	UnknownGenerator,
	OptionalGenerator,
	IpGenerator,
	UlidGenerator,
	ArrayGenerator,
	BigIntGenerator,
	BigIntMultipleOfGenerator,
	BooleanGenerator,
	DateGenerator,
	EnumGenerator,
	FunctionGenerator,
	IntersectionGenerator,
	LiteralGenerator,
	MapGenerator,
	NanGenerator,
	NullGenerator,
	NumberGenerator,
	NumberFormatGenerator,
	ObjectGenerator,
	RecordGenerator,
	SetGenerator,
	UuidGenerator,
	CuidGenerator,
	Cuid2Generator,
	EmailGenerator,
	EmojiGenerator,
	UrlGenerator,
	DateTimeGenerator,
	RegexGenerator,
	NullableGenerator,
	TupleGenerator,
	UndefinedGenerator,
	UnionGenerator,
	DiscriminatedUnionGenerator,
	PipeGenerator,

	PromiseGenerator,
	SymbolGenerator,
	LazyGenerator,
	BrandedGenerator,
	VoidGenerator,
	NeverGenerator,
	StringGenerator,
	DefaultGenerator,
	PrefaultGenerator,
	ReadonlyGenerator,
];

export {
	AnyGenerator,
	ArrayGenerator,
	BigIntGenerator,
	BigIntMultipleOfGenerator,
	BooleanGenerator,
	BrandedGenerator,
	Cuid2Generator,
	CuidGenerator,
	DateGenerator,
	DateTimeGenerator,
	DefaultGenerator,
	DiscriminatedUnionGenerator,
	EmailGenerator,
	EmojiGenerator,
	EnumGenerator,
	FunctionGenerator,
	IntersectionGenerator,
	IpGenerator,
	LazyGenerator,
	LiteralGenerator,
	MapGenerator,
	NanGenerator,
	NeverGenerator,
	NullGenerator,
	NullableGenerator,
	NumberGenerator,
	NumberFormatGenerator,
	ObjectGenerator,
	OptionalGenerator,
	PipeGenerator,
	PrefaultGenerator,
	PromiseGenerator,
	ReadonlyGenerator,
	RecordGenerator,
	RegexGenerator,
	SetGenerator,
	StringGenerator,
	SymbolGenerator,
	TupleGenerator,
	UlidGenerator,
	UndefinedGenerator,
	UnionGenerator,
	UnknownGenerator,
	UrlGenerator,
	UuidGenerator,
	VoidGenerator,
};
