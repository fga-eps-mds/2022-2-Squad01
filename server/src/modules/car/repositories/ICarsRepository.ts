import { Car } from "@prisma/client";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
}