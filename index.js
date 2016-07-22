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

Middlewares.install( app )

Middlewares.handleRouters()

app.listen( Config.port )

logger.log( `server start at http://127.0.0.1:${Config.port}` )