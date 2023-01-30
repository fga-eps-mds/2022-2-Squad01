"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserController = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _UpdateUserUseCase = require("./UpdateUserUseCase");
class UpdateUserController {
  async handle(req, res) {
    const user_id = req.user;
    const {
      name,
      email,
      password,
      enrollment,
      cellphone,
      instagram
    } = req.body;
    if (!user_id) {
      throw new _AppError.AppError("Invalid parameters");
    }
    const updateUserUseCase = _tsyringe.container.resolve(_UpdateUserUseCase.UpdateUserUseCase);
    const user = await updateUserUseCase.execute({
      user_id,
      name,
      email,
      password,
      enrollment,
      cellphone,
      instagram
    });
    res.status(200).json(user);
  }
}
exports.UpdateUserController = UpdateUserController;