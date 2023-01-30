import { Request, Response } from "express"
import { container } from "tsyringe"
import { SubscribeUserToRideUseCase } from "./SubscribeUserToRideUseCase"




class SubscribeUserToRideController {

  async handle(req: Request, res: Response): Promise<Response> {

    const ride_id  = req.headers.ride_id as string
    const userId = req.user

    const subscribeUserToRideUseCase = container.resolve(SubscribeUserToRideUseCase)

    const result = await subscribeUserToRideUseCase.execute(userId, ride_id)


    if(result) {
      return res.status(200).json({ message: "User subscribed to ride" })
    } else {
      return res.status(200).json({ message: "User unsubscribed from ride" })
    }
    
  }
}

export { SubscribeUserToRideController }