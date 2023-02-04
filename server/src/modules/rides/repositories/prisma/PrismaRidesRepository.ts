import { IFilteredRideDTO } from "@modules/rides/dtos/IFilteredRideDTO"
import { Prisma, Ride, User } from "@prisma/client"
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

  async listAll(): Promise<IFilteredRideDTO[]> {
    const rides = await prisma.ride.findMany()

    const allRidesInfos = await Promise.all(rides.map(async ride => {
      const route = await prisma.route.findUnique({
        where: {
          id: ride.routeId
        }
      })

      const car = await prisma.car.findUnique({
        where: {
          id: ride.carId
        }
      })

      const driver = await prisma.user.findUnique({
        where: {
          id: ride.driverId
        }
      })

      const passengers = await Promise.all(ride.passengers.map(async passengerId => {
        const passenger = await prisma.user.findUnique({
          where: {
            id: passengerId
          }
        })

        return passenger
      }))

      return {
        id: ride.id,
        route,
        car,
        driver,
        passengers,
        available_spots: ride.available_spots,
        createdAt: ride.createdAt
      }
    }))

    return allRidesInfos
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

  async listByRoute(routeIds: string[]): Promise<IFilteredRideDTO[]> {
    const rides = await prisma.ride.findMany({
      where: {
        routeId: {
          in: routeIds
        }
      }
    })

    const allRidesInfos = await Promise.all(rides.map(async ride => {
      const route = await prisma.route.findUnique({
        where: {
          id: ride.routeId
        }
      })

      const car = await prisma.car.findUnique({
        where: {
          id: ride.carId
        }
      })

      const driver = await prisma.user.findUnique({
        where: {
          id: ride.driverId
        }
      })

      const passengers = await Promise.all(ride.passengers.map(async passengerId => {
        const passenger = await prisma.user.findUnique({
          where: {
            id: passengerId
          }
        })

        return passenger
      }))

      return {
        id: ride.id,
        route,
        car,
        driver,
        passengers,
        available_spots: ride.available_spots,
        createdAt: ride.createdAt
      }
    }))

    return allRidesInfos
  }

  async listByRange(origin: number[], radius: number, user_id: string): Promise<IFilteredRideDTO[]> {
    const routes: any[] = await prisma.$queryRaw(Prisma.sql`
      WITH derived AS
      (
        SELECT routes.*,
          (6371 * acos(cos(radians(${origin[0]})) * cos(radians(routes.origin[1])) * cos(radians(routes.origin[2]) - radians(${origin[1]})) + sin(radians(${origin[0]})) * sin(radians(routes.origin[1])))) AS "distanceInRange"
        FROM routes
      ) 
      SELECT * 
      FROM derived
      WHERE "distanceInRange" <= ${radius}
    `)

    const rides = await prisma.ride.findMany({
      where: {
        routeId: {
          in: routes.map(route => route.id)
        }
      }
    })

    const allRidesInfos = await Promise.all(rides.map(async ride => {
      const route = await prisma.route.findUnique({
        where: {
          id: ride.routeId
        }
      })

      const distanceFromUser = routes.find(route => route.id === ride.routeId)?.distanceInRange

      const car = await prisma.car.findUnique({
        where: {
          id: ride.carId
        }
      })

      const driver = await prisma.user.findUnique({
        where: {
          id: ride.driverId
        }
      })

      const passengers = await Promise.all(ride.passengers.map(async passengerId => {
        const passenger = await prisma.user.findUnique({
          where: {
            id: passengerId
          }
        })

        return passenger
      }))

      return {
        id: ride.id,
        route,
        car,
        driver,
        passengers,
        available_spots: ride.available_spots,
        distanceFromUser,
        createdAt: ride.createdAt
      }
    }))

    const orderedRides = allRidesInfos.sort((a, b) => {
      if (a.distanceFromUser > b.distanceFromUser) {
        return 1
      }
      if (a.distanceFromUser < b.distanceFromUser) {
        return -1
      }
      return 0
    }).filter(ride => (ride.driver as User).id !== user_id)

    return orderedRides
  }
}

export { PrismaRidesRepository }