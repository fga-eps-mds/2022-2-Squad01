"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _VerifyUserUseCase = require("../verifyUser/VerifyUserUseCase");
var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");
var _LoginUserUseCase = require("./LoginUserUseCase");
let usersRepositoryInMemory;
let createUserUseCase;
let loginUserUseCase;
let verifyUserUseCase;
const TokenAdapterMock = {
  generateRefreshToken: async userId => {
    const refreshToken = {
      id: "sadi203i123sdsw0aidwad0",
      userId: userId,
      expiresIn: 2000
    };
    return refreshToken;
  },
  generateToken: function (user_id) {
    return user_id;
  },
  findRefreshToken: function (refresh_token) {
    return Promise.resolve(null);
  },
  deleteUserRefreshToken: function (user_id) {
    return Promise.resolve();
  }
};
const mailAdapterMock = {
  sendMail: () => Promise.resolve()
};
(0, _vitest.describe)("Create User", () => {
  (0, _vitest.beforeEach)(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, mailAdapterMock);
    loginUserUseCase = new _LoginUserUseCase.LoginUserUseCase(usersRepositoryInMemory, TokenAdapterMock);
    verifyUserUseCase = new _VerifyUserUseCase.VerifyUserUseCase(usersRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to login an user", async () => {
    const email = "matricula@aluno.unb.br";
    const password = "Senha123";
    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString()
    });
    const loggedUser = await loginUserUseCase.execute({
      email,
      password
    });
    (0, _vitest.expect)(loggedUser).toHaveProperty("token");
  });

  // it("should not be able to login an unverified user", async () => {
  //   const email = "matricula@aluno.unb.br"
  //   const password = "Senha123"

  //   await createUserUseCase.execute({
  //     name: "User Test",
  //     email: "matricula@aluno.unb.br",
  //     password: "Senha123",
  //     enrollment: "matricula",
  //   })

  //   await expect(loginUserUseCase.execute({
  //     email,
  //     password
  //   })).rejects.toThrow()
  // })

  (0, _vitest.it)("should not be able to login an user with an incorrect email", async () => {
    const email = "matricula@aluno.unb.br";
    const password = "Senha123";
    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString()
    });
    await (0, _vitest.expect)(loginUserUseCase.execute({
      email: "incorrect email",
      password
    })).rejects.toThrow();
  });
  (0, _vitest.it)("should not be able to login an user with an incorrect password", async () => {
    const email = "matricula@aluno.unb.br";
    const password = "Senha123";
    const user = await createUserUseCase.execute({
      name: "User Test",
      email,
      password,
      enrollment: "matricula",
      cellphone: "123456789"
    });
    await verifyUserUseCase.execute({
      user_id: user.id,
      verificationCode: user.verificationCode.toString()
    });
    await (0, _vitest.expect)(loginUserUseCase.execute({
      email,
      password: "incorrect password"
    })).rejects.toThrow();
  });
});