const path = require("path");
const { defaultLoader, defaultResolver } = require("kame");

exports.load = function load(filename) {
  return defaultLoader.load(filename, { target: "es5" });
};

exports.resolve = function resolve(source, fromFile) {
  try {
    return defaultResolver.resolve(source, fromFile);
  } catch (err) {
    return defaultResolver.resolve(source.replace(/\.js$/, ".ts"), fromFile);
  }
};
