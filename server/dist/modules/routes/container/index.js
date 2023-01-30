"use strict";

var _tsyringe = require("tsyringe");
var _PrismaRoutesRepository = require("../repositories/infra/prisma/PrismaRoutesRepository");
_tsyringe.container.registerSingleton("RoutesRepository", _PrismaRoutesRepository.PrismaRoutesRepository);