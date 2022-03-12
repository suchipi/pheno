import type { TypeValidator } from "./type-validator";

export const any: TypeValidator<any> = (_value): _value is any => true;
export const unknown: TypeValidator<unknown> = any;

export const anyObject: TypeValidator<{
  [key: string | number | symbol]: any;
}> = (target): target is { [key: string | number | symbol]: any } =>
  typeof target === "object" && target != null;

export const unknownObject: TypeValidator<{}> = anyObject;

export const object = unknownObject;

export const arrayOfAny: TypeValidator<Array<any>> = (
  target
): target is Array<any> => Array.isArray(target);

export const arrayOfUnknown: TypeValidator<Array<unknown>> = arrayOfAny;

export const array = arrayOfUnknown;
export const anyArray = arrayOfAny;

export const boolean: TypeValidator<boolean> = (target): target is boolean =>
  typeof target === "boolean";

export const string: TypeValidator<string> = (target): target is string =>
  typeof target === "string";

export const null_: TypeValidator<null> = (target): target is null =>
  target === null;

Object.defineProperty(null_, "name", { value: "null" });

export const undefined_: TypeValidator<undefined> = (
  target
): target is undefined => typeof target === "undefined";

export const nullish: TypeValidator<null | undefined> = (
  target
): target is null | undefined => target == null;

export const numberIncludingNanAndInfinities: TypeValidator<number> = (
  target
): target is number => typeof target === "number";

export const number: TypeValidator<number> = (target): target is number =>
  typeof target === "number" &&
  !Number.isNaN(target) &&
  !Infinity_(target) &&
  !NegativeInfinity(target);

export const NaN_: TypeValidator<number> = (target): target is number =>
  Number.isNaN(target);

Object.defineProperty(NaN_, "name", { value: "NaN" });

export const Infinity_: TypeValidator<number> = (target): target is number =>
  target === Infinity;

Object.defineProperty(Infinity_, "name", { value: "Infinity" });

export const NegativeInfinity: TypeValidator<number> = (
  target
): target is number => target === -Infinity;

export const integer: TypeValidator<number> = (target): target is number =>
  number(target) && target % 1 === 0;

export const never: TypeValidator<never> = (_target): _target is never => false;

export const anyFunction: TypeValidator<(...args: any) => any> = (
  target
): target is (...args: any) => any => typeof target === "function";

export const unknownFunction: TypeValidator<
  (...args: Array<unknown>) => unknown
> = (target): target is (...args: Array<unknown>) => unknown =>
  anyFunction(target);

export const false_: TypeValidator<false> = (target): target is false =>
  target === false;

Object.defineProperty(false_, "name", { value: "false" });

export const true_: TypeValidator<true> = (target): target is true =>
  target === true;

Object.defineProperty(true_, "name", { value: "true" });

export const falsy: TypeValidator<false | null | undefined | "" | 0> = (
  target
): target is false | null | undefined | "" | 0 => !Boolean(target);

export const truthy = <T>(
  target: T | false | null | undefined | "" | 0
): target is T => Boolean(target);

export const nonNullOrUndefined = <T>(
  target: T | null | undefined
): target is T => target != null;

export const Error_: TypeValidator<Error> = (target): target is Error =>
  anyObject(target) &&
  string(target.name) &&
  string(target.message) &&
  string(target.stack);

Object.defineProperty(Error_, "name", { value: "Error" });

export const Symbol_: TypeValidator<symbol> = (target): target is symbol =>
  typeof target === "symbol";

Object.defineProperty(Symbol_, "name", { value: "Symbol" });

export const anyMap: TypeValidator<Map<any, any>> = (
  target
): target is Map<any, any> =>
  target instanceof Map ||
  (anyObject(target) &&
    anyFunction(target.constructor) &&
    target.constructor.name === "Map" &&
    anyFunction(target.entries) &&
    number(target.size));

export const unknownMap: TypeValidator<Map<unknown, unknown>> = (
  target
): target is Map<unknown, unknown> => anyMap(target);

export const map = unknownMap;

export const anySet: TypeValidator<Set<any>> = (target): target is Set<any> =>
  target instanceof Set ||
  (anyObject(target) &&
    anyFunction(target.constructor) &&
    target.constructor.name === "Set" &&
    anyFunction(target.entries) &&
    number(target.size));

export const unknownSet: TypeValidator<Set<unknown>> = (
  target
): target is Set<unknown> => anySet(target);

export const set = unknownSet;
