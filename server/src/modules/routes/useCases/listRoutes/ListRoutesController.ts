import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRoutesUseCase } from "./ListRoutesUseCase";

class ListRoutesController {
  async handle(req: Request, res: Response) {
    const listRoutesUseCase = container.resolve(ListRoutesUseCase)
    const routes = await listRoutesUseCase.execute()

    return res.json({ routes })
  }
}

export { ListRoutesController }