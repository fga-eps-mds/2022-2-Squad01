import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

@injectable()
class DeleteRouteUseCase {
  constructor(
    @inject("RoutesRepository") private routesRepository: IRoutesRepository
  ) {}

  async execute(id: string, user_id: string) {
    const route = await this.routesRepository.findById(id)

    if (!route) {
      throw new AppError("Route does not exists")
    }

    if (route.createdBy === user_id) {
      await this.routesRepository.delete(id)
    }

    else {
      throw new AppError("You are not allowed to delete this route")
    }
  }
}

export { DeleteRouteUseCase }
