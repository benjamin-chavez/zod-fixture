# Zod v4 Migration - Remaining Type Issues

## Overview

The zod-fixture library has been migrated from Zod v3 to v4. All 166 tests pass and the build succeeds (generates working JS bundles). However, there are TypeScript type errors during the build that should be addressed for a cleaner developer experience.

## Root Cause

Zod v4 uses a different internal type structure than v3:

- **v3**: `ZodType<Output, Def, Input>` with `_def`, `_output`, `_input` properties
- **v4**: `$ZodType<Output, Input, Internals>` with `_zod` containing all internals

The library's type definitions (in `src/transformer/generator.ts` and `src/internal/zod.ts`) expect the v3 structure.

## Key Type Mismatches

### 1. `$ZodType` vs `ZodType`

**Error pattern:**
```
Argument of type '$ZodType<...>' is not assignable to parameter of type 'ZodType<...>'
```

**Affected files:**
- `src/fixture/generators/intersection/index.ts` (lines 13, 14)
- `src/fixture/generators/lazy/index.ts` (lines 7, 8, 10)
- `src/fixture/generators/map/index.ts` (lines 13, 14)
- `src/fixture/generators/nullable/index.ts` (lines 10, 11)
- `src/fixture/generators/optional/index.ts` (line 10)
- `src/fixture/generators/readonly/index.ts`
- `src/fixture/generators/promise/index.ts`
- `src/fixture/generators/default/index.ts`
- `src/fixture/generators/effects/index.ts`
- `src/fixture/generators/union/index.ts`
- `src/fixture/generators/tuple/index.ts`
- `src/fixture/generators/set/index.ts`
- `src/fixture/generators/object/index.ts`

**Why it happens:**
The `def.innerType`, `def.left`, `def.right`, `def.getter()`, etc. return `$ZodType` in v4, but functions like `transform.fromSchema()` and `transform.utils.ifNotNever()` expect `ZodType`.

**Fix approach:**
Update `src/transformer/runner.ts` and `src/transformer/utils/index.ts` to accept either type:
```typescript
// Option A: Use a union type
type AnyZodType = ZodType | $ZodType;

// Option B: Use a more permissive base type
type ZodTypeBase = { _zod?: unknown; _def?: unknown; constructor: { name: string } };

// Option C: Import $ZodType from zod and update signatures
import type { $ZodType } from 'zod';
```

### 2. `ZodConstructor` missing `create` method

**Error pattern:**
```
Property 'create' is missing in type '$constructor<ZodXxx, ...>'
```

**Location:** `src/transformer/generator.ts` line 14

**Current definition:**
```typescript
export interface ZodConstructor<TSchema extends ZodType> {
  new (...args: any[]): TSchema;
  create(...args: any[]): TSchema;  // v4 constructors don't have this
}
```

**Fix:** Already applied - made `create` optional with `?`

### 3. `InferZodType` constraint

**Error pattern:**
```
Type 'unknown' does not satisfy the constraint 'string | number | symbol'
```

**Location:** `src/fixture/generators/object/index.ts` line 46

**Current definition in `src/internal/zod.ts`:**
```typescript
export type InferZodType<T> = T extends { _output: unknown } ? T['_output'] : unknown;
```

**Problem:** v4 schemas don't have `_output` at the top level; it's inside `_zod`.

**Fix approach:**
```typescript
export type InferZodType<T> = 
  T extends { _output: unknown } ? T['_output'] :  // v3 style
  T extends { _zod: { _output: unknown } } ? T['_zod']['_output'] :  // v4 style
  unknown;
```

### 4. Record index signature

**Error pattern:**
```
Element implicitly has an 'any' type because expression of type 'string | number' can't be used to index type 'Record<unknown, unknown>'
```

**Location:** `src/fixture/generators/object/index.ts` line 62

**Fix:** Cast the result type or use a more specific type for the record.

## Files to Update

### Priority 1: Core Type Definitions

1. **`src/internal/zod.ts`**
    - Update `InferZodType` to handle both v3 and v4 output inference
    - Consider exporting `$ZodType` from zod for use in other files
    - Current exports are correct; just need type improvements

2. **`src/transformer/generator.ts`**
    - Update `ZodConstructor` interface (already done - `create?` is optional)
    - Consider updating `ZodType` constraint to be more permissive
    - The `Definition` interface may need updating

3. **`src/transformer/runner.ts`**
    - `fromSchema` method accepts `ZodType` - may need to accept `$ZodType` too
    - Line 29: `const def = schema._def` - works at runtime but types don't match

4. **`src/transformer/utils/index.ts`**
    - `ifNotNever` method signature needs updating
    - `recursionCheck` method signature needs updating
    - `isType` method signature needs updating
    - `recursion` WeakMap type needs updating

### Priority 2: Generator Files

These files pass `def.innerType`, `def.left`, `def.right`, etc. to methods expecting `ZodType`:

- `src/fixture/generators/intersection/index.ts`
- `src/fixture/generators/lazy/index.ts`
- `src/fixture/generators/map/index.ts`
- `src/fixture/generators/nullable/index.ts`
- `src/fixture/generators/optional/index.ts`
- `src/fixture/generators/object/index.ts`
- `src/fixture/generators/readonly/index.ts`
- `src/fixture/generators/promise/index.ts`
- `src/fixture/generators/default/index.ts`
- `src/fixture/generators/effects/index.ts`
- `src/fixture/generators/union/index.ts`
- `src/fixture/generators/tuple/index.ts`
- `src/fixture/generators/set/index.ts`

## Recommended Fix Strategy

### Option A: Permissive Base Type (Quickest)

Create a permissive base type that both v3 and v4 schemas satisfy:
```typescript
// src/internal/zod.ts
export type ZodSchemaAny = {
  _def?: unknown;
  _zod?: unknown;
  constructor: { name: string };
};

// Use ZodSchemaAny instead of ZodType in function signatures
```

Pros: Quick fix, minimal changes
Cons: Loses some type safety

### Option B: Dual Type Support (Most Thorough)

Import both v3-style and v4-style types and create unions:
```typescript
import type { ZodType, $ZodType } from 'zod';

type AnyZodSchema = ZodType | $ZodType;
```

Then update all signatures to use `AnyZodSchema`.

Pros: Maintains type safety for both versions
Cons: More changes required, may complicate types

### Option C: v4-Only Types (Cleanest Long-term)

Fully migrate to v4's type system:
```typescript
import type { $ZodType, $ZodTypeDef } from 'zod';

// Replace all ZodType references with $ZodType
// Update all _def accesses to use v4 patterns
```

Pros: Clean, forward-looking
Cons: Breaking change for users with custom generators using v3 types

## v4 Type Structure Reference
```typescript
// v4 schema structure
const schema = z.string();
schema._zod.def        // { type: 'string', ... }
schema._zod.constr     // [Function: ZodString]
schema._zod.traits     // Set { 'ZodString', '$ZodString', ... }
schema._def            // same as schema._zod.def (alias for compatibility)

// v4 check structure
const checks = schema._def.checks ?? [];
checks[0]._zod.def.check  // 'min_length', 'max_length', etc.
checks[0]._zod.def.minimum // for min checks
checks[0]._zod.def.maximum // for max checks

// v4 constructor matching
schema.constructor.name  // 'ZodString', 'ZodNumber', etc.
```

## Linting Errors

There may also be ESLint errors. Common ones:

1. **`@typescript-eslint/no-explicit-any`** - Many places use `any` for flexibility
2. **`@typescript-eslint/no-unsafe-member-access`** - Accessing `_def`, `_zod` etc.
3. **`@typescript-eslint/no-unsafe-assignment`** - Assigning from unknown structures

These can be addressed with:
- More specific types (preferred)
- Type assertions with documentation
- ESLint disable comments (last resort)

## Testing the Fixes

After making type changes:
```bash
# Run tests (should stay at 166 passing)
npm run test

# Run build and check for type errors
npm run build

# For stricter type checking during development
npx tsc --noEmit
```

## Related Files Changed During Migration

For context, these files were modified during the v3→v4 migration:

- `src/internal/zod.ts` - Re-exports from zod, added ZodParsedType, getParsedType, util
- `src/transformer/utils/Checks.ts` - Updated for v4 check structure
- `src/transformer/utils/index.ts` - Updated checks method signature
- `src/fixture/generators/*/index.ts` - Most generators updated for v4 API
- `src/fixture/generators/index.ts` - Removed BrandedGenerator, added new generators
- Deleted: `src/fixture/generators/branded/` - ZodBranded doesn't exist in v4

## Notes on v4 Breaking Changes

Things that changed in Zod v4 that affected this library:

1. **No `ZodBranded`** - Branding is type-level only
2. **No `ZodNativeEnum`** - Unified into `ZodEnum` with `def.entries`
3. **New standalone types** - `ZodEmail`, `ZodURL`, `ZodEmoji`, etc. (not ZodString with checks)
4. **`ZodNumberFormat`** - Created by `z.int()`, `z.float()`, etc.
5. **`ZodPipe`** - Replaces separate transform/preprocess/refine wrappers
6. **`ZodPrefault`** - New type for `.prefault()` method
7. **Check names changed** - `min` → `min_length`, `max` → `max_length`, etc.
8. **Check access changed** - `check.value` → `check._zod.def.minimum/maximum/etc.`

## Final Working Solution

The permissive declaration file approach (`dist/public.d.ts`) that infers from both `_output` and `_zod._output` combined with the pnpm override:
```json
"pnpm": {
  "overrides": {
    "zod-fixture-z4>zod": "npm:zod@^4.1.12"
  }
}
```

This avoids needing to fix all the internal TypeScript errors while still providing correct type inference for consumers.

## Working `dist/public.d.ts`
```typescript
export interface Defaults {
  seed?: number;
  array: { min: number; max: number };
  map: { min: number; max: number };
  set: { min: number; max: number };
  string: { min: number; max: number };
  int: { min: number; max: number };
  float: { min: number; max: number };
  bigint: { min: bigint; max: bigint };
  date: { min: Date; max: Date };
}

export declare function createFixture<TOutput = unknown>(
  schema: { _output: TOutput } | { _zod: { _output: TOutput } } | Record<string, any>,
  instanceDefaults?: Partial<Defaults>
): TOutput;

export declare class Fixture {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<TOutput = unknown>(
    schema: { _output: TOutput } | { _zod: { _output: TOutput } } | Record<string, any>,
    instanceDefaults?: Partial<Defaults>
  ): TOutput;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedFixture extends Fixture {}
export declare class UnconstrainedFixture extends Fixture {}

export interface Generator {
  schema?: any;
  filter?: (args: { def: any; schema: any; transform: any; context: any }) => boolean;
  output: (args: { def: any; schema: any; transform: any; context: any }) => any;
}

export declare function Generator(config: Generator): Generator;

export declare class Transformer {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<TOutput = unknown>(
    schema: { _output: TOutput } | { _zod: { _output: TOutput } } | Record<string, any>,
    instanceDefaults?: Partial<Defaults>
  ): TOutput;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedTransformer extends Transformer {}
export declare class UnconstrainedTransformer extends Transformer {}
```