const path = require("path");
module.exports = {
  base: "/tasklog/",
  alias: {
    "/@/": path.resolve(__dirname, "./src"),
  },
};
