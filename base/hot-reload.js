'use strict'

let fs = require( 'fs' )

function existsSync( path ) {
    let exist = true
    try {
        fs.statSync( path )
    } catch ( e ) {
        exist = false
    } finally {
        return exist
    }
}

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
    let routersFile = ROOT_PATH + '/routers.js'

    fs.watch( routersFile, ( event, filename ) => {
        cleanCache( filename )

        let router = require( middlePath ).getRouter()
        router.stack = []

        require( filename ).init( router )
    });

    [ Config.controller, Config.model ].forEach(( dir ) => {
        if ( !existsSync( dir ) ) { return }

        fs.watch( dir, { recursive: true }, ( event, filename ) => {
            cleanCache( dir + '/' + filename )
        })
    })

}

exports.watch = hotReload