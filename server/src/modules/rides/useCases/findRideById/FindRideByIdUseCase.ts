import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { inject, injectable } from "tsyringe"



@injectable()
class FindRideByIdUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository
  )
  {}

  async execute(id: string) {
    const ride = await this.ridesRepository.findById(id)

    return ride
  }
}

export { FindRideByIdUseCase }