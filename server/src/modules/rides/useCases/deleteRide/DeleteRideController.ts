import { Request, Response } from "express"
import { container } from "tsyringe"
import { DeleteRideUseCase } from "./DeleteRideUseCase"

class DeleteRideController {
  async handle(req: Request, res: Response) {
    const rideId = req.headers.ride_id
    const userId = req.user

    const deleteRideUseCase = container.resolve(DeleteRideUseCase)
    await deleteRideUseCase.execute(rideId as string, userId)

    return res.status(204).send()
  }
}

export { DeleteRideController }