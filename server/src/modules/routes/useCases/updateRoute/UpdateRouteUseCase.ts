import { Route } from '@prisma/client';
import { inject, injectable } from 'tsyringe'
import { IRoutesRepository } from '@modules/routes/repositories/IRoutesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  routeId: string,
  originName?: string,
  destinationName?: string,
  distance?: number,
  duration?: number,
  origin?: string[],
  destination?: string[],
  originNeighborhood?: string,
  originNeighborhoodSlug?: string,
}

@injectable()
class UpdateRouteUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository
  ) { }

  async execute({ routeId, originName, destinationName, distance, duration, origin, destination, originNeighborhood, originNeighborhoodSlug }: IRequest): Promise<Route | null> {
    const route = await this.routesRepository.findById(routeId)

    if (!route) {
      throw new AppError("Route does not exist!", 404)
    }

    const updatedUser = await this.routesRepository.updateRoute(routeId, originName, destinationName, distance, duration, origin, destination, originNeighborhood, originNeighborhoodSlug)

    return updatedUser;
  }
}


export { UpdateRouteUseCase }