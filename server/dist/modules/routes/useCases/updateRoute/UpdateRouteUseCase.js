"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateRouteUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IRoutesRepository = require("../../repositories/IRoutesRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let UpdateRouteUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RoutesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRoutesRepository.IRoutesRepository === "undefined" ? Object : _IRoutesRepository.IRoutesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateRouteUseCase {
  constructor(routesRepository) {
    this.routesRepository = routesRepository;
  }
  async execute({
    route_id,
    originName,
    destinationName,
    distance,
    duration,
    origin,
    destination,
    originNeighborhood
  }) {
    const route = await this.routesRepository.findById(route_id);
    if (!route) {
      throw new _AppError.AppError("Route does not exist!", 404);
    }
    const updatedUser = await this.routesRepository.updateRoute(route_id, originName, destinationName, distance, duration, origin, destination, originNeighborhood);
    return updatedUser;
  }
}) || _class) || _class) || _class) || _class);
exports.UpdateRouteUseCase = UpdateRouteUseCase;