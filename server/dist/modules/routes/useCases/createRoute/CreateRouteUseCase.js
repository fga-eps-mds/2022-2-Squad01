"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRouteUseCase = void 0;
var _IRoutesRepository = require("../../repositories/IRoutesRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateRouteUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("RoutesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IRoutesRepository.IRoutesRepository === "undefined" ? Object : _IRoutesRepository.IRoutesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateRouteUseCase {
  constructor(routesRepository) {
    this.routesRepository = routesRepository;
  }
  async execute({
    userId,
    originName,
    distance,
    duration,
    origin,
    destination,
    originNeighborhood,
    destinationName
  }) {
    if (!originName || !distance || !duration || !origin || !destination || !originNeighborhood || !destinationName) {
      throw new _AppError.AppError("Missing parameters");
    }
    if (origin === destination || originName === destinationName) {
      throw new _AppError.AppError("Origin and destination cannot be the same");
    }
    const route = await this.routesRepository.create({
      userId,
      originName,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood: originNeighborhood,
      destinationName,
      originNeighborhoodSlug: originNeighborhood.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")
    });
    return route;
  }
}) || _class) || _class) || _class) || _class);
exports.CreateRouteUseCase = CreateRouteUseCase;