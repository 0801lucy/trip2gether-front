import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  createComment(message: string, trip_id: number) {
    const body = { message, trip_id }
    return firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/trips/comment/new`, body)
    )
  }
}





