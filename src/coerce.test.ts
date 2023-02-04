import { test, expect } from "vitest";
import * as t from "../dist/bundle.min";
import coerce from "../coerce";

test("coercion", () => {
  const validators = [
    null,
    undefined,
    true,
    false,
    "hello",
    87,
    Symbol("hi!"),
    69n,
    [],
    [1],
    [1, 2],
    ["hi", Boolean],
    {
      a: true,
      b: 43,
      [Symbol("heyo")]: Number,
    },
    {
      very: {
        very: {
          very: {
            deeply: {
              nested: {
                something: String,
              },
            },
          },
        },
      },
    },
    String,
    Number,
    Boolean,
    BigInt,
    Symbol,
    RegExp,
    Array,
    Set,
    Map,
    Object,
    Date,
    Function,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    class MyClass {},
  ].map(coerce);

  for (const type of validators) {
    expect(typeof type).toBe("function");
  }

  expect(validators.map((v) => v.name)).toMatchInlineSnapshot(`
    [
      "null",
      "undefined",
      "true",
      "false",
      "exactString(\\"hello\\")",
      "exactNumber(87)",
      "exactSymbol(Symbol(hi!))",
      "exactBigInt(69)",
      "arrayOfAny",
      "arrayOf(exactNumber(1))",
      "tuple(exactNumber(1), exactNumber(2))",
      "tuple(exactString(\\"hi\\"), boolean)",
      "objectWithProperties({ a: true, b: exactNumber(43) })",
      "objectWithProperties({ very: objectWithProperties({ very: objectWithProperties({ very: objectWithProperties({ deeply: objectWithProperties({ nested: objectWithProperties({ something: string }) }) }) }) }) })",
      "string",
      "number",
      "boolean",
      "bigint",
      "Symbol",
      "RegExp",
      "anyArray",
      "anySet",
      "anyMap",
      "anyObject",
      "Date",
      "anyFunction",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "instanceOf(\\"MyClass\\")",
    ]
  `);
});

test("errors", () => {
  expect(() => coerce(NaN)).toThrowErrorMatchingInlineSnapshot(
    '"Not clear how to coerce value to type: \\"<NaN>\\""'
  );
  expect(() => coerce(Infinity)).toThrowErrorMatchingInlineSnapshot(
    '"Not clear how to coerce value to type: \\"<Infinity>\\""'
  );
});
