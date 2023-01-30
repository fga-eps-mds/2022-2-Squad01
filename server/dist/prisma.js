"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prisma = void 0;
var _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
exports.prisma = prisma;