'use strict'

const setupDatabase = require('./lib/db')

const setupSensor = require('./lib/sensor')

const setupSensorModel = require('./models/sensor')

module.exports = async function (config) {
    // Call models
    const sequelize = setupDatabase(config)

    const SensorModel = setupSensorModel(config)

    // login with base de datos
    await sequelize.authenticate()

    // Initialize or Reinitialize the DB, destroy the current DB
    if (config.setup) {
        await sequelize.sync({ force: true })
    }

    // Export models
    const Sensor = setupSensor(SensorModel)

    return {
        Sensor,
    }
}
