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
			    "bwuginfq-wyeuar",
			    "bnvqupmio-cpdkn",
			    "fuysmhdbujfrcfc",
			  ],
			  "array_length": [
			    "zyvrnhagixooxve",
			    "ctboluapbmvjrbu",
			    "tcg-behvxxbsrpf",
			    "omyjmgwpwidyoym",
			    "fclfmnitafngswb",
			  ],
			  "array_max": [
			    "skypax-vkg-cqew",
			    "plqjhspsucxauvs",
			    "xaihsmmjkglakoi",
			    "qple-lssfhlajfv",
			  ],
			  "array_min": [
			    "mzvyjkq-aejdcds",
			    "aamzzwjamecindx",
			    "ojhzjpyxgway-ml",
			    "jvphdnzqiazqflg",
			    "xigywpoefvpqbba",
			  ],
			  "array_nonempty": [
			    "bjhcvdfzrpowyqh",
			    "bttoutyezsalgtq",
			    "zkzypfyarzkhneq",
			  ],
			  "bigint": 87n,
			  "bigint_gt": 57n,
			  "bigint_gte": 96n,
			  "bigint_lt": -12n,
			  "bigint_lte": -71n,
			  "bigint_multipleOf": 15n,
			  "bigint_negative": -73n,
			  "bigint_nonnegative": 23n,
			  "bigint_nonpositive": -91n,
			  "bigint_positive": 12n,
			  "boolean": false,
			  "const_enum": "banana",
			  "custom": "100px",
			  "date": 2029-04-22T15:08:34.814Z,
			  "default": "default",
			  "enum": "Tuna",
			  "function": [Function],
			  "instanceof": InstanceOfClass {},
			  "intersection": {
			    "name": "ywhlwwrqadtcqas",
			    "role": "pmpdjazu-kkuwm-",
			  },
			  "intersection_and": {
			    "name": "pmsmcv-kvy-brub",
			    "role": "tqsaqocahzuyyvn",
			  },
			  "literal": "literal",
			  "map": Map {
			    "fwloph-nfhgghru" => 84.22671579755843,
			    "fbxnmftviinafqc" => 68.76808633096516,
			    "knuvnyofztvgapt" => -73.5140732023865,
			  },
			  "nan": NaN,
			  "native_enum": 1,
			  "null": null,
			  "nullable": "bedzbycvgqtapra",
			  "number": -20.646506268531084,
			  "number_finite": 7.766213221475482,
			  "number_gt": 7.868732412811369,
			  "number_gte": 42.649762383662164,
			  "number_int": -95,
			  "number_lt": -97.27405732683837,
			  "number_lte": -88.72664262540638,
			  "number_multipleOf": -40,
			  "number_negative": -89.88861199072562,
			  "number_nonnegative": 24.621106986887753,
			  "number_nonpositive": -13.997204951010644,
			  "number_positive": 51.47121754102409,
			  "number_safe": -54,
			  "object": {
			    "name": "bh-jphfbgeuefzp",
			  },
			  "optional": "vvhgtvqklxuulpl",
			  "promise": Promise {},
			  "record": {
			    "nmqvb-mi-djyool": 94.94807296432555,
			    "rf--orovdmjxaoe": 15.455889329314232,
			    "vtapu-tihiggrsj": 55.78444837592542,
			  },
			  "record_keytype": {
			    "a": -37.17069490812719,
			    "s": -3.9874146692454815,
			    "t": 72.46925057843328,
			  },
			  "set": Set {
			    -25.58246525004506,
			    89.50978927314281,
			    -83.42890767380595,
			  },
			  "set_max": Set {
			    63.20150108076632,
			    26.757352938875556,
			    -90.83769624121487,
			  },
			  "set_min": Set {
			    38.88137047179043,
			    -83.70520635508001,
			    -8.604418532922864,
			    -14.276233920827508,
			    -27.745057549327612,
			  },
			  "set_nonempty": Set {
			    1.1452441569417715,
			  },
			  "set_size": Set {
			    -22.434442210942507,
			    39.3600991461426,
			    -8.295364351943135,
			    53.24227595701814,
			    47.146423533558846,
			  },
			  "string": "-tzadi-dgckfkjs",
			  "string_cuid": "c5563d3bj0000bwrcpy8othyk",
			  "string_cuid2": "iy24oab1w9x0kkq2hdcqq6dk",
			  "string_datetime": "2022-12-20T07:12:30.175Z",
			  "string_datetimeOffset": "2029-11-07T18:35:53.709Z",
			  "string_datetimePrecision": "2023-12-03T04:30:35.140Z",
			  "string_email": "rando@email.com",
			  "string_emoji": "🙀",
			  "string_endsWith": "jjpurtdxsqruabc",
			  "string_enum": "banana",
			  "string_includes": "abcsnlobuobrdnv",
			  "string_ip": "6d97:e19f:f6ff:2fc:a9d7:7f84:9f27:12e4",
			  "string_ipv4": "30.201.243.17",
			  "string_ipv6": "732d:5af5:9411:f11c:687b:613a:3cad:c34e",
			  "string_length": "pldzf",
			  "string_max": "soflx",
			  "string_min": "aosyl",
			  "string_regex": "abc",
			  "string_startsWith": "abcyodmdyvkkoer",
			  "string_trim": "upiauqeipoaxtjm",
			  "string_ulid": "01934G02NX6X89FJ1JJK4YJ8P7",
			  "string_url": "https://sint.com",
			  "string_uuid": "8e7d947b-8dff-4f60-818d-e319c305c3bc",
			  "symbol": Symbol(laboris),
			  "toLowerCase": "uqmahzwso-bemdu",
			  "toUpperCase": "FSMBGUNUFYBTODE",
			  "tuples": [
			    "eqqgicynvmfefqs",
			    8.802023995667696,
			    {
			      "pointsScored": -68.75663343816996,
			    },
			  ],
			  "undefined": undefined,
			  "union_discriminated": {
			    "data": "axqzfwqxicbrtsu",
			    "status": "success",
			  },
			  "unions": 2.0721985958516598,
			  "unions_or": "udfboyvtaiikxcw",
			  "unknown": "ZodUnknown",
			  "void": undefined,
			}
		`);
});
