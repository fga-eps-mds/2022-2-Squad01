import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRideByNeighborhoodUseCase } from "./ListRideByNeighborhoodUseCase";

class ListRideByNeighborhoodController {
  async handle(req: Request, res: Response) {
    const { neighborhood } = req.query;

    const listRideByNeighborhoodUseCase = container.resolve(
      ListRideByNeighborhoodUseCase
    );

    const rides = await listRideByNeighborhoodUseCase.execute(neighborhood as string);

    return res.json(rides);
  }
}

export { ListRideByNeighborhoodController }