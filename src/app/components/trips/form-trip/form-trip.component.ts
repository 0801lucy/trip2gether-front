/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css']
})
export class FormTripComponent implements OnInit {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  formulario: FormGroup;

  constructor() {

    this.formulario = new FormGroup({
      destination: new FormControl(),
      min_traveler: new FormControl(),
      max_traveler: new FormControl(),
      min_age: new FormControl(),
      max_age: new FormControl(),
      departure_date: new FormControl(),
      duration: new FormControl(),
      price: new FormControl(),
      description: new FormControl()

    })
  }

  ngOnInit(): void {
  }

  /*  ngAfterViewInit() {
     this.loadAutocomplete();
   } */

  onSubmit() {

  }

  /* loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement);
  }
 */
}
