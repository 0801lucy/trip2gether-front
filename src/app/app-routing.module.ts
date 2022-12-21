import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { DetailTripComponent } from './components/trips/detail-trip/detail-trip.component';
import { FormTripComponent } from './components/trips/form-trip/form-trip.component';
import { ListTripComponent } from './components/trips/list-trip/list-trip.component';
import { PrincipalComponent } from './components/base/principal/principal.component';
import { MyProfileComponent } from './components/users/my-profile/my-profile.component';
import { CommentsTripsComponent } from './components/trips/comments-trips/comments-trips.component';
import { LoginGuard } from './guards/login.guard';
import { EditTripComponent } from './components/trips/edit-trip/edit-trip.component';
import { MapsTripsComponent } from './components/trips/maps-trip/maps-trip.component';



const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: ListTripComponent },
  { path: 'trips/new', component: FormTripComponent },
  { path: 'trips/edit/:tripId', component: EditTripComponent },
  { path: 'trips/:tripId', component: DetailTripComponent },
  { path: 'myprofile', component: MyProfileComponent }


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
