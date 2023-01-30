"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;
var _CreateUserUseCase = require("./CreateUserUseCase");
var _tsyringe = require("tsyringe");
class CreateUserController {
  async handle(req, res) {
    const {
      email,
      name,
      enrollment,
      password,
      cellphone,
      instagram
    } = req.body;
    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);
    const user = await createUserUseCase.execute({
      email,
      name,
      enrollment,
      password,
      cellphone,
      instagram
    });
    return res.status(201).json({
      message: "User created sucessfully",
      id: user.id
    });
  }
}
exports.CreateUserController = CreateUserController;