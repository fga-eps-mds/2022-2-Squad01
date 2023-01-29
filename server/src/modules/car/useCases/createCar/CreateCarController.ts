import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(req: Request, res: Response) {
    const { brand, model, year, color, license_plate, userId } = req.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand, model, year, color, license_plate, userId
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController }