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


  arrTrips: Trip[];


  constructor(private httpClient: HttpClient) {

    this.baseUrl = `${environment.apiUrl}/trips`;

    this.arrTrips = [
      {
        id: 0,
        destination: 'Portugal',
        min_traveler: 5,
        max_traveler: 10,
        min_age: 25,
        max_age: 30,
        departure_date: new Date('2023-01-11'),
        duration: 4,
        price: 499,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
        img_trip: '',
        flights: false,
        hotel: true,
        meals: false,
        excursions: false,
        rent_car: false,
        insurance: true
      },
      {
        id: 1,
        destination: 'Francia',
        min_traveler: 10,
        max_traveler: 20,
        min_age: 45,
        max_age: 50,
        departure_date: new Date('2023-02-14'),
        duration: 7,
        price: 699,
        description: 'viaje prueba Francia',
        img_trip: '',
        flights: true,
        hotel: true,
        meals: false,
        excursions: true,
        rent_car: false,
        insurance: true
      },
      {
        id: 2,
        destination: 'Italia',
        min_traveler: 5,
        max_traveler: 15,
        min_age: 30,
        max_age: 35,
        departure_date: new Date('2023-03-23'),
        duration: 8,
        price: 899,
        description: 'viaje prueba Italia',
        img_trip: '',
        flights: true,
        hotel: true,
        meals: false,
        excursions: true,
        rent_car: true,
        insurance: true
      }
    ]
  }

  /* getAllTrips(): Trip[] {
    return this.arrTrips;
  } */

  // FUNCIONA
  getAllTrips(): Promise<Trip[]> {
    return firstValueFrom(
      this.httpClient.get<Trip[]>(this.baseUrl)
    )
  }


  getDestinations(): string[] {
    const destinations = this.arrTrips.map(trip => trip.destination);
    return [...new Set(destinations)];
  }

  filterByDestination(pDestination: string): Trip[] {
    return this.arrTrips.filter(trip => trip.destination === pDestination);
  }

  /* createTrip(pTrip: Trip) {
    this.arrTrips.push(pTrip);
  } */

  //FUNCIONA
  createTrip(pTrip: FormData) {
    return firstValueFrom(
      this.httpClient.post<Trip>(`${this.baseUrl}`, pTrip)
    );
  }

  /* getTripById(tripId: number): Trip | undefined {
    return this.arrTrips.find(trip => trip.id === tripId)
  } */

  //FUNCIONA
  getTripById(tripId: number) {
    return firstValueFrom(
      this.httpClient.get<Trip>(`${this.baseUrl}/${tripId}`)
    );

  }
}

