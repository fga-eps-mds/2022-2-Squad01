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

  async listByUser(user_id: string): Promise<Ride[]> {
    const rides = await prisma.ride.findMany({
      where: {
        driverId: user_id
      }
    })
    return rides
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await prisma.ride.findUnique({
      where: {
        id
      }
    })
    return ride
  }

  async addPassenger(rideId: string, userId: string): Promise<void> {
    await prisma.ride.update({
      where: {
        id: rideId
      },
      data: {
        passengers: {
          connect: {
            id: userId
          }
        }
      }
    })
  }

  async removePassenger(rideId: string, userId: string): Promise<void> {
    await prisma.ride.update({
      where: {
        id: rideId
      },
      data: {
        passengers: {
          disconnect: {
            id: userId
          }
        }
      }
    })
  }

  async deleteRide(rideId: string): Promise<void> {
    await prisma.ride.delete({
      where: {
        id: rideId
      }
    })
  }
}

export { PrismaRidesRepository }