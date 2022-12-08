import { Injectable } from '@angular/core';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  arrTrips: Trip[];

  constructor() {
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
        description: 'viaje prueba Portugal',
        included_1: true,
        included_2: true,
        included_3: true,
        included_4: true,
        included_5: false,
        included_6: true
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
        included_1: true,
        included_2: false,
        included_3: true,
        included_4: true,
        included_5: false,
        included_6: true
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
        included_1: true,
        included_2: true,
        included_3: false,
        included_4: true,
        included_5: false,
        included_6: true
      }
    ]
  }

  getAllTrips(): Trip[] {
    return this.arrTrips;
  }

  createTrip(pTrip: Trip) {
    this.arrTrips.push(pTrip);
    console.log(pTrip);
  }
}
