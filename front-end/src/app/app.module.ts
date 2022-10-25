import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbListModule, NbUserModule, NbCardModule, NbIconModule, NbToggleModule, } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { environment } from '../environments/environment.prod'
const config: SocketIoConfig = { url: `http://${environment.host}:1884`, options: {} }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbIconModule,
    NbToggleModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
