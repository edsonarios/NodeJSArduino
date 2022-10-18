'use strict'

const Sequelize = require('sequelize')
let sequelize = null
// Export the entire database
module.exports = function setupDatabase(config) {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    return sequelize
}
