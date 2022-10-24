'use strict';

const mosca = require('mosca')
const portServer = 1883
const server = new mosca.Server({
	port: portServer
})
const { parsePayload } = require('./utils')
// const db = require('data-base')
// const config = require('../dataBase/config')
let Sensor

server.on('ready', async () => {
	// const services = await db(config.dbDatas)
	// Sensor = services.Sensor
	console.log(`Server ready in port: ${portServer}`)
})

server.on('clientConnected', async client => {
	console.log('Client connected:', client.id)
})

server.on('clientDisconnected', async client => {
	console.log('Disconnect client:', client.id)
})

server.on('published', async (packet, client) => {
	let data = parsePayload(packet.payload)

	// print datas
	if (data != null) {
		console.log('\n', data)
	}

	// mqtt pub -t 'sensor' -h localhost -m '{"humidity":43.40,"temperature":17.00}'
	// if (data != null && packet.topic == 'arduino' && data.type == 'sensor') {
	// 	try {
	// 		await Sensor.create({
	// 			"humidity": data.humidity,
	// 			"temperature": data.temperature
	// 		})
	// 		console.log("\tSensor saved", data.humidity, data.temperature)
	// 	} catch {
	// 		console.log('Failed sensor saved')
	// 	}
	// }
})
