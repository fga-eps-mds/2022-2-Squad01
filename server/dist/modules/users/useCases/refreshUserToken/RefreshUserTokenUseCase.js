"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshUserTokenUseCase = void 0;
var _tokenAdapter = require("../../adapters/token-adapter");
var _AppError = require("../../../../shared/errors/AppError");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let RefreshUserTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("TokenAdapter")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _tokenAdapter.ITokenAdapter === "undefined" ? Object : _tokenAdapter.ITokenAdapter]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class RefreshUserTokenUseCase {
  constructor(tokenAdapter) {
    this.tokenAdapter = tokenAdapter;
  }
  async execute(refresh_token) {
    const refreshToken = await this.tokenAdapter.findRefreshToken(refresh_token);
    if (!refreshToken) {
      throw new _AppError.AppError("Invalid refresh token");
    }
    const token = this.tokenAdapter.generateToken(refreshToken.userId);
    const isTokenExpired = (0, _dayjs.default)().isAfter(_dayjs.default.unix(refreshToken.expiresIn));
    if (isTokenExpired) {
      await this.tokenAdapter.deleteUserRefreshToken(refreshToken.userId);
      const newRefreshToken = this.tokenAdapter.generateRefreshToken(refreshToken.userId);
      return {
        token,
        refreshToken: newRefreshToken
      };
    }
    return {
      token
    };
  }
}) || _class) || _class) || _class) || _class);
exports.RefreshUserTokenUseCase = RefreshUserTokenUseCase;