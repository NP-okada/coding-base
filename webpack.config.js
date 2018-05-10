module.exports = {
	// production or development
	mode: 'development',
	entry: './src/assets/js/entry.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
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
