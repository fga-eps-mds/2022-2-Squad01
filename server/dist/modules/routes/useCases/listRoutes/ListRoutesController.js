"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRoutesController = void 0;
var _tsyringe = require("tsyringe");
var _ListRoutesUseCase = require("./ListRoutesUseCase");
class ListRoutesController {
  async handle(req, res) {
    const listRoutesUseCase = _tsyringe.container.resolve(_ListRoutesUseCase.ListRoutesUseCase);
    const routes = await listRoutesUseCase.execute();
    return res.json({
      routes
    });
  }
}
exports.ListRoutesController = ListRoutesController;