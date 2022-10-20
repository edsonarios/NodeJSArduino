const five = require('johnny-five')
const board = new five.Board({
    port: 'COM3'
})

board.on('ready', function () {
    const led = new five.Led(2)
    led.blink(2000)
})
