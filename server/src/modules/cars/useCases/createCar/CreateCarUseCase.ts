import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  userId: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ brand, model, year, color, license_plate, userId }: IRequest): Promise<Car> {
    if (!brand || !model || !year || !color || !license_plate || !userId) {
      throw new AppError("Missing parameters");
    }

    const car = await this.carsRepository.create({
      brand,
      model,
      year,
      color,
      license_plate,
      userId
    });

    return car;
  }
}

export { CreateCarUseCase }