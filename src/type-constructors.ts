import type { TypeValidator } from "./type-validator";
import * as basicTypes from "./basic-types";

function objectStr(obj: { [key: string | number | symbol]: string }) {
  return `{ ${Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ")} }`;
}

export function arrayOf<T>(
  typeValidator: TypeValidator<T>
): TypeValidator<Array<T>> {
  const ret = (target): target is Array<T> =>
    basicTypes.arrayOfAny(target) && target.every(typeValidator);
  Object.defineProperty(ret, "name", {
    value: `arrayOf(${typeValidator.name})`,
  });
  return ret;
}

export function exactString<T extends string>(str: T): TypeValidator<T> {
  const ret = (target): target is T => target === str;
  Object.defineProperty(ret, "name", {
    value: `exactString(${JSON.stringify(str)})`,
  });
  return ret;
}

export function exactNumber<T extends number>(num: T): TypeValidator<T> {
  const ret = (target): target is T => target === num;
  Object.defineProperty(ret, "name", {
    value: `exactNumber(${num})`,
  });
  return ret;
}

export function hasClassName<Name extends string>(
  name: Name
): TypeValidator<{ constructor: Function & { name: Name } }> {
  const ret = (target): target is { constructor: Function & { name: Name } } =>
    basicTypes.anyObject(target) &&
    typeof target.constructor === "function" &&
    target.constructor.name === name;
  Object.defineProperty(ret, "name", {
    value: `hasClassName(${JSON.stringify(name)})`,
  });
  return ret;
}

export function instanceOf<Klass extends Function & { prototype: any }>(
  klass: Klass
): TypeValidator<Klass["prototype"]> {
  const ret = (target): target is Klass => target instanceof klass;
  Object.defineProperty(ret, "name", {
    value: `instanceOf(${JSON.stringify(klass.name)})`,
  });
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

export const intersection: IntersectionFn = (
  ...args: Array<TypeValidator<any>>
) => {
  const ret = (target: any): target is any => args.every((arg) => arg(target));
  Object.defineProperty(ret, "name", {
    value: `intersection(${args.map((arg) => arg.name).join(", ")})`,
  });
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
  const ret = (target: any): target is any => args.some((arg) => arg(target));
  Object.defineProperty(ret, "name", {
    value: `union(${args.map((arg) => arg.name).join(", ")})`,
  });
  return ret;
};

export const or = union;

export function mapOf<K, V>(
  keyType: TypeValidator<K>,
  valueType: TypeValidator<V>
): TypeValidator<Map<K, V>> {
  const ret = (target): target is Map<K, V> =>
    basicTypes.anyMap(target) &&
    Array.from(target.keys()).every(keyType) &&
    Array.from(target.values()).every(valueType);

  Object.defineProperty(ret, "name", {
    value: `mapOf(${keyType.name}, ${valueType.name})`,
  });

  return ret;
}

export function setOf<T>(itemType: TypeValidator<T>): TypeValidator<Set<T>> {
  const ret = (target): target is Set<T> =>
    basicTypes.anySet(target) && Array.from(target.entries()).every(itemType);

  Object.defineProperty(ret, "name", {
    value: `setOf(${itemType.name})`,
  });

  return ret;
}

export function maybe<T>(
  itemType: TypeValidator<T>
): TypeValidator<T | undefined | null> {
  const ret = union(itemType, basicTypes.undefined_, basicTypes.null_);

  Object.defineProperty(ret, "name", {
    value: `maybe(${itemType.name})`,
  });

  return ret;
}

export function objectWithProperties<
  T extends { [key: string | number | symbol]: TypeValidator<any> }
>(
  properties: T
): TypeValidator<{
  [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
}> {
  const propEntries = Object.entries(properties);

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

  Object.defineProperty(ret, "name", {
    value: `objectWithProperties(${objectStr(
      Object.fromEntries(propEntries.map(([key, value]) => [key, value.name]))
    )})`,
  });

  return ret;
}

export function objectWithOnlyTheseProperties<
  T extends { [key: string | number | symbol]: TypeValidator<any> }
>(
  properties: T
): TypeValidator<{
  [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
}> {
  const propEntries = Object.entries(properties);
  const propEntriesSet = new Set(propEntries);

  const ret = (
    target
  ): target is {
    [key in keyof T]: T[key] extends TypeValidator<infer U> ? U : never;
  } => {
    if (!basicTypes.anyObject(target)) return false;
    if (!propEntries.every(([name, validator]) => validator(target[name])))
      return false;

    const targetEntries = Object.entries(target);

    return (
      targetEntries.length === propEntries.length &&
      targetEntries.every((key) => propEntriesSet.has(key))
    );
  };

  Object.defineProperty(ret, "name", {
    value: `objectWithOnlyTheseProperties(${objectStr(
      Object.fromEntries(propEntries.map(([key, value]) => [key, value.name]))
    )})`,
  });

  return ret;
}

export function mappingObjectOf<
  Values,
  Keys extends string | number | symbol = string | number | symbol
>(
  keyType: TypeValidator<Keys>,
  valueType: TypeValidator<Values>
): TypeValidator<Record<Keys, Values>> {
  const ret = (target): target is Record<Keys, Values> =>
    basicTypes.anyObject(target) &&
    Object.entries(target).every(
      ([key, value]) => keyType(key) && valueType(value)
    );

  Object.defineProperty(ret, "name", {
    value: `mappingObjectOf(${keyType.name}, ${valueType.name})`,
  });

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
  const propEntries = Object.entries(properties);

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

  Object.defineProperty(ret, "name", {
    value: `partialObjectWithProperties(${objectStr(
      Object.fromEntries(
        propEntries.map(([key, value]) => [
          key,
          `union(${value.name}, null_, undefined_)`,
        ])
      )
    )})`,
  });

  return ret;
}

export function stringMatching(regexp: RegExp): TypeValidator<string> {
  const ret = (target): target is string =>
    typeof target === "string" && regexp.test(target);

  Object.defineProperty(ret, "name", {
    value: `stringMatching(${regexp})`,
  });

  return ret;
}

export function symbolFor(key: string): TypeValidator<symbol> {
  const ret = (target): target is symbol => target === Symbol.for(key);

  Object.defineProperty(ret, "name", {
    value: `symbolFor(${JSON.stringify(key)})`,
  });

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
  const ret = (target: any): target is any =>
    basicTypes.anyArray(target) &&
    target.length === args.length &&
    target.every((item, index) => {
      return args[index](item);
    });

  Object.defineProperty(ret, "name", {
    value: `tuple(${args.map((arg) => arg.name).join(", ")})`,
  });

  return ret;
};
