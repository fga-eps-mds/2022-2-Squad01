import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

class DeleteCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const car_id = req.headers.car_id as string;
    const user_id = req.user

    const deleteCarUseCase = container.resolve(DeleteCarUseCase);

    await deleteCarUseCase.execute(car_id, user_id);

    return res.status(204).send();
  }
}

export { DeleteCarController }