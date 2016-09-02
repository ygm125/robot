'use strict'

const Koa = require( 'koa' )

class Robot extends Koa {
	constructor() {
		super()

		this.liftHook = {
			beforeAppLoad: [],
			appLoad: []
		}

		this.__init()
	}
	__init() {

		objEach( this.liftHook, ( key ) => {
			this[ key ] = ( hook ) => {
				this.liftHook[ key ].push( hook )
			}
		})

	}
	run() {

		objEach( this.liftHook, ( key, hooks ) => {
			hooks.forEach(( fn ) => {
				fn( this )
			})
		})

		this.listen( Config.port )

		Logger.log( `server start at http://127.0.0.1:${Config.port}` )

		// Node文件热更新
		if ( DEBUG ) {
			require( './hot-reload' ).watch()
		}
	}
}

module.exports = Robot