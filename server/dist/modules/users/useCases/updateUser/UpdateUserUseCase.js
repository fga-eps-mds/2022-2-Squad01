"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserUseCase = void 0;
var _tsyringe = require("tsyringe");
var _IUsersRepository = require("../../repositories/IUsersRepository");
var _AppError = require("../../../../shared/errors/AppError");
var _dec, _dec2, _dec3, _dec4, _class;
let UpdateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    user_id,
    name,
    email,
    password,
    enrollment,
    cellphone,
    instagram
  }) {
    const user = await this.usersRepository.findUserById(user_id);
    if (!user) {
      throw new _AppError.AppError("User does not exist!", 404);
    }
    const updatedUser = await this.usersRepository.updateUser(user_id, name, email, password, enrollment, cellphone, instagram);
    return updatedUser;
  }
}) || _class) || _class) || _class) || _class);
exports.UpdateUserUseCase = UpdateUserUseCase;