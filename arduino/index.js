const five = require('johnny-five')
const board = new five.Board({
    port: 'COM3'
})

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')
const { parsePayload } = require('../mqtt/utils')

const Serialport = require('serialport')
const Readline = Serialport.parsers.Readline
const port = new Serialport('COM4', { baudRate: 9600 })
const parser = port.pipe(new Readline({
    delimeter: '\r\n'
}))

parser.on('open ', function () {
    console.log('coneccion is opend')
})
port.on('error', function (err) {
    console.log(err)
})


parser.on('data', function (data) {
    console.log(data)
    let datas = data.replace('\r', '').split(' ')
    let mqttData = `{
        "humidity": ${datas[0].substring(0, (datas[0].length) - 1)},
        "temperature": ${datas[1].substring(0, (datas[1].length) - 1)}
    }`
    client.publish('sensor', mqttData)
})

client.subscribe('arduino')

board.on('ready', function () {
    client.on('message', (topic, payload) => {
        // mqtt pub -t 'arduino' -h localhost -m '{"pin":2,"action":0}'
        let mqttData = parsePayload(payload)
        console.log(mqttData)
        this.digitalWrite(mqttData.pin, mqttData.action)
    })
})
