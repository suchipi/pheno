import { TypeValidator } from "./typescript-types";

/**
 * A function which throws an Error if `target` isn't assignable to `type`.
 *
 * @param target The value to check.
 * @param type The {@link TypeValidator} to check it against.
 * @param messageMaker Optional. A function which to be used when creating an error message, if the value isn't assignable to the type.
 * @param ErrorConstructor Optional. An constructor to be used when creating an error message, if the value isn't assignable to the type. Defaults to `TypeError`.
 */
export function assertType<T>(
  target: any,
  type: TypeValidator<T>,
  messageMaker?: (target: any, expectedType: TypeValidator<any>) => string,
  ErrorConstructor?: { new (message?: string): any },
): asserts target is T;
export namespace assertType {
  /**
   * The default value used for {@link assertType}'s `messageMaker`
   * parameter when no `messageMaker` argument is specified.
   */
  export const defaultMessageMaker: (
    target: any,
    expectedType: TypeValidator<any>,
  ) => string;
}

/**
 * A function which returns a boolean indicating whether `target` is assignable to `type`.
 *
 * @param target The value to check.
 * @param type The {@link TypeValidator} to check it against.
 */
export function isOfType<T>(target: any, type: TypeValidator<T>): target is T;

/**
 * A TypeScript helper function which casts `target` to the type contained within the {@link TypeValidator} `type`.
 *
 * This has no runtime effect; `target` is returned without any checks or changes.
 *
 * @param target The value to return.
 * @param type The {@link TypeValidator} whose inner type you would like to cast `target` to.
 */
export function asType<T>(target: unknown, type?: TypeValidator<T>): T;

/**
 * Simple value-to-string converter, using JSON.stringify with a custom replacer
 * and a try-catch around it. Kinda like a lightweight stand-in for an "inspect"
 * function. {@link assertType}'s default value for its `messageMaker` parameter
 * uses this function.
 */
export function stringifyValue(value: any): void;
