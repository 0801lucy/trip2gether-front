import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  formulario: FormGroup;
  files: any;
  tripId: number;
  trip: any;

  constructor(private tripsService: TripsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.formulario = new FormGroup({
      destination: new FormControl('', [
        Validators.required
      ]),
      min_traveler: new FormControl('', [
        Validators.required
      ]),
      max_traveler: new FormControl('', [
        Validators.required
      ]),
      min_age: new FormControl('', [
        Validators.required
      ]),
      max_age: new FormControl('', [
        Validators.required
      ]),
      departure_date: new FormControl('', [
        Validators.required
      ]),
      duration: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      flights: new FormControl(false),
      hotel: new FormControl(false),
      meals: new FormControl(false),
      excursions: new FormControl(false),
      rent_car: new FormControl(false),
      insurance: new FormControl(false)
    })

    this.tripId = -1;
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.tripId = parseInt(params['tripId']);
      this.trip = await this.tripsService.getTripById(this.tripId);
      this.formulario.get('destination')?.setValue(this.trip.destination);
      this.formulario.get('min_traveler')?.setValue(this.trip.min_traveler);
      this.formulario.get('max_traveler')?.setValue(this.trip.max_traveler);
      this.formulario.get('min_age')?.setValue(this.trip.min_age);
      this.formulario.get('max_age')?.setValue(this.trip.max_age);
      this.formulario.get('departure_date')?.setValue(dayjs(this.trip.departure_date).format('YYYY-MM-DD'));
      this.formulario.get('duration')?.setValue(this.trip.duration);
      this.formulario.get('price')?.setValue(this.trip.price);
      this.formulario.get('description')?.setValue(this.trip.description);
      this.formulario.get('flights')?.setValue(this.trip.flights);
      this.formulario.get('hotel')?.setValue(this.trip.hotel);
      this.formulario.get('meals')?.setValue(this.trip.meals);
      this.formulario.get('excursions')?.setValue(this.trip.excursions);
      this.formulario.get('rent_car')?.setValue(this.trip.rent_car);
      this.formulario.get('insurance')?.setValue(this.trip.insurance);

    })

    Swal.fire({
      icon: 'success',
      title: '¡Registro completado!',
      text: 'Bienvenido a la comunidad de trip2gether',
      confirmButtonColor: '#2E8682',
    })



  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }

  onSubmit() {

  }


  onChange($event: any) {
    this.files = $event.target.files;
  }


}
