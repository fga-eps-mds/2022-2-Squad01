"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRouteUseCase = void 0;
var _IRoutesRepository = require("../../repositories/IRoutesRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let DeleteRouteUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RoutesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRoutesRepository.IRoutesRepository === "undefined" ? Object : _IRoutesRepository.IRoutesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteRouteUseCase {
  constructor(routesRepository) {
    this.routesRepository = routesRepository;
  }
  async execute(id, user_id) {
    const route = await this.routesRepository.findById(id);
    if (!route) {
      throw new _AppError.AppError("Route does not exists");
    }
    if (route.createdBy === user_id) {
      await this.routesRepository.delete(id);
    } else {
      throw new _AppError.AppError("You are not allowed to delete this route");
    }
  }
}) || _class) || _class) || _class) || _class);
exports.DeleteRouteUseCase = DeleteRouteUseCase;