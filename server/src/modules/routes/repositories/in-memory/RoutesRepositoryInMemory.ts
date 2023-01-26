import { ICreateRouteDTO } from "@modules/routes/dtos/ICreateRouteDTO"
import { Route } from "@prisma/client"
import { IRoutesRepository } from "../IRoutesRepository"

class RoutesRepostoryInMemory implements IRoutesRepository {
  private routesRepository: Route[] = []

  async create(data: ICreateRouteDTO): Promise<Route> {
    const { originName, destinationName, originNeighborhoodSlug, destination, distance, duration, origin, originNeighborhood } = data

    const route: Route = Object.assign({
      id: Math.random().toString(36).substr(2, 9),
      userId: "fixed",
      createdBy: "fixed",
      originName,
      destinationName,
      originNeighborhoodSlug,
      origin,
      destination,
      duration,
      distance,
      originNeighborhood
    })

    this.routesRepository.push(route)
    return route
  }

  async findById(id: string): Promise<Route | null> {
    const route = this.routesRepository.find((route) => {
      return route.id === id
    })

    if (route) return route
    else return null
  }

  async listByUser(userId: string): Promise<Route[] | null> {
    const routes = this.routesRepository.filter((route) => {
      return route.createdBy === userId
    })

    if (routes) return routes
    else return null
  }

  async listByNeighborhood(neighbordhoodSlug: string): Promise<Route[] | null> {
    const routes = this.routesRepository.filter((route) => {
      return route.originNeighborhoodSlug === neighbordhoodSlug
    })

    if (routes) return routes
    else return null
  }

  async updateRoute(id: string, originName?: string | undefined, destinationName?: string | undefined, distance?: number | undefined, duration?: number | undefined, origin?: string[] | undefined, destination?: string[] | undefined, originNeighborhood?: string | undefined, originNeighborhoodSlug?: string | undefined): Promise<Route | null> {
    const newRoute = this.routesRepository.find((route) => {
      if (route.id === id) {
        route.originName = originName || route.originName
        route.destinationName = destinationName || route.destinationName
        route.distance = distance || route.distance
        route.duration = duration || route.duration
        route.origin = origin || route.origin
        route.destination = destination || route.destination
        route.originNeighborhood = originNeighborhood || route.originNeighborhood
        route.originNeighborhoodSlug = originNeighborhoodSlug || route.originNeighborhoodSlug
      }

      return route
    })

    return newRoute || null
  }
}

export { RoutesRepostoryInMemory }