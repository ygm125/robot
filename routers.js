'use strict'

exports.init = ( router ) => {
	
	router.get( '/', reflectAction( 'home.index' ) )

}