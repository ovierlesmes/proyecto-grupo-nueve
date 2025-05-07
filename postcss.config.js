module.exports = {
  plugins: [
    require('@tailwindcss/postcss')(), // ✅ usa el nuevo plugin recomendado
    require('autoprefixer'),
  ],
};
