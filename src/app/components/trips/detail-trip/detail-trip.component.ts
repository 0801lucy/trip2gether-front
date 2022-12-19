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
  itinerary: any;
  itinerary_form: FormGroup;
  showInputText: boolean;
  tripId: number;



  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer) {
    this.serverUrl = environment.serverUrl;
    this.showInputText = false;
    this.itinerary_form = new FormGroup({
      it_description: new FormControl(),
      it_date_begin: new FormControl(),
      it_date_end: new FormControl()
    })

    this.tripId = -1;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.tripId = parseInt(params['tripId'])
      this.detail = await this.tripsService.getTripById(this.tripId);
      this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId)
    })
  }

  async onClick() {
    //pintar input text un botón 'añadir'
    this.showInputText = !this.showInputText;
  }

  async addDayToItinerary() {
    //al pulsar añadir: Y resetea
    const itinerary = await this.tripsService.createItinerary(
      this.itinerary_form.value.it_description,
      this.itinerary_form.value.it_date_begin,
      this.itinerary_form.value.it_date_end,
      this.tripId);
    this.itinerary_form.reset();
    console.log(itinerary);
  }


  async onSubscribe() {
    const response = await this.tripsService.subscribeToTrip(this.tripId);
    console.log(response);
  }


}
