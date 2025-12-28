// skratch.ts
const z = require('zod');

const branded = z.string().brand('test');
console.log('constructor:', branded.constructor.name);
console.log('branded._def:', branded._def);
console.log('branded._zod:', branded._zod);
console.log('branded._zod.def:', branded._zod?.def);
