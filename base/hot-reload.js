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
    let extendPath = ROOT_PATH + '/extend'
    let routersFile = ROOT_PATH + '/routers'
    let configFile = ROOT_PATH + '/config'

    chokidar.watch( routersFile ).on( 'change', ( path ) => {
        cleanCache( path )

        let router = require( middlePath ).getRouter()
        router.stack = []

        require( path ).init( router )
    })

    chokidar.watch( [ configFile, Config.controller, Config.model ] ).on( 'change', ( path ) => {
        cleanCache( path )
    })

    chokidar.watch( extendPath ).on( 'change', ( path ) => {
        cleanCache( path )
        require( path )
    })
}

exports.watch = hotReload