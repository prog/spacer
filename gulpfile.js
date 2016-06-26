const gulp = require("gulp");
const nodeExternals = require("webpack-node-externals");
const webpackStream = require("webpack-stream");



gulp.task("js-server", function() { return js_server({uglify: true}); });
gulp.task("js-client", function() { return js_client({uglify: true}); });
gulp.task("js", ["js-server", "js-client"]);

gulp.task("js-server-watch", function() { return js_server({watch: true}); });
gulp.task("js-client-watch", function() { return js_client({watch: true}); });
gulp.task("js-watch", ["js-server-watch", "js-client-watch"]);



function js(options) {
	const webpackConfig = Object.assign({
		resolve: {extensions: ["", ".ts", ".js"]},
		module: {loaders: [{test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/}]},
		plugins: options.uglify ? [new webpackStream.webpack.optimize.UglifyJsPlugin()] : [],
	}, options, { src: null, dest: null, uglify: null});
	
	return gulp
		.src(options.src)
		.pipe(webpackStream(webpackConfig))
		.pipe(gulp.dest(options.dest));
}


function js_server(options) {
	return js(Object.assign({
		src: "./src/ts/server/index.ts",
		dest: "./bin/",
		output: {filename: "server.js"},
		target: "node",
		externals: [nodeExternals()]
	}, options));
}


function js_client(options) {
	return js(Object.assign({
		src: "./src/ts/client/index.ts",
		dest: "./public/res/",
		output: {filename: "bundle.js", publicPath: "/res/"}
	}, options));
}
