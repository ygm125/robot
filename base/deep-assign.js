'use strict'

let hasOwnProperty = Object.prototype.hasOwnProperty

function assignKey( to, from, key ) {
    let val = from[ key ]

    if ( val === undefined || val === null ) {
        return
    }

    if ( !hasOwnProperty.call( to, key ) || !isObject( val ) ) {
        to[ key ] = val
    } else {
        to[ key ] = assign( Object( to[ key ] ), from[ key ] )
    } 
}

function assign( to, from ) {
    if ( to === from ) {
        return to
    }

    from = Object( from )
    
    for ( let key in from ) {
        if ( hasOwnProperty.call( from, key ) ) {
            assignKey( to, from, key )
        }
    }

    return to
}

module.exports = function deepAssign( target ) {
    for ( let s = 1, len = arguments.length; s < len; s++ ) {
        assign( target, arguments[ s ] )
    }

    return target
}