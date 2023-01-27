import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRoutesByUserUseCase } from "./ListRoutesByUserUseCase"

class ListRoutesByUserController {
  async handle(req: Request, res: Response) {
    const id = req.user

    const listRouteByUserUseCase = container.resolve(ListRoutesByUserUseCase)
    const route = await listRouteByUserUseCase.execute(id)

    return res.status(200).json({ route })
  }
}

export { ListRoutesByUserController }