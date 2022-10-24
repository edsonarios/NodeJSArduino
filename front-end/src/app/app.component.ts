import { Component, Input } from '@angular/core'
import { Injectable } from '@angular/core'
import { Socket, SocketIoConfig } from 'ngx-socket-io'
import { SocketService } from './socket.service'
import { Subscription, take } from "rxjs"
import { SocketResponse, SocketLastValue } from "./model/socketSensorResponse"
import { Chart, registerables } from 'chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chart: Chart
  public charId: string
  config: SocketIoConfig = {
    url: 'http://localhost:1884',
    options: {},
  }
  private socketSubscription = new Subscription()
  title = 'NodeJs with Arduino'
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ]

  OnOff = false
  @Input() actuatorState: boolean = false
  @Input() actuatorControl: boolean = true

  control(state: boolean) {
    let value = state ? 1 : 0
    const socketResponse: SocketResponse = {
      type: 'arduino',
      pin: 2,
      action: value,
    }
    console.log("control", state)
    this.socketService.sendArduino(socketResponse)
    this.actuatorState = !this.actuatorState
  }

  constructor(private socketService: SocketService) {
    this.actuatorControl = false
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
      this.actuatorControl = socketActuator.action == 1 ? true : false
    }
  }

  updateGraphic(socketActuator: SocketResponse): void {
    if (socketActuator.type == 'sensor') {
      this.realTimeData(socketActuator.pin, socketActuator.action)
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
