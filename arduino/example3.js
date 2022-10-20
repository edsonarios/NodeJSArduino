const five = require('johnny-five')
const board = new five.Board({
    port: 'COM3'
})

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')
const { parsePayload } = require('../mqtt/utils')

client.subscribe('arduino')

board.on('ready', function () {
    client.on('message', (topic, payload) => {
        // mqtt pub -t 'arduino' -h localhost -m '{"pin":2,"action":0}'
        let mqttData = parsePayload(payload)
        console.log(mqttData)
        this.digitalWrite(mqttData.pin, mqttData.action)
    })
})
