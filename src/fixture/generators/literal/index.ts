import { ZodLiteral } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

interface LiteralDef {
	values: unknown[];
}

export const LiteralGenerator = Generator({
	schema: ZodLiteral,
	output: ({ def }) => (def as unknown as LiteralDef).values[0],
});
