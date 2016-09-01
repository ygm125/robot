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

let Robot = require( './base/robot' )

let robotFrame = new Robot()

robotFrame.appInit( function () {
	// 加载初始工具函数
	require( './base/tools' )
	// 自动合并全局配置
	global.Config = Extend( require( './config' ), safeRequire( ROOT_PATH + '/config' ) )
})

robotFrame.preAppLoad( function () {
	this.keys = Config.keys
})

robotFrame.appLoad( function () {
	let Middlewares = require( './middlewares' )
	Middlewares.install( this )
	Middlewares.handleRouters( safeRequire( ROOT_PATH + '/routers' ) )
})

module.exports = robotFrame