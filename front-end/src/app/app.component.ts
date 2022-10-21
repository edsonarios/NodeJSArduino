import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'NodeJs with Arduino';
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'Bob Kelso', title: 'Doctor of Medicine' },
    { name: 'Janitor', title: 'Janitor' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
  OnOff = false;
  control() {
    this.OnOff = !this.OnOff
    console.log("aqui1", this.OnOff)
  }
  control2() {
    this.OnOff = !this.OnOff
    console.log("aqui2", this.OnOff)
  }

}
