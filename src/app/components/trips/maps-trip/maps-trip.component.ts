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


  zoom: number;


  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() itinerary: any


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService) {
    this.zoom = 8;

  };


  ngOnInit() {


  }
}



