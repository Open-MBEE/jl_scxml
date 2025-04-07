// webpack.notebook.js
const path = require('path');

module.exports = {
  entry: './src/scxmlRenderer.ts', // adjust if needed
  output: {
    path: path.resolve(__dirname, 'scxmlviz', 'static'),
    filename: 'scxml-bundle.js',
    library: 'scxmlviz',
    libraryTarget: 'window'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'production'
};
