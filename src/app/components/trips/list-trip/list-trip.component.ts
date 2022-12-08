import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css']
})
export class ListTripComponent implements OnInit {

  trips: Trip[];

  constructor(private tripsService: TripsService) {

    this.trips = [];

  }

  ngOnInit(): void {
    this.trips = this.tripsService.getAllTrips();
  }

}
