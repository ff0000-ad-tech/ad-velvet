const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const IndexPlugin = require('@ff0000-ad-tech/wp-plugin-index')

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
	"plugins": [ "transform-class-properties" ]
}

module.exports = {
	entry: {
		// Velvet: path.resolve(__dirname, 'index.js'),
		'ad-velvet': path.resolve(__dirname, 'index.js'),
		'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates')
	},
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: '[name].min.js',
		library: '[name]',
		// libraryExport: ['DateManager', 'TzDate'] // <- may be the way to expose the date stuff as well as Velvet -> https://webpack.js.org/configuration/output/#output-library
		libraryTarget: 'umd'
	},
	resolve: {
		alias: {
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
		}),
		new IndexPlugin(null, {
			source: {
				path: `./tmpl/velvet-enabler.js`
			},
			inject: {
				'ad-dates': './bundles/ad-dates.min.js',
				'ad-velvet': `./bundles/ad-velvet.min.js`
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
				test: request => {
					if (request.includes('ad-dates') && request.endsWith('index.js'))
						return path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates')
					else return false
				},
				use: 'exports-loader?TzDate,RecurringSchedule,DateSchedule,spanish,DateFormatter,DateManager,DateUtils,Timezone'
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
