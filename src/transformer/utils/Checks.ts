// src/transformer/utils/Checks.ts
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

type ZodV4Check = {
	_zod: {
		def: {
			check: string;
			[key: string]: unknown;
		};
	};
};

export class Checks<TChecks extends ZodV4Check[]> {
	constructor(private checks: TChecks) {}

	find<TKind extends string>(kind: TKind): any {
		// ): FilterChecks<TChecks[number], TKind> | undefined {
		return this.checks.find((check) => check._zod.def.check === kind) as
			| FilterChecks<TChecks[number], TKind>
			| undefined;
	}

	has<TKind extends string>(kind: TKind) {
		return this.find(kind) !== undefined;
	}
}

// prettier-ignore
type FilterChecks<T extends ZodV4Check, TKind extends string> = IfAny<T, unknown, T extends { _zod: { def: { check: TKind } } } ? T : never>;
