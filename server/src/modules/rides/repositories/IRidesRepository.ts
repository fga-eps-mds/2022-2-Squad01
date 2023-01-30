import { Ride } from "@prisma/client"
import { ICreateRideDTO } from "../dtos/ICreateRideDTO"



export interface IRidesRepository {
  create(data: ICreateRideDTO): Promise<Ride>;
}