var five = require('johnny-five')
var board = new five.Board()

board.on('ready', function () {
    var led = new five.Led(13)
    led.blink(500)



    //   var A0 = new five.Sensor('A0')
    //   A0.on('change', function () {
    //     // temp[i-1] = A0.value
    //     // finalCarrera(nroPin[i-1],temp[i-1],i-1)
    //   })



    //   var D4 = new five.Pin(2)
    //   // D4.write(payload.actuador.value);//D18


    //   var sensor = require('node-dht-sensor');

    //   sensor.read(22, 17, function(err, temperature, humidity) {
    //       if (!err) {
    //           console.log('temp: ' + temperature.toFixed(1) + '°C, ' +'humidity: ' + humidity.toFixed(1) + '%');
    //           temp[57] = temperature.toFixed(1);
    //           temp[56] = humidity.toFixed(1);
    //       }
    //   });

    // this.digitalWrite(13, 0);
})
