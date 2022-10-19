'use strict'
// Define the functions that the model can use (sql queries)
module.exports = function setupAgent(SensorModel) {
  async function create(obj) {
    const result = await SensorModel.create(obj)
    return result.toJSON()
  }

  async function findAll() {
    return SensorModel.findAll({
      order: [['id', 'ASC']]
    })
  }

  return {
    create,
    findAll,
  }
}
