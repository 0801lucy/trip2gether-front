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
    description: string,
    included_1: boolean,
    included_2: boolean,
    included_3: boolean,
    included_4: boolean,
    included_5: boolean,
    included_6: boolean
}