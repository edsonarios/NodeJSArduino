import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbSidebarModule, NbLayoutModule, NbButtonModule, NbListModule, NbUserModule, NbCardModule, NbIconModule, NbToggleModule, } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

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
    // RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbListModule,
    NbUserModule,
    NbCardModule,
    NbIconModule,
    NbToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
