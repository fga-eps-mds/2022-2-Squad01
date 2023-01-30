import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { Ride, User } from "@prisma/client"
import { inject, injectable } from "tsyringe"

@injectable()
class ListRideByUserUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository,
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

      return {
        id: ride.id,
        driver,
        car,
        available_spots: ride.available_spots,
        passengers
      }
    }))

    return allRidesInfos
  }
}


export { ListRideByUserUseCase }
