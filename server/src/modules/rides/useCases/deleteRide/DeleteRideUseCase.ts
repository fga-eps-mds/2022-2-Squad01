import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

@injectable()
class DeleteRideUseCase {
  constructor ( 
  @inject("RidesRepository")
  private ridesRepository: IRidesRepository,
  ) {}

  async execute(rideId: string, userId: string) {
    if(!rideId){
      throw new AppError("Missing parameters")
    }
    const ride = await this.ridesRepository.findById(rideId)

    if(!ride){
      throw new AppError("Ride not found")
    }

    if (ride.driverId !== userId) {
      throw new AppError("You are not the driver of this ride")
    }

    await this.ridesRepository.deleteRide(rideId)
  }

}

export {DeleteRideUseCase}





