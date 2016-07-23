'use strict'

let chokidar = require( 'chokidar' )

function cleanCache( modulePath ) {
    let module = require.cache[ modulePath ]
    if ( module.parent ) {
        module.parent.children.splice( module.parent.children.indexOf( module ), 1 )
    }
    require.cache[ modulePath ] = null
}

function hotReload() {
    let basePath = ROOT_PATH + '/base'
    let middlePath = ROOT_PATH + '/middlewares'

    let routersFile = ROOT_PATH + '/routers.js'
    let configFile = ROOT_PATH + '/config.js'

    chokidar.watch( routersFile ).on( 'change', ( path ) => {
        cleanCache( path )

        let router = require( middlePath ).getRouter()
        router.stack = []

        require( path ).init( router )
    })

    chokidar.watch( [ configFile, Config.controller, Config.model ] ).on( 'change', ( path ) => {
        cleanCache( path )
    })

    chokidar.watch( basePath ).on( 'change', ( path ) => {
        cleanCache( path )
        require( path )
    })
}

exports.init = hotReload