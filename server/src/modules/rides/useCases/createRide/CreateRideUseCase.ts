import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { User } from "@prisma/client";
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface IRequest {
  routeId: string;
  carId: string;
  driverId: string;
  available_spots: number;
  passengers: string[];
}

@injectable()
class CreateRideUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository,
  ) { }
  async execute({ routeId, carId, driverId, available_spots, passengers }: IRequest) {
    if (!routeId || !carId || !driverId || !available_spots) {
      throw new AppError("Missing parameters")
    }

    const ride = await this.ridesRepository.create({
      routeId,
      carId,
      driverId,
      available_spots,
      passengers
    })

    return ride
  }
}

export { CreateRideUseCase }