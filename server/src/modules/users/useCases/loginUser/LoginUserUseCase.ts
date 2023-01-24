import { inject, injectable } from "tsyringe";
import * as bcrypt from 'bcryptjs'
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { GenerateRefreshToken } from "@modules/users/provider/GenerateRefreshToken";
import { RefreshToken } from "@prisma/client";
import { GenerateToken } from "@modules/users/provider/GenerateToken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string,
  refreshToken: RefreshToken,
  user: {
    email: string,
    name: string,
    enrollment: string,
    isVerified: boolean,
  }
}

@injectable()
class LoginUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUser(email)

    if (!user) {
      throw new AppError("Invalid credentials")
    }

    // Talvez seja melhor tratar isso no front
    // if (!user.isVerified) {
    //   throw new AppError("Verify your account to continue")
    // }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      throw new AppError("Invalid credentials")
    }

    const generateToken = new GenerateToken()
    const token = await generateToken.execute(user.id)

    await this.usersRepository.deleteUserRefreshToken(user.id)

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(user.id)

    const filteredUserData = {
      id: user.id,
      email: user.email,
      name: user.name,
      enrollment: user.enrollment,
      isVerified: user.isVerified,
      cellphone: user.cellphone,
      instagram: user.instagram,
    }

    return { token, refreshToken, user: filteredUserData }
  }
}

export { LoginUserUseCase }