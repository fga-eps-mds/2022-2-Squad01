import { Request, Response } from "express"
import { CreateRideUseCase } from "./CreateRideUseCase"
import { container } from "tsyringe"

class CreateRideController {
  async handle(req: Request, res: Response) {
    const { routeId, carId, passangers, driverId, available_spots } = req.body

    const createRideUseCase = container.resolve(CreateRideUseCase)
    const ride = await createRideUseCase.execute({ routeId, carId, passangers, driverId, available_spots })

    return res.status(201).json({ ride })
  }
}

export { CreateRideController }