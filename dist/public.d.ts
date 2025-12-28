import type { z } from 'zod';

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

export declare function createFixture<T extends z.ZodType>(
  schema: T,
  instanceDefaults?: Partial<Defaults>
): z.infer<T>;

export declare class Fixture {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<T extends z.ZodType>(
    schema: T,
    instanceDefaults?: Partial<Defaults>
  ): z.infer<T>;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedFixture extends Fixture {}
export declare class UnconstrainedFixture extends Fixture {}

export interface Generator {
  schema?: new (...args: any[]) => z.ZodType;
  filter?: (args: { def: any; schema: z.ZodType; transform: any; context: any }) => boolean;
  output: (args: { def: any; schema: z.ZodType; transform: any; context: any }) => any;
}

export declare function Generator(config: Generator): Generator;

export declare class Transformer {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<T extends z.ZodType>(schema: T, instanceDefaults?: Partial<Defaults>): z.infer<T>;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedTransformer extends Transformer {}
export declare class UnconstrainedTransformer extends Transformer {}
