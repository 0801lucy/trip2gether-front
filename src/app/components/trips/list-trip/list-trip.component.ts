import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css']
})
export class ListTripComponent implements OnInit {

  trips: Trip[];
  formulario: FormGroup;
  destinations: string[];

  constructor(private tripsService: TripsService, private router: Router) {

    this.trips = [];

    this.formulario = new FormGroup({
      destination: new FormControl(),
      date: new FormControl()
    })

    this.destinations = [];

  }

  ngOnInit(): void {
    this.trips = this.tripsService.getAllTrips();
    this.destinations = this.tripsService.getDestinations();
  }

  onSubmit() {

  }

  onClick() {
    this.router.navigate(['/trips/new']);
  }

}
