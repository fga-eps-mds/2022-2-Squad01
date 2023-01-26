import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IRoutesRepository } from '@modules/routes/repositories/IRoutesRepository';

@injectable()
class ListRoutesByUserUseCase {
  constructor(
    @inject('RoutesRepository')
    private routesRepository: IRoutesRepository
  ) { }

  async execute(userId: string) {
    if (!userId) {
      throw new AppError('Missing parameters');
    }

    const route = await this.routesRepository.listByUser(userId);

    if (!route) {
      throw new AppError('Route not found');
    }

    return route;
  }

}

export { ListRoutesByUserUseCase };
