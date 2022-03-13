# pheno

Simple, lightweight at-runtime type checking functions, with full TypeScript support

## Features

- Full TypeScript integration: TypeScript understands that `assertType` and `isOfType` narrow the types of things, and will refine them accordingly
- Simple: Type validators are just functions that return booleans.
- Effective: There's lots of utility functions that help you represent all the various types you'd care about in your code.
- Lightweight: The whole library is 12.5K minified (before gzip/brotli), but it's also fully tree-shakeable, so only the type validators you use end up in your bundle.

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
- `array`
- `arrayOf`
- `arrayOfAny`
- `arrayOfUnknown`
- `assertType`
- `asType`
- `boolean`
- `Error_`
- `exactNumber`
- `exactString`
- `false_`
- `falsy`
- `hasClassName`
- `Infinity_`
- `instanceOf`
- `integer`
- `intersection`
- `isOfType`
- `map`
- `mapOf`
- `mappingObjectOf`
- `maybe`
- `NaN_`
- `NegativeInfinity`
- `never`
- `nonNullOrUndefined`
- `null_`
- `nullish`
- `number`
- `numberIncludingNanAndInfinities`
- `object`
- `objectWithOnlyTheseProperties`
- `objectWithProperties`
- `or`
- `partialObjectWithProperties`
- `record`
- `set`
- `setOf`
- `string`
- `stringMatching`
- `Symbol_`
- `symbolFor`
- `true_`
- `truthy`
- `tuple`
- `undefined_`
- `union`
- `unknown`
- `unknownFunction`
- `unknownMap`
- `unknownObject`
- `unknownSet`

Please see the TypeScript types for each of these in either your editor's autocomplete or pheno's source code for more information.

## License

MIT
