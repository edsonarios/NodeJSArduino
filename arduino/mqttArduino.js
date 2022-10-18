var five = require('johnny-five')
var board = new five.Board({
    port: 'COM3'
})

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1:1883')
const { parsePayload } = require('../mqtt/utils')

client.subscribe('arduino')

board.on('ready', function () {
    client.on('message', (topic, payload) => {
        // mqtt pub -t 'arduino' -h localhost -m '{"pin":2,"action":0}'
        let data = parsePayload(payload)
        console.log(data)
        this.digitalWrite(data.pin, data.action)
    })
})
