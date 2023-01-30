"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadUserController = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _ReadUserUseCase = require("./ReadUserUseCase");
class ReadUserController {
  async handle(req, res) {
    const user_id = req.user;
    if (!user_id) {
      throw new _AppError.AppError("Invalid parameters");
    }
    const readUserUseCase = _tsyringe.container.resolve(_ReadUserUseCase.ReadUserUseCase);
    const user = await readUserUseCase.execute(user_id);
    return res.status(200).json({
      user
    });
  }
}
exports.ReadUserController = ReadUserController;