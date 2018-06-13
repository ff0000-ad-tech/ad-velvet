const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const IndexPlugin = require('@ff0000-ad-tech/wp-plugin-index')

const DM = require('@ff0000-ad-tech/wp-deploy-manager')

var nodeExternals = require('webpack-node-externals')

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
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: 'Velvet.min.js',
		library: 'Velvet'
		// libraryTarget: 'umd'
	},
	resolve: {
		alias: DM.aliases.getTopLevel(path.resolve(__dirname, 'node_modules/@ff0000-ad-tech'))
	},

	// externals: 'ad-dates',

	// externals: ['ad-dates'],

	// externals: {
	// 	'ad-dates': true
	// },

	// externals: {
	// 	'ad-dates': 'ad-dates'
	// },

	// externals: {
	// 	'ad-dates': {
	// 		root: 'ad-dates',
	// 		commonjs2: 'ad-dates',
	// 		commonjs: 'ad-dates',
	// 		amd: 'ad-dates',
	// 		var: 'ad-dates'
	// 	}
	// },

	/*
function (err, value, type) {
	if(err) return callback(err);
	if(typeof value !== "undefined") {
		handleExternal(value, type, callback);
	} else {
		callback();
	}
}
	*/
	externals: [
		(context, request, callback) => {
			// console.log('externals:', /ad-dates/.test(request), context, '|', request)
			console.log('externals:', /ad-dates/.test(request), context.split('1-build')[1], '|', request.split('1-build')[1])
			if (/ad-dates/.test(request)) {
				return callback(null, null)
			} else {
				callback()
			}
		}
	],
	// externals: [/ad-dates/],

	// externals: {
	// 	'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates')
	// },

	// externals: /^(ad\-dates)/g,

	// externals: [
	// 	nodeExternals({
	// 		// whitelist: ['ad-utils']
	// 	})
	// ],

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
				'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates/dist/ad-dates.min.js'),
				Velvet: `./bundles/Velvet.min.js`
			},
			output: {
				path: `./dist/velvet-enabler.js`
			}
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
