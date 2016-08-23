'use strict'

global.DEBUG = true
process.argv.map(( arg ) => {
	if ( arg.indexOf( '--env' ) > -1 ) {
		if ( arg.split( '=' )[ 1 ] != 'dev' ) {
			global.DEBUG = false
		}
	}
})

global.Promise = require( 'bluebird' )

const Koa = require( 'koa' )
const app = new Koa()

require( './base' )

function autoLoadConfig() {
	let Config = Object.assign( require( './config' ), safeRequire( ROOT_PATH + '/config' ) )
	global.Config = Config
}

function autoLoadExtend() {
	safeRequire( ROOT_PATH + '/extend' )
}

function init() {

	app.keys = Config.keys

	let Middlewares = require( './middlewares' )
	if ( DEBUG ) {
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

	Middlewares.handleRouters( safeRequire( ROOT_PATH + '/routers' ) )

	app.listen( Config.port )

	// Node文件热更新
	if ( DEBUG ) {
		require( './base/hot-reload' ).watch()
	}

	Logger.log( `server start at http://127.0.0.1:${Config.port}` )
}

module.exports = {
	setRootPath( path ) {
		global.ROOT_PATH = path || __dirname
	},
	run() {
		autoLoadConfig()
		autoLoadExtend()
		init()
	}
}