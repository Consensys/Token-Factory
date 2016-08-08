//this is a hack currently for webpack building
//The normal ProvidePlugin doesn't seem to work here. Not sure why.
//If done through ProvidePlugin, it keeps producing a zillion warnings
//See babel-loader in Webpack: https://github.com/babel/babel-loader/issues/23
require('babel-runtime/core-js/promise').default = require('bluebird');
require('./main.jsx');
