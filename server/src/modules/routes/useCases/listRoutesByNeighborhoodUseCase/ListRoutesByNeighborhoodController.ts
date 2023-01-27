import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRoutesByNeighborhoodUseCase } from "./ListRoutesByNeighborhoodUseCase"

class ListRoutesByNeighborhoodController {
  async handle(req: Request, res: Response) {
    const { neighborhood } = req.params

    const listRouteByNeighborhoodUseCase = container.resolve(ListRoutesByNeighborhoodUseCase)
    const route = await listRouteByNeighborhoodUseCase.execute(neighborhood)

    return res.status(200).json({ route })
  }
}

export { ListRoutesByNeighborhoodController }