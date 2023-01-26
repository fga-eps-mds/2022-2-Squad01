import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { VerifyUserUseCase } from "./VerifyUserUseCase"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase
let verifyUserUseCase: VerifyUserUseCase

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
    verifyUserUseCase = new VerifyUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to verify an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    const verificationCode = await usersRepositoryInMemory.getVerificationCode(user.id)

    await verifyUserUseCase.execute({
      verificationCode: verificationCode!.toString(),
      user_id: user.id,
    })

    expect(user.isVerified).toBeTruthy()
  })
  it("should not be able to verify a non existing user", async () => {
    await expect(verifyUserUseCase.execute({
      verificationCode: "non-existing-user",
      user_id: "non-existing-user",
    })).rejects.toThrow()
  })

  it("should not be able to verify an user with an invalid code", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    await usersRepositoryInMemory.getVerificationCode(user.id)

    await expect(verifyUserUseCase.execute({
      verificationCode: "wrong code",
      user_id: user.id,
    })).rejects.toThrow()
  })
})