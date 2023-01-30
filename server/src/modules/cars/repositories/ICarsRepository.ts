import { Car } from "@prisma/client";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  listByUser(user_id: string): Promise<Car | null>;
  findById(car_id: string): Promise<Car | null>;
  update(car_id: string, brand: string, model: string, year: number, color: string, license_plate: string): Promise<Car | null>;
  delete(car_id: string): Promise<Car | null>;
}