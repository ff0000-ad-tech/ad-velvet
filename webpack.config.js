const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin

//https://stackoverflow.com/questions/37485546/webpack-alias-and-es6-imports-exports
//https://stackoverflow.com/questions/35600751/import-es6-module-into-global-scope

// prettier-ignore
const babelOptions = {
	"presets": [
		[
			"env",
			{
				"loose": true,
				"modules":false
			}
		]
	],
	"plugins": [
		"transform-class-properties"
	]
}

module.exports = {
	entry: {
		Velvet: path.resolve(__dirname, 'index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'velvet.min.js',
		library: '[name]',
		// libraryExport: ['DateManager', 'TzDate'] // <- may be the way to expose the date stuff as well as Velvet -> https://webpack.js.org/configuration/output/#output-library
		libraryTarget: 'window'
	},
	resolve: {
		alias: {
			// 'ad-canvas': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-canvas'),
			// 'ad-control': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-control'),
			// 'ad-events': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-events'),
			// 'ad-external': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-external'),
			// 'ad-geom': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-geom'),
			// 'ad-polyfills': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-polyfills'),
			// 'ad-ui': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-ui'),
			// 'ad-video': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-video'),
			// 'ad-view': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-view')
			'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates'),
			'ad-load': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-load'),
			'ad-utils': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-utils')
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
					const isAdLoadIndex = request.includes('ad-velvet') && request.endsWith('index.js')
					console.log('test()', request.includes('ad-velvet'), request.endsWith('index.js'), '|', request)
					return isAdLoadIndex
					// return false
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
