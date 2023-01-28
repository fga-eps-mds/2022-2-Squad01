import { Ride } from "@prisma/client"
import { prisma } from "prisma"
import { ICreateRideDTO } from "../dtos/ICreateRideDTO"
import { IRidesRepository } from "../IRideRepository"

class PrismaRidesRepository  implements IRidesRepository{
  async create(data: ICreateRideDTO): Promise<Ride> {
    const {
      id,
      route,
      routeId,
      passagers,
      driverId,
      available_spots
    } = data
    const ride = await prisma.ride.create({
      data: {
        id,
        route,
        routeId,
        passagers,
        driverId,
        available_spots
      }
    })
    return ride
  }

}