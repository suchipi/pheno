const path = require("path");
const { defaultLoader, defaultResolver } = require("kame");

exports.load = function load(filename) {
  return defaultLoader.load(filename, { target: "es5" });
};
