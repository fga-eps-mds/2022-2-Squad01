"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismaUsersRepository = void 0;
var _prisma = require("../../../../../prisma");
class PrismaUsersRepository {
  async create(data) {
    const {
      email,
      name,
      enrollment,
      password,
      cellphone,
      instagram,
      verificationCode
    } = data;
    const user = await _prisma.prisma.user.create({
      data: {
        email,
        name,
        enrollment,
        password,
        cellphone,
        instagram,
        verificationCode
      }
    });
    return user;
  }
  async findUser(email) {
    const userExists = await _prisma.prisma.user.findFirst({
      where: {
        email
      }
    });
    return userExists;
  }
  async findUserById(user_id) {
    const userExists = await _prisma.prisma.user.findFirst({
      where: {
        id: user_id
      }
    });
    return userExists;
  }
  async getVerificationCode(user_id) {
    const user = await _prisma.prisma.user.findFirst({
      where: {
        id: user_id
      }
    });
    return user?.verificationCode || null;
  }
  async verifyUser(user_id) {
    await _prisma.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        isVerified: true,
        verificationCode: 0
      }
    });
  }
  async updateUser(user_id, name, email, password, enrollment, cellphone, instagram) {
    const user = await _prisma.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        email,
        name,
        enrollment,
        password,
        cellphone,
        instagram
      }
    });
    return user;
  }
  async deleteUser(user_id) {
    await _prisma.prisma.user.delete({
      where: {
        id: user_id
      }
    });
  }
}
exports.PrismaUsersRepository = PrismaUsersRepository;