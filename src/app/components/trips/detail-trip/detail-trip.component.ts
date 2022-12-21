/// <reference path="../../../../../node_modules/@types/googlemaps/index.d.ts" />

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

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
  numberOfRequests: number;
  acceptedUsers: [];



  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer, private usersService: UsersService, private router: Router) {

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
    this.userCreatorName = '';
    this.imageUserCreator = '';
    this.numberOfRequests = 0;
    this.acceptedUsers = [];



  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async params => {
      this.tripId = parseInt(params['tripId'])

      this.detail = await this.tripsService.getTripById(this.tripId);

      this.detail.lat = parseFloat(String(this.detail.lat));
      this.detail.lng = parseFloat(String(this.detail.lng));

      this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId);
      this.subscribedUsers = await this.tripsService.getOnlyPendingByTrip(this.tripId);
      this.AcceptedUsers = await this.tripsService.getUsersAccepted(this.tripId);

      console.log(this.AcceptedUsers);
      console.log(this.subscribedUsers);



      this.userCreatorId = this.detail.user_id;
      const userData = this.usersService.getUserData();
      this.userLoggedId = userData.user_id;
      const userStatus = await this.tripsService.getUserSubscribed();

      this.userCreatorName = this.detail.username;
      this.imageUserCreator = this.detail.img_user;

      this.numberOfRequests = this.subscribedUsers.length;
    });

  }

  async onClick() {
    this.showInputText = !this.showInputText;
    setTimeout(() => this.loadAutocomplete(), 500);
  }

  async addDayToItinerary() {
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
    this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId);
  }

  async onSubscribe() {
    const response = await this.tripsService.subscribeToTrip(this.tripId);
    Swal.fire({
      icon: 'success',
      title: '¡Te has apuntado al viaje!',
      text: 'Espera la confirmación del organizador',
      confirmButtonColor: '#2E8682',
    })
    this.subscribedUsers = await this.tripsService.getOnlyPendingByTrip(this.tripId);
    this.AcceptedUsers = await this.tripsService.getUsersAccepted(this.tripId);
  }


  async changeStatus(aceptada: boolean, user: User) {

    let status = 'rechazada';
    if (aceptada) {
      status = 'aceptada';
    }
    const response = await this.tripsService.manageUsers(this.tripId, user.id, status);
    this.subscribedUsers = await this.tripsService.getOnlyPendingByTrip(this.tripId);
    this.AcceptedUsers = await this.tripsService.getUsersAccepted(this.tripId);

    // console.log(this.subscribedUsers, this.acceptedUsers);

  }

  loadAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('inputPlaces') as HTMLInputElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.itinerary_form.get('destination')?.setValue(place.name);
      this.itinerary_form.get('it_lat')?.setValue(place.geometry?.location.lat());
      this.itinerary_form.get('it_lng')?.setValue(place.geometry?.location.lng());
    });
  }

  onDelete() {
    Swal.fire({
      icon: 'warning',
      title: 'Vas a eliminar este viaje',
      text: '¿Estás seguro?',
      confirmButtonColor: '#2E8682',
      showCancelButton: true,
      cancelButtonColor: '#d33', confirmButtonText: 'Sí, lo estoy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.tripsService.deleteTripById(this.tripId);
        await Swal.fire(
          'Borrado',
          'Tu viaje ha sido borrado 😟',
          'success'
        );
        this.router.navigate(['/trips']);
      }
    })
  }

  userLoggedIsSubscribed() {
    return this.subscribedUsers.find((user: User) => user.id === this.userLoggedId);

  }

}
