'use strict'

class Base {
	constructor() {
		this._data = {}
	}

	assign( key, fn ) {
		this._data[ key ] = fn
	}

	fetchData() {
		let listons = [],
			rtnData = this._data
		Object.keys( rtnData ).forEach(( key ) => {
			if ( typeof rtnData[ key ] === 'function' ) {
				let fetchHandle = new Promise(( resolve, reject ) => {
					rtnData[ key ]( resolve )
				}).then(( data ) => {
					rtnData[ key ] = data
				})
				listons.push( fetchHandle )
			}
		})

		return Promise.all( listons ).then(() => {
			return rtnData
		})
	}
}

module.exports = Base