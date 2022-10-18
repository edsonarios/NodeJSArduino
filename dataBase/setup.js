'use strict'

const db = require('.')
const config = require('./config')

async function setup() {
    await db(config.db).catch(handleFatalError)
    console.log('Success!')
    process.exit(0)
}

function handleFatalError(err) {
    console.error(`${'[fatal error]'} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}
setup()
