'use strict'

exports.init = ( router ) => {

    router.get( '/', reflectAction( 'home.index' ) )

    router.get( '/test', function ( ctx ) {
        ctx.body = 'this is test'
    })

}