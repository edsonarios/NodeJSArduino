'use strict'

const setupDatabase = require('./lib/db')

const setupArduino = require('./lib/sensor')

const setupArduinoModel = require('./models/sensor')

module.exports = async function (config) {
    // Call models
    const sequelize = setupDatabase(config)

    const ArduinoModel = setupArduinoModel(config)

    // login with base de datos
    await sequelize.authenticate()

    // Initialize or Reinitialize the DB, destroy the current DB
    if (config.setup) {
        await sequelize.sync({ force: true })
    }

    // Export models
    const Arduino = setupArduino(ArduinoModel)

    return {
        Arduino,
    }
}
