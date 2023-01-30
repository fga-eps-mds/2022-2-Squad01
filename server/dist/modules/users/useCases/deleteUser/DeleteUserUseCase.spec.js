"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _DeleteUserUseCase = require("./DeleteUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
let deleteUserUseCase;
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(async () => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
    deleteUserUseCase = new _DeleteUserUseCase.DeleteUserUseCase(usersRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to delete an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await deleteUserUseCase.execute(user.id);
    const deletedUser = await usersRepositoryInMemory.findUserById(user.id);
    (0, _vitest.expect)(deletedUser).toBe(null);
  });
  (0, _vitest.it)("should not be able to delete an user that doesn't exists", async () => {
    await (0, _vitest.expect)(deleteUserUseCase.execute("invalid-user-id")).rejects.toThrowError();
  });
});