import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/base/header/header.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { PrincipalComponent } from './components/base/principal/principal.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


import { ListTripComponent } from './components/trips/list-trip/list-trip.component';
import { DetailTripComponent } from './components/trips/detail-trip/detail-trip.component';
import { FormTripComponent } from './components/trips/form-trip/form-trip.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';
import { AddHeaderInterceptor } from './interceptors/add-header.interceptor';
import { CommentsTripsComponent } from './components/trips/comments-trips/comments-trips.component';
import { MapsTripsComponent } from './components/trips/maps-trip/maps-trip.component';


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
    MyProfileComponent,
    CommentsTripsComponent,
    MapsTripsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMOcTcAkobrlfKIBOJNz6lDw2R5fJsk_Q'
    }),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
