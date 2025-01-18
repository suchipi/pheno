const { defaultLoader } = require("kame");

exports.load = function load(filename) {
  return defaultLoader.load(filename, { target: "es5" });
};
