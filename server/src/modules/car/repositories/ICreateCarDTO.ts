import { User } from "@prisma/client"

export interface ICreateCarDTO {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  license_plate: string;
  user: User;
  userId: string;
}