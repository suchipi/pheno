import type { TypeValidator } from "./type-validator";
import { setName } from "./set-name";

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

export const anyArray: TypeValidator<Array<any>> = (target): target is any =>
  arrayOfAny(target);
setName(anyArray, "anyArray");

export const boolean: TypeValidator<boolean> = (target): target is boolean =>
  typeof target === "boolean";
setName(boolean, "boolean");

export const string: TypeValidator<string> = (target): target is string =>
  typeof target === "string";
setName(string, "string");

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

export { Symbol_ as Symbol };

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
