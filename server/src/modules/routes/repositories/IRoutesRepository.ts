import { Route } from "@prisma/client";
import { ICreateRouteDTO } from "../dtos/ICreateRouteDTO";

export interface IRoutesRepository {
  create(data: ICreateRouteDTO): Promise<Route>;
  findById(id: string): Promise<Route | null>;
  listByUser(userId: string): Promise<Route[] | null>;
  listAll(): Promise<Route[] | null>;
  listByNeighborhood(neighborhood: string): Promise<Route[] | null>;
}