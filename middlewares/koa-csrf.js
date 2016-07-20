'use strict'

const Tokens = require( 'csrf' )

module.exports = ( opts ) => {
	let tokens = Tokens( opts || {})

	return function csrf( ctx, next ) {
		if ( ctx.method == 'GET' || ctx.method == 'HEAD' || ctx.method == 'OPTIONS' ) {
			return next()
		}

		ctx.__defineGetter__( 'csrf', function () {
			if ( this._csrf ) return this._csrf
			if ( !this.session ) return null
			let secret = this.session.secret
				|| ( this.session.secret = tokens.secretSync() )
			return this._csrf = tokens.create( secret )
		})

		ctx.assertCsrf = function ( body ) {
			let secret = this.session.secret
			if ( !secret ) this.throw( 403, 'secret is missing' )

			let token = ( body && body._csrf )
				|| ( !opts.disableQuery && ctx.query && ctx.query._csrf )
				|| ( ctx.get( 'x-csrf-token' ) )
				|| ( ctx.get( 'x-xsrf-token' ) )
				|| body
			if ( !token ) this.throw( 403, 'token is missing' )
			if ( !tokens.verify( secret, token ) ) this.throw( 403, 'invalid csrf token' )

			return this
		}

		return next()
	}
}