'use strict'

let favicon = require( 'koa-favicon' )
let responseTime = require( 'koa-response-time' )
let bodyparser = require( 'koa-bodyparser' )
let router = require( 'koa-router' )()
let session = require( 'koa-session2' ).default

let view = require( './koa-view' )
let staticServer = require( './koa-static' )
let csrf = require( './koa-csrf' )

let routers = require( '../routers' )

exports.install = ( app ) => {

	app.use( favicon( Config.favicon ) )

	app.use( responseTime() )

	app.use( staticServer( Config.static.root, Config.static.opt ) )

	app.use( bodyparser() )

	app.use( session() )

	app.use( csrf() )

	app.use( view( Config.view.root, Config.view.opt ) )

	app.use( router.routes() ).use( router.allowedMethods() )
}

exports.handleRouters = () => {
	routers.init( router )
}

exports.getRouter = () => router