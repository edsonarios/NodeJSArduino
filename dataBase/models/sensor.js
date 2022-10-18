'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel(config) {
  const sequelize = setupDatabase(config)
  // Defines the attributes of the current model
  return sequelize.define('sensor', {
    humidity: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    temperature: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
  })
}
