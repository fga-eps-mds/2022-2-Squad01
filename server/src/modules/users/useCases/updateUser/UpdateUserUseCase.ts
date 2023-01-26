import { User } from "@prisma/client"
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  password?: string;
  enrollment?: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(@inject("UsersRepository")
  private usersRepository: IUsersRepository) { }

  async execute({ user_id, name, email, password, enrollment }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.findUserById(user_id)

    if (!user) {
      throw new AppError("User does not exist!", 404)
    }

    const updatedUser = await this.usersRepository.updateUser(user_id, name, email, password, enrollment)

    return updatedUser
  }
}


export { UpdateUserUseCase }