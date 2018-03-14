var webpack = require('webpack');
var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = env => {
  return {
    context: sourcePath,
    entry: {
      main: "./main.tsx"
    },
    output: {
      path: outPath,
      filename: "bundle.js",
      chunkFilename: "[chunkhash].js",
      publicPath: "/"
    },
    target: "web",
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ["module", "browser", "main"],
      alias: {
        app: path.resolve(__dirname, "src/app/")
      }
    },
    module: {
      rules: [
        // .ts, .tsx
        {
          test: /\.tsx?$/,
          use: isProduction
            ? "ts-loader"
            : ["babel-loader?plugins=react-hot-loader/babel", "ts-loader"]
        },
        // css
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                query: {
                  modules: false,
                  sourceMap: !isProduction,
                  importLoaders: 1,
                  localIdentName: "[local]__[hash:base64:5]"
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [
                    require("postcss-import")({ addDependencyTo: webpack }),
                    require("postcss-url")(),
                    require("postcss-cssnext")(),
                    require("postcss-reporter")(),
                    require("postcss-browser-reporter")({
                      disabled: isProduction
                    })
                  ]
                }
              }
            ]
          })
        },
        // static assets
        { test: /\.html$/, use: "html-loader" },
        { test: /\.woff$/, use: "url-loader?limit=10000" },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
          use: "file-loader?name=[name].[ext]?[hash]"
        },
        {
          test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader"
        }
      ]
    },
    optimization: {
      splitChunks: {
        name: true,
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            priority: -10
          }
        }
      },
      runtimeChunk: true,
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false
            },
            compress: {
              unsafe_comps: true,
              properties: true,
              keep_fargs: false,
              pure_getters: true,
              collapse_vars: true,
              unsafe: true,
              warnings: false,
              screw_ie8: true,
              sequences: true,
              dead_code: true,
              drop_debugger: true,
              comparisons: true,
              conditionals: true,
              evaluate: true,
              booleans: true,
              loops: true,
              unused: true,
              hoist_funs: true,
              if_return: true,
              join_vars: true,
              cascade: true,
              drop_console: true
            }
          }
        })
      ]
    },
    plugins: [
      new WebpackCleanupPlugin(),
      new ExtractTextPlugin({
        filename: "styles.css",
        disable: !isProduction
      }),
      new HtmlWebpackPlugin({
        template: "assets/index.html"
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
      })
    ],
    devServer: {
      contentBase: sourcePath,
      hot: true,
      inline: true,
      historyApiFallback: {
        disableDotRule: true
      },
      proxy: {
        "/": "http://localhost:5000"
      },
      stats: "minimal"
    },
    devtool: "cheap-module-eval-source-map",
    node: {
      fs: "empty",
      child_process: "empty",
      readline: "empty"
    }
  };
};
