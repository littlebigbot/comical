module.exports = {
  plugins: [
    // require('postcss-import')({ [> ...options <] }),
    require('precss')({ /* ...options */ }),
    require('postcss-color-function')({ /* ...options */ }),
    require('autoprefixer')({ /* ...options */ })
  ]
}
