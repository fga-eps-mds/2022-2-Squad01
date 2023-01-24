import { Request, Response } from "express";
import { container } from "tsyringe";
import { VerifyUserUseCase } from "./VerifyUserUseCase";

class VerifyUserController {
  async handle(req: Request, res: Response) {
    const { verificationCode, user_id } = req.body

    const verifyUserUseCase = container.resolve(VerifyUserUseCase)
    await verifyUserUseCase.execute({ verificationCode, user_id: user_id as string })

    return res.status(200).json({ message: "Successfully verified user" })
  }
}

export { VerifyUserController }