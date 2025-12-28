// src/fixture/fixture.test.ts

import { ZodString } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import { expect, test } from 'vitest';
import { z } from 'zod';
import { Fixture, createFixture } from './fixture';

const PersonSchema = z.object({
	name: z.string(),
	birthday: z.date(),
	address: z.object({
		street: z.string(),
		city: z.string(),
		state: z.string(),
	}),
	pets: z.array(z.object({ name: z.string(), breed: z.string() })),
	totalVisits: z.number(),
});

test('creates a fixture using a class instance', () => {
	const result = new Fixture().fromSchema(PersonSchema);
	expect(result.name).toBeTypeOf('string');
	expect(result.birthday).toBeInstanceOf(Date);
	expect(result.address).toBeTypeOf('object');
	expect(result.address.street).toBeTypeOf('string');
	expect(result.address.city).toBeTypeOf('string');
	expect(result.address.state).toBeTypeOf('string');
	expect(result.pets).toBeInstanceOf(Array);
	expect(result.pets[0]).toBeTypeOf('object');
	expect(result.pets[0]?.name).toBeTypeOf('string');
	expect(result.pets[0]?.breed).toBeTypeOf('string');
	expect(result.totalVisits).toBeTypeOf('number');
});

test('creates a fixture using createFixture', () => {
	const result = createFixture(PersonSchema);
	expect(result.name).toBeTypeOf('string');
	expect(result.birthday).toBeInstanceOf(Date);
	expect(result.address).toBeTypeOf('object');
	expect(result.address.street).toBeTypeOf('string');
	expect(result.address.city).toBeTypeOf('string');
	expect(result.address.state).toBeTypeOf('string');
	expect(result.pets).toBeInstanceOf(Array);
	expect(result.pets[0]).toBeTypeOf('object');
	expect(result.pets[0]?.name).toBeTypeOf('string');
	expect(result.pets[0]?.breed).toBeTypeOf('string');
	expect(result.totalVisits).toBeTypeOf('number');
});

test(`priotizes generators via extend`, () => {
	const nameGenerator = Generator({
		schema: ZodString,
		filter: ({ context }) => context.path.includes('name'),
		output: () => 'Fixed Name',
	});

	const result = new Fixture().extend(nameGenerator).fromSchema(PersonSchema);

	expect(result.name).toBe('Fixed Name');
	expect(result.birthday).toBeInstanceOf(Date);
	expect(result.address).toBeTypeOf('object');
	expect(result.address.street).toBeTypeOf('string');
	expect(result.address.street).not.toBe('Fixed Name');
	expect(result.address.city).toBeTypeOf('string');
	expect(result.address.state).toBeTypeOf('string');
	expect(result.pets).toBeInstanceOf(Array);
	expect(result.pets[0]).toBeTypeOf('object');
	expect(result.pets[0]?.name).toBeTypeOf('string');
	expect(result.pets[0]?.breed).toBeTypeOf('string');
	expect(result.totalVisits).toBeTypeOf('number');
});

test(`fixture has all the zod types`, () => {
	enum Fruits {
		Apple,
		Banana,
	}
	enum StringFruits {
		Apple = 'apple',
		Banana = 'banana',
		Cantaloupe = 3,
	}
	const constFruits = {
		Apple: 'apple',
		Banana: 'banana',
		Cantaloupe: 3,
	} as const;
	const Person = z.object({
		name: z.string(),
	});
	const Employee = z.object({
		role: z.string(),
	});

	const pxSchema = z.custom<`${number}px`>((val) => {
		return /^\d+px$/.test(val as string);
	});
	const CustomSchemaGenerator = Generator({
		schema: pxSchema,
		output: () => '100px',
	});

	class InstanceOfClass {}
	const instanceOfSchema = z.instanceof(InstanceOfClass);
	const InstanceOfSchemaGenerator = Generator({
		schema: instanceOfSchema,
		output: () => new InstanceOfClass(),
	});

	const errorSchema = z.instanceof(Error);
	const ErrorGenerator = Generator({
		schema: errorSchema,
		output: () => new Error(),
	});

	const schemaWithEverything = z.object({
		default: z.string().prefault('default'),
		string: z.string(),
		number: z.number(),
		bigint: z.bigint(),
		boolean: z.boolean(),
		date: z.date(),
		symbol: z.symbol(),
		undefined: z.undefined(),
		null: z.null(),
		void: z.void(),
		any: z.any(),
		unknown: z.unknown(),
		// this is by design, see the never generator for more info
		// never: z.never(),
		literal: z.literal('literal'),
		string_max: z.string().max(5),
		string_min: z.string().min(5),
		string_length: z.string().length(5),
		string_email: z.email(),
		string_url: z.url(),
		string_emoji: z.emoji(),
		string_uuid: z.uuid(),
		string_cuid: z.cuid(),
		string_cuid2: z.cuid2(),
		string_ulid: z.ulid(),
		string_regex: z.string().regex(/abc/),
		string_includes: z.string().includes('abc'),
		string_startsWith: z.string().startsWith('abc'),
		string_endsWith: z.string().endsWith('abc'),
		string_datetime: z.iso.datetime(),
		string_datetimePrecision: z.iso.datetime({ precision: 3 }),
		string_datetimeOffset: z.iso.datetime({ offset: true }),
		string_ip: z.union([z.ipv4(), z.ipv6()]),
		string_ipv4: z.ipv4(),
		string_ipv6: z.ipv6(),
		string_trim: z.string().trim(),
		toLowerCase: z.string().toLowerCase(),
		toUpperCase: z.string().toUpperCase(),
		number_gt: z.number().gt(5),
		number_gte: z.number().gte(5),
		number_lt: z.number().lt(5),
		number_lte: z.number().lte(5),
		number_int: z.int(),
		number_positive: z.number().positive(),
		number_nonnegative: z.number().nonnegative(),
		number_negative: z.number().negative(),
		number_nonpositive: z.number().nonpositive(),
		number_multipleOf: z.number().multipleOf(5),
		number_finite: z.number().finite(),
		number_safe: z.int(),
		bigint_gt: z.bigint().gt(5n),
		bigint_gte: z.bigint().gte(5n),
		bigint_lt: z.bigint().lt(5n),
		bigint_lte: z.bigint().lte(5n),
		bigint_positive: z.bigint().positive(),
		bigint_nonnegative: z.bigint().nonnegative(),
		bigint_negative: z.bigint().negative(),
		bigint_nonpositive: z.bigint().nonpositive(),
		bigint_multipleOf: z.bigint().multipleOf(5n),
		nan: z.nan(),
		enum: z.enum(['Salmon', 'Tuna', 'Trout']),
		native_enum: z.enum(Fruits),
		string_enum: z.enum(StringFruits),
		const_enum: z.enum(constFruits),
		optional: z.optional(z.string()),
		nullable: z.nullable(z.string()),
		object: z.object({ name: z.string() }),
		array: z.array(z.string()),
		array_nonempty: z.string().array(),
		array_min: z.string().array().min(5),
		array_max: z.string().array().max(5),
		array_length: z.string().array().length(5),
		tuples: z.tuple([
			z.string(),
			z.number(),
			z.object({
				pointsScored: z.number(),
			}),
		]),
		unions: z.union([z.string(), z.number()]),
		unions_or: z.string().or(z.number()),
		union_discriminated: z.discriminatedUnion('status', [
			z.object({ status: z.literal('success'), data: z.string() }),
			z.object({ status: z.literal('failed'), error: errorSchema }),
		]),
		record: z.record(z.string(), z.number()),
		record_keytype: z.record(z.string().min(1), z.number()),
		map: z.map(z.string(), z.number()),
		set: z.set(z.number()),
		set_nonempty: z.set(z.number()).nonempty(),
		set_min: z.set(z.number()).min(5),
		set_max: z.set(z.number()).max(5),
		set_size: z.set(z.number()).size(5),
		intersection: z.intersection(Person, Employee),
		intersection_and: Person.and(Employee),
		promise: z.promise(z.number()),
		function: z.function(),
		custom: pxSchema,
		instanceof: instanceOfSchema,
	});

	const fixture = new Fixture().extend([
		CustomSchemaGenerator,
		InstanceOfSchemaGenerator,
		ErrorGenerator,
	]);

	expect(fixture).toReasonablySatisfy(schemaWithEverything);
	expect(fixture.fromSchema(schemaWithEverything, { seed: 1 }))
		.toMatchInlineSnapshot(`
			{
			  "any": "ZodAny",
			  "array": [
			    "adbh-jphfbgeuef",
			    "pk-bwuginfq-wye",
			    "arbbnvqupmio-cp",
			  ],
			  "array_length": [
			    "syxaihsmmjkglak",
			    "idqple-lssfhlaj",
			    "vaxzyvrnhagixoo",
			    "vepctboluapbmvj",
			    "buktcg-behvxxbs",
			  ],
			  "array_max": [
			    "gvxigywpoefvpqb",
			    "albskypax-vkg-c",
			    "ewfplqjhspsucxa",
			  ],
			  "array_min": [
			    "quzkzypfyarzkhn",
			    "qaomzvyjkq-aejd",
			    "dsnaamzzwjameci",
			    "dxvojhzjpyxgway",
			    "mlojvphdnzqiazq",
			  ],
			  "array_nonempty": [
			    "nofuysmhdbujfrc",
			    "cuebjhcvdfzrpow",
			    "qhibttoutyezsal",
			  ],
			  "bigint": 7n,
			  "bigint_gt": 31n,
			  "bigint_gte": 55n,
			  "bigint_lt": -76n,
			  "bigint_lte": -43n,
			  "bigint_multipleOf": -55n,
			  "bigint_negative": -73n,
			  "bigint_nonnegative": 84n,
			  "bigint_nonpositive": -88n,
			  "bigint_positive": 96n,
			  "boolean": false,
			  "const_enum": "banana",
			  "custom": "100px",
			  "date": 1984-04-04T07:51:12.441Z,
			  "default": "default",
			  "enum": "Salmon",
			  "function": [Function],
			  "instanceof": InstanceOfClass {},
			  "intersection": {
			    "name": "hscmljcwrbvksmu",
			    "role": "jywhlwwrqadtcqa",
			  },
			  "intersection_and": {
			    "name": "bpmpdjazu-kkuwm",
			    "role": "mpmsmcv-kvy-bru",
			  },
			  "literal": "literal",
			  "map": Map {
			    "dmjxaoepuyaijtx" => 61.04716784320772,
			    "msnfwloph-nfhgg" => -47.565384209156036,
			    "uymfbxnmftviina" => -59.265134297311306,
			  },
			  "nan": NaN,
			  "native_enum": 0,
			  "null": null,
			  "nullable": "javvhgtvqklxuul",
			  "number": 87.1078145224601,
			  "number_finite": -79.57295351661742,
			  "number_gt": 54.77301628794521,
			  "number_gte": 16.805741420248523,
			  "number_int": -21,
			  "number_lt": -82.0830508749932,
			  "number_lte": -97.9125861346256,
			  "number_multipleOf": -50,
			  "number_negative": -97.1976575779263,
			  "number_nonnegative": 10.7365308329463,
			  "number_nonpositive": -49.01897218078375,
			  "number_positive": 3.5948877369519323,
			  "number_safe": 72,
			  "object": {
			    "name": "ldjbedzbycvgqta",
			  },
			  "optional": undefined,
			  "promise": Promise {},
			  "record": {
			    "jvvnmqvb-mi-djy": 10.80643068999052,
			    "uqkvtapu-tihigg": 26.46066313609481,
			    "wjoaxqzfwqxicbr": 44.672950357198715,
			  },
			  "record_keytype": {
			    "-": 93.20931271649897,
			    "f": 98.78260376863182,
			    "o": 31.83999303728342,
			  },
			  "set": Set {
			    -82.27674816735089,
			    68.76808633096516,
			    -66.86207195743918,
			  },
			  "set_max": Set {
			    60.792179219424725,
			    -48.43942136503756,
			    -93.53538625873625,
			    12.841749051585793,
			    41.87745056115091,
			  },
			  "set_min": Set {
			    2.228294825181365,
			    80.72037338279188,
			    8.190361689776182,
			    -56.09518219716847,
			    91.88686343841255,
			  },
			  "set_nonempty": Set {
			    0.599306495860219,
			    49.971662322059274,
			  },
			  "set_size": Set {
			    -6.9997035432606936,
			    -25.58246525004506,
			    89.50978927314281,
			    -83.42890767380595,
			    -55.713452864438295,
			  },
			  "string": "tzadi-dgckfkjsk",
			  "string_cuid": "c563d3bjg0000wrcpy8othykl",
			  "string_cuid2": "d24oab1w9x0kkq2hdcqq6dk6",
			  "string_datetime": "1971-08-31T01:30:37.285Z",
			  "string_datetimeOffset": "2051-04-23T10:49:39.759Z",
			  "string_datetimePrecision": "2080-01-26T16:40:24.654Z",
			  "string_email": "rando@email.com",
			  "string_emoji": "😹",
			  "string_endsWith": "jpurtdxsqrujabc",
			  "string_enum": "banana",
			  "string_includes": "abcnlobuobrdnvz",
			  "string_ip": "225.247.3.170",
			  "string_ipv4": "128.159.19.30",
			  "string_ipv6": "c975:f311:1066:732d:5af5:9411:f11c:687b",
			  "string_length": "ldzfv",
			  "string_max": "oflxg",
			  "string_min": "osylm",
			  "string_regex": "abc",
			  "string_startsWith": "abcodmdyvkkoerz",
			  "string_trim": "guyupiauqeipoax",
			  "string_ulid": "0134G02NX6X89FJ1JJK4YJ8P73",
			  "string_url": "https://cupidatat.com",
			  "string_uuid": "88dffd7f-0481-4ce3-9c30-c3bc1c7151e0",
			  "symbol": Symbol(ad),
			  "toLowerCase": "jmyuqmahzwso-be",
			  "toUpperCase": "DUZFSMBGUNUFYBT",
			  "tuples": [
			    "pfeomyjmgwpwidy",
			    8.060912322252989,
			    {
			      "pointsScored": 81.92710522562265,
			    },
			  ],
			  "undefined": undefined,
			  "union_discriminated": {
			    "data": "nd-udfboyvtaiik",
			    "status": "success",
			  },
			  "unions": "fclfmnitafngswb",
			  "unions_or": "qqgicynvmfefqso",
			  "unknown": "ZodUnknown",
			  "void": undefined,
			}
		`);
});
