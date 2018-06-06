const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
		library: 'Velvet', // [name]
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
			'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates'),
			'ad-load': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-load'),
			'ad-utils': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-utils')
		}
	},
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				drop_console: true
			}
		}),
		// new HtmlWebpackPlugin(), // TODO: pass in a template with sample code
		new IndexPlugin(null, {
			source: {
				path: `./tmpl/velvet-enabler.js`
			},
			inject: {
				// 'ad-dates': './bundles/ad-dates.min.js',
				'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates/dist/ad-dates.inline.js'),
				Velvet: `./bundles/Velvet.min.js`
			},
			output: {
				path: `./dist/velvet-enabler.js`
			}
		})
	],
	module: {
		rules: [
			// Rollup + Babel loader to generate smaller bundle, use one entry point
			{
				test: request => {
					// console.log('test()', request.includes('ad-velvet'), request.endsWith('index.js'), '|', request)
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
