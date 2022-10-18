'use strict'
const debug = require('debug')('mod:api:db')

module.exports = {
    db: {
        database: 'arduino',
        username: 'arduino',
        password: 'arduino',
        host: 'localhost',
        dialect: 'postgres',
        logging: (s) => debug(s),
        setup: true
    },
    dbDatas: {
        database: 'arduino',
        username: 'arduino',
        password: 'arduino',
        host: 'localhost',
        dialect: 'postgres',
        logging: (s) => debug(s),
    }
}
