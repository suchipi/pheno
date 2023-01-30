import { test, expect } from "vitest";
import * as t from "../dist/bundle.min";

test("basic test", () => {
  expect(t.isOfType("hi", t.string)).toBe(true);
  expect(() => {
    t.assertType("hi", t.string);
  }).not.toThrowError();

  const someObject = {};
  expect(t.asType(someObject)).toBe(someObject);
  expect(t.asType(someObject, t.string)).toBe(someObject);

  expect(t.isOfType(43, t.string)).toBe(false);
  expect(() => {
    t.assertType(43, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received 43"'
  );

  expect(
    t.isOfType(
      43,
      t.objectWithProperties({
        potato: t.true,
      })
    )
  ).toBe(false);

  expect(() => {
    t.assertType(
      43,
      t.objectWithProperties({
        potato: t.true,
      })
    );
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type objectWithProperties({ potato: true }), but received 43"'
  );
});

test("assertType value formatting", () => {
  expect(() => {
    t.assertType({ potato: false }, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received {\\"potato\\":false}"'
  );

  expect(() => {
    t.assertType(
      {
        potato: function greenThumb() {},
        eggplant: () => {},
      },
      t.string
    );
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received {\\"potato\\":\\"<Function greenThumb>\\",\\"eggplant\\":\\"<Function eggplant>\\"}"'
  );

  class Something {
    num = 42;
    someMethod() {}
  }
  const something = new Something();

  expect(() => {
    t.assertType(something, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Something>\\""'
  );

  expect(() => {
    t.assertType(
      new Map([
        [1, 2],
        [3, 4],
      ]),
      t.string
    );
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received {\\"<Map of size 2>\\":\\"[[1,2],[3,4]]\\"}"'
  );

  expect(() => {
    t.assertType(new Set([1, 2, 3, 4, 5, 6]), t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received {\\"<Set of size 6>\\":\\"[1,2,3,4,5,6]\\"}"'
  );

  expect(() => {
    t.assertType(undefined, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<undefined>\\""'
  );

  expect(() => {
    t.assertType(BigInt("34895084309843905843905840935890438509"), t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<BigInt 34895084309843905843905840935890438509>\\""'
  );

  expect(() => {
    t.assertType(Symbol("hi"), t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Symbol hi>\\""'
  );

  expect(() => {
    t.assertType(Symbol(), t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Symbol>\\""'
  );

  expect(() => {
    t.assertType(Array.isArray, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Function isArray>\\""'
  );

  expect(() => {
    t.assertType(Symbol, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Function Symbol>\\""'
  );

  expect(() => {
    t.assertType(() => {}, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received \\"<Function>\\""'
  );

  expect(() => {
    const obj = {};
    // @ts-ignore
    obj.obj = obj;

    t.assertType(obj, t.string);
  }).toThrowErrorMatchingInlineSnapshot(
    '"Expected value of type string, but received [object Object]"'
  );
});

test("basic types", () => {
  expect(t.isOfType(324325432, t.any)).toBe(true);
  expect(t.isOfType({}, t.any)).toBe(true);
  expect(t.isOfType(null, t.any)).toBe(true);

  expect(t.isOfType(324325432, t.unknown)).toBe(true);
  expect(t.isOfType({}, t.unknown)).toBe(true);
  expect(t.isOfType(null, t.unknown)).toBe(true);

  expect(t.isOfType(354267, t.anyObject)).toBe(false);
  expect(t.isOfType(null, t.anyObject)).toBe(false);
  expect(t.isOfType({ one: 1 }, t.anyObject)).toBe(true);

  expect(t.isOfType(354267, t.unknownObject)).toBe(false);
  expect(t.isOfType(null, t.unknownObject)).toBe(false);
  expect(t.isOfType({ one: 1 }, t.unknownObject)).toBe(true);

  expect(t.isOfType(354267, t.object)).toBe(false);
  expect(t.isOfType(null, t.object)).toBe(false);
  expect(t.isOfType({ one: 1 }, t.object)).toBe(true);

  expect(t.isOfType(354267, t.Object)).toBe(false);
  expect(t.isOfType(null, t.Object)).toBe(false);
  expect(t.isOfType({ one: 1 }, t.Object)).toBe(true);

  expect(t.isOfType(354267, t.arrayOfAny)).toBe(false);
  expect(t.isOfType([1, "f", null], t.arrayOfAny)).toBe(true);

  expect(t.isOfType(354267, t.arrayOfUnknown)).toBe(false);
  expect(t.isOfType([1, "f", null], t.arrayOfUnknown)).toBe(true);

  expect(t.isOfType(354267, t.array)).toBe(false);
  expect(t.isOfType([1, "f", null], t.array)).toBe(true);

  expect(t.isOfType(354267, t.Array)).toBe(false);
  expect(t.isOfType([1, "f", null], t.Array)).toBe(true);

  expect(t.isOfType(354267, t.anyArray)).toBe(false);
  expect(t.isOfType([1, "f", null], t.anyArray)).toBe(true);

  expect(t.isOfType(354267, t.boolean)).toBe(false);
  expect(t.isOfType(null, t.boolean)).toBe(false);
  expect(t.isOfType(true, t.boolean)).toBe(true);
  expect(t.isOfType(false, t.boolean)).toBe(true);

  expect(t.isOfType(354267, t.Boolean)).toBe(false);
  expect(t.isOfType(null, t.Boolean)).toBe(false);
  expect(t.isOfType(true, t.Boolean)).toBe(true);
  expect(t.isOfType(false, t.Boolean)).toBe(true);

  expect(t.isOfType(354267, t.string)).toBe(false);
  expect(t.isOfType("hi", t.string)).toBe(true);

  expect(t.isOfType(354267, t.String)).toBe(false);
  expect(t.isOfType("hi", t.String)).toBe(true);

  expect(t.isOfType(354267, t.null)).toBe(false);
  expect(t.isOfType(undefined, t.null)).toBe(false);
  expect(t.isOfType(null, t.null)).toBe(true);
  expect(t.null.name).toBe("null");

  expect(t.isOfType(354267, t.undefined)).toBe(false);
  expect(t.isOfType(null, t.undefined)).toBe(false);
  expect(t.isOfType(undefined, t.undefined)).toBe(true);
  expect(t.undefined.name).toBe("undefined");

  expect(t.isOfType(354267, t.nullish)).toBe(false);
  expect(t.isOfType(false, t.nullish)).toBe(false);
  expect(t.isOfType(null, t.nullish)).toBe(true);
  expect(t.isOfType(undefined, t.nullish)).toBe(true);

  expect(t.isOfType(354267, t.void)).toBe(false);
  expect(t.isOfType(false, t.void)).toBe(false);
  expect(t.isOfType(null, t.void)).toBe(true);
  expect(t.isOfType(undefined, t.void)).toBe(true);

  expect(t.isOfType("hi", t.numberIncludingNanAndInfinities)).toBe(false);
  expect(t.isOfType(43875, t.numberIncludingNanAndInfinities)).toBe(true);
  expect(t.isOfType(NaN, t.numberIncludingNanAndInfinities)).toBe(true);
  expect(t.isOfType(Infinity, t.numberIncludingNanAndInfinities)).toBe(true);
  expect(t.isOfType(-Infinity, t.numberIncludingNanAndInfinities)).toBe(true);

  expect(t.isOfType("hi", t.number)).toBe(false);
  expect(t.isOfType(43875, t.number)).toBe(true);
  expect(t.isOfType(NaN, t.number)).toBe(false);
  expect(t.isOfType(Infinity, t.number)).toBe(false);
  expect(t.isOfType(-Infinity, t.number)).toBe(false);

  expect(t.isOfType("hi", t.Number)).toBe(false);
  expect(t.isOfType(43875, t.Number)).toBe(true);
  expect(t.isOfType(NaN, t.Number)).toBe(false);
  expect(t.isOfType(Infinity, t.Number)).toBe(false);
  expect(t.isOfType(-Infinity, t.Number)).toBe(false);

  expect(t.isOfType("hi", t.NaN)).toBe(false);
  expect(t.isOfType(327489, t.NaN)).toBe(false);
  expect(t.isOfType(NaN, t.NaN)).toBe(true);
  // @ts-ignore object is possibly undefined
  expect(t.isOfType(undefined - 5, t.NaN)).toBe(true);
  expect(t.NaN.name).toBe("NaN");

  expect(t.isOfType("hi", t.Infinity)).toBe(false);
  expect(t.isOfType(327489, t.Infinity)).toBe(false);
  expect(t.isOfType(NaN, t.Infinity)).toBe(false);
  expect(t.isOfType(Infinity, t.Infinity)).toBe(true);
  expect(t.isOfType(-Infinity, t.Infinity)).toBe(false);
  expect(t.Infinity.name).toBe("Infinity");

  expect(t.isOfType("hi", t.NegativeInfinity)).toBe(false);
  expect(t.isOfType(327489, t.NegativeInfinity)).toBe(false);
  expect(t.isOfType(NaN, t.NegativeInfinity)).toBe(false);
  expect(t.isOfType(Infinity, t.NegativeInfinity)).toBe(false);
  expect(t.isOfType(-Infinity, t.NegativeInfinity)).toBe(true);

  expect(t.isOfType("hi", t.integer)).toBe(false);
  expect(t.isOfType(6, t.integer)).toBe(true);
  expect(t.isOfType(6.5, t.integer)).toBe(false);

  expect(t.isOfType("hi", t.never)).toBe(false);
  expect(t.isOfType({}, t.never)).toBe(false);
  expect(t.isOfType(4376859, t.never)).toBe(false);

  expect(t.isOfType("hi", t.anyFunction)).toBe(false);
  expect(t.isOfType(() => {}, t.anyFunction)).toBe(true);
  expect(t.isOfType(function blah() {}, t.anyFunction)).toBe(true);

  expect(t.isOfType("hi", t.unknownFunction)).toBe(false);
  expect(t.isOfType(() => {}, t.unknownFunction)).toBe(true);
  expect(t.isOfType(function blah() {}, t.unknownFunction)).toBe(true);

  expect(t.isOfType("hi", t.Function)).toBe(false);
  expect(t.isOfType(() => {}, t.Function)).toBe(true);
  expect(t.isOfType(function blah() {}, t.Function)).toBe(true);

  expect(t.isOfType("hi", t.false)).toBe(false);
  expect(t.isOfType(0, t.false)).toBe(false);
  expect(t.isOfType("", t.false)).toBe(false);
  expect(t.isOfType(true, t.false)).toBe(false);
  expect(t.isOfType(false, t.false)).toBe(true);
  expect(t.false.name).toBe("false");

  expect(t.isOfType("hi", t.true)).toBe(false);
  expect(t.isOfType(1, t.true)).toBe(false);
  expect(t.isOfType(false, t.true)).toBe(false);
  expect(t.isOfType(true, t.true)).toBe(true);
  expect(t.true.name).toBe("true");

  expect(t.isOfType("hi", t.falsy)).toBe(false);
  expect(t.isOfType(1, t.falsy)).toBe(false);
  expect(t.isOfType(true, t.falsy)).toBe(false);
  expect(t.isOfType(0, t.falsy)).toBe(true);
  expect(t.isOfType("", t.falsy)).toBe(true);
  expect(t.isOfType(null, t.falsy)).toBe(true);
  expect(t.isOfType(undefined, t.falsy)).toBe(true);
  expect(t.isOfType(false, t.falsy)).toBe(true);

  expect(t.isOfType("hi", t.truthy)).toBe(true);
  expect(t.isOfType(1, t.truthy)).toBe(true);
  expect(t.isOfType(true, t.truthy)).toBe(true);
  expect(t.isOfType(0, t.truthy)).toBe(false);
  expect(t.isOfType("", t.truthy)).toBe(false);
  expect(t.isOfType(null, t.truthy)).toBe(false);
  expect(t.isOfType(undefined, t.truthy)).toBe(false);
  expect(t.isOfType(false, t.truthy)).toBe(false);

  expect(t.isOfType("hi", t.nonNullOrUndefined)).toBe(true);
  expect(t.isOfType(3246, t.nonNullOrUndefined)).toBe(true);
  expect(t.isOfType(false, t.nonNullOrUndefined)).toBe(true);
  expect(t.isOfType(null, t.nonNullOrUndefined)).toBe(false);
  expect(t.isOfType(undefined, t.nonNullOrUndefined)).toBe(false);

  expect(t.isOfType("hi", t.Error)).toBe(false);
  expect(t.isOfType(new Error("uh oh"), t.Error)).toBe(true);
  expect(t.Error.name).toBe("Error");

  expect(t.isOfType("hi", t.Symbol)).toBe(false);
  expect(t.isOfType(Symbol("hi"), t.Symbol)).toBe(true);
  expect(t.isOfType(Symbol(), t.Symbol)).toBe(true);
  expect(t.Symbol.name).toBe("Symbol");

  expect(t.isOfType("hi", t.symbol)).toBe(false);
  expect(t.isOfType(Symbol("hi"), t.symbol)).toBe(true);
  expect(t.isOfType(Symbol(), t.symbol)).toBe(true);

  expect(t.isOfType(null, t.RegExp)).toBe(false);
  expect(t.isOfType("hi", t.RegExp)).toBe(false);
  expect(t.isOfType(/abc$/, t.RegExp)).toBe(true);
  expect(t.isOfType(new RegExp("hi"), t.RegExp)).toBe(true);
  expect(t.isOfType(/^\w[0-9]+$/g, t.RegExp)).toBe(true);

  expect(t.isOfType("hi", t.anyMap)).toBe(false);
  expect(t.isOfType(new Map(), t.anyMap)).toBe(true);
  expect(
    t.isOfType(
      new Map<any, any>([
        [1, 2],
        ["three", "four"],
      ]),
      t.anyMap
    )
  ).toBe(true);

  expect(t.isOfType("hi", t.unknownMap)).toBe(false);
  expect(t.isOfType(new Map(), t.unknownMap)).toBe(true);
  expect(
    t.isOfType(
      new Map<any, any>([
        [1, 2],
        ["three", "four"],
      ]),
      t.unknownMap
    )
  ).toBe(true);

  expect(t.isOfType("hi", t.map)).toBe(false);
  expect(t.isOfType(new Map(), t.map)).toBe(true);
  expect(
    t.isOfType(
      new Map<any, any>([
        [1, 2],
        ["three", "four"],
      ]),
      t.map
    )
  ).toBe(true);

  expect(t.isOfType("hi", t.Map)).toBe(false);
  expect(t.isOfType(new Map(), t.Map)).toBe(true);
  expect(
    t.isOfType(
      new Map<any, any>([
        [1, 2],
        ["three", "four"],
      ]),
      t.Map
    )
  ).toBe(true);

  expect(t.isOfType("hi", t.anySet)).toBe(false);
  expect(t.isOfType(new Set(), t.anySet)).toBe(true);
  expect(t.isOfType(new Set([1, 2, "three"]), t.anySet)).toBe(true);

  expect(t.isOfType("hi", t.unknownSet)).toBe(false);
  expect(t.isOfType(new Set(), t.unknownSet)).toBe(true);
  expect(t.isOfType(new Set([1, 2, "three"]), t.unknownSet)).toBe(true);

  expect(t.isOfType("hi", t.set)).toBe(false);
  expect(t.isOfType(new Set(), t.set)).toBe(true);
  expect(t.isOfType(new Set([1, 2, "three"]), t.set)).toBe(true);

  expect(t.isOfType("hi", t.Set)).toBe(false);
  expect(t.isOfType(new Set(), t.Set)).toBe(true);
  expect(t.isOfType(new Set([1, 2, "three"]), t.Set)).toBe(true);
});

test("type constructors", () => {
  {
    const type = t.arrayOf(t.number);
    expect(t.isOfType(324325432, type)).toBe(false);
    expect(t.isOfType(["hi"], type)).toBe(false);
    expect(t.isOfType([], type)).toBe(true);
    expect(t.isOfType([1, 2, 3], type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"arrayOf(number)"');
  }

  {
    const type = t.exactString("hello");
    expect(t.isOfType(324325432, type)).toBe(false);
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType("hello", type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"exactString(\\"hello\\")"');
  }

  {
    const type = t.exactNumber(42);
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType(324325432, type)).toBe(false);
    expect(t.isOfType(42, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"exactNumber(42)"');
  }

  {
    const type = t.hasClassName("Number");
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType(42, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"hasClassName(\\"Number\\")"');
  }

  {
    const type = t.hasClassName("Boolean");
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType(true, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"hasClassName(\\"Boolean\\")"');
  }

  {
    const type = t.hasToStringTag("Null");
    expect(t.isOfType(null, type)).toBe(true);
    expect(t.isOfType({}, type)).toBe(false);
    expect(type.name).toMatchInlineSnapshot('"hasToStringTag(\\"Null\\")"');
  }

  {
    class Something {}
    const something = new Something();

    const type = t.instanceOf(Something);
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType(something, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"instanceOf(\\"Something\\")"');
  }

  {
    const type = t.intersection(
      t.objectWithProperties({ one: t.number }),
      t.objectWithProperties({ two: t.number })
    );
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType({ one: 1 }, type)).toBe(false);
    expect(t.isOfType({ two: 2 }, type)).toBe(false);
    expect(t.isOfType({ one: 1, two: 2 }, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot(
      '"intersection(objectWithProperties({ one: number }), objectWithProperties({ two: number }))"'
    );
  }

  {
    const type = t.and(
      t.objectWithProperties({ one: t.number }),
      t.objectWithProperties({ two: t.number })
    );
    expect(t.isOfType("hi", type)).toBe(false);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType({ one: 1 }, type)).toBe(false);
    expect(t.isOfType({ two: 2 }, type)).toBe(false);
    expect(t.isOfType({ one: 1, two: 2 }, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot(
      '"intersection(objectWithProperties({ one: number }), objectWithProperties({ two: number }))"'
    );
  }

  {
    const type = t.union(t.number, t.string);
    expect(t.isOfType(null, type)).toBe(false);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType(45, type)).toBe(true);
    expect(t.isOfType("bees", type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"union(number, string)"');
  }

  {
    const type = t.or(t.number, t.string);
    expect(t.isOfType(null, type)).toBe(false);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType(45, type)).toBe(true);
    expect(t.isOfType("bees", type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"union(number, string)"');
  }

  {
    const type = t.mapOf(t.number, t.string);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType(new Map(), type)).toBe(true);
    expect(
      t.isOfType(
        new Map([
          [1, "one"],
          [2, "two"],
        ]),
        type
      )
    ).toBe(true);
    expect(
      t.isOfType(
        new Map([
          ["one", 1],
          ["two", 2],
        ]),
        type
      )
    ).toBe(false);
    expect(type.name).toMatchInlineSnapshot('"mapOf(number, string)"');
  }

  {
    const type = t.setOf(t.number);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType(new Set(), type)).toBe(true);
    expect(t.isOfType(new Set([1, 2, 3]), type)).toBe(true);
    expect(t.isOfType(new Set(["blah", "blaaah"]), type)).toBe(false);
    expect(t.isOfType(new Set([1, 2, false]), type)).toBe(false);
    expect(type.name).toMatchInlineSnapshot('"setOf(number)"');
  }

  {
    const type = t.maybe(t.number);
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType(false, type)).toBe(false);
    expect(t.isOfType(0, type)).toBe(true);
    expect(t.isOfType(5, type)).toBe(true);
    expect(t.isOfType(null, type)).toBe(true);
    expect(t.isOfType(undefined, type)).toBe(true);
    expect(type.name).toMatchInlineSnapshot('"maybe(number)"');
  }

  {
    const type = t.objectWithProperties({ one: t.number, two: t.string });
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType({ one: 1 }, type)).toBe(false);
    expect(t.isOfType({ two: "hi" }, type)).toBe(false);
    expect(t.isOfType({ one: 1, two: "hi" }, type)).toBe(true);
    expect(t.isOfType({ one: 1, two: "hi", three: "yes" }, type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot(
      '"objectWithProperties({ one: number, two: string })"'
    );
  }

  {
    const type = t.objectWithOnlyTheseProperties({
      one: t.number,
      two: t.string,
    });
    expect(t.isOfType({}, type)).toBe(false);
    expect(t.isOfType({ one: 1 }, type)).toBe(false);
    expect(t.isOfType({ two: "hi" }, type)).toBe(false);
    expect(t.isOfType({ one: 1, two: "hi" }, type)).toBe(true);
    expect(t.isOfType({ one: 1, two: "hi", three: "yes" }, type)).toBe(false);

    expect(type.name).toMatchInlineSnapshot(
      '"objectWithOnlyTheseProperties({ one: number, two: string })"'
    );
  }

  {
    const type = t.mappingObjectOf(t.string, t.number);
    expect(t.isOfType({}, type)).toBe(true);
    expect(t.isOfType({ hi: "hi" }, type)).toBe(false);
    expect(t.isOfType({ hi: 4 }, type)).toBe(true);
    expect(t.isOfType({ hi: 4, there: "hi" }, type)).toBe(false);
    expect(t.isOfType({ hi: 4, there: 5 }, type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot(
      '"mappingObjectOf(string, number)"'
    );
  }

  {
    const type = t.record(t.string, t.number);
    expect(t.isOfType({}, type)).toBe(true);
    expect(t.isOfType({ hi: "hi" }, type)).toBe(false);
    expect(t.isOfType({ hi: 4 }, type)).toBe(true);
    expect(t.isOfType({ hi: 4, there: "hi" }, type)).toBe(false);
    expect(t.isOfType({ hi: 4, there: 5 }, type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot(
      '"mappingObjectOf(string, number)"'
    );
  }

  {
    const type = t.partialObjectWithProperties({
      one: t.string,
      two: t.boolean,
    });
    expect(t.isOfType(45, type)).toBe(false);
    expect(t.isOfType({}, type)).toBe(true);
    expect(t.isOfType({ one: "hi" }, type)).toBe(true);
    expect(t.isOfType({ one: 45 }, type)).toBe(false);
    expect(t.isOfType({ two: true }, type)).toBe(true);
    expect(t.isOfType({ two: 66 }, type)).toBe(false);
    expect(t.isOfType({ one: "hi", two: true }, type)).toBe(true);
    expect(t.isOfType({ one: "hi", two: 42 }, type)).toBe(false);
    expect(t.isOfType({ one: null, two: undefined }, type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot(
      '"partialObjectWithProperties({ one: union(string, null, undefined), two: union(boolean, null, undefined) })"'
    );
  }

  {
    const type = t.stringMatching(/hi/g);
    expect(t.isOfType(45, type)).toBe(false);
    expect(t.isOfType("", type)).toBe(false);
    expect(t.isOfType("hey", type)).toBe(false);
    expect(t.isOfType("hi", type)).toBe(true);
    expect(t.isOfType("hiiiii", type)).toBe(true); // important: can match more than once
    expect(t.isOfType("uhhhhhiiiii", type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot('"stringMatching(/hi/g)"');
  }

  {
    const type = t.symbolFor("blah");
    expect(t.isOfType(45, type)).toBe(false);
    expect(t.isOfType(Symbol(), type)).toBe(false);
    expect(t.isOfType(Symbol("blah"), type)).toBe(false);
    expect(t.isOfType(Symbol.for("blah"), type)).toBe(true);

    expect(type.name).toMatchInlineSnapshot('"symbolFor(\\"blah\\")"');
  }

  {
    const type = t.tuple(t.number, t.string);
    expect(t.isOfType(45, type)).toBe(false);
    expect(t.isOfType([45], type)).toBe(false);
    expect(t.isOfType([45, 46], type)).toBe(false);
    expect(t.isOfType([45, "hi"], type)).toBe(true);
    expect(t.isOfType(["hi", 33], type)).toBe(false);

    expect(type.name).toMatchInlineSnapshot('"tuple(number, string)"');
  }
});

test("exported categories", () => {
  expect(t.$ApiFunctions).not.toBeUndefined();

  for (const key in t.$ApiFunctions) {
    expect(t[key]).not.toBeUndefined();
  }

  expect(t.$BasicTypes).not.toBeUndefined();

  for (const key in t.$BasicTypes) {
    expect(t[key]).not.toBeUndefined();
  }

  expect(t.$TypeConstructors).not.toBeUndefined();

  for (const key in t.$TypeConstructors) {
    expect(t[key]).not.toBeUndefined();
  }
});
