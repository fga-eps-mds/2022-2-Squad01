import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
class ListCarByUserUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute(user_id: string) {
    const car = await this.carsRepository.listByUser(user_id);

    return car;
  }
}

export { ListCarByUserUseCase }