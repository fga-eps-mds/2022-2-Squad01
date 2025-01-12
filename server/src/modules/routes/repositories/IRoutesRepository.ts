import { Route } from "@prisma/client"
import { ICreateRouteDTO } from "../dtos/ICreateRouteDTO"

export interface IRoutesRepository {
  create(data: ICreateRouteDTO): Promise<Route>;
  findById(id: string): Promise<Route | null>;
  listByUser(userId: string): Promise<Route[] | null>;
  listAll(): Promise<Route[] | null>;
  listByNeighborhood(neighborhood: string): Promise<Route[] | null>;
  updateRoute(id: string, originName?: string, destinationName?: string, distance?: number, duration?: number, origin?: number[], destination?: number[], originNeighborhood?: string, originNeighborhoodSlug?: string): Promise<Route | null>;
}
