const Path = require('path');
const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/pages/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            );

            if(packageName) {
              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName[1].replace("@", "")}`;
            } else {
              return;
            }
          }
        },
      }
    },
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": 'jquery',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: "Stéphane Petiot - Interactive Resume",
      template: Path.resolve(__dirname, '../src/index.ejs'),
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(glb|obj)$/,
        type: 'asset/resource',
        generator: {
          filename: 'meshes/[name][ext]'
        }
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'webfonts/[name][ext]'
        }
      },
    ],
  },
};
