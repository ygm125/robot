'use strict'

const Koa = require( 'koa' )

class Robot extends Koa {
	constructor() {
		super()
		this.liftHook = {
			preAppInit: [],
			appInit: [],
			preAppLoad: [],
			appLoad: []
		}
		this.init()
	}
	init() {
		Object.keys( this.liftHook ).forEach(( key ) => {
			this[ key ] = ( hook ) => {
				this.liftHook[ key ].push( hook )
			}
		})
	}
	run() {

		Object.keys( this.liftHook ).forEach(( key ) => {
			this.liftHook[ key ].forEach(( fn ) => {
				fn.call( this )
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