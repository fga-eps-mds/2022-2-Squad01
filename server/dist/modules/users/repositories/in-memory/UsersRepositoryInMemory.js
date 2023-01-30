"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;
class UsersRepositoryInMemory {
  constructor() {
    this.usersRepository = [];
    this.refreshTokenRepository = [];
  }
  async create(data) {
    const {
      name,
      email,
      enrollment,
      password
    } = data;
    const user = Object.assign({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      enrollment,
      password,
      verificationCode: Math.floor(Math.random() * 100000)
    });
    this.usersRepository.push(user);
    return user;
  }
  async findUser(email) {
    return this.usersRepository.find(user => user.email === email) || null;
  }
  async findUserById(user_id) {
    return this.usersRepository.find(user => user.id === user_id) || null;
  }
  async getVerificationCode(user_id) {
    return this.usersRepository.find(user => user.id == user_id)?.verificationCode || null;
  }
  async verifyUser(user_id) {
    this.usersRepository.forEach(user => user.id === user_id && (user.isVerified = true));
    return;
  }
  async updateUser(user_id, name, email, password, enrollment, cellphone, instagram) {
    const user = this.usersRepository.find(user => {
      if (user.id === user_id) {
        user.name = name;
        user.email = email;
        user.enrollment = enrollment;
        user.password = password;
        user.cellphone = cellphone;
        user.instagram = instagram;
      }
      return user;
    });
    return user || null;
  }
  async deleteUser(user_id) {
    this.usersRepository = this.usersRepository.filter(user => user.id !== user_id);
  }
  async findRefreshToken(refresh_token) {
    const refreshToken = this.refreshTokenRepository.find(token => {
      return token.id === refresh_token;
    });
    if (refreshToken) return refreshToken;else return null;
  }
  async deleteUserRefreshToken(user_id) {
    this.refreshTokenRepository = this.refreshTokenRepository.filter(token => token.userId !== user_id);
  }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;