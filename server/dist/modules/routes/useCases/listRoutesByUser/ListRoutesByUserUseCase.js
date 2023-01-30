"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRoutesByUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("../../../../shared/errors/AppError");
var _IRoutesRepository = require("../../repositories/IRoutesRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let ListRoutesByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RoutesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRoutesRepository.IRoutesRepository === "undefined" ? Object : _IRoutesRepository.IRoutesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListRoutesByUserUseCase {
  constructor(routesRepository) {
    this.routesRepository = routesRepository;
  }
  async execute(userId) {
    if (!userId) {
      throw new _AppError.AppError("Missing parameters");
    }
    const route = await this.routesRepository.listByUser(userId);
    if (!route) {
      throw new _AppError.AppError("Route not found");
    }
    return route;
  }
}) || _class) || _class) || _class) || _class);
exports.ListRoutesByUserUseCase = ListRoutesByUserUseCase;