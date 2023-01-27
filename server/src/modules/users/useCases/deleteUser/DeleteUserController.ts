import { Request, Response } from "express"
import { DeleteUserUseCase } from "./DeleteUserUseCase"
import { container } from "tsyringe"

class DeleteUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.user

    const deleteUserUseCase = container.resolve(DeleteUserUseCase)

    await deleteUserUseCase.execute(user_id)

    return res.status(200).json({ message: "Successfully deleted user" })
  }
}

export { DeleteUserController }