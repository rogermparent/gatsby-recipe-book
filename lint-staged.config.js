module.exports = {
  "*.{json,md,mdx,yml,yaml,css}": "prettier --write",
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
};
