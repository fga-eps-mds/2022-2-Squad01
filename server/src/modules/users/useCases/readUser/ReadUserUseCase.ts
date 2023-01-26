import { User } from "@prisma/client"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

@injectable()
class ReadUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findUserById(user_id)

    if (!user) {
      throw new AppError("User does not exist!", 404)
    }

    return user
  }
}

export { ReadUserUseCase }
