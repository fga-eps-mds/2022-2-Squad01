"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateRouteController = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _UpdateRouteUseCase = require("./UpdateRouteUseCase");
class UpdateRouteController {
  async handle(req, res) {
    const {
      originName,
      destinationName,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood
    } = req.body;
    let {
      route_id
    } = req.headers;
    route_id = String(route_id);
    if (!route_id) {
      throw new _AppError.AppError('Invalid parameters');
    }
    const updateRouteUseCase = _tsyringe.container.resolve(_UpdateRouteUseCase.UpdateRouteUseCase);
    const route = await updateRouteUseCase.execute({
      route_id,
      destination,
      destinationName,
      distance,
      duration,
      origin,
      originName,
      originNeighborhood
    });
    return res.status(200).json(route);
  }
}
exports.UpdateRouteController = UpdateRouteController;