import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trip } from '../interfaces/trip.interface';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private baseUrl: string;


  constructor(private httpClient: HttpClient) {

    this.baseUrl = `${environment.apiUrl}/trips`;

  }

  // FUNCIONA
  getAllTrips(): Promise<Trip[]> {
    return firstValueFrom(
      this.httpClient.get<Trip[]>(this.baseUrl)
    )
  }

  // FUNCIONA
  getDestinations() {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/destination`)
    )
  }

  filterByDestination(destination: string) {
    return firstValueFrom(
      this.httpClient.get<any>(`${this.baseUrl}/destination/${destination}`)
    )
  }


  //FUNCIONA
  createTrip(pTrip: FormData) {
    return firstValueFrom(
      this.httpClient.post<Trip>(`${this.baseUrl}`, pTrip)
    );
  }

  //FUNCIONA
  getTripById(tripId: number) {
    return firstValueFrom(
      this.httpClient.get<Trip>(`${this.baseUrl}/${tripId}`)
    );

  }

  createItinerary(description: string, dateStart: Date, dateEnd: Date, tripId: number) {
    const pipes = new DatePipe('en-US');
    const dateFormat = 'yyyy-MM-dd';
    const params = { it_description: description, it_date_begin: pipes.transform(dateStart, dateFormat), it_date_end: pipes.transform(dateEnd, dateFormat), trip_id: tripId }
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/itinerary`, params)
    );
  }


  createComment(message: string, trip_id: number) {
    const body = { message, trip_id }
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/comment/new`, body)
    )
  }


  getTripsByUser() {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/user/created`)

    )

  }
  getUserSubscribed() {
    return firstValueFrom(
      this.httpClient.get(`${this.baseUrl}/user/suscribed`)

    )

  }
  getCommentsByTrips(tripId: number) {

    return firstValueFrom(
      this.httpClient.get<any[]>(`${this.baseUrl}/comment/${tripId}`)
    )
  }

  subscribeToTrip(tripId: number) {
    const params = { trips_id: tripId, user_status: 'pendiente' }
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/request`, params, this.createHeaders())
    )
  }

  createHeaders() {
    return {
      headers: new HttpHeaders({
        'authorization': localStorage.getItem('token')!
      })
    }
  }

}







