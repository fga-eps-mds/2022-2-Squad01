"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _ReadUserUseCase = require("./ReadUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
let readUserUseCase;
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(async () => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
    readUserUseCase = new _ReadUserUseCase.ReadUserUseCase(usersRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to read an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "123456789"
    });
    const userFound = await readUserUseCase.execute(user.id);
    (0, _vitest.expect)(userFound).toHaveProperty("id");
  });
  (0, _vitest.it)("should not be able to read an user that doesn't exist", async () => {
    await (0, _vitest.expect)(readUserUseCase.execute("invalid id")).rejects.toThrow();
  });
});