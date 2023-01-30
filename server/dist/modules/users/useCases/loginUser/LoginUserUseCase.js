"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var bcrypt = _interopRequireWildcard(require("bcryptjs"));
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _tokenAdapter = require("../../adapters/token-adapter");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let LoginUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("TokenAdapter")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _tokenAdapter.ITokenAdapter === "undefined" ? Object : _tokenAdapter.ITokenAdapter]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class LoginUserUseCase {
  constructor(usersRepository, tokenAdapter) {
    this.usersRepository = usersRepository;
    this.tokenAdapter = tokenAdapter;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findUser(email);
    if (!user) {
      throw new _AppError.AppError("Invalid credentials");
    }

    // Talvez seja melhor tratar isso no front
    // if (!user.isVerified) {
    //   throw new AppError("Verify your account to continue")
    // }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new _AppError.AppError("Invalid credentials");
    }
    const token = this.tokenAdapter.generateToken(user.id);
    await this.tokenAdapter.deleteUserRefreshToken(user.id);
    const refreshToken = await this.tokenAdapter.generateRefreshToken(user.id);
    const filteredUserData = {
      id: user.id,
      email: user.email,
      name: user.name,
      enrollment: user.enrollment,
      isVerified: user.isVerified,
      cellphone: user.cellphone,
      instagram: user.instagram
    };
    return {
      token,
      refreshToken,
      user: filteredUserData
    };
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.LoginUserUseCase = LoginUserUseCase;