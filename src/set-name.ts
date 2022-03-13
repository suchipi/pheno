export function setName(fn: Function, name: string) {
  Object.defineProperty(fn, "name", { value: name });
}
