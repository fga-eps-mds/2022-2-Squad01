import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute(car_id: string, user_id: string) {
    const car = await this.carsRepository.listByUser(user_id);

    if (!car) {
      throw new AppError("Car not found");
    }

    if (car.id !== car_id) {
      throw new AppError("Car not found");
    }

    await this.carsRepository.delete(car_id);

    return;
  }
}

export { DeleteCarUseCase }