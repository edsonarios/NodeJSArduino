'use strict';

const mosca = require('mosca')
const portServer = 1883
const server = new mosca.Server({
	port: portServer
})

// const { parsePayload } = require('../utils/utils')

server.on('ready', async () => {
	console.log(`Server ready in port: ${portServer}`)
})

server.on('published', async (packet, client) => {
	console.log(packet.payload)
    // if (packet.topic == 'monitoring') {
	// 	let data = parsePayload(packet.payload)
	// 	console.log(data)
	// 	if (data != null) {
	// 		switch (data.category) {
	// 			case 'sensor':
	// 				try {
	// 					await Sensor.create(data.id, {
	// 						"value": data.value
	// 					})
	// 					console.log("Sensor saved", data.id, data.value)
	// 				} catch {
	// 					console.log(chalk.red('Failed sensor saved'))
	// 				}
	// 				break
	// 			case 'actuator':
	// 				try {
	// 					await Device.update(data.id, {
	// 						"state": data.value
	// 					})
	// 					console.log("Actuator updated", data.id, data.value)
	// 				} catch {
	// 					console.log(chalk.red('Failed actuator updated'))
	// 				}
	// 				break
	// 		}
	// 	}
	// }
})
