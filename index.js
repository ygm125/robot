'use strict'

global.DEBUG = true

if ( process.env.NODE_ENV === 'production' ) {
	global.DEBUG = false
}

global.ROOT_PATH = global.ROOT_PATH || __dirname

// 全局功能函数
require( './base/common' )

// 自动合并全局配置
global.Config = deepAssign( require( './config' ), safeRequire( ROOT_PATH + '/config' ) )

const Robot = require( './base/robot' )

const robotFrame = new Robot()

robotFrame.keys = Config.keys

robotFrame.appLoad(() => {
	let Middlewares = require( './middlewares' )
	Middlewares.install( robotFrame )
	Middlewares.handleRouters( safeRequire( ROOT_PATH + '/routers' ) )
})

module.exports = robotFrame