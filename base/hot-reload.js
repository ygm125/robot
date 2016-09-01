'use strict'

let chokidar = require( 'chokidar' )

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

    chokidar.watch( routersFile ).on( 'change', ( path ) => {
        cleanCache( path )

        let router = require( middlePath ).getRouter()
        router.stack = []

        require( path ).init( router )
    })

    chokidar.watch( [ Config.controller, Config.model ] ).on( 'change', ( path ) => {
        cleanCache( path )
    })
}

exports.watch = hotReload