import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  user_id: string;
}

@injectable()
class UpdateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ car_id, brand, model, year, color, license_plate, user_id }: IRequest) {
    const car = await this.carsRepository.listByUser(user_id);

    if (!car) {
      throw new AppError("Car not found");
    }

    if (car.id !== car_id) {
      throw new AppError("Car not found");
    }

    const updatedCar = await this.carsRepository.update(car_id,
      brand,
      model,
      year,
      color,
      license_plate
    );

    return updatedCar;
  }
}

export { UpdateCarUseCase };