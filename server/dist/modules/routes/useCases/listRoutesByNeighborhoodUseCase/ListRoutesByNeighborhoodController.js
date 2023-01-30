"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRoutesByNeighborhoodController = void 0;
var _tsyringe = require("tsyringe");
var _ListRoutesByNeighborhoodUseCase = require("./ListRoutesByNeighborhoodUseCase");
class ListRoutesByNeighborhoodController {
  async handle(req, res) {
    const {
      neighborhood
    } = req.params;
    const listRouteByNeighborhoodUseCase = _tsyringe.container.resolve(_ListRoutesByNeighborhoodUseCase.ListRoutesByNeighborhoodUseCase);
    const route = await listRouteByNeighborhoodUseCase.execute(neighborhood);
    return res.status(200).json({
      route
    });
  }
}
exports.ListRoutesByNeighborhoodController = ListRoutesByNeighborhoodController;