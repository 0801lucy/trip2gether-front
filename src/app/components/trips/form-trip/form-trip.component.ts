/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css']
})
export class FormTripComponent implements OnInit {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  formulario: FormGroup;

  files: any;

  constructor(private tripsService: TripsService, private router: Router) {

    this.formulario = new FormGroup({
      destination: new FormControl('Polonia', [
        Validators.required
      ]),
      min_traveler: new FormControl('10', [
        Validators.required
      ]),
      max_traveler: new FormControl('20', [
        Validators.required
      ]),
      min_age: new FormControl('25', [
        Validators.required
      ]),
      max_age: new FormControl('35', [
        Validators.required
      ]),
      departure_date: new FormControl('2023-05-10', [
        Validators.required
      ]),
      duration: new FormControl('10', [
        Validators.required
      ]),
      price: new FormControl('1500', [
        Validators.required
      ]),
      description: new FormControl('prueba', [
        Validators.required
      ]),
      flights: new FormControl(false),
      hotel: new FormControl(false),
      meals: new FormControl(false),
      excursions: new FormControl(false),
      rent_car: new FormControl(false),
      insurance: new FormControl(false),
      lat: new FormControl(),
      lng: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadAutocomplete();
  }

  async onSubmit() {
    // Creación del objeto donde incluimos todos los campos del formulario y además la imagen
    let fd = new FormData();
    fd.append('img_trip', this.files[0]);
    fd.append('destination', this.formulario.value.destination);
    fd.append('min_traveler', this.formulario.value.min_traveler);
    fd.append('max_traveler', this.formulario.value.max_traveler);
    fd.append('min_age', this.formulario.value.min_age);
    fd.append('max_age', this.formulario.value.max_age);
    fd.append('departure_date', this.formulario.value.departure_date);
    fd.append('duration', this.formulario.value.duration);
    fd.append('price', this.formulario.value.price);
    fd.append('description', this.formulario.value.description);
    fd.append('flights', this.formulario.value.flights);
    fd.append('hotel', this.formulario.value.hotel);
    fd.append('meals', this.formulario.value.meals);
    fd.append('excursions', this.formulario.value.excursions);
    fd.append('rent_car', this.formulario.value.rent_car);
    fd.append('insurance', this.formulario.value.insurance);
    fd.append('lat', this.formulario.value.lat);
    fd.append('lng', this.formulario.value.lng)

    console.log(this.formulario.value);


    // Delegamos el envío del formulario en el servicio
    await this.tripsService.createTrip(fd);
    this.router.navigate(['/trips']);
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.formulario.get('destination')?.setValue(place.name);
      console.log(place);

      this.formulario.get('lat')?.setValue(place.geometry?.location.lat());
      this.formulario.get('lng')?.setValue(place.geometry?.location.lng());
      console.log(place.geometry?.location.lat());
      console.log(place.geometry?.location.lng());
    });
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }

}