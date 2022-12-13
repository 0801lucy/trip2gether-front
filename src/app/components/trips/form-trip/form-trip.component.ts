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
      flights: new FormControl(),
      hotel: new FormControl(),
      meals: new FormControl(),
      excursions: new FormControl(),
      rent_car: new FormControl(),
      insurance: new FormControl()

    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadAutocomplete();
  }

  onChange($event: any) {
    this.files = $event.target.files;
  }

  async onSubmit() {
    let fd = new FormData();
    fd.append('img_trip', this.files[0]);

    this.tripsService.createTrip(fd);
    this.router.navigate(['/trips']);

  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', (event) => {
      const place = autocomplete.getPlace();
      console.log(place);
      this.formulario.get('destination')?.setValue(place.name);
    });
  }

  checkError(field: string, error: string): boolean | undefined {
    return this.formulario.get(field)?.hasError(error) && this.formulario.get(field)?.touched
  }



}