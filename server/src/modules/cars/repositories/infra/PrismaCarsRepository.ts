import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
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

  async listByUser(user_id: string): Promise<Car | null> {
    const car = await prisma.car.findFirst({
      where: {
        userId: user_id
      }
    });

    return car
  }

  async update(car_id: string, brand: string, model: string, year: number, color: string, license_plate: string): Promise<Car | null> {
    const car = await prisma.car.update({
      where: {
        id: car_id
      },
      data: {
        brand,
        model,
        year,
        color,
        license_plate
      }
    });

    return car;
  }

  async delete(car_id: string): Promise<Car | null> {
    const car = await prisma.car.delete({
      where: {
        id: car_id
      }
    });

    return car;
  }
}

export { PrismaCarsRepository }