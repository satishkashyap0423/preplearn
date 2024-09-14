const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Update with your entry file
  output: {
    filename: 'bundle.js', // Adjust the output file name
    path: path.resolve(__dirname, 'dist'), // Adjust the output directory
  },
  resolve: {
    fallback: {
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      util: require.resolve('util/'),
      https: require.resolve('https-browserify'), // Add https fallback
      
    },
  },
  module: {
    rules: [
      // Define your rules for handling different file types here
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for JavaScript transpilation
        },
      },
    ],
  },
  plugins: [
    // Add any necessary plugins here
    // For example, you might use HtmlWebpackPlugin to generate an HTML file
    // based on your template in the 'public' directory.
  ],
};
