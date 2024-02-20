module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            "style-loader", // Creates `style` nodes from JS strings
            "css-loader",   // Translates CSS into CommonJS
            "sass-loader"   // Compiles Sass to CSS
          ]
        }
      ]
    }
  };