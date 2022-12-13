import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.css']
})
export class DetailTripComponent implements OnInit {

  detail: Trip | undefined;
  includes: boolean;



  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {

    this.includes = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const numTrip = parseInt(params['tripId'])
      this.detail = this.tripsService.getTripById(numTrip);
      console.log(this.detail);
    })
  }

  viewSelected() {

  }

  createItinerary() {
    console.log(this.detail?.duration);
  }



}
