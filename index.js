'use strict'

global.ROOT_PATH = __dirname
global.DEBUG = true
if ( process.argv.indexOf( '--production' ) > -1 ) {
	global.DEBUG = false
}

require( './config' )
require( './base' )

const Koa = require( 'koa' )
const Middlewares = require( './middlewares' )

const app = new Koa()
app.keys = Config.keys

if ( DEBUG ) {
	require( 'babel-polyfill' )
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

if ( DEBUG ) {
	require( './base/hot-reload' ).init()
}

logger.log( `server start at http://127.0.0.1:${Config.port}` )