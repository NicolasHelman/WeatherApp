export interface GeolocationData {
    coords: Coords
    timestamp: number
}
  
export interface Coords {
    latitude: number
    longitude: number
    altitude: any
    accuracy: number
    altitudeAccuracy: any
    heading: any
    speed: any
}
