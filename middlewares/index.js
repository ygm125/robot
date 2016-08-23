'use strict'

let favicon = require( 'koa-favicon' )
let responseTime = require( 'koa-response-time' )
let bodyparser = require( 'koa-bodyparser' )
let router = require( 'koa-router' )()

let view = require( './koa-view' )
let staticServer = require( './koa-static' )
let csrf = require( './koa-csrf' )

exports.install = ( app ) => {

	app.use( responseTime() )

	app.use( favicon( Config.favicon ) )

	app.use( staticServer( Config.static.root, Config.static.opt ) )

	app.use( bodyparser() )

	app.use( csrf() )

	app.use( view( Config.view.root, Config.view.opt ) )

	app.use( router.routes() ).use( router.allowedMethods() )
}

exports.handleRouters = ( routers) => {
	routers.init( router )
}

exports.getRouter = () => router