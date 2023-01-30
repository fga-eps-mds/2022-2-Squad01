"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRouteController = void 0;
var _tsyringe = require("tsyringe");
var _DeleteRouteUseCase = require("./DeleteRouteUseCase");
class DeleteRouteController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const user_id = request.user;
    const deleteRouteUseCase = _tsyringe.container.resolve(_DeleteRouteUseCase.DeleteRouteUseCase);
    await deleteRouteUseCase.execute(id, user_id);
    return response.status(204).send();
  }
}
exports.DeleteRouteController = DeleteRouteController;