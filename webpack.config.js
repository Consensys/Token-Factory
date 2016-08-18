var fs = require("fs");
var path = require('path');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//var environment = process.env.NODE_ENV || "development";

var provided = {
  "Web3": "web3",
  "Pudding": "ether-pudding"
};

// Get all the compiled contracts for our environment.
/*var contracts_directory = path.join("./", "environments", environment, "contracts");
fs.readdirSync("./environments/" + environment + "/contracts").forEach(function(file) {
  if (path.basename(file).indexOf(".sol.js")) {
    provided[path.basename(file, ".sol.js")] = path.resolve(contracts_directory + "/" + file);
  }
});*/

var contracts_directory = path.join("./", "build","contracts");
fs.readdirSync(contracts_directory).forEach(function(file) {
  if (path.basename(file).indexOf(".sol.js")) {
    provided[path.basename(file, ".sol.js")] = path.resolve(path.join(contracts_directory, file));
  }
});

module.exports = {
  entry: './app/javascripts/init.js',
  output: {
    path: "./build",
    filename: 'app.js'
  },
  module: {
    loaders: [
      //{ test: /\.(js|jsx|es6)$/, exclude: /node_modules/, include: [/reflux-tx/], loader: "babel-loader"},
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.(js|jsx|es6)$/, exclude: /node_modules/, loader: "babel-loader"},
      //localforage excluded due to "loose" option in babelrc being changed in babel 6.
      //https://github.com/mozilla/localForage/issues/496
      //{ test: /\.(js|jsx|es6)$/, exclude: [/localforage/, /ipfs-api\/node_modules/, /lodash/], loader: "babel-loader"},
      //{ test: /\.(js|jsx|es6)$/, exclude: [/localforage/, /lodash/, /web3/], loader: "babel-loader"},
      //{ test: /\.(js|jsx|es6)$/, exclude: [path.resolve(__dirname, "node_modules/reflux-tx/node_modules/localforaghh"), path.resolve(__dirname, "node_modules/react-account-badge/node_modules/ipfs-api"), /lodash/], loader: "babel-loader"},
      //{ test: /\.(jsx|es6)$/, loader: "babel-loader"},
      //{ test: /\.(js|jsx|es6)$/, loader: "babel-loader"},
      //{ test: /localforage\/dist\/localforage\.js/, loader: 'exports?localforage'},
      { test: /\.scss$/i, exclude: /node_modules/, loader: ExtractTextPlugin.extract(["css", "sass"])},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, include: [/bootstrap/, /font-awesome/], loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, include: [/bootstrap/, /font-awesome/], loader: 'file-loader' }
    ],
    noParse: [/\.min\.js$/]
    //noParse: [/\.min\.js$/, /localforage\/dist\/localforage\.js/]
  },
  plugins: [
    new webpack.DefinePlugin({
        ENV: '"' + process.env.NODE_ENV + '"',
        WEB3_PROVIDER_LOCATION: '"' + process.env.WEB3_PROVIDER_LOCATION + '"'
    }),
    new webpack.ProvidePlugin(provided),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" },
      { from: './app/images', to: "images" },
    ]),
    new ExtractTextPlugin("app.css")
  ],
  //resolve: {
  //  alias: { 'localforage': 'localforage/dist/localforage.js' }
  //},
  //resolve: { fallback: path.join(__dirname, "node_modules") },
  //resolveLoader: { fallback: path.join(__dirname, "node_modules") },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
