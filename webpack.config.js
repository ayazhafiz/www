const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		index: path.join(__dirname, 'src/js/index.js')
	},
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: '[name].js'
	},
	resolveLoader: {
		modules: [
			path.join(__dirname, 'node_modules')
		]
	},
	module: {
		rules: [
			{
				include: path.join(__dirname, 'src/js'),
				test: /\.js$/,
				exclude: /(node_modules|third-party)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	}
}