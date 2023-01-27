import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteRouteUseCase } from "./DeleteRouteUseCase"

class DeleteRouteController {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const user_id = request.user

    const deleteRouteUseCase = container.resolve(DeleteRouteUseCase)
    await deleteRouteUseCase.execute(id, user_id)

    return response.status(204).send()
  }
}

export { DeleteRouteController }
