import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-maps-trip',
  templateUrl: './maps-trip.component.html',
  styleUrls: ['./maps-trip.component.css']
})
export class MapsTripsComponent implements OnInit {

  // lat: number;
  // lng: number;
  zoom: number;
  // mapType: string;
  // tripId: number;
  // geometry: any;

  @Input() latitude!: number;
  @Input() longitude!: number;


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {
    // this.lat = 40;
    // this.lng = -3;
    this.zoom = 8;
    // this.mapType = '';
    // this.tripId = -1;
    // this.geometry = 0;
  }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(async params => {
    //   this.tripId = parseInt(params['tripId'])
    //   const geometry = await this.tripsService.getGeometry(this.tripId);
    //   console.log(geometry);
    // })

  }
}



