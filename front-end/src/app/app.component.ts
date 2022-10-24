import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { Subscription, take } from "rxjs";
import { SocketResponse, SocketLastValue } from "./model/socketSensorResponse";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
  }
  ngOnDestroy(): void {
    this.socketSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.connectToSocket();
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
    if (socketActuator.type == 'arduino'){
      this.actuatorControl = socketActuator.action == 1 ? true : false
    }
    // this.actuatorList.forEach(actuator => {
    //     if (actuator.id === socketActuator.id) {
    //         actuator.state = Boolean(socketActuator.value);
    //     }
    // });

  }
  updateGraphic(socketActuator: SocketResponse): void {
    console.log(socketActuator)

  }
}
