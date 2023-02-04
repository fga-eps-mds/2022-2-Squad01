import { Car, Route, User } from "@prisma/client";

export interface IFilteredRideDTO {
  id: string;
  route: Route | null;
  car: Car | null;
  driver: User | null;
  passengers: (User | null)[];
  available_spots: number;
  distanceInRange?: number;
}
