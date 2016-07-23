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
    chokidar.watch( [ Config.controller, Config.model ] ).on( 'change', ( path ) => {
        cleanCache( path )
    })

    chokidar.watch( [ Config.base ] ).on( 'change', ( path ) => {
        cleanCache( path )
        require( path )
    })
}

global.hotReload = hotReload