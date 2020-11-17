module.exports = {
  extends: ["stylelint-config-recommended-scss"],
  plugins: ["stylelint-order", "stylelint-scss", "stylelint-prettier"],
  rules: {
    "prettier/prettier": true,
  },
};
