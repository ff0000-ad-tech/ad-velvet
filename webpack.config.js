const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin

// prettier-ignore
const babelOptions = {
	"presets": [
		[
			"env",
			{
				"loose": true,
			}
		]
	],
	"plugins": [
		"transform-class-properties"
	]
}

module.exports = {
	entry: path.resolve(__dirname, 'entry.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'velvet.min.js'
		// library: 'adVelvet',
		// libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'ad-canvas': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-canvas'),
			'ad-control': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-control'),
			'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates'),
			'ad-events': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-events'),
			'ad-external': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-external'),
			'ad-geom': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-geom'),
			'ad-load': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-load'),
			'ad-polyfills': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-polyfills'),
			'ad-ui': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-ui'),
			'ad-utils': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-utils'),
			'ad-video': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-video'),
			'ad-view': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-view')
			// DataLoader: './node_modules/@ff0000-ad-tech/ad-load/lib/single/DataLoader.js'
		}
	},
	// copy UglifySettings
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: true
			}
		})
	],
	module: {
		rules: [
			// Rollup + Babel loader to generate smaller bundle, use one entry point
			{
				test: request => {
					// return true
					const isAdLoadIndex = request.includes('ad-velvet') && request.endsWith('entry.js')
					console.log('test()', request.includes('ad-velvet'), request.endsWith('entry.js'), '|', request)
					return isAdLoadIndex
				},
				use: [
					{
						loader: '@ff0000-ad-tech/webpack-rollup-babel-loader',
						options: {
							babelOptions: {
								presets: babelOptions.presets
							}
						}
					}
				]
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: babelOptions.plugins
						}
					}
				]
			}
		]
	}
}
