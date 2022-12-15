import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css']
})
export class ListTripComponent implements OnInit {

  trips: Trip[];
  formulario: FormGroup;
  destinations: string[];
  detailTrip: Trip | undefined;
  serverUrl: string;


  constructor(private tripsService: TripsService, private router: Router) {

    this.trips = [];

    this.formulario = new FormGroup({
      destination: new FormControl('all')
    })

    this.destinations = [];
    this.serverUrl = environment.serverUrl;


  }

  async ngOnInit() {
    this.trips = await this.tripsService.getAllTrips();
    //this.destinations = await this.tripsService.getDestinations();
    console.log(this.trips);
  }


  newTrip() {
    this.router.navigate(['/trips/new']);
  }

  async selectDestination($event: any) {
    if ($event.target.value === 'all') {
      this.trips = await this.tripsService.getAllTrips();
    } else {
      //this.trips = this.tripsService.filterByDestination($event.target.value);
    }
  }






}
