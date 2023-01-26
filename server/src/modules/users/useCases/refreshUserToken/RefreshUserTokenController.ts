import { Request, Response } from "express"
import { RefreshUserTokenUseCase } from "./RefreshUserTokenUseCase"
import { container } from "tsyringe"

class RefreshUserTokenController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body

    const refreshUserTokenUseCase = container.resolve(RefreshUserTokenUseCase)
    const token = await refreshUserTokenUseCase.execute(refresh_token)

    return res.json(token)
  }
}

export { RefreshUserTokenController }