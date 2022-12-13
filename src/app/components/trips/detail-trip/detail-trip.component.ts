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

  detail!: Trip;


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const tripId = parseInt(params['tripId'])
      this.detail = await this.tripsService.getTripById(tripId);
      console.log(this.detail);
    })
  }

  createItinerary() {
    console.log(this.detail?.duration);
  }



}
