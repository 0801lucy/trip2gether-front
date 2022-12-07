import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTripComponent } from './components/trips/detail-trip/detail-trip.component';
import { FormTripComponent } from './components/trips/form-trip/form-trip.component';
import { ListTripComponent } from './components/trips/list-trip/list-trip.component';

const routes: Routes = [
  { path: 'trips', component: ListTripComponent },
  { path: 'trips/new', component: FormTripComponent },
  { path: 'trips/:tripId', component: DetailTripComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
