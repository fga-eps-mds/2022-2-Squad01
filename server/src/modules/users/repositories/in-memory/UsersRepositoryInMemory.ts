import { RefreshToken, User } from "@prisma/client"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../IUsersRepository"

class UsersRepositoryInMemory implements IUsersRepository {

  private usersRepository: User[] = []
  private refreshTokenRepository: RefreshToken[] = []

  async create(data: ICreateUserDTO): Promise<User> {
    const { name, email, enrollment, password } = data

    const user: User = Object.assign({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      enrollment,
      password,
      verificationCode: Math.floor(Math.random() * 100000),
    })

    this.usersRepository.push(user)

    return user
  }

  async findUser(email: string): Promise<User | null> {
    return this.usersRepository.find((user) => user.email === email) || null
  }

  async findUserById(user_id: string): Promise<User | null> {
    return this.usersRepository.find((user) => user.id === user_id) || null
  }

  async getVerificationCode(user_id: string): Promise<number | null> {
    return this.usersRepository.find((user) => user.id == user_id)?.verificationCode || null
  }

  async verifyUser(user_id: string): Promise<void> {
    this.usersRepository.forEach((user) => user.id === user_id && (user.isVerified = true))
    return
  }

  async updateUser(user_id: string, name: string, email: string, password: string, enrollment: string, verificationCode: number): Promise<User | null> {
    const user = this.usersRepository.find((user) => {
      if (user.id === user_id) {
        user.name = name
        user.email = email
        user.enrollment = enrollment
        user.password = password
        user.verificationCode = verificationCode
      }

      return user
    })

    return user || null
  }

  async deleteUser(user_id: string): Promise<void> {
    this.usersRepository = this.usersRepository.filter((user) => user.id !== user_id)
  }

  async findRefreshToken(refresh_token: string): Promise<RefreshToken | null> {
    const refreshToken = this.refreshTokenRepository.find((token) => {
      return token.id === refresh_token
    })

    if (refreshToken) return refreshToken
    else return null
  }

  async deleteUserRefreshToken(user_id: string): Promise<void> {
    this.refreshTokenRepository = this.refreshTokenRepository.filter((token) => token.userId !== user_id)
  }
}

export { UsersRepositoryInMemory }