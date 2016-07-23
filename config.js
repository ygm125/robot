'use strict'

let APP_PATH = ROOT_PATH + '/app'

let staticConf = {
	root: APP_PATH + '/static',
	opt: {
		maxage: DEBUG ? 0 : 365 * 24 * 60 * 60
	}
}

let viewConf = {
	root: APP_PATH + '/www/view',
	opt: {}
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