"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshUserTokenController = void 0;
var _RefreshUserTokenUseCase = require("./RefreshUserTokenUseCase");
var _tsyringe = require("tsyringe");
class RefreshUserTokenController {
  async handle(req, res) {
    const {
      refresh_token
    } = req.body;
    const refreshUserTokenUseCase = _tsyringe.container.resolve(_RefreshUserTokenUseCase.RefreshUserTokenUseCase);
    const token = await refreshUserTokenUseCase.execute(refresh_token);
    return res.json(token);
  }
}
exports.RefreshUserTokenController = RefreshUserTokenController;