import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"



@injectable()
class SubscribeUserToRideUseCase {
  constructor(
    @inject("RidesRepository") private ridesRepository: IRidesRepository,
    @inject("UsersRepository") private usersRepository: IUsersRepository
  )
  {
    
  }

  async execute(userId: string, rideId: string): Promise<boolean> {

    const ride = await this.ridesRepository.findById(rideId)
    const user = await this.usersRepository.findUserById(userId)

    if (!ride) {
      throw new AppError("Ride not found", 404)
    }

    if (ride.driverId === userId) {
      throw new AppError("You cannot subscribe to your own ride")
    }

    if ( ride.available_spots === 0) {
      throw new AppError("This ride is full")
    } 



    if (user?.rideId === rideId) {
      await this.ridesRepository.removePassenger(rideId, userId)
      return false
    }
    

    await this.ridesRepository.addPassenger(rideId, userId)
    return true

  }
}

export { SubscribeUserToRideUseCase }
