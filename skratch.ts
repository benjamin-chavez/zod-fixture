// skratch.ts
const z = require('zod');

// Check what's available
console.log('ZodType:', typeof z.ZodType);
console.log('ZodString:', typeof z.ZodString);
console.log('ZodLiteral:', typeof z.ZodLiteral);

// Check a literal's type structure
const literal = z.literal('test');
console.log('literal constructor:', literal.constructor.name);
console.log('literal._def:', literal._def);
