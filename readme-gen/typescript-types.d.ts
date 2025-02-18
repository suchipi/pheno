/**
 * A type validator is a function which returns a boolean indicating whether it
 * was called with a value assignable to its described type.
 *
 * `pheno` contains many different type validators, as well as functions which
 * create type validators.
 */
export type TypeValidator<T> = (value: any) => value is T;

/**
 * A utility type which extracts the inner type from a TypeValidator.
 *
 * For example, `ExtractTypeFromValidator<TypeValidator<string>>` would be `string`.
 */
export type ExtractTypeFromValidator<Validator extends TypeValidator<any>> =
  Validator extends TypeValidator<infer R> ? R : never;
