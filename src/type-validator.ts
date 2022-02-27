export type TypeValidator<T> = (value: any) => value is T;

export type ExtractTypeFromValidator<Validator extends TypeValidator<any>> =
  Validator extends TypeValidator<infer R> ? R : never;
