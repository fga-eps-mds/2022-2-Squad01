"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _CreateUserUseCase = require("./CreateUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
  });
  (0, _vitest.it)("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "61999999999",
      instagram: "instagram"
    });
    (0, _vitest.expect)(user).toHaveProperty("id");
  });
  (0, _vitest.it)("should not be able to create a new user with an existing email", async () => {
    await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "61999999999",
      instagram: "instagram"
    });
    await (0, _vitest.expect)(createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "61999999999",
      instagram: "instagram"
    })).rejects.toThrow();
  });
  (0, _vitest.it)("should not be able to create a new user from outside Universidade de Brasília", async () => {
    await (0, _vitest.expect)(createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.uniesquina.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "61999999999",
      instagram: "instagram"
    })).rejects.toThrow();
  });
  (0, _vitest.it)("should not be able to create a new user without a valid password", async () => {
    await (0, _vitest.expect)(createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.uniesquina.br",
      password: "senha",
      enrollment: "matricula",
      cellphone: "61999999999",
      instagram: "instagram"
    })).rejects.toThrow();
  });
});