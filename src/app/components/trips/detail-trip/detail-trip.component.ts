import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.css']
})
export class DetailTripComponent implements OnInit {

  detail!: Trip;
  serverUrl: string;
  itinerary: string[];
  itinerary_form: FormGroup;
  showInputText: boolean;



  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer) {
    this.serverUrl = environment.serverUrl;
    this.itinerary = [];
    this.showInputText = false;
    this.itinerary_form = new FormGroup({
      it_description: new FormControl(),
      it_date_begin: new FormControl(),
      it_date_end: new FormControl()
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      const tripId = parseInt(params['tripId'])
      this.detail = await this.tripsService.getTripById(tripId);
      console.log(this.detail)
    })
  }

  async onClick() {
    //pintar input text un botón 'añadir'
    this.showInputText = !this.showInputText;
  }

  async addDayToItinerary() {
    //al pulsar añadir: Y resetea
    this.activatedRoute.params.subscribe(async params => {
      const tripId = parseInt(params['tripId'])
      this.detail = await this.tripsService.getTripById(tripId);
      console.log(tripId);
      const itinerary = await this.tripsService.createItinerary(this.itinerary_form.value, tripId);
      console.log(itinerary);
    })

  }







}
