import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListAllRidesUseCase } from "./ListAllRidesUseCase"

class ListAllRidesController {
  async handle(req: Request, res: Response) {
    const listAllRidesUseCase = container.resolve(ListAllRidesUseCase)

    const rides = await listAllRidesUseCase.execute()

    return res.status(201).json({ rides })
  }
}

export { ListAllRidesController }