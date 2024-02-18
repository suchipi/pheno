import { describe, test, expect } from "vitest";
import * as _t from "../dist/bundle.min";
import coerce, {
  $CoercingApiFunctions,
  assertType as coerce_assertType,
} from "../coerce";

const t: typeof import("..") = _t as any;

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
    NaN,
    Infinity,
    -Infinity,
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
      "exactString("hello")",
      "exactNumber(87)",
      "exactSymbol(Symbol(hi!))",
      "exactBigInt(69)",
      "arrayOfAny",
      "arrayOf(exactNumber(1))",
      "tuple(exactNumber(1), exactNumber(2))",
      "tuple(exactString("hi"), boolean)",
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
      "instanceOf(MyClass)",
      "NaN",
      "Infinity",
      "NegativeInfinity",
    ]
  `);
});

describe("$CoercingApiFunctions", () => {
  const { stringifyValue, isOfType, asType } = $CoercingApiFunctions;

  test("stringifyValue", () => {
    // same as normal api function
    expect(stringifyValue({ hi: "yeah" })).toBe(
      t.stringifyValue({ hi: "yeah" }),
    );
  });

  test("assertType", () => {
    // with type validator
    expect(() => {
      const thing: unknown = "blah";
      coerce_assertType(thing, t.string);
      thing; // hover type here should be `string`
    }).not.toThrowError();
    expect(() => {
      const thing: unknown = "blah";
      coerce_assertType(thing, t.number);
      thing; // hover type here should be `number`
    }).toThrowErrorMatchingInlineSnapshot(
      `[TypeError: Expected value of type number, but received "blah"]`,
    );

    // with coercion
    expect(() => {
      const thing: unknown = "blah";
      coerce_assertType(thing, String);
      thing; // hover type here should be `string`
    }).not.toThrowError();
    expect(() => {
      const thing: unknown = "blah";
      coerce_assertType(thing, Number);
      thing; // hover type here should be `number`
    }).toThrowErrorMatchingInlineSnapshot(
      `[TypeError: Expected value of type number, but received "blah"]`,
    );
  });

  test("isOfType", () => {
    expect(isOfType("hi", t.string)).toBe(true);
    expect(isOfType("hi", String)).toBe(true);
  });

  test("asType", () => {
    expect(asType("hi", t.number)).toBe("hi");
    expect(asType("hi", Number)).toBe("hi");
  });
});
