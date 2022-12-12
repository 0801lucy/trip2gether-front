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
        flights: true,
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
        flights: true,
        hotel: true,
        meals: false,
        excursions: true,
        rent_car: true,
        insurance: true
      }
    ]
  }

  getAllTrips(): Trip[] {
    return this.arrTrips;
  }

  getDestinations(): string[] {
    const destinations = this.arrTrips.map(trip => trip.destination);
    return [...new Set(destinations)];
  }

  filterByDestination(pDestination: string): Trip[] {
    return this.arrTrips.filter(trip => trip.destination === pDestination);
  }

  createTrip(pTrip: Trip) {
    this.arrTrips.push(pTrip);
  }

  getTripById(tripId: number): Trip | undefined {
    return this.arrTrips.find(trip => trip.id === tripId)
  }
}
