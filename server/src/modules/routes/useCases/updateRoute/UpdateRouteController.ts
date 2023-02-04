import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { UpdateRouteUseCase } from "./UpdateRouteUseCase";

class UpdateRouteController {
  async handle(req: Request, res: Response) {
    const { originName, destinationName, distance, duration, origin, destination, originNeighborhood } = req.body;
    let { route_id } = req.headers

    route_id = String(route_id)

    if (!route_id) {
      throw new AppError('Invalid parameters');
    }

    const updateRouteUseCase = container.resolve(UpdateRouteUseCase)
    const route = await updateRouteUseCase.execute({ route_id, destination, destinationName, distance, duration, origin, originName, originNeighborhood });

    return res.status(200).json(route)
  }
}

export { UpdateRouteController }