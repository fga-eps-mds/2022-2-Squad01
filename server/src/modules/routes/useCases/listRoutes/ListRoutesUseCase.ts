import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRoutesUseCase {
  constructor(
    @inject("RoutesRepository")
    private routesRepository: IRoutesRepository
  ) { }

  async execute() {
    const routes = await this.routesRepository.listAll()

    return routes
  }
}

export { ListRoutesUseCase }