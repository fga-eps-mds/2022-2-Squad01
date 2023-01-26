import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string,
  originName: string,
  destinationName: string,
  distance: number,
  duration: number,
  origin: string[],
  destination: string[],
  originNeighborhood: string,
  originNeighborhoodSlug: string,
}

@injectable()
class CreateRouteUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository,
  ) { }
  async execute({ userId, originName, distance, duration, origin, destination, originNeighborhood, destinationName, originNeighborhoodSlug }: IRequest) {
    if (!originName || !distance || !duration || !origin || !destination || !originNeighborhood || !destinationName || !originNeighborhoodSlug) {
      throw new AppError("Missing parameters")
    }

    if (origin === destination || originName === destinationName) {
      throw new AppError("Origin and destination cannot be the same")
    }

    const route = await this.routesRepository.create({
      userId,
      originName,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood: originNeighborhood,
      destinationName,
      originNeighborhoodSlug: originNeighborhood.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ").join("-"),
    })

    return route
  }
}

export { CreateRouteUseCase }