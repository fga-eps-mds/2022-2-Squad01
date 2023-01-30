"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteUserController = void 0;
var _DeleteUserUseCase = require("./DeleteUserUseCase");
var _tsyringe = require("tsyringe");
class DeleteUserController {
  async handle(req, res) {
    const user_id = req.user;
    const deleteUserUseCase = _tsyringe.container.resolve(_DeleteUserUseCase.DeleteUserUseCase);
    await deleteUserUseCase.execute(user_id);
    return res.status(200).json({
      message: "Successfully deleted user"
    });
  }
}
exports.DeleteUserController = DeleteUserController;