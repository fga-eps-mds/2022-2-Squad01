import { Request, Response } from "express"
import { container } from "tsyringe"
import { FindRideByIdUseCase } from "./FindRideByIdUseCase"



class FindRideByIdController {


  async handle(req: Request, res: Response) {

    const rideId = req.headers.ride_id

    const findRideByIdUseCase = container.resolve(FindRideByIdUseCase)

    const ride = await findRideByIdUseCase.execute(rideId as string)

    return res.status(201).json({ ride })

  }

}

export { FindRideByIdController }