import { Request, Response } from "express"
import { CreateRouteUseCase } from "./CreateRouteUseCase"
import { container } from "tsyringe"

class CreateRouteController {
  async handle(req: Request, res: Response) {
    const { originName, destinationName, distance, duration, origin, destination, originNeighborhood } = req.body
    const id = req.user

    const createRouteUseCase = container.resolve(CreateRouteUseCase)
    const route = await createRouteUseCase.execute({ userId: id, originName, destinationName, distance, duration, origin, destination, originNeighborhood })

    return res.status(201).json({ route })
  }
}

export { CreateRouteController }