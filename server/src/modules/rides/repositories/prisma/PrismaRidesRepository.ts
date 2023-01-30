import { Ride } from "@prisma/client"
import { prisma } from "prisma"
import { ICreateRideDTO } from "../../dtos/ICreateRideDTO"
import { IRidesRepository } from "../IRidesRepository"

class PrismaRidesRepository implements IRidesRepository {
  async create(data: ICreateRideDTO): Promise<Ride> {
    const {
      carId,
      routeId,
      driverId,
      available_spots
    } = data

    const ride = await prisma.ride.create({
      data: {
        route: {
          connect: {
            id: routeId
          }
        },
        car: {
          connect: {
            id: carId
          }
        },
        driverId,
        available_spots
      }
    })
    return ride
  }
}

export { PrismaRidesRepository }