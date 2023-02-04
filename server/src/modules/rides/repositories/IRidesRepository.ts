import { Ride } from "@prisma/client"
import { ICreateRideDTO } from "../dtos/ICreateRideDTO"
import { IFilteredRideDTO } from "../dtos/IFilteredRideDTO";

export interface IRidesRepository {
  create(data: ICreateRideDTO): Promise<Ride>;
  listAll(): Promise<IFilteredRideDTO[]>;
  listByUser(user_id: string): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  addPassenger(rideId: string, userId: string): Promise<void>;
  removePassenger(rideId: string, userId: string): Promise<void>;
  deleteRide(rideId: string): Promise<void>
  listByRoute(routeIds: string[]): Promise<IFilteredRideDTO[]>;
  listByRange(origin: number[], radius: number, user_id: string): Promise<IFilteredRideDTO[]>;
}