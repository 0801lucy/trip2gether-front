import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTripComponent } from './components/trips/list-trip/list-trip.component';
import { DetailTripComponent } from './components/trips/detail-trip/detail-trip.component';
import { FormTripComponent } from './components/trips/form-trip/form-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTripComponent,
    DetailTripComponent,
    FormTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
