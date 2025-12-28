// src/fixture/generators/string/index.ts
import type { ZodStringDef } from '@/internal/zod';
import { ZodString } from '@/internal/zod';
import { Generator } from '@/transformer/generator';
import type { Runner } from '@/transformer/runner';

const prefixPattern = (str: string) => `^.{${str.length}}`;
const suffixPattern = (str: string) => `.{${str.length}}$`;

// Helper to find string_format checks by format type
function findFormat(
	checks: ReturnType<Runner['utils']['checks']>,
	format: string,
) {
	// Need to find the check with matching format, not just the first string_format
	const allChecks = (checks as any).checks ?? [];
	return allChecks.find(
		(c: any) =>
			c._zod?.def?.check === 'string_format' && c._zod?.def?.format === format,
	);
}

function hasFormat(
	checks: ReturnType<Runner['utils']['checks']>,
	format: string,
) {
	return findFormat(checks, format) !== undefined;
}

function formatString(transform: Runner, def: ZodStringDef, value: string) {
	const checks = transform.utils.checks(def.checks ?? []);

	let max = checks.find('max_length')?._zod.def.maximum;
	let min = checks.find('min_length')?._zod.def.minimum ?? 0;
	const length = checks.find('length_equals')?._zod.def.length;
	const includes = findFormat(checks, 'includes')?._zod.def.includes;
	const startsWith = findFormat(checks, 'starts_with')?._zod.def.prefix;
	const endsWith = findFormat(checks, 'ends_with')?._zod.def.suffix;
	const emoji = hasFormat(checks, 'emoji');
	// trim/toUpperCase/toLowerCase are now 'overwrite' checks - harder to detect
	// You may need to check schema properties directly or skip these

	if (length) {
		min = length;
		max = length;
	}

	if (min != null && value.length < min) {
		const diff = min - value.length;
		value += transform.utils.random.string({ min: diff, max: diff });
	}

	if (max != null) {
		value = value.slice(0, max);
	}

	if (includes) {
		const prefix = startsWith ? prefixPattern(startsWith) : '';
		value = value.replace(
			new RegExp(`(${prefix}).{${includes.length}}`),
			(_, prefix) => prefix + includes,
		);
	}

	if (startsWith) {
		value = value.replace(new RegExp(prefixPattern(startsWith)), startsWith);
	}

	if (endsWith) {
		value = value.replace(new RegExp(suffixPattern(endsWith)), endsWith);
	}

	if (emoji) {
		value = value.replace(/./g, () => transform.utils.random.emoji());
	}

	// Apply overwrite transforms (trim, toUpperCase, toLowerCase, etc.)
	for (const check of (def.checks ?? []) as any[]) {
		if (
			check._zod?.def?.check === 'overwrite' &&
			typeof check._zod.def.tx === 'function'
		) {
			value = check._zod.def.tx(value);
		}
	}

	return max ? value.slice(0, max) : value;
}

export const StringGenerator = Generator({
	schema: ZodString,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		let min = checks.find('min_length')?._zod.def.minimum;
		let max = checks.find('max_length')?._zod.def.maximum;

		const length = checks.find('length_equals')?._zod.def.length;
		if (length) {
			min = length;
			max = length;
		}

		return formatString(
			transform,
			def,
			transform.utils.random.string({ min, max }),
		);
	},
});

export const UlidGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodULID',
	output: ({ def, transform }) =>
		formatString(transform, def, transform.utils.random.ulid()),
});

export const UrlGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodURL',
	output: ({ def, transform }) =>
		formatString(
			transform,
			def,
			`https://${transform.utils.random.lorem(1)}.com`,
		),
});

export const UuidGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodUUID',
	output: ({ def, transform }) => {
		const version = (def as any).version as string | undefined;

		switch (version) {
			case 'v7':
				return transform.utils.random.uuidv7();
			case 'v1':
				return transform.utils.random.uuidv1();
			case 'v6':
				return transform.utils.random.uuidv6();
			case 'v4':
			default:
				// v4 is random, also use as fallback for v2, v3, v5, v8
				// which have complex generation requirements
				// If there's a pattern in def, we could use regexp generator
				if (version && (def as any).pattern) {
					return transform.utils.random.regexp((def as any).pattern);
				}
				return transform.utils.random.uuid();
		}
	},
});

export const EmailGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodEmail',
	output: ({ def, transform }) =>
		formatString(transform, def, 'rando@email.com'),
});

export const CuidGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodCUID',
	output: ({ def, transform }) =>
		formatString(transform, def, transform.utils.random.cuid()),
});

export const Cuid2Generator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodCUID2',
	output: ({ def, transform }) =>
		formatString(transform, def, transform.utils.random.cuid2()),
});

export const DateTimeGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodISODateTime',
	output: ({ transform }) => transform.utils.random.date().toISOString(),
});

export const RegexGenerator = Generator({
	schema: ZodString,
	filter: ({ def, transform }) =>
		hasFormat(transform.utils.checks(def.checks ?? []), 'regex'),
	output: ({ def, transform }) => {
		const pattern = findFormat(
			transform.utils.checks(def.checks ?? []),
			'regex',
		)?._zod.def.pattern;
		if (!pattern) {
			throw new Error(`RegexGenerator: regex pattern not found`);
		}
		return formatString(transform, def, transform.utils.random.regexp(pattern));
	},
});

// IP generator needs to handle ipv4/ipv6 separately now
export const IpGenerator = Generator({
	filter: ({ schema }) =>
		schema.constructor.name === 'ZodIPv4' ||
		schema.constructor.name === 'ZodIPv6',
	output: ({ schema, transform }) => {
		if (schema.constructor.name === 'ZodIPv4') {
			return transform.utils
				.n(() => transform.utils.random.int({ min: 1, max: 255 }), 4)
				.join('.');
		}
		return transform.utils
			.n(
				() => transform.utils.random.int({ min: 0, max: 65535 }).toString(16),
				8,
			)
			.join(':');
	},
});

export const EmojiGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodEmoji',
	output: ({ transform }) => transform.utils.random.emoji(),
});
