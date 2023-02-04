import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRideByRangeUseCase } from "./ListRideByRangeUseCase";

class ListRideByRangeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { lat, lng, radius } = req.query

    const origin = [Number(lat), Number(lng)]
    const user_id = req.user

    const listRideByRangeUseCase = container.resolve(ListRideByRangeUseCase)
    const rides = await listRideByRangeUseCase.execute({ origin, radius: parseFloat(radius as string), user_id })

    return res.json(rides)
  }
}

export { ListRideByRangeController }