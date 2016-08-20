'use strict'

/* global reflectAction */

exports.init = ( router ) => {
	
	router.get( '/', reflectAction( 'home.index' ) )

	router.get( '/test', function(ctx){
		ctx.body = 123
	})

}