import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string,
  name: string,
  distance: number,
  duration: number,
  origin: string[],
  destination: string[],
  originNeighborhood: string,
}

@injectable()
class CreateRouteUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository,
  ) { }
  async execute({ userId, name, distance, duration, origin, destination, originNeighborhood }: IRequest) {
    if (!name || !distance || !duration || !origin || !destination || !originNeighborhood) {
      throw new AppError("Missing parameters")
    }

    const route = await this.routesRepository.create({
      userId,
      name,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood: originNeighborhood.toLowerCase()
    })

    return route
  }
}

export { CreateRouteUseCase }