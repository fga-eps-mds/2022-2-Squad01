import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "@shared/errors/AppError"
import { UpdateUserUseCase } from "./UpdateUserUseCase"


class UpdateUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user
    const { name, email, password, enrollment } = req.body

    if (!user_id) {
      throw new AppError("Invalid parameters")
    }

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const user = await updateUserUseCase.execute({ user_id, name, email, password, enrollment })

    res.status(200).json(user)
  }
}

export { UpdateUserController }