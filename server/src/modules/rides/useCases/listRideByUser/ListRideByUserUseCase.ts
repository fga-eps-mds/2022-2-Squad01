import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository"
import { inject, injectable } from "tsyringe"




@injectable()
class ListRideByUserUseCase {
  constructor(
    @inject("RidesRepository") private ridesRepository: IRidesRepository
  ) {}

  async execute(userId: string) {
    const rides = await this.ridesRepository.listByUser(userId)

    return rides
  }
}


export { ListRideByUserUseCase }
