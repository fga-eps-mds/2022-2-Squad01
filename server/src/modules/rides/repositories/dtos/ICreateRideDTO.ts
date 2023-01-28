import { Route, User } from "@prisma/client"

export interface ICreateRideDTO {
  id: string;
  route: Route;
  routeId: string;
  passagers: User[];
  driverId: string;
  available_spots: number;
}