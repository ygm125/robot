'use strict'

let fs = require( 'fs' )

function cleanCache( modulePath ) {
    let module = require.cache[ modulePath ]
    if ( !module ) {
        return
    }

    if ( module.parent ) {
        module.parent.children.splice( module.parent.children.indexOf( module ), 1 )
    }
    require.cache[ modulePath ] = null
}

function hotReload() {
    let middlePath = '../middlewares'
    let routersFile = ROOT_PATH + '/routers'

    fs.watch( routersFile, ( event, filename ) => {
        cleanCache( filename )

        let router = require( middlePath ).getRouter()
        router.stack = []

        require( filename ).init( router )
    })

    [ Config.controller, Config.model ].forEach(( dir ) => {
        fs.watch( dir, { recursive: true }, ( event, filename ) => {
            cleanCache( filename )
        })
    })

}

exports.watch = hotReload