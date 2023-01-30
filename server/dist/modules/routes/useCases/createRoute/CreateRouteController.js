"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRouteController = void 0;
var _CreateRouteUseCase = require("./CreateRouteUseCase");
var _tsyringe = require("tsyringe");
class CreateRouteController {
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
    const id = req.user;
    const createRouteUseCase = _tsyringe.container.resolve(_CreateRouteUseCase.CreateRouteUseCase);
    const route = await createRouteUseCase.execute({
      userId: id,
      originName,
      destinationName,
      distance,
      duration,
      origin,
      destination,
      originNeighborhood
    });
    return res.status(201).json({
      route
    });
  }
}
exports.CreateRouteController = CreateRouteController;