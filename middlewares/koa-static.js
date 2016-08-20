'use strict'

const resolve = require( 'path' ).resolve
const send = require( 'koa-send' )

module.exports = ( root, opts ) => {
	opts = opts || {}
	opts.root = resolve( root || __dirname )

	return function serve( ctx, next ) {
		if ( ctx.fresh ) {
			ctx.status = 304
			ctx.body = null
			return
		}

		if ( ctx.method == 'HEAD' || ctx.method == 'GET' ) {
			if ( ctx.path.indexOf( opts.virthPath ) !== 0 ) {
				return next()
			}
			return send( ctx, ctx.path, opts ).then( done => {
				if ( !done ) {
					return next()
				}
			})
		}

		return next()
	}
}