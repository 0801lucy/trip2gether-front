export interface Trip {
    id: number,
    destination: string,
    min_traveler: number,
    max_traveler: number,
    min_age: number,
    max_age: number,
    departure_date: Date,
    duration: number,
    price: number,
    img_trip: string;
    description: string,
    flights: boolean,
    hotel: boolean,
    meals: boolean,
    excursions: boolean,
    rent_car: boolean,
    insurance: boolean
}