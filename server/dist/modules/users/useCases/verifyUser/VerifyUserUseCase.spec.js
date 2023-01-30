"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _VerifyUserUseCase = require("./VerifyUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
let verifyUserUseCase;
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(async () => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
    verifyUserUseCase = new _VerifyUserUseCase.VerifyUserUseCase(usersRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to verify an user", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "123456789"
    });
    const verificationCode = await usersRepositoryInMemory.getVerificationCode(user.id);
    await verifyUserUseCase.execute({
      verificationCode: verificationCode.toString(),
      user_id: user.id
    });
    (0, _vitest.expect)(user.isVerified).toBeTruthy();
  });
  (0, _vitest.it)("should not be able to verify a non existing user", async () => {
    await (0, _vitest.expect)(verifyUserUseCase.execute({
      verificationCode: "non-existing-user",
      user_id: "non-existing-user"
    })).rejects.toThrow();
  });
  (0, _vitest.it)("should not be able to verify an user with an invalid code", async () => {
    const user = await createUserUseCase.execute({
      name: "User Test",
      email: "matricula@aluno.unb.br",
      password: "Senha123",
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await usersRepositoryInMemory.getVerificationCode(user.id);
    await (0, _vitest.expect)(verifyUserUseCase.execute({
      verificationCode: "wrong code",
      user_id: user.id
    })).rejects.toThrow();
  });
});