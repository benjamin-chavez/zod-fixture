// examples/generator-filtering-zod-checks.test.ts

import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

const EmailGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodEmail',
	output: () => 'john.malkovich@gmail.com',
});

const StringGenerator = Generator({
	filter: ({ schema }) => schema.constructor.name === 'ZodString',
	output: ({ transform, def }) => {
		const checks = transform.utils.checks(def.checks ?? []);

		// v4 check names: min_length, max_length, length_equals
		let min = checks.find('min_length')?._zod.def.minimum;
		/**
		 *     kind: "min";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		let max = checks.find('max_length')?._zod.def.maximum;
		/**
		 *     kind: "max";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		const length = checks.find('length_equals')?._zod.def.length;
		/**
		 *     kind: "length";
		 *     value: number;
		 *     message?: string | undefined; // a custom error message
		 */

		if (length) {
			min = length.value;
			max = length.value;
		}

		return transform.utils.random.string({ min, max });
	},
});

const personSchema = z.object({
	name: z.string().max(10),
	email: z.email(),
});

const fixture = new Fixture({ seed: 38 }).extend([
	EmailGenerator,
	StringGenerator,
]);
const person = fixture.fromSchema(personSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		email: 'john.malkovich@gmail.com',
		name: 'yxyzyskryq',
	},
	// #endregion output
);

test('generates a person', () => {
	expect(person).toMatchInlineSnapshot(`
		{
		  "email": "john.malkovich@gmail.com",
		  "name": "yxyzyskryq",
		}
	`);
	expect(person).toEqual(output);
});
