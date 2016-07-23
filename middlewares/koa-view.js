'use strict'

let resolve = require( 'path' ).resolve
let nunjucks = require( 'nunjucks' )

module.exports = ( path, opts ) => {
	path = resolve( path || 'views' )
	opts = opts || {}

	let ext = '.' + ( opts.ext || 'html' )
	let env = nunjucks.configure( path, opts )

	let filters = opts.filters || {}

	Object.keys( filters, ( key ) => {
		env.addFilter( key, filters[ key ] )
	} )

	let globals = opts.globals || {}

	Object.keys( globals, ( key ) => {
		env.addGlobal( key, globals[ key ] )
	} )


	return function view( ctx, next ) {
		if ( ctx.render ) return next()

		ctx.template = env

		ctx.render = function ( view, locals ) {
			let state = Object.assign( locals || {}, this.state )

			this.type = 'text/html'
			this.body = env.render( view + ext, state )
		}

		return next()
	}
}