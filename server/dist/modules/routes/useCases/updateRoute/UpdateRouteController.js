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
    const routeId = req.params.id;
    const {
      originName,
      destinationName,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood,
      originNeighborhoodSlug
    } = req.body;
    if (!routeId) {
      throw new _AppError.AppError('Invalid parameters');
    }
    const updateRouteUseCase = _tsyringe.container.resolve(_UpdateRouteUseCase.UpdateRouteUseCase);
    const route = await updateRouteUseCase.execute({
      routeId,
      destination,
      destinationName,
      distance,
      duration,
      origin,
      originName,
      originNeighborhood,
      originNeighborhoodSlug
    });
    res.status(200).json(route);
  }
}
exports.UpdateRouteController = UpdateRouteController;