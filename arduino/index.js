var five = require('johnny-five')
var board = new five.Board({
    port: 'COM3'
})

let sw = 0
board.on('ready', function () {
    var led = new five.Led(2)
    led.blink(2000)
    // var Pin8 = new five.Pin(8)
    
    
    // this.loop(2000, () => {
        // console.log("sw:", sw)
        
        
        // this.digitalWrite(8, sw)
        
        // Pin8.write(sw)//D18
        
        
        // if (sw == 0){
        //     sw = 1
        // }else {
        //     sw = 0
        // }
    // })


    //   var A0 = new five.Sensor('A0')
    //   A0.on('change', function () {
    //     // temp[i-1] = A0.value
    //     // finalCarrera(nroPin[i-1],temp[i-1],i-1)
    //   })




})
