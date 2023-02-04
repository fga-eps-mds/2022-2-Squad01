import { IRidesRepository } from "@modules/rides/repositories/IRidesRepository";
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRideByNeighborhoodUseCase {
  constructor(
    @inject("RidesRepository")
    private ridesRepository: IRidesRepository,
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository
  ) { }

  async execute(neighborhood: string) {
    const routes = await this.routesRepository.listByNeighborhood(neighborhood);

    if (!routes) {
      throw new AppError("Routes not found");
    }

    const routeIds = routes.map((route) => route.id);

    const rides = await this.ridesRepository.listByRoute(routeIds);

    return rides;
  }
}

export { ListRideByNeighborhoodUseCase }