import { Request, Response } from "express"
import { container } from "tsyringe"
import { LoginUserUseCase } from "./LoginUserUseCase"

class LoginUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const loginUserUseCase = container.resolve(LoginUserUseCase)

    const { token, refreshToken, user } = await loginUserUseCase.execute({ email, password })

    return res.status(200).json({ message: "Successfull logged in", token, refreshToken, user })
  }
}

export { LoginUserController }