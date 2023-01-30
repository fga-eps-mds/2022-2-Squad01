"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyUserController = void 0;
var _tsyringe = require("tsyringe");
var _VerifyUserUseCase = require("./VerifyUserUseCase");
class VerifyUserController {
  async handle(req, res) {
    const {
      verificationCode
    } = req.body;
    const {
      user_id
    } = req.headers;
    const verifyUserUseCase = _tsyringe.container.resolve(_VerifyUserUseCase.VerifyUserUseCase);
    await verifyUserUseCase.execute({
      verificationCode,
      user_id: user_id
    });
    return res.status(200).json({
      message: "Successfully verified user"
    });
  }
}
exports.VerifyUserController = VerifyUserController;