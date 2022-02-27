import * as apiFunctions from "./api-functions";
import * as basicTypes from "./basic-types";
import * as typeConstructors from "./type-constructors";

export default {
  ...apiFunctions,
  ...basicTypes,
  ...typeConstructors,
  null: basicTypes.null_,
  undefined: basicTypes.undefined_,
  NaN: basicTypes.NaN_,
  Infinity: basicTypes.Infinity_,
  false: basicTypes.false_,
  true: basicTypes.true_,
  Error: basicTypes.Error_,
  Symbol: basicTypes.Symbol_,
};
