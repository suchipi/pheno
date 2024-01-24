import * as t from ".";
import { TypeValidator } from "./type-validator";

// prettier-ignore
type CoerceValue<V extends Coerceable> =
  V extends StringConstructor ? TypeValidator<string>
  : V extends NumberConstructor ? TypeValidator<number>
  : V extends BooleanConstructor ? TypeValidator<boolean>
  : V extends BigIntConstructor ? TypeValidator<BigInt>
  : V extends SymbolConstructor ? TypeValidator<Symbol>
  : V extends RegExpConstructor ? TypeValidator<RegExp>
  : V extends ArrayConstructor ? TypeValidator<Array<unknown>>
  : V extends SetConstructor ? TypeValidator<Set<unknown>>
  : V extends MapConstructor ? TypeValidator<Map<unknown, unknown>>
  : V extends ObjectConstructor ? TypeValidator<{ [key: string | number | symbol]: unknown }>
  : V extends DateConstructor ? TypeValidator<Date>
  : V extends FunctionConstructor ? TypeValidator<Function>
  : V extends ArrayBufferConstructor ? TypeValidator<ArrayBuffer>
  : V extends SharedArrayBufferConstructor ? TypeValidator<SharedArrayBuffer>
  : V extends DataViewConstructor ? TypeValidator<DataView>
  : V extends Int8ArrayConstructor ? TypeValidator<Int8Array>
  : V extends Uint8ArrayConstructor ? TypeValidator<Uint8Array>
  : V extends Uint8ClampedArrayConstructor ? TypeValidator<Uint8ClampedArray>
  : V extends Int16ArrayConstructor ? TypeValidator<Int16Array>
  : V extends Uint16ArrayConstructor ? TypeValidator<Uint16Array>
  : V extends Int32ArrayConstructor ? TypeValidator<Int32Array>
  : V extends Uint32ArrayConstructor ? TypeValidator<Uint32Array>
  : V extends Float32ArrayConstructor ? TypeValidator<Float32Array>
  : V extends Float64ArrayConstructor ? TypeValidator<Float64Array>
  : V extends RegExp ? TypeValidator<string>
  : V extends {} ? TypeValidator<{ [key in keyof V]: CoerceValue<V[key]> }>
  : V extends [] ? TypeValidator<[]>
  : V extends [any] ? TypeValidator<Array<CoerceValue<V[0]>>>
  : V extends Array<any> ? TypeValidator<Array<unknown>>
  : V extends { new (...args: any): any } ? TypeValidator<InstanceType<V>>
  : TypeValidator<V>;

type Coerceable =
  | boolean
  | number
  | string
  | bigint
  | undefined
  | null
  | RegExp
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | BigIntConstructor
  | SymbolConstructor
  | RegExpConstructor
  | ArrayConstructor
  | SetConstructor
  | MapConstructor
  | ObjectConstructor
  | DateConstructor
  | FunctionConstructor
  | ArrayBufferConstructor
  | SharedArrayBufferConstructor
  | DataViewConstructor
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | {}
  | []
  | [any]
  | Array<any>
  | { new (...args: any): any };

// prettier-ignore
type Unwrap<V extends Coerceable | TypeValidator<any> | unknown> =
  V extends TypeValidator<infer T> ? T
  : V extends Coerceable ?
    CoerceValue<V> extends TypeValidator<infer T> ? T : never
  : unknown;

const coerce: <V extends Coerceable | TypeValidator<any> | unknown>(
  value: V,
) => TypeValidator<Unwrap<V>> = (value: any): any => {
  if (t.null(value)) {
    return t.null;
  } else if (t.undefined(value)) {
    return t.undefined;
  } else if (t.true(value)) {
    return t.true;
  } else if (t.false(value)) {
    return t.false;
  } else if (t.NaN(value)) {
    return t.NaN;
  } else if (t.Infinity(value)) {
    return t.Infinity;
  } else if (t.NegativeInfinity(value)) {
    return t.NegativeInfinity;
  } else if (t.string(value)) {
    return t.exactString(value);
  } else if (t.number(value)) {
    return t.exactNumber(value);
  } else if (t.symbol(value)) {
    return t.exactSymbol(value);
  } else if (t.bigint(value)) {
    return t.exactBigInt(value);
  } else if (t.RegExp(value)) {
    return t.stringMatching(value);
  } else if (t.array(value)) {
    if (value.length < 1) {
      return t.arrayOfAny;
    } else if (value.length === 1) {
      return t.arrayOf(coerce(value[0]));
    } else {
      const validators = value.map(coerce);
      return t.tuple(
        // @ts-ignore spread in tuple position
        ...validators,
      );
    }
  } else if (t.object(value)) {
    return t.objectWithProperties(
      Object.fromEntries(
        Object.entries(value).map(([key, value]) => {
          return [key, coerce(value)];
        }),
      ),
    );
  } else if (t.anyFunction(value)) {
    if (value === String) {
      return t.string;
    } else if (value === Number) {
      return t.number;
    } else if (value === Boolean) {
      return t.boolean;
    } else if (typeof BigInt !== "undefined" && value === BigInt) {
      return t.bigint;
    } else if (typeof Symbol !== "undefined" && value === Symbol) {
      return t.symbol;
    } else if (value === RegExp) {
      return t.RegExp;
    } else if (value === Array) {
      return t.anyArray;
    } else if ((value as any) === Set) {
      return t.anySet;
    } else if ((value as any) === Map) {
      return t.anyMap;
    } else if (value === Object) {
      return t.anyObject;
    } else if (value === Date) {
      return t.Date;
    } else if (value === Function) {
      return t.anyFunction;
    } else if (
      typeof ArrayBuffer !== "undefined" &&
      (value as any) === ArrayBuffer
    ) {
      return t.ArrayBuffer;
    } else if (
      typeof SharedArrayBuffer !== "undefined" &&
      (value as any) === SharedArrayBuffer
    ) {
      return t.SharedArrayBuffer;
    } else if (typeof DataView !== "undefined" && (value as any) === DataView) {
      return t.DataView;
    } else if (
      typeof Int8Array !== "undefined" &&
      (value as any) === Int8Array
    ) {
      return t.Int8Array;
    } else if (
      typeof Uint8Array !== "undefined" &&
      (value as any) === Uint8Array
    ) {
      return t.Uint8Array;
    } else if (
      typeof Uint8ClampedArray !== "undefined" &&
      (value as any) === Uint8ClampedArray
    ) {
      return t.Uint8ClampedArray;
    } else if (
      typeof Int16Array !== "undefined" &&
      (value as any) === Int16Array
    ) {
      return t.Int16Array;
    } else if (
      typeof Uint16Array !== "undefined" &&
      (value as any) === Uint16Array
    ) {
      return t.Uint16Array;
    } else if (
      typeof Int32Array !== "undefined" &&
      (value as any) === Int32Array
    ) {
      return t.Int32Array;
    } else if (
      typeof Uint32Array !== "undefined" &&
      (value as any) === Uint32Array
    ) {
      return t.Uint32Array;
    } else if (
      typeof Float32Array !== "undefined" &&
      (value as any) === Float32Array
    ) {
      return t.Float32Array;
    } else if (
      typeof Float64Array !== "undefined" &&
      (value as any) === Float64Array
    ) {
      return t.Float64Array;
    } else if (/class\s/.test(value.toString())) {
      return t.instanceOf(value);
    } else {
      // assume it's already a type validator
      return value as any;
    }
  } else {
    throw new Error(
      `Not clear how to coerce value to type: ${t.stringifyValue(value)}`,
    );
  }
};

export default coerce;

const _coercingTypeConstructors: {
  [key: string]: (...args: any) => TypeValidator<any>;
} = {
  arrayOf: (type) => t.arrayOf(coerce(type)),
  intersection: (...args) =>
    t.intersection(
      // @ts-ignore spread in tuple position
      ...args.map(coerce),
    ),
  and: (...args) =>
    t.and(
      // @ts-ignore spread in tuple position
      ...args.map(coerce),
    ),
  union: (...args) =>
    t.union(
      // @ts-ignore spread in tuple position
      ...args.map(coerce),
    ),
  or: (...args) =>
    t.or(
      // @ts-ignore spread in tuple position
      ...args.map(coerce),
    ),
  mapOf: (k, v) => t.mapOf(coerce(k), coerce(v)),
  setOf: (type) => t.setOf(coerce(type)),
  maybe: (type) => t.maybe(coerce(type)),
  objectWithProperties: (properties) =>
    t.objectWithProperties(
      Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [k, coerce(v)]),
      ),
    ) as any,
  objectWithOnlyTheseProperties: (properties) =>
    t.objectWithOnlyTheseProperties(
      Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [k, coerce(v)]),
      ),
    ) as any,
  mappingObjectOf: (k, v) => t.mappingObjectOf(coerce(k), coerce(v)),
  record: (k, v) => t.record(coerce(k), coerce(v)),
  partialObjectWithProperties: (properties) =>
    t.partialObjectWithProperties(
      Object.fromEntries(
        Object.entries(properties).map(([k, v]) => [k, coerce(v)]),
      ),
    ) as any,
  tuple: (...args) =>
    t.tuple(
      // @ts-ignore spread in tuple position
      ...args.map(coerce),
    ) as any,
};

namespace CoercingTypeConstructors {
  export declare function arrayOf<
    T extends TypeValidator<any> | Coerceable | unknown,
  >(typeValidator: T): TypeValidator<Array<Unwrap<T>>>;

  interface IntersectionFn {
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
    ): TypeValidator<Unwrap<First> & Unwrap<Second>>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
    ): TypeValidator<Unwrap<First> & Unwrap<Second> & Unwrap<Third>>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
    ): TypeValidator<
      Unwrap<First> & Unwrap<Second> & Unwrap<Third> & Unwrap<Fourth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth> &
        Unwrap<Sixth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth> &
        Unwrap<Sixth> &
        Unwrap<Seventh>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth> &
        Unwrap<Sixth> &
        Unwrap<Seventh> &
        Unwrap<Eighth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth> &
        Unwrap<Sixth> &
        Unwrap<Seventh> &
        Unwrap<Eighth> &
        Unwrap<Ninth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
      Tenth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
      tenth: Tenth,
    ): TypeValidator<
      Unwrap<First> &
        Unwrap<Second> &
        Unwrap<Third> &
        Unwrap<Fourth> &
        Unwrap<Fifth> &
        Unwrap<Sixth> &
        Unwrap<Seventh> &
        Unwrap<Eighth> &
        Unwrap<Ninth> &
        Unwrap<Tenth>
    >;
  }
  export declare const intersection: IntersectionFn;
  export declare const and: IntersectionFn;

  export interface UnionFn {
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
    ): TypeValidator<Unwrap<First> | Unwrap<Second>>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
    ): TypeValidator<Unwrap<First> | Unwrap<Second> | Unwrap<Third>>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
    ): TypeValidator<
      Unwrap<First> | Unwrap<Second> | Unwrap<Third> | Unwrap<Fourth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
      | Unwrap<Sixth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
      | Unwrap<Sixth>
      | Unwrap<Seventh>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
      | Unwrap<Sixth>
      | Unwrap<Seventh>
      | Unwrap<Eighth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
      | Unwrap<Sixth>
      | Unwrap<Seventh>
      | Unwrap<Eighth>
      | Unwrap<Ninth>
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
      Tenth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
      tenth: Tenth,
    ): TypeValidator<
      | Unwrap<First>
      | Unwrap<Second>
      | Unwrap<Third>
      | Unwrap<Fourth>
      | Unwrap<Fifth>
      | Unwrap<Sixth>
      | Unwrap<Seventh>
      | Unwrap<Eighth>
      | Unwrap<Ninth>
      | Unwrap<Tenth>
    >;
  }
  export declare const union: UnionFn;
  export declare const or: UnionFn;

  export declare function mapOf<
    K extends TypeValidator<any> | Coerceable | unknown,
    V extends TypeValidator<any> | Coerceable | unknown,
  >(keyType: K, valueType: V): TypeValidator<Map<Unwrap<K>, Unwrap<V>>>;

  export declare function setOf<
    T extends TypeValidator<any> | Coerceable | unknown,
  >(itemType: T): TypeValidator<Set<Unwrap<T>>>;

  export declare function maybe<
    T extends TypeValidator<any> | Coerceable | unknown,
  >(itemType: T): TypeValidator<Unwrap<T> | undefined | null>;

  export declare function objectWithProperties<
    T extends {
      [key: string | number | symbol]:
        | TypeValidator<any>
        | Coerceable
        | unknown;
    },
  >(
    properties: T,
  ): TypeValidator<{
    [key in keyof T]: Unwrap<T[key]>;
  }>;

  export declare function objectWithOnlyTheseProperties<
    T extends {
      [key: string | number | symbol]:
        | TypeValidator<any>
        | Coerceable
        | unknown;
    },
  >(
    properties: T,
  ): TypeValidator<{
    [key in keyof T]: Unwrap<T[key]>;
  }>;

  export declare function mappingObjectOf<
    Values extends TypeValidator<any> | Coerceable | unknown,
    Keys extends TypeValidator<any> | Coerceable | unknown,
  >(
    keyType: Keys,
    valueType: Values,
  ): TypeValidator<
    Record<
      Unwrap<Keys> extends string | number | symbol ? Unwrap<Keys> : never,
      Unwrap<Values>
    >
  >;
  export declare const record: typeof mappingObjectOf;

  export declare function partialObjectWithProperties<
    T extends {
      [key: string | number | symbol]:
        | TypeValidator<any>
        | Coerceable
        | unknown;
    },
  >(
    properties: T,
  ): TypeValidator<{
    [key in keyof T]: Unwrap<T[key]> | null | undefined;
  }>;

  export interface TupleFn {
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
    ): TypeValidator<[Unwrap<First>, Unwrap<Second>]>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
    ): TypeValidator<[Unwrap<First>, Unwrap<Second>, Unwrap<Third>]>;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
    ): TypeValidator<
      [Unwrap<First>, Unwrap<Second>, Unwrap<Third>, Unwrap<Fourth>]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
      ]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
        Unwrap<Sixth>,
      ]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
        Unwrap<Sixth>,
        Unwrap<Seventh>,
      ]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
        Unwrap<Sixth>,
        Unwrap<Seventh>,
        Unwrap<Eighth>,
      ]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
        Unwrap<Sixth>,
        Unwrap<Seventh>,
        Unwrap<Eighth>,
        Unwrap<Ninth>,
      ]
    >;
    <
      First extends TypeValidator<any> | Coerceable | unknown,
      Second extends TypeValidator<any> | Coerceable | unknown,
      Third extends TypeValidator<any> | Coerceable | unknown,
      Fourth extends TypeValidator<any> | Coerceable | unknown,
      Fifth extends TypeValidator<any> | Coerceable | unknown,
      Sixth extends TypeValidator<any> | Coerceable | unknown,
      Seventh extends TypeValidator<any> | Coerceable | unknown,
      Eighth extends TypeValidator<any> | Coerceable | unknown,
      Ninth extends TypeValidator<any> | Coerceable | unknown,
      Tenth extends TypeValidator<any> | Coerceable | unknown,
    >(
      first: First,
      second: Second,
      third: Third,
      fourth: Fourth,
      fifth: Fifth,
      sixth: Sixth,
      seventh: Seventh,
      eighth: Eighth,
      ninth: Ninth,
      tenth: Tenth,
    ): TypeValidator<
      [
        Unwrap<First>,
        Unwrap<Second>,
        Unwrap<Third>,
        Unwrap<Fourth>,
        Unwrap<Fifth>,
        Unwrap<Sixth>,
        Unwrap<Seventh>,
        Unwrap<Eighth>,
        Unwrap<Ninth>,
        Unwrap<Tenth>,
      ]
    >;
  }
  export declare const tuple: TupleFn;
}

export const $CoercingTypeConstructors: typeof CoercingTypeConstructors =
  _coercingTypeConstructors as any;
