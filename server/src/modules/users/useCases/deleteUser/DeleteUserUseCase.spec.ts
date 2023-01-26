import "reflect-metadata"
import { beforeEach, describe, it, expect } from "vitest"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { UsersRepositoryInMemory } from "@modules/users/repositories/in-memory/UsersRepositoryInMemory"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"
import { DeleteUserUseCase } from "./DeleteUserUseCase"

let usersRepositoryInMemory: IUsersRepository
let createUserUseCase: CreateUserUseCase
let deleteUserUseCase: DeleteUserUseCase

const mailAdapterMock: IMailAdapter = {
  sendMail: () => Promise.resolve(),
}

describe("Create User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock)
    deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to delete an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
    })

    await deleteUserUseCase.execute(user.id)

    const deletedUser = await usersRepositoryInMemory.findUserById(user.id)

    expect(deletedUser).toBe(null)
  })

  it("should not be able to delete an user that doesn't exists", async () => {
    await expect(deleteUserUseCase.execute("invalid-user-id")).rejects.toThrowError()
  })
})