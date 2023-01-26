import { Route } from "@prisma/client";
import { ICreateRouteDTO } from "../dtos/ICreateRouteDTO";

export interface IRoutesRepository {
  create(data: ICreateRouteDTO): Promise<Route>;
  findById(id: string): Promise<Route | null>;
  listByUser(userId: string): Promise<Route[] | null>;
  listByNeighborhood(neighbordhoodSlug: string): Promise<Route[] | null>;
  updateRoute(id: string, originName?: string, destinationName?: string, distance?: number, duration?: number, origin?: string[], destination?: string[], originNeighborhood?: string, originNeighborhoodSlug?: string): Promise<Route | null>;
}