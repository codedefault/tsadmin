var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

let _publicPath = '/';
if (process.env.NODE_ENV === 'production') {
	_publicPath = "./";
}
var entries = {};
var chunks = [];
getEntriesAndChunks();

console.info("entries:", entries);
console.info("chunks:", chunks);

var config = {
	entry: entries,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		publicPath: _publicPath
	},
	resolve: {
		//配置别名，在项目中可缩减引用路径
		extensions: ['.js', '.vue', '.css'],
		alias: {
			assets: path.join(__dirname, '/app/assets'),
			components: path.join(__dirname, '/app/components'),
			data: path.join(__dirname, '/app/data'),
			views: path.join(__dirname, '/app/views'),
			config: path.join(__dirname, '/app/config'),
			util: path.join(__dirname, '/app/util'),
			_vuex: path.join(__dirname, '/app/vuex'),
			element_ui: path.join(__dirname, 'node_modules/element-ui'),
			scrollbar: path.join(__dirname, 'node_modules/vue2-scrollbar'),
			root: path.join(__dirname, 'node_modules')
		}
	},
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?presets=es2015',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader'
				})
			},
			{
				test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
				loader: 'url-loader?importLoaders=1&limit=100000',
                query: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new CommonsChunkPlugin({
			name: 'vendors',
			filename: 'assets/js/vendors.js',
			chunks: chunks,
			minChunks: chunks.length
		}),
		new ExtractTextPlugin({
			filename: 'assets/css/main.css',
			allChunks: true
		})
	],
	devServer: {
		historyApiFallback: false,
		noInfo: true,
		// proxy: {
		//   '/github': {
		//     target: 'https://github.com/github',
		//     changeOrigin: true,
		//     pathRewrite: {'^/github' : ''}
		//   }
		// },
	},
	devtool: '#eval-source-map'
};

var pages = getHtmls();
pages.forEach(function(pathname) {
	// filename 用文件夹名字
	var conf = {
		filename: pathname.substring(6, pathname.length - 4) + '.html', //生成的html存放路径，相对于path
		template: 'app/' + pathname + '.html', //html模板路径
	};

	var chunk = pathname.substring(6, pathname.length);
	if (chunks.indexOf(chunk) > -1) {
		conf.inject = 'body';
		conf.chunks = ['vendors', chunk];
	}
	if (process.env.NODE_ENV === 'production') {
		conf.hash = true;
	}
	console.info(conf);
	config.plugins.push(new HtmlWebpackPlugin(conf));
	//config.plugins.filenameTemplate='./'+config.plugins.filenameTemplate;
	//config.plugins.filename='./'+config.plugins.filename;
	console.info("config.plugins:", config.plugins);
});

module.exports = config;

function getEntriesAndChunks() {
	glob.sync('./app/pages/**/*.js').forEach(function(name) {
		var n = name.slice(name.lastIndexOf('app/') + 10, name.length - 3);
		entries[n] = [name];
		console.log('getEntriesAndChunks:', n);
		chunks.push(n);
	});
}

function getHtmls() {
	var htmls = [];
	glob.sync('./app/pages/**/*.html').forEach(function(name) {
		var n = name.slice(name.lastIndexOf('app/') + 4, name.length - 5);
		console.log('getHtmls:', n);
		htmls.push(n);
	});
	return htmls;
}


if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
			IS_PRODUCTION: JSON.stringify(true)
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]);
} else {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			IS_PRODUCTION: JSON.stringify(false)
		})
	]);
}
