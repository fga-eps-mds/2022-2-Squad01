import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { ReadUserUseCase } from "./ReadUserUseCase"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase
let readUserUseCase: ReadUserUseCase

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
    readUserUseCase = new ReadUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to read an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    const userFound = await readUserUseCase.execute(user.id)

    expect(userFound).toHaveProperty("id")
  })

  it("should not be able to read an user that doesn't exist", async () => {
    await expect(readUserUseCase.execute("invalid id")).rejects.toThrow()
  })
})