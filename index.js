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
const robot = new Koa()

function loadBase() {
	require( './base' )
}

function autoLoadConfig() {
	let Config = Object.assign( require( './config' ), safeRequire( ROOT_PATH + '/config' ) )
	global.Config = Config
}

function autoLoadExtend() {
	safeRequire( ROOT_PATH + '/extend' )
}

function init() {

	robot.keys = Config.keys

	let Middlewares = require( './middlewares' )

	Middlewares.install( robot )

	Middlewares.handleRouters( safeRequire( ROOT_PATH + '/routers' ) )

	robot.listen( Config.port )

	// Node文件热更新
	if ( DEBUG ) {
		require( './base/hot-reload' ).watch()
	}

	Logger.log( `server start at http://127.0.0.1:${Config.port}` )
}

robot.setRootPath = ( path ) => {
	global.ROOT_PATH = path
}

robot.run = () => {
	loadBase()
	autoLoadConfig()
	autoLoadExtend()
	init()
}

module.exports = robot