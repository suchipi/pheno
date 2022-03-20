const { defaultLoader } = require("kame");

exports.load = function load(filename) {
  return defaultLoader.load(filename, { loose: true });
};
