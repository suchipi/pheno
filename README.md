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

### TypeValidators for Basic Types

#### any (exported value)

[TypeValidator](#typevalidator-exported-type) which always returns true.

Analogous to TypeScript's `any` type.

Synonyms: [unknown](#)

```ts
const any: TypeValidator<any>;
```

#### unknown (exported value)

[TypeValidator](#typevalidator-exported-type) which always returns true.

Analogous to TypeScript's `unknown` type.

Synonyms: [any](#)

```ts
const unknown: TypeValidator<unknown>;
```

#### anyObject (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS object.

Synonyms: [unknownObject](#), [object](#), [Object](#)

```ts
const anyObject: TypeValidator<{
  [key: string | number | symbol]: any;
}>;
```

#### unknownObject (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS object.

Synonyms: [anyObject](#), [object](#), [Object](#)

```ts
const unknownObject: TypeValidator<{}>;
```

#### object (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS object.

Synonyms: [anyObject](#), [unknownObject](#), [Object](#)

```ts
const object: TypeValidator<{}>;
```

#### Object (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS object.

Synonyms: [anyObject](#), [unknownObject](#), [object](#)

```ts
const Object: TypeValidator<{}>;
```

#### objectOrNull (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS object, or null.

This is designed to resemble `typeof x === "object"`.

```ts
const objectOrNull: TypeValidator<{
  [key: string | number | symbol]: any;
} | null>;
```

#### arrayOfAny (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS Array.

Synonyms: [anyArray](#)

```ts
const arrayOfAny: TypeValidator<Array<any>>;
```

#### arrayOfUnknown (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS Array.

Synonyms: [array](#), [Array](#)

```ts
const arrayOfUnknown: TypeValidator<Array<unknown>>;
```

#### array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS Array.

Synonyms: [arrayOfUnknown](#), [Array](#)

```ts
const array: TypeValidator<Array<unknown>>;
```

#### Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS Array.

Synonyms: [arrayOfUnknown](#), [Array](#)

```ts
const Array: TypeValidator<Array<unknown>>;
```

#### anyArray (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any JS Array.

Synonyms: [arrayOfAny](#)

```ts
const anyArray: TypeValidator<Array<any>>;
```

#### boolean (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any boolean (true or false).

Synonyms: [Boolean](#)

```ts
const boolean: TypeValidator<boolean>;
```

#### Boolean (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any boolean (true or false).

Synonyms: [boolean](#)

```ts
const Boolean: TypeValidator<boolean>;
```

#### string (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any string.

Synonyms: [String](#)

```ts
const string: TypeValidator<string>;
```

#### String (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any string.

Synonyms: [string](#)

```ts
const String: TypeValidator<string>;
```

#### null\_ (value)

[TypeValidator](#typevalidator-exported-type) which returns true for the value `null`.

Note: Exported as `pheno.null`, not `pheno.null_`.

```ts
const null_: TypeValidator<null>;
```

#### undefined\_ (value)

[TypeValidator](#typevalidator-exported-type) which returns true for the value `undefined`.

Note: Exported as `pheno.undefined`, not `pheno.undefined_`.

```ts
const undefined_: TypeValidator<undefined>;
```

#### nullish (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for the values `undefined` and `null`.

Synonyms: [void](#)

```ts
const nullish: TypeValidator<null | undefined>;
```

#### void\_ (value)

[TypeValidator](#typevalidator-exported-type) which returns true for the values `undefined` and `null`.

Note: Exported as `pheno.void`, not `pheno.void_`.

Synonyms: [nullish](#)

```ts
const void_: TypeValidator<null | undefined>;
```

#### numberIncludingNanAndInfinities (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value for which `typeof x
=== "number"`, including NaN, Infinity, and -Infinity.

```ts
const numberIncludingNanAndInfinities: TypeValidator<number>;
```

#### number (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any number, excluding NaN,
Infinity, and -Infinity.

Synonyms: [Number](#)

```ts
const number: TypeValidator<number>;
```

#### Number (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any number, excluding NaN,
Infinity, and -Infinity.

Synonyms: [number](#)

```ts
const Number: TypeValidator<number>;
```

#### NaN (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for not-a-number (NaN) values, using
the `Number.isNaN` algorithm.

```ts
const NaN: TypeValidator<number>;
```

#### Infinity (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for the number `Infinity` (positive infinity).

```ts
const Infinity: TypeValidator<number>;
```

#### NegativeInfinity (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for the number `-Infinity` (negative infinity).

```ts
const NegativeInfinity: TypeValidator<number>;
```

#### integer (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for whole numbers (numbers with
nothing after the decimal point).

```ts
const integer: TypeValidator<number>;
```

#### bigint (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for BigInt values.

Synonyms: [BigInt](#)

```ts
const bigint: TypeValidator<bigint>;
```

#### BigInt (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for BigInt values.

Synonyms: [bigint](#)

```ts
const BigInt: TypeValidator<bigint>;
```

#### never (exported value)

[TypeValidator](#typevalidator-exported-type) which never returns true. Always returns false.

```ts
const never: TypeValidator<never>;
```

#### anyFunction (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value for which `typeof x
=== "function"`, ie. functions, classes, and callable exotic objects.

```ts
const anyFunction: TypeValidator<(...args: any) => any>;
```

#### unknownFunction (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value for which `typeof x
=== "function"`, ie. functions, classes, and callable exotic objects.

Synonyms: [Function](#)

```ts
const unknownFunction: TypeValidator<(...args: Array<unknown>) => unknown>;
```

#### Function (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value for which `typeof x
=== "function"`, ie. functions, classes, and callable exotic objects.

Synonyms: [unknownFunction](#)

```ts
const Function: TypeValidator<(...args: Array<unknown>) => unknown>;
```

#### false\_ (value)

[TypeValidator](#typevalidator-exported-type) which returns true for the value `false`.

Note: Exported as `pheno.false`, not `pheno.false_`.

```ts
const false_: TypeValidator<false>;
```

#### true\_ (value)

[TypeValidator](#typevalidator-exported-type) which returns true for the value `true`.

Note: Exported as `pheno.true`, not `pheno.true_`.

```ts
const true_: TypeValidator<true>;
```

#### falsy (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value which becomes false
when coerced to a boolean: false, null, undefined, the empty string (""), or 0.

```ts
const falsy: TypeValidator<false | null | undefined | "" | 0>;
```

#### truthy (exported function)

[TypeValidator](#typevalidator-exported-type) which returns true for any value which becomes true
when coerced to a boolean.

```ts
const truthy: {
  <T>(target: T | false | null | undefined | "" | 0): target is T;
};
```

##### truthy(...) (call signature)

```ts
<T>(target: T | false | null | undefined | "" | 0): target is T;
```

#### nonNullOrUndefined (exported function)

[TypeValidator](#typevalidator-exported-type) which returns true for any value EXCEPT null and
undefined.

```ts
const nonNullOrUndefined: {
  <T>(target: T | null | undefined): target is T;
};
```

##### nonNullOrUndefined(...) (call signature)

```ts
<T>(target: T | null | undefined): target is T;
```

#### Error (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any value which looks like an `Error`, according to the following criteria:

- Is an object
- Has a `name` property which is a string
- Has a `message` property which is a string
- Has a `stack` property which is a string

```ts
const Error: TypeValidator<Error>;
```

#### Symbol (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any symbol value.

```ts
const Symbol: TypeValidator<symbol>;
```

#### RegExp (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any regular expression (RegExp) instance.

```ts
const RegExp: TypeValidator<RegExp>;
```

#### Date (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Date instance.

```ts
const Date: TypeValidator<Date>;
```

#### anyMap (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Map instance.

```ts
const anyMap: TypeValidator<Map<any, any>>;
```

#### unknownMap (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Map instance.

Synonyms: [map](#), [Map](#)

```ts
const unknownMap: TypeValidator<Map<unknown, unknown>>;
```

#### map (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Map instance.

Synonyms: [unknownMap](#), [Map](#)

```ts
const map: TypeValidator<Map<unknown, unknown>>;
```

#### Map (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Map instance.

Synonyms: [unknownMap](#), [map](#)

```ts
const Map: TypeValidator<Map<unknown, unknown>>;
```

#### anySet (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Set instance.

```ts
const anySet: TypeValidator<Set<any>>;
```

#### unknownSet (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Set instance.

Synonyms: [set](#), [Set](#)

```ts
const unknownSet: TypeValidator<Set<unknown>>;
```

#### set (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Set instance.

Synonyms: [unknownSet](#), [Set](#)

```ts
const set: TypeValidator<Set<unknown>>;
```

#### Set (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Set instance.

Synonyms: [unknownSet](#), [set](#)

```ts
const Set: TypeValidator<Set<unknown>>;
```

#### ArrayBuffer (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any ArrayBuffer instance.

```ts
const ArrayBuffer: TypeValidator<ArrayBuffer>;
```

#### SharedArrayBuffer (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any SharedArrayBuffer instance.

```ts
const SharedArrayBuffer: TypeValidator<SharedArrayBuffer>;
```

#### DataView (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any DataView instance.

```ts
const DataView: TypeValidator<DataView>;
```

#### TypedArray (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any typed array instance.

```ts
const TypedArray: TypeValidator<
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
>;
```

#### Int8Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Int8Array instance.

```ts
const Int8Array: TypeValidator<Int8Array>;
```

#### Uint8Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Uint8Array instance.

```ts
const Uint8Array: TypeValidator<Uint8Array>;
```

#### Uint8ClampedArray (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Uint8ClampedArray instance.

```ts
const Uint8ClampedArray: TypeValidator<Uint8ClampedArray>;
```

#### Int16Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Int16Array instance.

```ts
const Int16Array: TypeValidator<Int16Array>;
```

#### Uint16Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Uint16Array instance.

```ts
const Uint16Array: TypeValidator<Uint16Array>;
```

#### Int32Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Int32Array instance.

```ts
const Int32Array: TypeValidator<Int32Array>;
```

#### Uint32Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Uint32Array instance.

```ts
const Uint32Array: TypeValidator<Uint32Array>;
```

#### Float32Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Uint32Array instance.

```ts
const Float32Array: TypeValidator<Float32Array>;
```

#### Float64Array (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any Float64Array instance.

```ts
const Float64Array: TypeValidator<Float64Array>;
```

#### anyTypeValidator (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any function.

```ts
const anyTypeValidator: TypeValidator<TypeValidator<any>>;
```

#### unknownTypeValidator (exported value)

[TypeValidator](#typevalidator-exported-type) which returns true for any function.

```ts
const unknownTypeValidator: TypeValidator<TypeValidator<unknown>>;
```
