'use strict'

/* global ROOT_PATH, DEBUG */

let APP_PATH = ROOT_PATH + '/app'

let virthPath = '/dist'

let staticConf = {
	root: APP_PATH + '/static',
	opt: {
		virthPath: virthPath,
		maxage: DEBUG ? 0 : 365 * 24 * 60 * 60
	}
}

let manifest = {}
try {
	manifest = require( `${staticConf.root}${virthPath}/manifest.json` )
} catch ( err ) { manifest = {} }

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
					let filepath = `${virthPath}/page/${file}`
					if ( !DEBUG ) {
						filepath = `${virthPath}/${manifest[ file ]}`
					}
					return `<script src="${filepath}"></script>`
				}
			},
			useCss( file ) {
				if ( !/\.css$/.test( file ) ) {
					file += '.css'
				}
				if ( !DEBUG ) {
					return `<link href="${virthPath}/${manifest[ file ]}" rel="stylesheet" type="text/css" />`
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