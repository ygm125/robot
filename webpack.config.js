'use strict'

let path = require( 'path' )
let fs = require( 'fs' )
let webpack = require( 'webpack' )
let Clean = require( 'clean-webpack-plugin' )
let HtmlWebpackPlugin = require( 'html-webpack-plugin' )
let ExtractTextPlugin = require( 'extract-text-webpack-plugin' )

let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

let rootPath = path.join( __dirname, 'app/static' ),
    srcPath = path.join( rootPath, 'src' ),
    virthPath = '/dist/',
    distPath = path.join( rootPath, virthPath )

function readDir( dir, map ) {
    dir = srcPath + '/' + ( dir || '' )
    map = map || {}

    fs.readdirSync( dir ).forEach( function ( name ) {
        let subFile = `${dir}/${name}`
        let stats = fs.statSync( subFile )
        if ( stats.isDirectory() ) {
            readDir( subFile, map )
        } else {
            name = path.basename( name, '.js' )
            map[ name ] = subFile
        }
    })

    return map
}

let entryMap = readDir( 'js/page' )
entryMap[ 'vendor' ] = `${srcPath}/js/base`

let webConf = {
    entry: entryMap,
    module: {
        noParse: [ /jquery/ ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?cacheDirectory&presets[]=es2015'
            }
        ]
    },
    resolve: {
        root: [ `${srcPath}/js`, `${srcPath}/less` ]
    },
    output: {
        path: distPath,
        publicPath: virthPath
    },
    plugins: [
        new CommonsChunkPlugin( {
            name: 'vendor',
            minChunks: Infinity
        })
    ]
}

if ( true ) {
    // Object.keys( entryMap ).forEach(( key ) => {
    //     entryMap[ key ] = [ 'koa-webpack-middleware/node_modules/webpack-hot-middleware/client?reload=1' ].concat( entryMap[ key ] )
    // })
    entryMap[ 'vendor' ] = [ 'koa-webpack-middleware/node_modules/webpack-hot-middleware/client?reload=1', entryMap[ 'vendor' ] ]

    webConf.module.loaders.push( { test: /\.css$/, loader: 'style!css' })
    webConf.module.loaders.push( { test: /\.less$/, loader: 'style!css!less' })

    webConf.output.filename = 'page/[name].js'

    webConf.plugins.push( new webpack.optimize.OccurenceOrderPlugin() )
    webConf.plugins.push( new webpack.HotModuleReplacementPlugin() )
    webConf.plugins.push( new webpack.NoErrorsPlugin() )
    // webConf.plugins.push( new Clean( [ distPath ] ) )
}

module.exports = webConf






