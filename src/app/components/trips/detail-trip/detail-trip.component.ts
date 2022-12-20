/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';


@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.css']
})
export class DetailTripComponent implements OnInit {

  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  detail!: Trip;
  serverUrl: string;
  itinerary: any;
  itinerary_form: FormGroup;
  showInputText: boolean;
  tripId: number;
  subscribedUsers: any;
  userLoggedId: number;
  userCreatorId: number;
  userStatus: string;
  userId: number;
  AcceptedUsers: any;
  userCreatorName: string;
  imageUserCreator: string;


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer, private usersService: UsersService) {

    this.serverUrl = environment.serverUrl;
    this.showInputText = false;

    this.itinerary_form = new FormGroup({
      it_description: new FormControl(),
      it_date_begin: new FormControl(),
      it_date_end: new FormControl(),
      it_place: new FormControl(),
      it_lat: new FormControl(),
      it_lng: new FormControl()
    })

    this.userLoggedId = 0;
    this.userCreatorId = 0;
    this.tripId = -1;
    this.userStatus = '';
    this.userId = -1;
    this.userCreatorName = ''
    this.imageUserCreator = ''

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      this.tripId = parseInt(params['tripId'])

      this.detail = await this.tripsService.getTripById(this.tripId);
      this.detail.lat = parseFloat(String(this.detail.lat));
      this.detail.lng = parseFloat(String(this.detail.lng));

      this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId)
      this.subscribedUsers = await this.tripsService.getSubscribedByTrip(this.tripId)

      this.userCreatorId = this.detail.user_id
      const userData = this.usersService.getUserData()
      this.userLoggedId = userData.user_id
      const userStatus = await this.tripsService.getUserSubscribed()

      this.AcceptedUsers = await this.tripsService.getUsersAccepted(this.tripId)
      console.log(this.AcceptedUsers)

      this.userCreatorName = this.detail.username
      this.imageUserCreator = this.detail.img_user

    })

  }

  async onClick() {
    //pintar input text un botón 'añadir'
    this.showInputText = !this.showInputText;
    setTimeout(() => this.loadAutocomplete(), 500);
  }

  async addDayToItinerary() {
    //al pulsar añadir: Y resetea
    console.log(this.itinerary_form.value);

    this.itinerary_form.value.it_place = (document.getElementById('inputPlaces')! as HTMLInputElement).value;

    const itinerary = await this.tripsService.createItinerary(
      this.itinerary_form.value.it_description,
      this.itinerary_form.value.it_date_begin,
      this.itinerary_form.value.it_date_end,
      this.tripId,
      this.itinerary_form.value.it_lat,
      this.itinerary_form.value.it_lng,
      this.itinerary_form.value.it_place
    );

    this.itinerary_form.reset();
    this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId)
  }


  async onSubscribe() {
    const response = await this.tripsService.subscribeToTrip(this.tripId);
    console.log(response);
  }


  async changeStatus(aceptada: boolean, user: User) {
    let status = 'rechazada';
    if (aceptada) {
      status = 'aceptada';
    }


    const response = await this.tripsService.manageUsers(this.tripId, user.id, status)
    console.log(response);

  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('inputPlaces') as HTMLInputElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.itinerary_form.get('destination')?.setValue(place.name);
      console.log(place);

      this.itinerary_form.get('it_lat')?.setValue(place.geometry?.location.lat());
      this.itinerary_form.get('it_lng')?.setValue(place.geometry?.location.lng());
      console.log(place.geometry?.location.lat());
      console.log(place.geometry?.location.lng());
    });
  }

}
