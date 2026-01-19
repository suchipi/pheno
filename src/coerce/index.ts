export {
  $CoercingTypeConstructors,
  type CoerceValue,
  type Coerceable,
  type Unwrap,
} from "./coerce";

// The raw "coerce" function, and the override symbol
import coerce, { PHENO_COERCE_OVERRIDE } from "./coerce";
export default coerce;
export { coerce, PHENO_COERCE_OVERRIDE };

export * from "./api-functions";
import * as $CoercingApiFunctions from "./api-functions";
export { $CoercingApiFunctions };

// Basic type constructors behave the same whether using coerce or not, but are
// exported here for parity with the named exports of the normal index.ts
export * from "../basic-types";

// Again, no difference in these types when using coerce, but provided for named
// export parity
export type {
  TypeValidator,
  ExtractTypeFromValidator,
} from "../type-validator";
