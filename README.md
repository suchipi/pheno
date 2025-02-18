# pheno

Simple, lightweight at-runtime type checking functions, with full TypeScript support

## Features

- Full TypeScript integration: TypeScript understands that `assertType` and `isOfType` narrow the types of things, and will refine them accordingly
- Simple: Type validators are just functions that return booleans.
- Effective: There's lots of utility functions that help you represent all the various types you'd care about in your code.
- Lightweight: The whole library is 18K minified (4.5K gzipped, 4.1K brotli-ified).

## Usage Example

```ts
import * as types from "pheno";

function something(first: unknown, second: unknown) {
  // Throws an error if `first` is not a string
  types.assertType(first, types.string);

  // Throws an error if `second` is not `string | number`
  types.assertType(second, types.union(types.string, types.number));

  // Typescript now knows that `first` is a string and `second` is `string | number`
  return first + " " + String(second);
}
```

## List of types and type builder functions

- `and`
- `any`
- `anyArray`
- `anyFunction`
- `anyMap`
- `anyObject`
- `anySet`
- `anyTypeValidator`
- `array` (alias of `arrayOfUnknown`)
- `arrayOf`
- `arrayOfAny`
- `arrayOfUnknown`
- `Array` (alias of `arrayOfUnknown`)
- `assertType` (assert that a value has the provided type, and throw an error message if it doesn't)
- `asType` (do a TypeScript `as` cast to convert the value into the provided type)
- `bigint`
- `BigInt` (alias of `bigint`)
- `boolean`
- `Boolean` (alias of `boolean`)
- `Date`
- `Error`
- `exactBigInt`
- `exactNumber`
- `exactString`
- `exactSymbol`
- `false`
- `falsy`
- `Function` (alias of `unknownFunction`)
- `hasClassName`
- `hasToStringTag`
- `Infinity`
- `instanceOf`
- `integer`
- `intersection`
- `isOfType` (return a boolean indicating if a value is of the provided type)
- `map` (alias of `unknownMap`)
- `Map` (alias of `unknownMap`)
- `mapOf`
- `mappingObjectOf`
- `maybe`
- `NaN`
- `NegativeInfinity`
- `never`
- `nonNullOrUndefined`
- `null`
- `nullish`
- `void` (alias of `nullish`)
- `number` (doesn't include NaN, Infinity, or -Infinity)
- `Number` (alias of `number`)
- `numberIncludingNanAndInfinities`
- `object` (alias of `unknownObject`)
- `Object` (alias of `unknownObject`)
- `objectOrNull`
- `objectWithOnlyTheseProperties`
- `objectWithProperties`
- `or`
- `optional`
- `partialObjectWithProperties`
- `record`
- `RegExp`
- `set` (alias of `unknownSet`)
- `Set` (alias of `unknownSet`)
- `setOf`
- `string`
- `String` (alias of `string`)
- `stringifyValue` (safe and lightweight value-to-string function, for printing values in error messages)
- `stringMatching`
- `Symbol`
- `symbol` (alias of `Symbol`)
- `symbolFor`
- `true`
- `truthy`
- `tuple`
- `undefined`
- `union`
- `unknown`
- `unknownFunction`
- `unknownMap`
- `unknownObject`
- `unknownSet`
- `unknownTypeValidator`
- `ArrayBuffer`
- `SharedArrayBuffer`
- `DataView`
- `TypedArray`
- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`

## License

MIT

## API Documentation

### TypeScript Types

#### TypeValidator (exported type)

A type validator is a function which returns a boolean indicating whether it
was called with a value assignable to its described type.

`pheno` contains many different type validators, as well as functions which
create type validators.

```ts
type TypeValidator<T> = (value: any) => value is T;
```

#### ExtractTypeFromValidator (exported type)

A utility type which extracts the inner type from a TypeValidator.

For example, `ExtractTypeFromValidator<TypeValidator<string>>` would be `string`.

```ts
type ExtractTypeFromValidator<Validator extends TypeValidator<any>> =
  Validator extends TypeValidator<infer R> ? R : never;
```

### API Functions

#### assertType (exported function)

A function which throws an Error if `target` isn't assignable to `type`.

- `@param` _target_ — The value to check.
- `@param` _type_ — The [TypeValidator](#typevalidator-exported-type) to check it against.
- `@param` _messageMaker_ — Optional. A function which to be used when creating an error message, if the value isn't assignable to the type.
- `@param` _ErrorConstructor_ — Optional. An constructor to be used when creating an error message, if the value isn't assignable to the type. Defaults to `TypeError`.

```ts
function assertType<T>(
  target: any,
  type: TypeValidator<T>,
  messageMaker?: (target: any, expectedType: TypeValidator<any>) => string,
  ErrorConstructor?: {
    new (message?: string): any;
  },
): asserts target is T;
```

#### assertType (exported namespace)

```ts
namespace assertType {
  export const defaultMessageMaker: (
    target: any,
    expectedType: TypeValidator<any>,
  ) => string;
}
```

##### assertType.defaultMessageMaker (exported function)

The default value used for [assertType](#asserttype-exported-function)'s `messageMaker`
parameter when no `messageMaker` argument is specified.

```ts
const defaultMessageMaker: (
  target: any,
  expectedType: TypeValidator<any>,
) => string;
```

#### isOfType (exported function)

A function which returns a boolean indicating whether `target` is assignable to `type`.

- `@param` _target_ — The value to check.
- `@param` _type_ — The [TypeValidator](#typevalidator-exported-type) to check it against.

```ts
function isOfType<T>(target: any, type: TypeValidator<T>): target is T;
```

#### asType (exported function)

A TypeScript helper function which casts `target` to the type contained within the [TypeValidator](#typevalidator-exported-type) `type`.

This has no runtime effect; `target` is returned without any checks or changes.

- `@param` _target_ — The value to return.
- `@param` _type_ — The [TypeValidator](#typevalidator-exported-type) whose inner type you would like to cast `target` to.

```ts
function asType<T>(target: unknown, type?: TypeValidator<T>): T;
```

#### stringifyValue (exported function)

Simple value-to-string converter, using JSON.stringify with a custom replacer
and a try-catch around it. Kinda like a lightweight stand-in for an "inspect"
function. [assertType](#asserttype-exported-function)'s default value for its `messageMaker` parameter
uses this function.

```ts
function stringifyValue(value: any): void;
```
