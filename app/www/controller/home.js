'use strict'

const Base = require( './base' )

class Home extends Base {
	index( ctx ) {
		this.assign( 'hello', ( done ) => {
			setTimeout(() => {
				done( 'hello robot1!' )
			}, 100 )
		})

		return this.fetchData().then(( data ) => {
			ctx.render( 'home/index', data )
		})
	}
}

module.exports = Home