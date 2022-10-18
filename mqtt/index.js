'use strict';

const mosca = require('mosca')
const portServer = 1883
const server = new mosca.Server({
	port: portServer
})
const { parsePayload } = require('./utils')
const db = require('data-base')
const config = require('../dataBase/config')
let Sensor

server.on('ready', async () => {
	const services = await db(config.dbDatas)
	Sensor = services.Sensor
	console.log(`Server ready in port: ${portServer}`)
})

server.on('published', async (packet, client) => {
	let data = parsePayload(packet.payload)
	console.log(packet.topic)
	console.log(data)
	// mqtt pub -t 'sensor' -h localhost -m '{"humidity":43.40,"temperature":17.00}'
	if (data != null && packet.topic == 'sensor') {
		console.log("sensor -------------")
		console.log(data.humidity)
		console.log(data.temperature)
		try {
			console.log("finda")
			let obj = await Sensor.findAll()
			console.log(obj)

			await Sensor.create({
				"humidity": data.humidity,
				"temperature": data.temperature
			})
			console.log("Sensor saved", data.humidity, data.temperature)
		} catch {
			console.log('Failed sensor saved')
		}
	}
})
