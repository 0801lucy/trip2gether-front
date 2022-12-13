import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/base/header/header.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { PrincipalComponent } from './components/base/principal/principal.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ListTripComponent } from './components/trips/list-trip/list-trip.component';
import { DetailTripComponent } from './components/trips/detail-trip/detail-trip.component';
import { FormTripComponent } from './components/trips/form-trip/form-trip.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    RegisterComponent,
    LoginComponent,
    ListTripComponent,
    DetailTripComponent,
    FormTripComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
