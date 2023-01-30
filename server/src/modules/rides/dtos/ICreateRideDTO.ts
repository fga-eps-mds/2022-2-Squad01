import { User } from "@prisma/client"

export interface ICreateRideDTO {
  routeId: string;
  carId: string;
  passangers: User[];
  driverId: string;
  available_spots: number;
}