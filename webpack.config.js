const path = require('path');

module.exports = {
	watch: true,
	entry: './src/assets/js/entry.js',
	output: {
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {modules: false}]
					]
				}
			}]
		}]
	}
};
