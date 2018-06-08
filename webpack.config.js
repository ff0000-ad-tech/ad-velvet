const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const IndexPlugin = require('@ff0000-ad-tech/wp-plugin-index')

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
	"plugins": [ "transform-class-properties" ]
}

module.exports = {
	// entry: {
	// 	'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates'),
	// 	Velvet: path.resolve(__dirname, 'index.js')
	// },
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: 'Velvet.min.js', // [name].min.js
		// library: 'Velvet', // [name]
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates'),
			'ad-load': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-load'),
			'ad-utils': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-utils')
		}
	},
	// externals: [
	// 	function(context, request, callback) {
	// 		let split = context.split('/')
	// 		let sub = split[split.length - 1]
	// 		let regex = /ad-dates/.test(request)
	// 		console.log('->', regex, sub, request)
	// 		// if (/^yourregex$/.test(request)) {
	// 		// 	return callback(null, 'commonjs ' + request)
	// 		// }
	// 		if (regex) {
	// 			return callback(null)
	// 		}
	// 		callback()
	// 	}
	// ],
	// externals: /ad-dates/g,
	externals: {
		'ad-dates': 'ad-dates'
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: true
			}
			// }),
			// // new HtmlWebpackPlugin(), // TODO: pass in a template with sample code
			// new IndexPlugin(null, {
			// 	source: {
			// 		path: `./tmpl/velvet-enabler.js`
			// 	},
			// 	inject: {
			// 		'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates/dist/ad-dates.min.js'),
			// 		Velvet: `./bundles/Velvet.min.js`
			// 	},
			// 	output: {
			// 		path: `./dist/velvet-enabler.js`
			// 	}
		})
	],
	module: {
		rules: [
			{
				test: request => {
					console.log('test()', request.includes('ad-velvet'), request.endsWith('index.js'), '|', request.split('1-build')[1])
					return request.includes('ad-velvet') && request.endsWith('index.js')
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
