"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRouteController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteRouteUseCase = require("./DeleteRouteUseCase");
class DeleteRouteController {
  async handle(req, res) {
    let {
      id
    } = req.headers;
    const user_id = req.user;
    id = String(id);
    const deleteRouteUseCase = _tsyringe.container.resolve(_DeleteRouteUseCase.DeleteRouteUseCase);
    await deleteRouteUseCase.execute(id, user_id);
    return res.status(204).send();
  }
}
exports.DeleteRouteController = DeleteRouteController;