import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "@shared/errors/AppError"
import { ReadUserUseCase } from "./ReadUserUseCase"

class ReadUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user

    if (!user_id) {
      throw new AppError("Invalid parameters")
    }

    const readUserUseCase = container.resolve(ReadUserUseCase)
    const user = await readUserUseCase.execute(user_id)

    return res.status(200).json({ user })
  }
}

export { ReadUserController }
