"use strict";

var _tsyringe = require("tsyringe");
var _PrismaUsersRepository = require("../repositories/infra/prisma/PrismaUsersRepository");
var _jwtTokenAdapter = require("../adapters/jwt/jwt-token-adapter");
_tsyringe.container.registerSingleton("UsersRepository", _PrismaUsersRepository.PrismaUsersRepository);
_tsyringe.container.registerSingleton("TokenAdapter", _jwtTokenAdapter.JwtTokenAdapter);