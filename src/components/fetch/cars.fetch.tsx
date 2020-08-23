export interface CarsList {
    cars: Car[],
}

export enum Engine {
    OIL,
    ELECTRIC,
    GAS
}

export interface Car {
    id?: string,
    dateCreated?: string,
    vin?: string,
    manufacturer?: string,
    model?: string,
    licensePlate?: string,
    seatCount?: number,
    engineType: Engine,
    convertible: boolean,
    rating?: number
}