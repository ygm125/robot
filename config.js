'use strict'

let APP_PATH = ROOT_PATH + '/app'

let staticConf = {
	root: APP_PATH + '/static',
	manifest: {},
	opt: {
		maxage: DEBUG ? 0 : 365 * 24 * 60 * 60
	}
}

try {
	staticConf.manifest = require( `${staticConf.root}/dist/manifest.json` )
} catch ( err ) { }

let viewConf = {
	root: APP_PATH + '/www/view',
	opt: {
		autoescape: false,
		noCache: DEBUG ? true : false,
		globals: {
			useJs( arg ) {
				if ( arg ) {
					if ( !/\.js$/.test( arg ) ) {
						arg += '.js'
					}
					arg = '/dist/' + staticConf.manifest[ arg ] || ( 'page/' + arg )
					return `<script src="${arg}"></script>`
				}
			},
			useCss( arg ) {
				if ( !/\.css$/.test( arg ) ) {
					arg += '.css'
				}
				arg = staticConf.manifest[ arg ]
				if ( arg ) {
					return `<link href="/dist/${arg}" rel="stylesheet" type="text/css" />`
				}
			}
		}
	}
}

global.Config = {
	port: 8080,
	keys: [ 'robot' ],
	favicon: '',

	db: {},

	static: staticConf,
	view: viewConf,

	app: APP_PATH,
	model: APP_PATH + '/www/model',
	controller: APP_PATH + '/www/controller'
}