import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { CreateUserUseCase } from "./CreateUserUseCase"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a new user with an existing email", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    await expect(
      createUserUseCase.execute({
        name: "User Test",
        email: "matricula@aluno.unb.br",
        password: "Senha123",
        enrollment: "matricula",
      })
    ).rejects.toThrow()
  })

  it("should not be able to create a new user from outside Universidade de Brasília", async () => {
    await expect(createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.uniesquina.br",
      password: "Senha123",
      enrollment: "matricula",
    })).rejects.toThrow()
  })

  it("should not be able to create a new user without a valid password", async () => {
    await expect(createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.uniesquina.br",
      password: "senha",
      enrollment: "matricula",
    })).rejects.toThrow()
  })
})