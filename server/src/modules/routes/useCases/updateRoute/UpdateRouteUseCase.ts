import { Route } from '@prisma/client';
import { inject, injectable } from 'tsyringe'
import { IRoutesRepository } from '@modules/routes/repositories/IRoutesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  route_id: string,
  originName?: string,
  destinationName?: string,
  distance?: number,
  duration?: number,
  origin?: number[],
  destination?: number[],
  originNeighborhood?: string,
}

@injectable()
class UpdateRouteUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository
  ) { }

  async execute({ route_id, originName, destinationName, distance, duration, origin, destination, originNeighborhood }: IRequest): Promise<Route | null> {
    const route = await this.routesRepository.findById(route_id)

    if (!route) {
      throw new AppError("Route does not exist!", 404)
    }

    const updatedUser = await this.routesRepository.updateRoute(route_id, originName, destinationName, distance, duration, origin, destination, originNeighborhood)

    return updatedUser;
  }
}


export { UpdateRouteUseCase }