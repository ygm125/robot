'use strict'

let favicon = require( 'koa-favicon' )
let responseTime = require( 'koa-response-time' )
let bodyparser = require( 'koa-bodyparser' )
let logger = require( 'koa-logger' )
let router = require( 'koa-router' )()

let view = require( './koa-view' )
let staticServer = require( './koa-static' )

let routers = require( '../routers' )

exports.install = ( app ) => {

	app.use( favicon(Config.favicon) )

	app.use( responseTime() )

	app.use( logger() )

	app.use( staticServer( Config.static.root, Config.static.opt ) )

	app.use( bodyparser() )

	app.use( view( Config.view.root, Config.view.opt ) )

	app.use( router.routes() ).use( router.allowedMethods() )
}

exports.handleRouters = () => {
	routers.init( router )
}