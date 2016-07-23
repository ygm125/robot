'use strict'

let defaultLevel = 'info',
	levels = [ 'info', 'debug', 'warn', 'error' ],
	log = ( level, msgs ) => {
		let args = [ `[${level.toUpperCase()}] ` ].concat( [].splice.call( msgs, 0 ) )
		console.log( args )
	},
	logger = {
		log() {
			log( defaultLevel, arguments )
		}
	}

levels.forEach(( level ) => {
	logger[ level ] = () => {
		log( level, arguments )
	}
})


let reflectAction = ( com ) => {
	com = com.split( '.' )
	let action = com.splice( com.length - 1, 1 )[ 0 ],
		modPath = Config.controller + '/' + com.join( '/' )

	return ( ctx, next ) => {
		let Mod = require( modPath ),
			modIns = new Mod()

		return modIns[ action ]( ctx, next )
	}
}


global.reflectAction = reflectAction
global.logger = logger