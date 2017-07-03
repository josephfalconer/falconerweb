var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './assets/js/src/main.js',
	output: { path: './assets/js', filename: 'bundle.js' },
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react', 'stage-0']
				}
			}
		]
	},
};