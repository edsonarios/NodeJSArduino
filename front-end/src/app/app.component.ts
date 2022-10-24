import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { Subscription, take } from "rxjs";
import { SocketResponse, SocketLastValue } from "./model/socketSensorResponse";
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chart: Chart;
  public charId: string;
  private backgroundColor = 'rgba(75, 192, 192)';
  private labelX: string[];
  private labelY: Number[];
  config: SocketIoConfig = {
    url: 'http://localhost:1884',
    options: {},
  };
  private socketSubscription = new Subscription();
  title = 'NodeJs with Arduino';
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];

  OnOff = false;
  @Input() actuatorState: boolean = false;
  @Input() actuatorControl: boolean = true;

  control(state: boolean) {
    let value = state ? 1 : 0;
    const socketResponse: SocketResponse = {
      type: 'arduino',
      pin: 2,
      action: value,
    };
    console.log("control", state)
    this.socketService.sendArduino(socketResponse)
    this.actuatorState = !this.actuatorState
  }

  constructor(private socketService: SocketService) {
    this.actuatorControl = false
    this.chart = {} as Chart;
    Chart.register(...registerables);
    this.charId = 'graphic'
    this.labelX = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
    this.labelY = [1, 2, 3, 4, 11, 12]
  }
  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.connectToSocket();
  }
  ngAfterViewInit(): void {
    this.prepareChart();
  }
  prepareChart(): void {
    this.chart = new Chart('graphic', {
      type: 'line',
      data: {
        labels: this.labelX,
        datasets: [
          {
            label: 'sensor',
            fill: true,
            data: [20, 15, 18, 19, 20, 21, 28, 23, 24, 25],
            backgroundColor: this.backgroundColor,
            borderColor: 'rgb(75, 192, 192)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#46f',
            tension: 1
          }
        ]
      }
    });
  }
  
  connectToSocket(): void {
    this.socketSubscription = this.socketService
      .listen('arduino')
      .subscribe((socketItem: SocketResponse) => {
        this.updateButton(socketItem)
        this.updateGraphic(socketItem)
      });

  }


  updateButton(socketActuator: SocketResponse): void {
    if (socketActuator.type == 'arduino') {
      this.actuatorControl = socketActuator.action == 1 ? true : false
    }
  }

  updateGraphic(socketActuator: SocketResponse): void {
    if (socketActuator.type == 'sensor') {
      console.log('update graphic', socketActuator)
      console.log(socketActuator.pin);
      console.log(socketActuator.action);
      this.realTimeData(socketActuator.pin, socketActuator.action)
    }
  }

  private realTimeData(temperature: number, humidity: number) {
    if (this.chart.data.labels && this.chart.data.labels.length > 15) {
      this.chart.data.labels.shift();
      this.chart.data.datasets[0].data.shift();
    }
    if (this.chart.data.labels) {
      this.chart.data.labels.push(temperature);
    }
    this.chart.data.datasets[0].data.push(temperature);
    this.chart.update();
  }
}
