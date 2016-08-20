'use strict'

/* global Config, DEBUG, Logger*/

global.ROOT_PATH = __dirname
global.DEBUG = true
process.argv.map(( arg ) => {
	if ( arg.indexOf( '--env' ) > -1 ) {
		if ( arg.split( '=' )[ 1 ] != 'dev' ) {
			global.DEBUG = false
		}
	}
})

global.Promise = require( 'bluebird' )

require( './config' )
require( './base' )

const Koa = require( 'koa' )
const Middlewares = require( './middlewares' )

const app = new Koa()
app.keys = Config.keys

if ( DEBUG ) {
	// Logger time&size
	// app.use( require( 'koa-logger' )() )

	// 静态资源热更新
	require( 'babel-polyfill/node_modules/regenerator-runtime/runtime' )
	let webpack = require( 'webpack' ),
		webpackMiddleware = require( 'koa-webpack-middleware' ),
		devMiddleware = webpackMiddleware.devMiddleware,
		hotMiddleware = webpackMiddleware.hotMiddleware,
		webpackConf = require( './webpack.config' ),
		compiler = webpack( webpackConf )

	app.use( devMiddleware( compiler, {
		noInfo: false,
		publicPath: webpackConf.output.publicPath,
		stats: {
			colors: true,
			chunks: false
		}
	}) )
	app.use( hotMiddleware( compiler ) )
}

Middlewares.install( app )

Middlewares.handleRouters()

app.listen( Config.port )

// Node文件热更新
if ( DEBUG ) {
	require( './base/hot-reload' ).watch()
}

Logger.log( `server start at http://127.0.0.1:${Config.port}` )