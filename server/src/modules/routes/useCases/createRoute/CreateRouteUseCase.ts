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
}

@injectable()
class CreateRouteUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository,
  ) { }
  async execute({ userId, originName, distance, duration, origin, destination, originNeighborhood, destinationName }: IRequest) {
    if (!originName || !distance || !duration || !origin || !destination || !originNeighborhood || !destinationName) {
      throw new AppError("Missing parameters")
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