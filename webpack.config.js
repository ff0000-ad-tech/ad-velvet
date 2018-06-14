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

const dirs = DM.aliases.getTopLevel(path.resolve(__dirname, 'node_modules/@ff0000-ad-tech'))
module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: 'Velvet.min.js',
		library: 'Velvet',
		// allows named imports from globally available ad package
		libraryTarget: 'umd'
	},
	resolve: {
		alias: dirs
	},

	// externals: 'ad-dates',

	// externals: ['ad-dates'],

	// externals: {
	// 	'ad-dates': true
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
	// externals: [
	// 	(context, request, callback) => {
	// 		// console.log('externals:', /ad-dates/.test(request), context, '|', request)
	// 		// console.log('externals:', /ad-test-a/.test(request), context.split('1-build')[1], '|', request.split('1-build')[1])
	// 		if (/ad-test-a/.test(request)) {
	// 			console.log('\texternals :', context.split('1-build')[1], '|', request.split('1-build')[1])
	// 			return callback(null, 'ad-test-a ' + request)
	// 		} else {
	// 			callback()
	// 		}
	// 	}
	// ],
	// externals: [/ad-test-a/],

	// externals: {
	// 	'ad-dates': path.resolve(__dirname, 'node_modules/@ff0000-ad-tech/ad-dates')
	// },

	// externals: /^(ad\-dates)/g,

	// externals: [
	// 	nodeExternals({
	// 		// whitelist: ['ad-utils']
	// 	})
	// ],

	externals: {
		// object values in externals object MUST be valid variable name
		'ad-dates': 'adDates'
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
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: babelOptions.plugins
						}
					}
				]
			},
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
							},
							// basically a copy of Webpack externals
							globals: {
								'ad-dates': 'adDates'
							},
							// here, list package names for Rollup to assume have already been loaded externally
							external: ['ad-dates']
						}
					}
				]
			}
		]
	}
}
