// // src/fixture/generators/generator.test.ts
//
// import fs from 'fs/promises';
// import path from 'path';
// import { expect, test } from 'vitest';
// import { DEFAULT_FIXTURE_GENERATORS } from '.';
//
// test('all generators should be accounted for', async () => {
// 	let tally = 0;
// 	const entities = await fs.readdir(__dirname);
// 	const scans = entities.map(async (entity) => {
// 		const entityPath = path.join(__dirname, entity);
// 		const stat = await fs.lstat(entityPath);
// 		if (stat.isFile()) return;
//
// 		const filePath = path.join(entityPath, 'index.ts');
// 		const contents = await fs.readFile(filePath);
// 		const generators = contents
// 			.toString()
// 			.match(/export const (\S+)Generator/g);
//
// 		if (generators) tally += generators.length;
// 	});
//
// 	await Promise.all(scans);
//
// 	expect(tally).toBe(DEFAULT_FIXTURE_GENERATORS.length);
// });

// src/fixture/generators/generator.test.ts

import fs from 'fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { expect, test } from 'vitest';
import { DEFAULT_FIXTURE_GENERATORS } from '.';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('all generators should be accounted for', async () => {
	const fileGenerators: string[] = [];
	const entities = await fs.readdir(__dirname);

	const scans = entities.map(async (entity) => {
		const entityPath = path.join(__dirname, entity);
		const stat = await fs.lstat(entityPath);
		if (stat.isFile()) return;

		const filePath = path.join(entityPath, 'index.ts');
		const contents = await fs.readFile(filePath, 'utf-8');

		// Only match exports that aren't commented out
		const lines = contents.split('\n');
		for (const line of lines) {
			const trimmed = line.trim();
			if (trimmed.startsWith('//')) continue;

			const match = trimmed.match(/^export const (\w+Generator)/);
			if (match) {
				fileGenerators.push(match[1]);
			}
		}
	});

	await Promise.all(scans);

	expect(
		fileGenerators.length,
		`Found ${fileGenerators.length} generators in files: ${fileGenerators.sort().join(', ')}\n` +
			`Expected ${DEFAULT_FIXTURE_GENERATORS.length} in DEFAULT_FIXTURE_GENERATORS array`,
	).toBe(DEFAULT_FIXTURE_GENERATORS.length);
});
