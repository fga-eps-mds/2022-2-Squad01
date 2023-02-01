import { Ride } from "@prisma/client"
import { ICreateRideDTO } from "../dtos/ICreateRideDTO"

export interface IRidesRepository {
  create(data: ICreateRideDTO): Promise<Ride>;
  listAll(): Promise<Ride[]>;
  listByUser(user_id: string): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  addPassenger(rideId: string, userId: string): Promise<void>;
  removePassenger(rideId: string, userId: string): Promise<void>;
  deleteRide(rideId: string): Promise<void>
}