import type { TypeValidator } from "./type-validator";

/**
 * Simple value-to-string converter, using JSON.stringify with a custom
 * replacer and a try-catch around it. Kinda like a lightweight stand-in for
 * an "inspect" function. assertType's default messageMaker uses this function.
 */
export function stringifyValue(value: any) {
  try {
    return JSON.stringify(value, replacer);
  } catch (err) {
    return JSON.stringify({
      [`${String(value)} that failed to serialize due to error`]: String(err),
    });
  }
}

function replacer(_key: string, value: any) {
  if (value === null) return value;
  if (Array.isArray(value)) return value;

  switch (typeof value) {
    case "boolean":
    case "string":
    case "number": {
      return value;
    }

    case "undefined": {
      return "<undefined>";
    }

    case "function": {
      return `<Function${value.name ? " " + value.name : ""}>`;
    }

    case "bigint": {
      return `<BigInt ${value.toString()}>`;
    }

    case "symbol": {
      return `<Symbol${value.description ? " " + value.description : ""}>`;
    }
  }

  const tag =
    typeof value.constructor === "function"
      ? value.constructor.name || "anonymous constructor"
      : "Object";

  if (tag === "Object") {
    return value;
  }

  if (tag === "Map") {
    return {
      [`<${tag} of size ${value.size}>`]: stringifyValue(
        Array.from(value.entries())
      ),
    };
  } else if (tag === "Set") {
    return {
      [`<${tag} of size ${value.size}>`]: stringifyValue(
        Array.from(value.values())
      ),
    };
  } else {
    return `<${tag}>`;
  }
}

export function assertType<T>(
  target: any,
  type: TypeValidator<T>,
  messageMaker: (target: any, expectedType: TypeValidator<any>) => string = (
    target: any,
    expectedType: TypeValidator<any>
  ) =>
    `Expected value of type ${
      expectedType.name || "<anonymous>"
    }, but received ${stringifyValue(target)}`
): asserts target is T {
  const isOfType = type(target);
  if (!isOfType) {
    throw new Error(messageMaker(target, type));
  }
}

export function isOfType<T>(target: any, type: TypeValidator<T>): target is T {
  return type(target);
}

const any: any = null;
export function asType<T>(target: unknown, type: TypeValidator<T> = any): T {
  return target as any;
}
