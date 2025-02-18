import { TypeValidator } from "./typescript-types";

/**
 * {@link TypeValidator} which always returns true.
 *
 * Analogous to TypeScript's `any` type.
 *
 * Synonyms: {@link unknown}
 */
export const any: TypeValidator<any>;

/**
 * {@link TypeValidator} which always returns true.
 *
 * Analogous to TypeScript's `unknown` type.
 *
 * Synonyms: {@link any}
 */
export const unknown: TypeValidator<unknown>;

/**
 * {@link TypeValidator} which returns true for any JS object.
 *
 * Synonyms: {@link unknownObject}, {@link object}, {@link Object}
 */
export const anyObject: TypeValidator<{
  [key: string | number | symbol]: any;
}>;

/**
 * {@link TypeValidator} which returns true for any JS object.
 *
 * Synonyms: {@link anyObject}, {@link object}, {@link Object}
 */
export const unknownObject: TypeValidator<{}>;

/**
 * {@link TypeValidator} which returns true for any JS object.
 *
 * Synonyms: {@link anyObject}, {@link unknownObject}, {@link Object}
 */
export const object: TypeValidator<{}>;

/**
 * {@link TypeValidator} which returns true for any JS object.
 *
 * Synonyms: {@link anyObject}, {@link unknownObject}, {@link object}
 */
export const Object: TypeValidator<{}>;

/**
 * {@link TypeValidator} which returns true for any JS object, or null.
 *
 * This is designed to resemble `typeof x === "object"`.
 */
export const objectOrNull: TypeValidator<{
  [key: string | number | symbol]: any;
} | null>;

/**
 * {@link TypeValidator} which returns true for any JS Array.
 *
 * Synonyms: {@link anyArray}
 */
export const arrayOfAny: TypeValidator<Array<any>>;

/**
 * {@link TypeValidator} which returns true for any JS Array.
 *
 * Synonyms: {@link array}, {@link Array}
 */
export const arrayOfUnknown: TypeValidator<Array<unknown>>;

/**
 * {@link TypeValidator} which returns true for any JS Array.
 *
 * Synonyms: {@link arrayOfUnknown}, {@link Array}
 */
export const array: TypeValidator<Array<unknown>>;

/**
 * {@link TypeValidator} which returns true for any JS Array.
 *
 * Synonyms: {@link arrayOfUnknown}, {@link Array}
 */
export const Array: TypeValidator<Array<unknown>>;

/**
 * {@link TypeValidator} which returns true for any JS Array.
 *
 * Synonyms: {@link arrayOfAny}
 */
export const anyArray: TypeValidator<Array<any>>;

/**
 * {@link TypeValidator} which returns true for any boolean (true or false).
 *
 * Synonyms: {@link Boolean}
 */
export const boolean: TypeValidator<boolean>;

/**
 * {@link TypeValidator} which returns true for any boolean (true or false).
 *
 * Synonyms: {@link boolean}
 */
export const Boolean: TypeValidator<boolean>;

/**
 * {@link TypeValidator} which returns true for any string.
 *
 * Synonyms: {@link String}
 */
export const string: TypeValidator<string>;

/**
 * {@link TypeValidator} which returns true for any string.
 *
 * Synonyms: {@link string}
 */
export const String: TypeValidator<string>;

/**
 * {@link TypeValidator} which returns true for the value `null`.
 */
declare const null_: TypeValidator<null>;
export { null_ as null };

/**
 * {@link TypeValidator} which returns true for the value `undefined`.
 */
declare const undefined_: TypeValidator<undefined>;
export { undefined_ as undefined };

/**
 * {@link TypeValidator} which returns true for the values `undefined` and `null`.
 *
 * Synonyms: {@link void}
 */
export const nullish: TypeValidator<null | undefined>;

/**
 * {@link TypeValidator} which returns true for the values `undefined` and `null`.
 *
 * Synonyms: {@link nullish}
 */
declare const void_: TypeValidator<null | undefined>;
export { void_ as void };

/**
 * {@link TypeValidator} which returns true for any value for which `typeof x
 * === "number"`, including NaN, Infinity, and -Infinity.
 */
export const numberIncludingNanAndInfinities: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for any number, excluding NaN,
 * Infinity, and -Infinity.
 *
 * Synonyms: {@link Number}
 */
export const number: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for any number, excluding NaN,
 * Infinity, and -Infinity.
 *
 * Synonyms: {@link number}
 */
export const Number: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for not-a-number (NaN) values, using
 * the `Number.isNaN` algorithm.
 */
export const NaN: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for the number `Infinity` (positive infinity).
 */
export const Infinity: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for the number `-Infinity` (negative infinity).
 */
export const NegativeInfinity: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for whole numbers (numbers with
 * nothing after the decimal point).
 */
export const integer: TypeValidator<number>;

/**
 * {@link TypeValidator} which returns true for BigInt values.
 *
 * Synonyms: {@link BigInt}
 */
export const bigint: TypeValidator<bigint>;

/**
 * {@link TypeValidator} which returns true for BigInt values.
 *
 * Synonyms: {@link bigint}
 */
export const BigInt: TypeValidator<bigint>;

/**
 * {@link TypeValidator} which never returns true. Always returns false.
 */
export const never: TypeValidator<never>;

/**
 * {@link TypeValidator} which returns true for any value for which `typeof x
 * === "function"`, ie. functions, classes, and callable exotic objects.
 */
export const anyFunction: TypeValidator<(...args: any) => any>;

/**
 * {@link TypeValidator} which returns true for any value for which `typeof x
 * === "function"`, ie. functions, classes, and callable exotic objects.
 *
 * Synonyms: {@link Function}
 */
export const unknownFunction: TypeValidator<
  (...args: Array<unknown>) => unknown
>;

/**
 * {@link TypeValidator} which returns true for any value for which `typeof x
 * === "function"`, ie. functions, classes, and callable exotic objects.
 *
 * Synonyms: {@link unknownFunction}
 */
export const Function: TypeValidator<(...args: Array<unknown>) => unknown>;

/**
 * {@link TypeValidator} which returns true for the value `false`.
 */
declare const false_: TypeValidator<false>;
export { false_ as false };

/**
 * {@link TypeValidator} which returns true for the value `true`.
 */
declare const true_: TypeValidator<true>;
export { true_ as true };

/**
 * {@link TypeValidator} which returns true for any value which becomes false
 * when coerced to a boolean: false, null, undefined, the empty string (""), or
 * 0.
 */
export const falsy: TypeValidator<false | null | undefined | "" | 0>;

/**
 * {@link TypeValidator} which returns true for any value which becomes true
 * when coerced to a boolean.
 */
export const truthy: {
  <T>(target: T | false | null | undefined | "" | 0): target is T;
};

/**
 * {@link TypeValidator} which returns true for any value EXCEPT null and
 * undefined.
 */
export const nonNullOrUndefined: {
  <T>(target: T | null | undefined): target is T;
};

/**
 * {@link TypeValidator} which returns true for any value which looks like an `Error`, according to the following criteria:
 *
 * - Is an object
 * - Has a `name` property which is a string
 * - Has a `message` property which is a string
 * - Has a `stack` property which is a string
 */
export const Error: TypeValidator<Error>;

/**
 * {@link TypeValidator} which returns true for any symbol value.
 */
export const Symbol: TypeValidator<symbol>;

/**
 * {@link TypeValidator} which returns true for any regular expression (RegExp) instance.
 */
export const RegExp: TypeValidator<RegExp>;

/**
 * {@link TypeValidator} which returns true for any Date instance.
 */
export const Date: TypeValidator<Date>;

/**
 * {@link TypeValidator} which returns true for any Map instance.
 */
export const anyMap: TypeValidator<Map<any, any>>;

/**
 * {@link TypeValidator} which returns true for any Map instance.
 *
 * Synonyms: {@link map}, {@link Map}
 */
export const unknownMap: TypeValidator<Map<unknown, unknown>>;

/**
 * {@link TypeValidator} which returns true for any Map instance.
 *
 * Synonyms: {@link unknownMap}, {@link Map}
 */
export const map: TypeValidator<Map<unknown, unknown>>;

/**
 * {@link TypeValidator} which returns true for any Map instance.
 *
 * Synonyms: {@link unknownMap}, {@link map}
 */
export const Map: TypeValidator<Map<unknown, unknown>>;

/**
 * {@link TypeValidator} which returns true for any Set instance.
 */
export const anySet: TypeValidator<Set<any>>;

/**
 * {@link TypeValidator} which returns true for any Set instance.
 *
 * Synonyms: {@link set}, {@link Set}
 */
export const unknownSet: TypeValidator<Set<unknown>>;

/**
 * {@link TypeValidator} which returns true for any Set instance.
 *
 * Synonyms: {@link unknownSet}, {@link Set}
 */
export const set: TypeValidator<Set<unknown>>;

/**
 * {@link TypeValidator} which returns true for any Set instance.
 *
 * Synonyms: {@link unknownSet}, {@link set}
 */
export const Set: TypeValidator<Set<unknown>>;

/**
 * {@link TypeValidator} which returns true for any ArrayBuffer instance.
 */
export const ArrayBuffer: TypeValidator<ArrayBuffer>;

/**
 * {@link TypeValidator} which returns true for any SharedArrayBuffer instance.
 */
export const SharedArrayBuffer: TypeValidator<SharedArrayBuffer>;

/**
 * {@link TypeValidator} which returns true for any DataView instance.
 */
export const DataView: TypeValidator<DataView>;

/**
 * {@link TypeValidator} which returns true for any typed array instance.
 */
export const TypedArray: TypeValidator<
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

/**
 * {@link TypeValidator} which returns true for any Int8Array instance.
 */
export const Int8Array: TypeValidator<Int8Array>;

/**
 * {@link TypeValidator} which returns true for any Uint8Array instance.
 */
export const Uint8Array: TypeValidator<Uint8Array>;

/**
 * {@link TypeValidator} which returns true for any Uint8ClampedArray instance.
 */
export const Uint8ClampedArray: TypeValidator<Uint8ClampedArray>;

/**
 * {@link TypeValidator} which returns true for any Int16Array instance.
 */
export const Int16Array: TypeValidator<Int16Array>;

/**
 * {@link TypeValidator} which returns true for any Uint16Array instance.
 */
export const Uint16Array: TypeValidator<Uint16Array>;

/**
 * {@link TypeValidator} which returns true for any Int32Array instance.
 */
export const Int32Array: TypeValidator<Int32Array>;

/**
 * {@link TypeValidator} which returns true for any Uint32Array instance.
 */
export const Uint32Array: TypeValidator<Uint32Array>;

/**
 * {@link TypeValidator} which returns true for any Uint32Array instance.
 */
export const Float32Array: TypeValidator<Float32Array>;

/**
 * {@link TypeValidator} which returns true for any Float64Array instance.
 */
export const Float64Array: TypeValidator<Float64Array>;

/**
 * {@link TypeValidator} which returns true for any function.
 */
export const anyTypeValidator: TypeValidator<TypeValidator<any>>;

/**
 * {@link TypeValidator} which returns true for any function.
 */
export const unknownTypeValidator: TypeValidator<TypeValidator<unknown>>;
