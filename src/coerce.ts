import * as t from ".";

export default function coerce(value: unknown): t.TypeValidator<any> {
  if (t.null(value)) {
    return t.null;
  } else if (t.undefined(value)) {
    return t.undefined;
  } else if (t.true(value)) {
    return t.true;
  } else if (t.false(value)) {
    return t.false;
  } else if (t.string(value)) {
    return t.exactString(value);
  } else if (t.number(value)) {
    return t.exactNumber(value);
  } else if (t.symbol(value)) {
    return t.exactSymbol(value);
  } else if (t.bigint(value)) {
    return t.exactBigInt(value);
  } else if (t.array(value)) {
    if (value.length < 1) {
      return t.arrayOfAny;
    } else if (value.length === 1) {
      return t.arrayOf(coerce(value[0]));
    } else {
      const validators = value.map(coerce);
      return t.tuple(
        // @ts-ignore spread in tuple position
        ...validators
      );
    }
  } else if (t.object(value)) {
    return t.objectWithProperties(
      Object.fromEntries(
        Object.entries(value).map(([key, value]) => {
          return [key, coerce(value)];
        })
      )
    );
  } else if (t.anyFunction(value)) {
    if (value === String) {
      return t.string;
    } else if (value === Number) {
      return t.number;
    } else if (value === Boolean) {
      return t.boolean;
    } else if (typeof BigInt !== "undefined" && value === BigInt) {
      return t.bigint;
    } else if (typeof Symbol !== "undefined" && value === Symbol) {
      return t.symbol;
    } else if (value === RegExp) {
      return t.RegExp;
    } else if (value === Array) {
      return t.anyArray;
    } else if ((value as any) === Set) {
      return t.anySet;
    } else if ((value as any) === Map) {
      return t.anyMap;
    } else if (value === Object) {
      return t.anyObject;
    } else if (value === Date) {
      return t.Date;
    } else if (value === Function) {
      return t.anyFunction;
    } else if (
      typeof ArrayBuffer !== "undefined" &&
      (value as any) === ArrayBuffer
    ) {
      return t.ArrayBuffer;
    } else if (
      typeof SharedArrayBuffer !== "undefined" &&
      (value as any) === SharedArrayBuffer
    ) {
      return t.SharedArrayBuffer;
    } else if (typeof DataView !== "undefined" && (value as any) === DataView) {
      return t.DataView;
    } else if (
      typeof Int8Array !== "undefined" &&
      (value as any) === Int8Array
    ) {
      return t.Int8Array;
    } else if (
      typeof Uint8Array !== "undefined" &&
      (value as any) === Uint8Array
    ) {
      return t.Uint8Array;
    } else if (
      typeof Uint8ClampedArray !== "undefined" &&
      (value as any) === Uint8ClampedArray
    ) {
      return t.Uint8ClampedArray;
    } else if (
      typeof Int16Array !== "undefined" &&
      (value as any) === Int16Array
    ) {
      return t.Int16Array;
    } else if (
      typeof Uint16Array !== "undefined" &&
      (value as any) === Uint16Array
    ) {
      return t.Uint16Array;
    } else if (
      typeof Int32Array !== "undefined" &&
      (value as any) === Int32Array
    ) {
      return t.Int32Array;
    } else if (
      typeof Uint32Array !== "undefined" &&
      (value as any) === Uint32Array
    ) {
      return t.Uint32Array;
    } else if (
      typeof Float32Array !== "undefined" &&
      (value as any) === Float32Array
    ) {
      return t.Float32Array;
    } else if (
      typeof Float64Array !== "undefined" &&
      (value as any) === Float64Array
    ) {
      return t.Float64Array;
    } else if (/class\s/.test(value.toString())) {
      return t.instanceOf(value);
    } else {
      // assume it's already a type validator
      return value as any;
    }
  } else {
    throw new Error(
      `Not clear how to coerce value to type: ${t.stringifyValue(value)}`
    );
  }
}
