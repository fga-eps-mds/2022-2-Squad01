import { User } from "@prisma/client"

export interface ICreateCarDTO {
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  userId: string;
}