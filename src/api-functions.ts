import type { TypeValidator } from "./type-validator";

export function assertType<T>(
  target: any,
  type: TypeValidator<T>,
  messageMaker: (target: any) => string = (target: any) =>
    `Value was not of the expected type: ${String(target)}`
): asserts target is T {
  const isOfType = type(target);
  if (!isOfType) {
    throw new Error(messageMaker(target));
  }
}

export function isOfType<T>(target: any, type: TypeValidator<T>): target is T {
  return type(target);
}

const any: any = null;
export function asType<T>(target: unknown, type: TypeValidator<T> = any): T {
  return target as any;
}
