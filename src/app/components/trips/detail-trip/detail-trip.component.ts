import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/interfaces/trip.interface';
import { TripsService } from 'src/app/services/trips.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';


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
  subscribedUsers: any;
  userLoggedId: number;
  userCreatorId: number;
  userStatus: string;


  constructor(private activatedRoute: ActivatedRoute, private tripsService: TripsService, public sanitizer: DomSanitizer, private usersService: UsersService) {

    this.serverUrl = environment.serverUrl;
    this.showInputText = false;

    this.itinerary_form = new FormGroup({
      it_description: new FormControl(),
      it_date_begin: new FormControl(),
      it_date_end: new FormControl()
    })

    this.userLoggedId = 0
    this.userCreatorId = 0
    this.tripId = -1;
    this.userStatus = ''
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async params => {
      this.tripId = parseInt(params['tripId'])

      this.detail = await this.tripsService.getTripById(this.tripId);
      this.detail.lat = parseFloat(String(this.detail.lat));
      this.detail.lng = parseFloat(String(this.detail.lng));

      this.itinerary = await this.tripsService.getItineraryByTripId(this.tripId)
      this.subscribedUsers = await this.tripsService.getSubscribedByTrip(this.tripId)
      console.log(this.subscribedUsers);

      this.userCreatorId = this.detail.user_id

      const userData = this.usersService.getUserData()
      this.userLoggedId = userData.user_id

      const userStatus = await this.tripsService.getUserSubscribed()
      console.log(userStatus)
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

  onProfile() {

  }

  async changeStatus(aceptada: boolean) {
    let status = 'rechazada';
    if (aceptada) {
      status = 'aceptada';
    }
    const userData = this.usersService.getUserData()
    console.log(userData)

    const response = await this.tripsService.manageUsers(this.tripId, userData.user_id, status)
    console.log(response);

  }

}
