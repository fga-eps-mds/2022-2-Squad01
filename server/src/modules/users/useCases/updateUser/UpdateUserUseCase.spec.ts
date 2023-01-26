import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ReadUserUseCase } from "../readUser/ReadUserUseCase"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase
let readUserUseCase: ReadUserUseCase
let updateUserUseCase: UpdateUserUseCase

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
    readUserUseCase = new ReadUserUseCase(usersRepositoryInMemory)
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to update an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    await updateUserUseCase.execute({
      user_id: user.id,
      name: "Updated User Test",
    })

    const userFound = await readUserUseCase.execute(user.id)

    expect(userFound.name).toBe("Updated User Test")
  })

  it("should not be able to update an user that doesn't exist", async () => {
    await expect(
      updateUserUseCase.execute({
        user_id: "invalid user id",
        name: "Updated User Test",
      })
    ).rejects.toThrow()
  })
})