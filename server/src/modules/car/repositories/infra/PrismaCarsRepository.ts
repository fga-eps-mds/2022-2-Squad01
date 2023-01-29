import { ICreateCarDTO } from "@modules/car/dtos/ICreateCarDTO";
import { Car } from "@prisma/client";
import { prisma } from "prisma";
import { ICarsRepository } from "../ICarsRepository";

class PrismaCarsRepository implements ICarsRepository {
  async create({ brand, model, year, color, license_plate, userId }: ICreateCarDTO): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        brand,
        model,
        year,
        color,
        license_plate,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });

    return car;
  }
}

export { PrismaCarsRepository }