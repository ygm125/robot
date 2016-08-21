'use strict'

const Tokens = require( 'csrf' )

module.exports = ( opts ) => {
	opts = opts || {}
	opts.httpOnly = opts.httpOnly || true
	opts.signed = opts.signed || false
	opts.cookieName = opts.cookieName || '__csrf'

	let tokens = Tokens( opts )

	return function csrf( ctx, next ) {

		ctx.__defineGetter__( 'csrf', function () {
			if ( this._csrf ) return this._csrf
			let secret = this.cookies.get( opts.cookieName )
			if ( !secret ) {
				secret = tokens.secretSync()
				this.cookies.set( opts.cookieName, secret, opts )
			}
			return this._csrf = tokens.create( secret )
		})

		ctx.assertCsrf = function ( body ) {
			let secret = this.cookies.get( opts.cookieName )
			if ( !secret ) this.throw( 403, 'secret is missing' )
			let token = ( body && body._csrf )
				|| ( !opts.disableQuery && ctx.query && ctx.query._csrf )
				|| ( ctx.get( 'x-csrf-token' ) )
				|| ( ctx.get( 'x-xsrf-token' ) )
				|| body
			if ( !token ) this.throw( 403, 'token is missing' )
			if ( !tokens.verify( secret, token ) ) this.throw( 403, 'invalid csrf token' )
			return true
		}

		return next()
	}
}