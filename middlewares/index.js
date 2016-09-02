'use strict'

const favicon = require( 'koa-favicon' )
const responseTime = require( 'koa-response-time' )
const bodyparser = require( 'koa-bodyparser' )
const router = require( 'koa-router' )()

const view = require( './koa-view' )
const staticServer = require( './koa-static' )
const csrf = require( './koa-csrf' )

exports.install = ( app ) => {

	app.use( responseTime() )

	app.use( favicon( Config.favicon ) )

	app.use( staticServer( Config.static.root, Config.static.opt ) )

	app.use( bodyparser() )

	app.use( csrf() )

	app.use( view( Config.view.root, Config.view.opt ) )

	app.use( router.routes() ).use( router.allowedMethods() )
}

exports.handleRouters = ( routers ) => {
	routers.init( router )
}

exports.getRouter = () => router