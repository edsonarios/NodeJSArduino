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
})
