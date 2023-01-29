import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarByUserUseCase } from "./ListCarByUserUseCase";

class ListCarByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user;

    const listCarByUserUseCase = container.resolve(ListCarByUserUseCase);

    const car = await listCarByUserUseCase.execute(user_id);

    return res.json(car);
  }
}

export { ListCarByUserController };