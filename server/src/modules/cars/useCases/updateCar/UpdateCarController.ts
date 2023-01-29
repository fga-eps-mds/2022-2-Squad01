import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCarUseCase } from "./UpdateCarUseCase";

class UpdateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, model, year, color, license_plate } = req.body;
    const car_id = req.headers.car_id as string;
    const user_id = req.user

    const updateCarUseCase = container.resolve(UpdateCarUseCase);

    const car = await updateCarUseCase.execute({
      car_id,
      brand,
      model,
      year,
      color,
      license_plate,
      user_id
    });

    return res.json(car);
  }
}

export { UpdateCarController };