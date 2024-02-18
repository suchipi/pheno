import * as t from "..";
import { TypeValidator } from "../type-validator";
import coerce, { type Unwrap, type Coerceable } from "./coerce";

export const stringifyValue = t.stringifyValue;

const defaultMessageMaker = t.assertType.defaultMessageMaker;

function _assertType<T extends TypeValidator<any> | Coerceable>(
  target: any,
  type: T,
  messageMaker: (
    target: any,
    expectedType: TypeValidator<any>,
  ) => string = defaultMessageMaker,
  ErrorConstructor: { new (message?: string): any } = TypeError,
): asserts target is Unwrap<T> {
  t.assertType(target, coerce(type), messageMaker, ErrorConstructor);
}

Object.defineProperties(_assertType, {
  name: { value: "assertType", configurable: true },
  defaultMessageMaker: {
    get() {
      return defaultMessageMaker;
    },
  },
});

export const assertType: {
  readonly defaultMessageMaker: typeof defaultMessageMaker;
} & typeof _assertType = _assertType as any;

export function isOfType<T extends TypeValidator<any> | Coerceable>(
  target: any,
  type: T,
): target is Unwrap<T> {
  return t.isOfType(target, coerce(type));
}

const any: any = null;
export function asType<T extends TypeValidator<any> | Coerceable>(
  target: unknown,
  type: T = any,
): Unwrap<T> {
  return target as any;
}
