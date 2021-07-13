import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ControlComponent } from './pages/control/control.component';
import { ControlesComponent } from './pages/controles/controles.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ControlService } from './services/control.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlComponent,
    ControlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
