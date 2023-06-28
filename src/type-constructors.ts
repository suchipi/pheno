import type { TypeValidator } from "./type-validator";
import * as basicTypes from "./basic-types";
import { assertType } from "./api-functions";
import { setName, hasOwn, allEntries } from "./utils";

export function objectStr(obj: { [key: string | number | symbol]: string }) {
  return `{ ${allEntries(obj)
    .map(
      ([key, value]) =>
        `${typeof key === "string" ? key : `[${String(key)}]`}: ${value}`
    )
    .join(", ")} }`;
}

export function arrayOf<T>(
  typeValidator: TypeValidator<T>
): TypeValidator<Array<T>> {
  assertType(typeValidator, basicTypes.anyTypeValidator);

  const ret = (target): target is Array<T> =>
    basicTypes.arrayOfAny(target) && target.every(typeValidator);
  setName(ret, `arrayOf(${typeValidator.name})`);
  return ret;
}

export function exactString<T extends string>(str: T): TypeValidator<T> {
  assertType(str, basicTypes.string);

  const ret = (target): target is T => target === str;
  setName(ret, `exactString(${JSON.stringify(str)})`);
  return ret;
}

export function exactNumber<T extends number>(num: T): TypeValidator<T> {
  assertType(num, basicTypes.numberIncludingNanAndInfinities);

  const ret = (target): target is T => target === num;
  setName(ret, `exactNumber(${num})`);
  return ret;
}

export function exactBigInt<T extends bigint>(num: T): TypeValidator<T> {
  assertType(num, basicTypes.BigInt);

  const ret = (target): target is T => target === num;
  setName(ret, `exactBigInt(${num})`);
  return ret;
}

export function exactSymbol<T extends symbol>(sym: T): TypeValidator<T> {
  assertType(sym, basicTypes.symbol);

  const ret = (target): target is T => target === sym;
  setName(ret, `exactSymbol(Symbol(${String(sym.description)}))`);
  return ret;
}

export function hasClassName<Name extends string>(
  name: Name
): TypeValidator<{ constructor: Function & { name: Name } }> {
  assertType(name, basicTypes.string);

  const ret = (target): target is { constructor: Function & { name: Name } } =>
    basicTypes.nonNullOrUndefined(target) &&
    typeof target.constructor === "function" &&
    target.constructor.name === name;
  setName(ret, `hasClassName(${JSON.stringify(name)})`);
  return ret;
}

export function hasToStringTag(name: string): TypeValidator<any> {
  assertType(name, basicTypes.string);

  const expectedResult = `[object ${name}]`;
  const ret = (target: any): target is any => {
    return Object.prototype.toString.call(target) === expectedResult;
  };
  setName(ret, `hasToStringTag(${JSON.stringify(name)})`);
  return ret;
}

export interface IntersectionFn {
  <FirstType, SecondType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>
  ): TypeValidator<FirstType & SecondType>;

  <FirstType, SecondType, ThirdType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>
  ): TypeValidator<FirstType & SecondType & ThirdType>;

  <FirstType, SecondType, ThirdType, FourthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>
  ): TypeValidator<FirstType & SecondType & ThirdType & FourthType>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>
  ): TypeValidator<FirstType & SecondType & ThirdType & FourthType & FifthType>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType, SixthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>
  ): TypeValidator<
    FirstType & SecondType & ThirdType & FourthType & FifthType & SixthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>
  ): TypeValidator<
    FirstType &
      SecondType &
      ThirdType &
      FourthType &
      FifthType &
      SixthType &
      SeventhType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>
  ): TypeValidator<
    FirstType &
      SecondType &
      ThirdType &
      FourthType &
      FifthType &
      SixthType &
      SeventhType &
      EighthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>
  ): TypeValidator<
    FirstType &
      SecondType &
      ThirdType &
      FourthType &
      FifthType &
      SixthType &
      SeventhType &
      EighthType &
      NinthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType,
    TenthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>,
    tenth: TypeValidator<TenthType>
  ): TypeValidator<
    FirstType &
      SecondType &
      ThirdType &
      FourthType &
      FifthType &
      SixthType &
      SeventhType &
      EighthType &
      NinthType &
      TenthType
  >;
}

const arrayOfTypeValidator = arrayOf(basicTypes.anyTypeValidator);

export const intersection: IntersectionFn = (
  ...args: Array<TypeValidator<any>>
) => {
  assertType(args, arrayOfTypeValidator);

  const ret = (target: any): target is any => args.every((arg) => arg(target));
  setName(ret, `intersection(${args.map((arg) => arg.name).join(", ")})`);
  return ret;
};

export const and = intersection;

export interface UnionFn {
  <FirstType, SecondType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>
  ): TypeValidator<FirstType | SecondType>;

  <FirstType, SecondType, ThirdType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>
  ): TypeValidator<FirstType | SecondType | ThirdType>;

  <FirstType, SecondType, ThirdType, FourthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>
  ): TypeValidator<FirstType | SecondType | ThirdType | FourthType>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>
  ): TypeValidator<FirstType | SecondType | ThirdType | FourthType | FifthType>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType, SixthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>
  ): TypeValidator<
    FirstType | SecondType | ThirdType | FourthType | FifthType | SixthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>
  ): TypeValidator<
    | FirstType
    | SecondType
    | ThirdType
    | FourthType
    | FifthType
    | SixthType
    | SeventhType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>
  ): TypeValidator<
    | FirstType
    | SecondType
    | ThirdType
    | FourthType
    | FifthType
    | SixthType
    | SeventhType
    | EighthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>
  ): TypeValidator<
    | FirstType
    | SecondType
    | ThirdType
    | FourthType
    | FifthType
    | SixthType
    | SeventhType
    | EighthType
    | NinthType
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType,
    TenthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>,
    tenth: TypeValidator<TenthType>
  ): TypeValidator<
    | FirstType
    | SecondType
    | ThirdType
    | FourthType
    | FifthType
    | SixthType
    | SeventhType
    | EighthType
    | NinthType
    | TenthType
  >;
}

export const union: UnionFn = (...args: Array<TypeValidator<any>>) => {
  assertType(args, arrayOfTypeValidator);

  const ret = (target: any): target is any => args.some((arg) => arg(target));
  setName(ret, `union(${args.map((arg) => arg.name).join(", ")})`);
  return ret;
};

export const or = union;

let thingThatCanHaveInstance: TypeValidator<any>;
if (typeof Symbol !== "undefined" && typeof Symbol.hasInstance === "symbol") {
  thingThatCanHaveInstance = or(
    basicTypes.anyFunction,
    objectWithProperties({ [Symbol.hasInstance]: basicTypes.anyFunction })
  );
} else {
  thingThatCanHaveInstance = basicTypes.anyFunction;
}

export function instanceOf<Klass extends Function & { prototype: any }>(
  klass: Klass
): TypeValidator<Klass["prototype"]> {
  assertType(klass, thingThatCanHaveInstance);

  const ret = (target): target is Klass => target instanceof klass;
  setName(ret, `instanceOf(${JSON.stringify(klass.name)})`);
  return ret;
}

export function mapOf<K, V>(
  keyType: TypeValidator<K>,
  valueType: TypeValidator<V>
): TypeValidator<Map<K, V>> {
  assertType(keyType, basicTypes.anyTypeValidator);
  assertType(valueType, basicTypes.anyTypeValidator);

  const ret = (target): target is Map<K, V> =>
    basicTypes.anyMap(target) &&
    Array.from(target.keys()).every(keyType) &&
    Array.from(target.values()).every(valueType);

  setName(ret, `mapOf(${keyType.name}, ${valueType.name})`);

  return ret;
}

export function setOf<T>(itemType: TypeValidator<T>): TypeValidator<Set<T>> {
  assertType(itemType, basicTypes.anyTypeValidator);

  const ret = (target): target is Set<T> =>
    basicTypes.anySet(target) && Array.from(target.values()).every(itemType);

  setName(ret, `setOf(${itemType.name})`);

  return ret;
}

export function maybe<T>(
  itemType: TypeValidator<T>
): TypeValidator<T | undefined | null> {
  assertType(itemType, basicTypes.anyTypeValidator);

  const ret = union(itemType, basicTypes.undefined, basicTypes.null);
  setName(ret, `maybe(${itemType.name})`);
  return ret;
}

export function optional<T>(
  itemType: TypeValidator<T>
): TypeValidator<T | undefined> {
  assertType(itemType, basicTypes.anyTypeValidator);

  const ret = union(itemType, basicTypes.undefined);
  setName(ret, `optional(${itemType.name})`);
  return ret;
}

export function objectWithProperties<
  T extends { [key: string | number | symbol]: TypeValidator<any> }
>(
  properties: T
): TypeValidator<{
  [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
}> {
  assertType(properties, basicTypes.anyObject);

  for (const key in properties) {
    if (hasOwn(properties, key)) {
      assertType(properties[key], basicTypes.anyTypeValidator);
    }
  }

  const propEntries = allEntries(properties);

  const ret = (
    target
  ): target is {
    [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
  } => {
    return (
      basicTypes.anyObject(target) &&
      propEntries.every(([name, validator]) => validator(target[name]))
    );
  };

  setName(
    ret,
    `objectWithProperties(${objectStr(
      Object.fromEntries(propEntries.map(([key, value]) => [key, value.name]))
    )})`
  );

  return ret;
}

export function objectWithOnlyTheseProperties<
  T extends { [key: string | number | symbol]: TypeValidator<any> }
>(
  properties: T
): TypeValidator<{
  [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
}> {
  assertType(properties, basicTypes.anyObject);

  for (const key in properties) {
    if (hasOwn(properties, key)) {
      assertType(properties[key], basicTypes.anyTypeValidator);
    }
  }

  const propEntries = allEntries(properties);
  const propKeysSet = new Set(Reflect.ownKeys(properties));

  const ret = (
    target
  ): target is {
    [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
  } => {
    if (!basicTypes.anyObject(target)) return false;
    if (!propEntries.every(([name, validator]) => validator(target[name])))
      return false;

    const targetEntries = allEntries(target);

    return (
      targetEntries.length === propEntries.length &&
      targetEntries.every(([key, _value]) => propKeysSet.has(typeof key === "number" ? String(key) : key))
    );
  };

  setName(
    ret,
    `objectWithOnlyTheseProperties(${objectStr(
      Object.fromEntries(propEntries.map(([key, value]) => [key, value.name]))
    )})`
  );

  return ret;
}

export function mappingObjectOf<
  Values,
  Keys extends string | number | symbol = string | number | symbol
>(
  keyType: TypeValidator<Keys>,
  valueType: TypeValidator<Values>
): TypeValidator<Record<Keys, Values>> {
  assertType(keyType, basicTypes.anyTypeValidator);
  assertType(valueType, basicTypes.anyTypeValidator);

  const ret = (target): target is Record<Keys, Values> =>
    basicTypes.anyObject(target) &&
    allEntries(target).every(
      ([key, value]) => keyType(key) && valueType(value)
    );
  setName(ret, `mappingObjectOf(${keyType.name}, ${valueType.name})`);
  return ret;
}

export const record = mappingObjectOf;

export function partialObjectWithProperties<
  T extends { [key: string | number | symbol]: TypeValidator<any> }
>(
  properties: T
): TypeValidator<{
  [key in keyof T]: T[key] extends TypeValidator<infer U>
    ? U | null | undefined
    : never;
}> {
  assertType(properties, basicTypes.anyObject);

  for (const key in properties) {
    if (hasOwn(properties, key)) {
      assertType(properties[key], basicTypes.anyTypeValidator);
    }
  }

  const propEntries = allEntries(properties);

  const ret = (
    target
  ): target is {
    [key in keyof T]: T[key] extends TypeValidator<infer U>
      ? U | null | undefined
      : never;
  } => {
    return (
      basicTypes.anyObject(target) &&
      propEntries.every(
        ([name, validator]) => target[name] == null || validator(target[name])
      )
    );
  };

  setName(
    ret,
    `partialObjectWithProperties(${objectStr(
      Object.fromEntries(
        propEntries.map(([key, value]) => [
          key,
          `union(${value.name}, null, undefined)`,
        ])
      )
    )})`
  );

  return ret;
}

export function stringMatching(regexp: RegExp): TypeValidator<string> {
  assertType(regexp, basicTypes.RegExp);

  const ret = (target): target is string => {
    // We make a new regexp each time so that state from one match doesn't affect another
    const newRegExp = new RegExp(regexp.source, regexp.flags);
    return typeof target === "string" && newRegExp.test(target);
  };
  setName(ret, `stringMatching(${regexp})`);
  return ret;
}

export function symbolFor(key: string): TypeValidator<symbol> {
  assertType(key, basicTypes.string);

  const ret = (target): target is symbol => target === Symbol.for(key);
  setName(ret, `symbolFor(${JSON.stringify(key)})`);
  return ret;
}

export interface TupleFn {
  <FirstType, SecondType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>
  ): TypeValidator<[FirstType, SecondType]>;

  <FirstType, SecondType, ThirdType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>
  ): TypeValidator<[FirstType, SecondType, ThirdType]>;

  <FirstType, SecondType, ThirdType, FourthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>
  ): TypeValidator<[FirstType, SecondType, ThirdType, FourthType]>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>
  ): TypeValidator<[FirstType, SecondType, ThirdType, FourthType, FifthType]>;

  <FirstType, SecondType, ThirdType, FourthType, FifthType, SixthType>(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>
  ): TypeValidator<
    [FirstType, SecondType, ThirdType, FourthType, FifthType, SixthType]
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>
  ): TypeValidator<
    [
      FirstType,
      SecondType,
      ThirdType,
      FourthType,
      FifthType,
      SixthType,
      SeventhType
    ]
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>
  ): TypeValidator<
    [
      FirstType,
      SecondType,
      ThirdType,
      FourthType,
      FifthType,
      SixthType,
      SeventhType,
      EighthType
    ]
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>
  ): TypeValidator<
    [
      FirstType,
      SecondType,
      ThirdType,
      FourthType,
      FifthType,
      SixthType,
      SeventhType,
      EighthType,
      NinthType
    ]
  >;

  <
    FirstType,
    SecondType,
    ThirdType,
    FourthType,
    FifthType,
    SixthType,
    SeventhType,
    EighthType,
    NinthType,
    TenthType
  >(
    first: TypeValidator<FirstType>,
    second: TypeValidator<SecondType>,
    third: TypeValidator<ThirdType>,
    fourth: TypeValidator<FourthType>,
    fifth: TypeValidator<FifthType>,
    sixth: TypeValidator<SixthType>,
    seventh: TypeValidator<SeventhType>,
    eighth: TypeValidator<EighthType>,
    ninth: TypeValidator<NinthType>,
    tenth: TypeValidator<TenthType>
  ): TypeValidator<
    [
      FirstType,
      SecondType,
      ThirdType,
      FourthType,
      FifthType,
      SixthType,
      SeventhType,
      EighthType,
      NinthType,
      TenthType
    ]
  >;
}

export const tuple: TupleFn = (...args: Array<TypeValidator<any>>) => {
  assertType(args, arrayOfTypeValidator);

  const ret = (target: any): target is any =>
    basicTypes.anyArray(target) &&
    target.length === args.length &&
    target.every((item, index) => {
      return args[index](item);
    });

  setName(ret, `tuple(${args.map((arg) => arg.name).join(", ")})`);

  return ret;
};
