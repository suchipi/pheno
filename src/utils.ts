export function setName(fn: Function, name: string) {
  Object.defineProperty(fn, "name", { value: name });
}

export function isTagged(target: any, tag: string): boolean {
  return Object.prototype.toString.call(target) === `[object ${tag}]`;
}

export const hasOwn = (target: object, prop: string | number | symbol) =>
  Object.prototype.hasOwnProperty.call(target, prop);

export const allEntries = (target: object): Array<[PropertyKey, any]> => {
  const keys = Reflect.ownKeys(target);

  const results: Array<[PropertyKey, any]> = [];

  for (const key of keys) {
    const value = target[key];
    results.push([key, value]);
  }

  return results;
};
