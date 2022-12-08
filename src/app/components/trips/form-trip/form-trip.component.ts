/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private tripsService: TripsService, private router: Router) {

    this.formulario = new FormGroup({
      destination: new FormControl(),
      min_traveler: new FormControl(),
      max_traveler: new FormControl(),
      min_age: new FormControl(),
      max_age: new FormControl(),
      departure_date: new FormControl(),
      duration: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
      included_1: new FormControl(),
      included_2: new FormControl(),
      included_3: new FormControl(),
      included_4: new FormControl(),
      included_5: new FormControl(),
      included_6: new FormControl()

    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadAutocomplete();
  }

  onSubmit() {
    this.tripsService.createTrip(this.formulario.value);
    this.router.navigate(['/trips']);

  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement);

  }

}
