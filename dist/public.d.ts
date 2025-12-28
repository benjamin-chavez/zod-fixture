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

// Accept any schema-like object
export declare function createFixture<T = any>(
  schema: any,
  instanceDefaults?: Partial<Defaults>
): T;

export declare class Fixture {
  constructor(instanceDefaults?: Partial<Defaults>);
  fromSchema<T = any>(
    schema: any,
    instanceDefaults?: Partial<Defaults>
  ): T;
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
  fromSchema<T = any>(schema: any, instanceDefaults?: Partial<Defaults>): T;
  extend(...generators: Generator[]): this;
}

export declare class ConstrainedTransformer extends Transformer {}
export declare class UnconstrainedTransformer extends Transformer {}
