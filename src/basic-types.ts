import type { TypeValidator } from "./type-validator";
import { setName, isTagged } from "./utils";

export const any: TypeValidator<any> = (_value): _value is any => true;
setName(any, "any");

export const unknown: TypeValidator<unknown> = (_value): _value is unknown =>
  true;
setName(any, "unknown");

export const anyObject: TypeValidator<{
  [key: string | number | symbol]: any;
}> = (target: any): target is any =>
  typeof target === "object" && target != null;
setName(anyObject, "anyObject");

export const unknownObject: TypeValidator<{}> = (target: any): target is any =>
  anyObject(target);
setName(unknownObject, "unknownObject");

export const object: TypeValidator<{}> = (target: any): target is any =>
  anyObject(target);
setName(object, "object");

const Object_ = object;
export { Object_ as Object };

export const objectOrNull: TypeValidator<
  {
    [key: string | number | symbol]: any;
  } | null
> = (target: any): target is any => typeof target === "object";
setName(objectOrNull, "objectOrNull");

export const arrayOfAny: TypeValidator<Array<any>> = (target): target is any =>
  Array.isArray(target);
setName(arrayOfAny, "arrayOfAny");

export const arrayOfUnknown: TypeValidator<Array<unknown>> = (
  target
): target is any => arrayOfAny(target);
setName(arrayOfUnknown, "arrayOfUnknown");

export const array: TypeValidator<Array<unknown>> = (target): target is any =>
  arrayOfAny(target);
setName(array, "array");

const Array_ = array;
export { Array_ as Array };

export const anyArray: TypeValidator<Array<any>> = (target): target is any =>
  arrayOfAny(target);
setName(anyArray, "anyArray");

export const boolean: TypeValidator<boolean> = (target): target is boolean =>
  typeof target === "boolean";
setName(boolean, "boolean");

const Boolean_ = boolean;
export { Boolean_ as Boolean };

export const string: TypeValidator<string> = (target): target is string =>
  typeof target === "string";
setName(string, "string");

const String_ = string;
export { String_ as String };

const null_: TypeValidator<null> = (target): target is null => target === null;
setName(null_, "null");

export { null_ as null };

const undefined_: TypeValidator<undefined> = (target): target is undefined =>
  typeof target === "undefined";
setName(undefined_, "undefined");

export { undefined_ as undefined };

export const nullish: TypeValidator<null | undefined> = (
  target
): target is null | undefined => target == null;
setName(nullish, "nullish");

const void_ = nullish;
export { void_ as void };

export const numberIncludingNanAndInfinities: TypeValidator<number> = (
  target
): target is number => typeof target === "number";
setName(numberIncludingNanAndInfinities, "numberIncludingNanAndInfinities");

export const number: TypeValidator<number> = (target): target is number =>
  typeof target === "number" &&
  !Number.isNaN(target) &&
  !Infinity_(target) &&
  !NegativeInfinity(target);
setName(number, "number");

const Number_ = number;
export { Number_ as Number };

const NaN_: TypeValidator<number> = (target): target is number =>
  Number.isNaN(target);
setName(NaN_, "NaN");

export { NaN_ as NaN };

const Infinity_: TypeValidator<number> = (target): target is number =>
  target === Infinity;
setName(Infinity_, "Infinity");

export { Infinity_ as Infinity };

export const NegativeInfinity: TypeValidator<number> = (
  target
): target is number => target === -Infinity;
setName(NegativeInfinity, "NegativeInfinity");

export const integer: TypeValidator<number> = (target): target is number =>
  number(target) && target % 1 === 0;
setName(integer, "integer");

const bigint_: TypeValidator<bigint> = (target): target is bigint =>
  typeof target === "bigint";
setName(bigint_, "bigint");

export { bigint_ as bigint, bigint_ as BigInt };

export const never: TypeValidator<never> = (_target): _target is never => false;
setName(never, "never");

export const anyFunction: TypeValidator<(...args: any) => any> = (
  target
): target is (...args: any) => any => typeof target === "function";
setName(anyFunction, "anyFunction");

export const unknownFunction: TypeValidator<
  (...args: Array<unknown>) => unknown
> = (target): target is (...args: Array<unknown>) => unknown =>
  anyFunction(target);
setName(unknownFunction, "unknownFunction");

const Function_ = unknownFunction;
export { Function_ as Function };

const false_: TypeValidator<false> = (target): target is false =>
  target === false;
setName(false_, "false");

export { false_ as false };

const true_: TypeValidator<true> = (target): target is true => target === true;
setName(true_, "true");

export { true_ as true };

export const falsy: TypeValidator<false | null | undefined | "" | 0> = (
  target
): target is false | null | undefined | "" | 0 => !Boolean(target);
setName(falsy, "falsy");

export const truthy = <T>(
  target: T | false | null | undefined | "" | 0
): target is T => Boolean(target);
setName(truthy, "truthy");

export const nonNullOrUndefined = <T>(
  target: T | null | undefined
): target is T => target != null;
setName(nonNullOrUndefined, "nonNullOrUndefined");

const Error_: TypeValidator<Error> = (target): target is Error =>
  anyObject(target) &&
  string(target.name) &&
  string(target.message) &&
  string(target.stack);
setName(Error_, "Error");

export { Error_ as Error };

const Symbol_: TypeValidator<symbol> = (target): target is symbol =>
  typeof target === "symbol";
setName(Symbol_, "Symbol");

export { Symbol_ as Symbol, Symbol_ as symbol };

const RegExp_: TypeValidator<RegExp> = (target): target is RegExp =>
  target instanceof RegExp || isTagged(target, "RegExp");
setName(RegExp_, "RegExp");

export { RegExp_ as RegExp };

const Date_: TypeValidator<Date> = (target): target is Date =>
  target instanceof Date || isTagged(target, "Date");
setName(Date_, "Date");

export { Date_ as Date };

export const anyMap: TypeValidator<Map<any, any>> = (
  target
): target is Map<any, any> =>
  target instanceof Map ||
  (anyObject(target) &&
    anyFunction(target.constructor) &&
    target.constructor.name === "Map" &&
    anyFunction(target.entries) &&
    number(target.size));
setName(anyMap, "anyMap");

export const unknownMap: TypeValidator<Map<unknown, unknown>> = (
  target
): target is Map<unknown, unknown> => anyMap(target);
setName(unknownMap, "unknownMap");

export const map: TypeValidator<Map<unknown, unknown>> = (
  target
): target is Map<unknown, unknown> => anyMap(target);
setName(map, "map");

export { map as Map };

export const anySet: TypeValidator<Set<any>> = (target): target is Set<any> =>
  target instanceof Set ||
  (anyObject(target) &&
    anyFunction(target.constructor) &&
    target.constructor.name === "Set" &&
    anyFunction(target.entries) &&
    number(target.size));
setName(anySet, "anySet");

export const unknownSet: TypeValidator<Set<unknown>> = (
  target
): target is Set<unknown> => anySet(target);
setName(unknownSet, "unknownSet");

export const set: TypeValidator<Set<unknown>> = (
  target
): target is Set<unknown> => anySet(target);
setName(set, "set");

export { set as Set };

const ArrayBuffer_: TypeValidator<ArrayBuffer> = (
  target
): target is ArrayBuffer => {
  return target instanceof ArrayBuffer || isTagged(target, "ArrayBuffer");
};
setName(ArrayBuffer_, "ArrayBuffer");
export { ArrayBuffer_ as ArrayBuffer };

const SharedArrayBuffer_: TypeValidator<SharedArrayBuffer> = (
  target
): target is SharedArrayBuffer => {
  return (
    target instanceof SharedArrayBuffer || isTagged(target, "SharedArrayBuffer")
  );
};
setName(SharedArrayBuffer_, "SharedArrayBuffer");
export { SharedArrayBuffer_ as SharedArrayBuffer };

const DataView_: TypeValidator<DataView> = (target): target is DataView => {
  return target instanceof DataView || isTagged(target, "DataView");
};
setName(DataView_, "DataView");
export { DataView_ as DataView };

const TypedArray_: TypeValidator<
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
> = (
  target
): target is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array => {
  return ArrayBuffer.isView(target) && !DataView_(target);
};
setName(TypedArray_, "TypedArray");
export { TypedArray_ as TypedArray };

const Int8Array_: TypeValidator<Int8Array> = (target): target is Int8Array => {
  return target instanceof Int8Array || isTagged(target, "Int8Array");
};
setName(Int8Array_, "Int8Array");
export { Int8Array_ as Int8Array };

const Uint8Array_: TypeValidator<Uint8Array> = (
  target
): target is Uint8Array => {
  return target instanceof Uint8Array || isTagged(target, "Uint8Array");
};
setName(Uint8Array_, "Uint8Array");
export { Uint8Array_ as Uint8Array };

const Uint8ClampedArray_: TypeValidator<Uint8ClampedArray> = (
  target
): target is Uint8ClampedArray => {
  return (
    target instanceof Uint8ClampedArray || isTagged(target, "Uint8ClampedArray")
  );
};
setName(Uint8ClampedArray_, "Uint8ClampedArray");
export { Uint8ClampedArray_ as Uint8ClampedArray };

const Int16Array_: TypeValidator<Int16Array> = (
  target
): target is Int16Array => {
  return target instanceof Int16Array || isTagged(target, "Int16Array");
};
setName(Int16Array_, "Int16Array");
export { Int16Array_ as Int16Array };

const Uint16Array_: TypeValidator<Uint16Array> = (
  target
): target is Uint16Array => {
  return target instanceof Uint16Array || isTagged(target, "Uint16Array");
};
setName(Uint16Array_, "Uint16Array");
export { Uint16Array_ as Uint16Array };

const Int32Array_: TypeValidator<Int32Array> = (
  target
): target is Int32Array => {
  return target instanceof Int32Array || isTagged(target, "Int32Array");
};
setName(Int32Array_, "Int32Array");
export { Int32Array_ as Int32Array };

const Uint32Array_: TypeValidator<Uint32Array> = (
  target
): target is Uint32Array => {
  return target instanceof Uint32Array || isTagged(target, "Uint32Array");
};
setName(Uint32Array_, "Uint32Array");
export { Uint32Array_ as Uint32Array };

const Float32Array_: TypeValidator<Float32Array> = (
  target
): target is Float32Array => {
  return target instanceof Float32Array || isTagged(target, "Float32Array");
};
setName(Float32Array_, "Float32Array");
export { Float32Array_ as Float32Array };

const Float64Array_: TypeValidator<Float64Array> = (
  target
): target is Float64Array => {
  return target instanceof Float64Array || isTagged(target, "Float64Array");
};
setName(Float64Array_, "Float64Array");
export { Float64Array_ as Float64Array };

const anyTypeValidator: TypeValidator<TypeValidator<any>> = (
  target
): target is TypeValidator<any> => {
  return typeof target === "function";
};
setName(anyTypeValidator, "anyTypeValidator");
export { anyTypeValidator };

const unknownTypeValidator: TypeValidator<TypeValidator<unknown>> = (
  target
): target is TypeValidator<unknown> => {
  return typeof target === "function";
};
setName(unknownTypeValidator, "unknownTypeValidator");
export { unknownTypeValidator };
