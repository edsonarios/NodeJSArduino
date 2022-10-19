var sensorCOM = 'COM4'
const Serialport = require('serialport')
const Readline = Serialport.parsers.Readline
const port = new Serialport(sensorCOM, { baudRate: 9600 })
const parser = port.pipe(new Readline({
    delimeter: '\r\n'
}))

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

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
