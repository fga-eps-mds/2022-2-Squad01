import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class ListAllRidesUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository
  ) { }

  async execute() {
    const ride = await this.ridesRepository.listAll()

    return ride
  }
}

export { ListAllRidesUseCase }