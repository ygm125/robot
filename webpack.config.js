'use strict'

let path = require( 'path' ),
    fs = require( 'fs' ),
    webpack = require( 'webpack' ),
    Clean = require( 'clean-webpack-plugin' ),
    ExtractTextPlugin = require( 'extract-text-webpack-plugin' ),
    ManifestPlugin = require( 'webpack-manifest-plugin' )

let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin


let rootPath = path.join( __dirname, '../../static' ),
    srcPath = path.join( rootPath, 'src' ),
    virthPath = '/dist',
    distPath = path.join( rootPath, virthPath ),
    ENV = getEnv()

function getEnv() {
    let env = 'dev'
    process.argv.some(( arg ) => {
        if ( arg.indexOf( '--env' ) > -1 ) {
            env = arg.split( '=' )[ 1 ]
            return true
        }
    })
    return env
}

function readDir( dir, map ) {
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

let entryMap = readDir( `${srcPath}/js/page` )
entryMap[ 'vendor' ] = `${srcPath}/js/base`

let webConf = {
    entry: entryMap,
    module: {
        noParse: [ /(jquery|zepto)/ ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?cacheDirectory&presets[]=es2015'
            }
        ]
    },
    resolve: {
        root: [ `${srcPath}/js`, `${srcPath}/less` ],
        alias: {
            'jquery': 'lib/jquery'
        }
    },
    output: {
        path: distPath,
        publicPath: virthPath
    },
    plugins: [
        new CommonsChunkPlugin( {
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin( {
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}

if ( ENV === 'dev' ) {
    entryMap[ 'vendor' ] = [ 'koa-webpack-middleware/node_modules/webpack-hot-middleware/client?reload=1', entryMap[ 'vendor' ] ]
    webConf.output.filename = 'page/[name].js'

    webConf.module.loaders.push( { test: /\.css$/, loader: 'style!css' })
    webConf.module.loaders.push( { test: /\.less$/, loader: 'style!css!less' })

    webConf.plugins.push( new webpack.optimize.OccurenceOrderPlugin() )
    webConf.plugins.push( new webpack.HotModuleReplacementPlugin() )
    webConf.plugins.push( new webpack.NoErrorsPlugin() )

} else if ( ENV === 'pro' ) {
    webConf.output.filename = 'page/[name].[chunkhash:5].js'

    webConf.module.loaders.push( {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract( 'style', 'css?minimize' )
    })
    webConf.module.loaders.push( {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract( 'style', 'css?minimize', 'less' )
    })
    webConf.plugins.push( new ExtractTextPlugin( 'page/[name].[chunkhash:5].css', {
        allChunks: false
    }) )

    webConf.plugins.push( new ManifestPlugin() )
    webConf.plugins.push( new UglifyJsPlugin() )
    webConf.plugins.push( new Clean( [ distPath ] ) )

    webConf.devtool = 'cheap-source-map'
}

module.exports = webConf

