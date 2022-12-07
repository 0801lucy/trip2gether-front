import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.css']
})
export class FormTripComponent implements OnInit {

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

  onSubmit() {

  }

}
