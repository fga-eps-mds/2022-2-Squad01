import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { VerifyUserUseCase } from "../verifyUser/VerifyUserUseCase"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { LoginUserUseCase } from "./LoginUserUseCase"
import { RefreshToken } from "@prisma/client"
import { ITokenAdapter } from "@modules/users/adapters/token-adapter"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase
let loginUserUseCase: LoginUserUseCase
let verifyUserUseCase: VerifyUserUseCase

const TokenAdapterMock: ITokenAdapter = {
  generateRefreshToken: async (userId: string) => {
    const refreshToken: RefreshToken = {
      id: "sadi203i123sdsw0aidwad0",
      userId: userId,
      expiresIn: 2000,
    }
    return refreshToken
  },

  generateToken: function (user_id: string): string {
    return user_id;
  },

  findRefreshToken: function (refresh_token: string): Promise<RefreshToken | null> {
    return Promise.resolve(null)
  },

  deleteUserRefreshToken: function (user_id: string): Promise<void> {
    return Promise.resolve()
  }
}

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory, TokenAdapterMock)
    verifyUserUseCase = new VerifyUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to login an user", async () => {
    const email = "matricula@aluno.unb.br"
    const password = "Senha123"

    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
    })

    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString(),
    })

    const loggedUser = await loginUserUseCase.execute({
      email,
      password
    })

    expect(loggedUser).toHaveProperty("token")
  })

  // it("should not be able to login an unverified user", async () => {
  //   const email = "matricula@aluno.unb.br"
  //   const password = "Senha123"

  //   await createUserUseCase.execute({
  //     name: "User Test",
  //     email: "matricula@aluno.unb.br",
  //     password: "Senha123",
  //     enrollment: "matricula",
  //   })

  //   await expect(loginUserUseCase.execute({
  //     email,
  //     password
  //   })).rejects.toThrow()
  // })

  it("should not be able to login an user with an incorrect email", async () => {
    const email = "matricula@aluno.unb.br"
    const password = "Senha123"

    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
    })

    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString(),
    })

    await expect(loginUserUseCase.execute({
      email: "incorrect email",
      password
    })).rejects.toThrow()
  })

  it("should not be able to login an user with an incorrect password", async () => {
    const email = "matricula@aluno.unb.br"
    const password = "Senha123"

    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
    })

    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString(),
    })

    await expect(loginUserUseCase.execute({
      email,
      password: "incorrect password"
    })).rejects.toThrow()
  })
})