"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUserController = void 0;
var _tsyringe = require("tsyringe");
var _LoginUserUseCase = require("./LoginUserUseCase");
class LoginUserController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const loginUserUseCase = _tsyringe.container.resolve(_LoginUserUseCase.LoginUserUseCase);
    const {
      token,
      refreshToken,
      user
    } = await loginUserUseCase.execute({
      email,
      password
    });
    return res.status(200).json({
      message: "Successfull logged in",
      token,
      refreshToken,
      user
    });
  }
}
exports.LoginUserController = LoginUserController;