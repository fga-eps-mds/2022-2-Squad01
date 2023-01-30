"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRoutesByUserController = void 0;
var _tsyringe = require("tsyringe");
var _ListRoutesByUserUseCase = require("./ListRoutesByUserUseCase");
class ListRoutesByUserController {
  async handle(req, res) {
    const id = req.user;
    const listRouteByUserUseCase = _tsyringe.container.resolve(_ListRoutesByUserUseCase.ListRoutesByUserUseCase);
    const route = await listRouteByUserUseCase.execute(id);
    return res.status(200).json({
      route
    });
  }
}
exports.ListRoutesByUserController = ListRoutesByUserController;