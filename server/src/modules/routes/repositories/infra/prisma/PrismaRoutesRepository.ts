import { ICreateRouteDTO } from "@modules/routes/dtos/ICreateRouteDTO";
import { Route } from "@prisma/client";
import { IRoutesRepository } from "../../IRoutesRepository";
import { prisma } from "prisma";

class PrismaRoutesRepository implements IRoutesRepository {

  async create(data: ICreateRouteDTO): Promise<Route> {
    const { distance, duration, originName, destination, origin, userId, originNeighborhood, originNeighborhoodSlug, destinationName } = data

    const route = await prisma.route.create({
      data: {
        distance,
        duration,
        originName,
        destination,
        origin,
        createdBy: userId,
        originNeighborhood,
        originNeighborhoodSlug,
        destinationName
      }
    })

    return route
  }

  async findById(id: string): Promise<Route | null> {
    const route = await prisma.route.findUnique({
      where: {
        id
      }
    })

    return route
  }

  async listByUser(userId: string): Promise<Route[]> {
    const routes = await prisma.route.findMany({
      where: {
        createdBy: userId
      }
    })

    return routes
  }

  async listByNeighborhood(neighborhood: string): Promise<Route[]> {
    const routes = await prisma.route.findMany({
      where: {
        originNeighborhood: neighborhood
      }
    })

    return routes
  }

  async listAll(): Promise<Route[] | null> {
    const routes = await prisma.route.findMany()

    return routes
  }
}

export { PrismaRoutesRepository }