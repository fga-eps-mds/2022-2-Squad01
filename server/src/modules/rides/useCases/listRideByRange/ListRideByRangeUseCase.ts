import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  origin: number[];
  radius: number;
  user_id: string;
}

@injectable()
class ListRideByRangeUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository
  ) { }

  async execute({ origin, radius, user_id }: IRequest) {
    const rides = await this.ridesRepository.listByRange(origin, radius, user_id)

    return rides
  }
}

export { ListRideByRangeUseCase }