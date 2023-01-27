import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

@injectable()
class ListRoutesByNeighborhoodUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository
  ) { }

  async execute(neighborhood: string) {
    const routes = await this.routesRepository.listByNeighborhood(neighborhood);

    if (!routes) {
      throw new AppError("No routes found")
    }

    return routes;
  }
}

export { ListRoutesByNeighborhoodUseCase }