import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteRouteUseCase } from "./DeleteRouteUseCase"

class DeleteRouteController {
  async handle(req: Request, res: Response) {
    let { id } = req.headers
    const user_id = req.user

    id = String(id)

    const deleteRouteUseCase = container.resolve(DeleteRouteUseCase)
    await deleteRouteUseCase.execute(id, user_id)

    return res.status(204).send()
  }
}

export { DeleteRouteController }
