import { Route, User } from "@prisma/client"

export interface ICreateRideDTO {
  id: string;
  routeId: string;
  carId: string;
  passangers: User[];
  driverId: string;
  available_spots: number;
}