import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRideByUserUseCase } from "./ListRideByUserUseCase"

class ListRideByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const userId = req.user

    const listRideByUserUseCase = container.resolve(ListRideByUserUseCase)

    const rides = await listRideByUserUseCase.execute(userId)

    return res.status(201).json({ rides })
  }
}

export { ListRideByUserController }