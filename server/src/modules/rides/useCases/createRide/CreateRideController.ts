import { Request, Response } from "express"
import { CreateRideUseCase } from "./CreateRideUseCase"
import { container } from "tsyringe"

class CreateRideController {
  async handle(req: Request, res: Response) {
    const { routeId, carId, available_spots } = req.body
    const driverId = req.user
    const passengers: string[] = []

    const createRideUseCase = container.resolve(CreateRideUseCase)
    const ride = await createRideUseCase.execute({ routeId, carId, driverId, available_spots, passengers })

    return res.status(201).json({ ride })
  }
}

export { CreateRideController }