'use strict'

module.exports = {
	port: 8080,
	keys: [ 'robot' ],
	favicon: '',

	db: {},

	static: {
		root: ROOT_PATH + '/static',
		opt: {
			publicPath: '/dist/',
			maxage: DEBUG ? 0 : 365 * 24 * 60 * 60
		}
	},
	view: {
		root: ROOT_PATH + '/www/view',
		opt: {
			autoescape: false,
			noCache: DEBUG ? true : false
		}
	},

	app: ROOT_PATH,
	model: ROOT_PATH + '/www/model',
	controller: ROOT_PATH + '/www/controller'
}