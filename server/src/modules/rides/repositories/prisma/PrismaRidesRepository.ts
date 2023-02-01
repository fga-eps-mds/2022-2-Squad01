import { Ride } from "@prisma/client"
import { AppError } from "@shared/errors/AppError"
import { prisma } from "prisma"
import { ICreateRideDTO } from "../../dtos/ICreateRideDTO"
import { IRidesRepository } from "../IRidesRepository"

class PrismaRidesRepository implements IRidesRepository {
  async create(data: ICreateRideDTO): Promise<Ride> {
    const {
      carId,
      routeId,
      driverId,
      available_spots,
      passengers
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
        available_spots,
        passengers: []
      }
    })
    return ride
  }

  async listAll(): Promise<Ride[]> {
    const rides = await prisma.ride.findMany()
    return rides
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
    const ride = await this.findById(rideId)

    if (!ride) {
      throw new AppError("Ride not found")
    }

    await prisma.ride.update({
      where: {
        id: rideId
      },
      data: {
        passengers: [...ride.passengers, userId],
        available_spots: ride.available_spots - 1
      }
    })
  }

  async removePassenger(rideId: string, userId: string): Promise<void> {
    const ride = await this.findById(rideId)

    if (!ride) {
      throw new AppError("Ride not found")
    }

    await prisma.ride.update({
      where: {
        id: rideId
      },
      data: {
        passengers: ride.passengers.filter(passenger => passenger !== userId),
        available_spots: ride.available_spots + 1
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