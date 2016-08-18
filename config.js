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
			useJs( file ) {
				if ( file ) {
					if ( !/\.js$/.test( file ) ) {
						file += '.js'
					}
					let filepath = '/dist/page/' + file
					if ( staticConf.manifest[ file ] ) {
						filepath = '/dist/' + staticConf.manifest[ file ]
					}
					return `<script src="${filepath}"></script>`
				}
			},
			useCss( file ) {
				if ( !/\.css$/.test( file ) ) {
					file += '.css'
				}
				file = staticConf.manifest[ file ]
				if ( file ) {
					return `<link href="/dist/${file}" rel="stylesheet" type="text/css" />`
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