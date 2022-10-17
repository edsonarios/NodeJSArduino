var sensorCOM = 'COM4'
const Serialport = require('serialport')
const Readline = Serialport.parsers.Readline
const port = new Serialport(sensorCOM, { baudRate: 9600 })
const parser = port.pipe(new Readline({
    delimeter: '\r\n'
}))
parser.on('open ', function () {
    console.log('coneccion is opend')
})
parser.on('data', function (data) {
    let datas = data.replace('\r', '').split(' ')
    console.log(datas)
})
port.on('error', function (err) {
    console.log(err)
})
