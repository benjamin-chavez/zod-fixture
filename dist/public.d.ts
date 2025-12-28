// Generic type that works with both Zod v3 and v4
type AnyZodSchema = {
  _output?: unknown;
  _zod?: { _output?: unknown };
  parse: (data: unknown) => unknown;
};

type InferOutput<T> = T extends { _output: infer O }
  ? O
  : T extends { _zod: { _output: infer O } }
  ? O
  : unknown;

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

export declare function createFixture<TSchema extends AnyZodSchema>(
  schema: TSchema,
  instanceDefaults?: Partial<Defaults>
): InferOutput<TSchema>;

export declare class Fixture {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<TSchema extends AnyZodSchema>(
    schema: TSchema,
    instanceDefaults?: Partial<Defaults>
  ): InferOutput<TSchema>;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedFixture extends Fixture {}
export declare class UnconstrainedFixture extends Fixture {}

export interface Generator {
  schema?: new (...args: any[]) => AnyZodSchema;
  filter?: (args: { def: any; schema: AnyZodSchema; transform: any; context: any }) => boolean;
  output: (args: { def: any; schema: AnyZodSchema; transform: any; context: any }) => any;
}

export declare function Generator(config: Generator): Generator;

export declare class Transformer {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<TSchema extends AnyZodSchema>(schema: TSchema, instanceDefaults?: Partial<Defaults>): any;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedTransformer extends Transformer {}
export declare class UnconstrainedTransformer extends Transformer {}
