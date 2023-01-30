export function setName(fn: Function, name: string) {
  Object.defineProperty(fn, "name", { value: name });
}

export function isTagged(target: any, tag: string): boolean {
  return Object.prototype.toString.call(target) === `[object ${tag}]`;
}
