// src/fixture/generators/date/index.ts

import { ZodDate } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DateGenerator = Generator({
  schema: ZodDate,
  output: ({ def, transform }) => {
    const checks = transform.utils.checks(def.checks ?? []);

    const minCheck = checks.find('greater_than')?._zod.def.value;
    const maxCheck = checks.find('less_than')?._zod.def.value;

    // Start with defaults
    let min = transform.defaults.date.min;
    let max = transform.defaults.date.max;

    // Apply constraints from schema
    if (minCheck instanceof Date) {
      min = minCheck.getTime();
    }
    if (maxCheck instanceof Date) {
      max = maxCheck.getTime();
    }

    // Adjust range if only one constraint specified and they conflict
    if (minCheck && !maxCheck && min > max) {
      // Only min specified, and it's past default max
      max = min + (1000 * 60 * 60 * 24 * 365 * 10); // +10 years from min
    }
    if (maxCheck && !minCheck && max < min) {
      // Only max specified, and it's before default min
      min = max - (1000 * 60 * 60 * 24 * 365 * 10); // -10 years from max
    }

    return new Date(transform.utils.random.int({ min, max }));
  },
});
