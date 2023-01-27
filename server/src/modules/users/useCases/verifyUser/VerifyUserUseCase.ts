import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
  verificationCode: string;
  user_id: string;
}

@injectable()
class VerifyUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ verificationCode, user_id }: IRequest) {
    const userVerificationCode = await this.usersRepository.getVerificationCode(user_id)

    if (!userVerificationCode || !user_id) {
      throw new AppError("User not found")
    }

    if (userVerificationCode === parseInt(verificationCode)) {
      await this.usersRepository.verifyUser(user_id)
    } else {
      throw new AppError("Code doesn't match")
    }
  }
}

export { VerifyUserUseCase }