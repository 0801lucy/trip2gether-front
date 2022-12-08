export interface Trip {
    id: number,
    detination: string,
    min_traveler: number,
    max_traveler: number,
    min_age: number,
    max_age: number,
    departure_date: Date,
    duration: number,
    price: number,
    description: string
}