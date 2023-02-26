/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    '@trivago/prettier-plugin-sort-imports',
  ],
  singleQuote: true,
  importOrder: ['<THIRD_PARTY_MODULES>', '^@(.+)/(.+)$', '^\\..+'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
