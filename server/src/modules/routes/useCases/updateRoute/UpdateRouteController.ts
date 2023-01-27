import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UpdateRouteUseCase } from "./UpdateRouteUseCase";


class UpdateRouteController {
  async handle(req: Request, res: Response) {
    const routeId = req.params.id;
    const { originName, destinationName, distance, duration, origin, destination, originNeighborhood, originNeighborhoodSlug } = req.body;

    if (!routeId) {
      throw new AppError('Invalid parameters');
    }

    const updateRouteUseCase = container.resolve(UpdateRouteUseCase)

    const route = await updateRouteUseCase.execute({ routeId, destination, destinationName, distance, duration, origin, originName, originNeighborhood, originNeighborhoodSlug});

    res.status(200).json(route)
  }
}

export { UpdateRouteController }