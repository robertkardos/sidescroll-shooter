const path = require('path');

module.exports = {
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		publicPath: '/public/',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: [
					{loader: 'ts-loader'}
				],
				enforce: 'pre',
				exclude: /node_modules/
			},
			{
				include: path.resolve(__dirname, 'node_modules/@types/pixi.js'),
				loader: 'transform-loader?brfs',
				enforce: 'post'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
};
