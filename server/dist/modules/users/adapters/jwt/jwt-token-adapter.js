"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtTokenAdapter = void 0;
var jwt = _interopRequireWildcard(require("jsonwebtoken"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _prisma = require("prisma");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class JwtTokenAdapter {
  generateToken(user_id) {
    const token = jwt.sign({
      id: user_id
    }, process.env.JWT_SECRET || "fake jwt secret for testing", {
      subject: user_id,
      expiresIn: "1d"
    });
    return token;
  }
  async generateRefreshToken(user_id) {
    const expiresIn = (0, _dayjs.default)().add(15, "second").unix();
    const refreshToken = await _prisma.prisma.refreshToken.create({
      data: {
        userId: user_id,
        expiresIn
      }
    });
    return refreshToken;
  }
  async findRefreshToken(refresh_token) {
    const refreshToken = await _prisma.prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    });
    return refreshToken;
  }
  async deleteUserRefreshToken(user_id) {
    console.log(user_id);
    const count = await _prisma.prisma.refreshToken.count({
      where: {
        userId: user_id
      }
    });
    if (count > 0) {
      await _prisma.prisma.refreshToken.deleteMany({
        where: {
          userId: user_id
        }
      });
    }
  }
}
exports.JwtTokenAdapter = JwtTokenAdapter;