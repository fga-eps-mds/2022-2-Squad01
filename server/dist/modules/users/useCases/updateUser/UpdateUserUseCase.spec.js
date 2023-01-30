"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _ReadUserUseCase = require("../readUser/ReadUserUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _UpdateUserUseCase = require("./UpdateUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
let readUserUseCase;
let updateUserUseCase;
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(async () => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
    readUserUseCase = new _ReadUserUseCase.ReadUserUseCase(usersRepositoryInMemory);
    updateUserUseCase = new _UpdateUserUseCase.UpdateUserUseCase(usersRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to update an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await updateUserUseCase.execute({
      user_id: user.id,
      name: "Updated User Test"
    });
    const userFound = await readUserUseCase.execute(user.id);
    (0, _vitest.expect)(userFound.name).toBe("Updated User Test");
  });
  (0, _vitest.it)("should not be able to update an user that doesn't exist", async () => {
    await (0, _vitest.expect)(updateUserUseCase.execute({
      user_id: "invalid user id",
      name: "Updated User Test"
    })).rejects.toThrow();
  });
});