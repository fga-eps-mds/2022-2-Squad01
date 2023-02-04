export interface ICreateRideDTO {
  routeId: string;
  carId: string;
  driverId: string;
  available_spots: number;
  passengers: string[];
}