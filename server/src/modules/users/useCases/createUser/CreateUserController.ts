import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { container } from "tsyringe";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { email, name, enrollment, password, cellphone, instagram } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const user = await createUserUseCase.execute({
      email,
      name,
      enrollment,
      password,
      cellphone,
      instagram
    })

    return res.status(201).json({ message: "User created sucessfully", id: user.id })
  }
}

export { CreateUserController }