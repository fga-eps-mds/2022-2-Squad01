import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { Ride, User } from "@prisma/client"
import { inject, injectable } from "tsyringe"

@injectable()
class ListRideByUserUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository,
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) { }
  async execute(userId: string) {
    const rides = await this.ridesRepository.listByUser(userId)

    const allRidesInfos = await Promise.all(rides.map(async (ride: Ride) => {
      const driver = await this.usersRepository.findUserById(ride.driverId)

      const car = await this.carsRepository.findById(ride.carId)

      const passengers = await Promise.all(ride.passengers.map(async (passenger: string) => {
        const user = await this.usersRepository.findUserById(passenger)
        return user
      }))

      const route = await this.routesRepository.findById(ride.routeId)

      return {
        id: ride.id,
        driver,
        route,
        car,
        available_spots: ride.available_spots,
        passengers
      }
    }))

    return allRidesInfos
  }
}


export { ListRideByUserUseCase }
