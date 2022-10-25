import { Component, Input } from '@angular/core'
import { SocketService } from './socket.service'
import { Subscription } from "rxjs"
import { SocketResponse } from "./model/socketSensorResponse"
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public chart: Chart
  public charId: string
  private socketSubscription = new Subscription()
  title = 'NodeJs with Arduino'
  users: { name: string, title: string, picture: string }[] = [
    { name: 'Arduino', title: '', picture: '../assets/arduino-logo.jpg' },
    { name: 'Johnny-Five', title: '', picture: '../assets/jf.jpg' },
    { name: 'Serial Port', title: '', picture: '../assets/serial.jpg' },
    { name: 'MQTT', title: 'MQ Telemetry Transport', picture: '../assets/mqtt-logo.svg' },
    { name: 'Postgres', title: 'Data Base', picture: '../assets/post.jpg' },
    { name: 'WebSockets', title: 'socket.io', picture: '../assets/socket.jpg' },
    { name: 'Angular', title: 'Angular.js or AngularJS', picture: '../assets/angular.jpg' },
    { name: 'AWS', title: 'Amazon Web Services', picture: '../assets/aws.jpg' },
  ]

  @Input() actuatorState: boolean = false

  control(event: boolean) {
    let value = event ? 1 : 0
    const socketResponse: SocketResponse = {
      type: 'arduino',
      data1: 2,
      data2: value,
    }
    this.socketService.sendArduino(socketResponse)
    this.actuatorState = event
  }

  constructor(private socketService: SocketService) {
    this.chart = {} as Chart
    Chart.register(...registerables)
    this.charId = 'graphic'
  }
  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe()
  }
  ngOnInit(): void {
    this.connectToSocket()
  }
  ngAfterViewInit(): void {
    this.prepareChart()
  }

  prepareChart(): void {
    let humidity = {
      label: "Humidity",
      data: [0, 59, 75, 20, 20, 55, 40],
      lineTension: 0,
      fill: false,
      borderColor: '#38a700'
    }

    let temperature = {
      label: "Temperature",
      data: [20, 15, 60, 60, 65, 30, 70],
      lineTension: 0,
      fill: false,
      borderColor: '#31d843'
    }

    let data = {
      labels: ["date", "date", "date", "date", "date", "date", "date"],
      datasets: [humidity, temperature]
    }

    this.chart = new Chart('graphic', {
      type: 'line',
      data: data,
    })
  }

  connectToSocket(): void {
    this.socketSubscription = this.socketService
      .listen('arduino')
      .subscribe((socketItem: SocketResponse) => {
        this.updateButton(socketItem)
        this.updateGraphic(socketItem)
      })

  }

  updateButton(socketActuator: SocketResponse): void {
    if (socketActuator.type == 'arduino') {
      this.actuatorState = socketActuator.data2 == 1 ? true : false
    }
  }

  updateGraphic(socketActuator: SocketResponse): void {
    if (socketActuator.type == 'sensor') {
      this.realTimeData(socketActuator.data1, socketActuator.data2)
    }
  }

  private realTimeData(temperature: number, humidity: number) {
    const now = new Date()
    const current = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

    if (this.chart.data.labels && this.chart.data.labels.length > 15) {
      this.chart.data.labels.shift()
      this.chart.data.datasets[0].data.shift()
      this.chart.data.datasets[1].data.shift()
    }
    if (this.chart.data.labels) {
      this.chart.data.labels.push(current)
    }
    this.chart.data.datasets[0].data.push(temperature)
    this.chart.data.datasets[1].data.push(humidity)
    this.chart.update()
  }
}
