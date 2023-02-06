"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismaRoutesRepository = void 0;
var _prisma = require("prisma");
class PrismaRoutesRepository {
  async create(data) {
    const {
      distance,
      duration,
      originName,
      destination,
      origin,
      userId,
      originNeighborhood,
      originNeighborhoodSlug,
      destinationName
    } = data;
    const route = await _prisma.prisma.route.create({
      data: {
        distance,
        duration,
        originName,
        destination,
        origin,
        createdBy: userId,
        originNeighborhood,
        originNeighborhoodSlug,
        destinationName
      }
    });
    return route;
  }
  async findById(id) {
    const route = await _prisma.prisma.route.findUnique({
      where: {
        id
      }
    });
    return route;
  }
  async listByUser(userId) {
    const routes = await _prisma.prisma.route.findMany({
      where: {
        createdBy: userId
      }
    });
    return routes;
  }
  async listByNeighborhood(neighborhood) {
    const routes = await _prisma.prisma.route.findMany({
      where: {
        originNeighborhoodSlug: neighborhood
      }
    });
    return routes;
  }
  async updateRoute(id, originName, destinationName, distance, duration, origin, destination, originNeighborhood) {
    const route = await _prisma.prisma.route.update({
      where: {
        id
      },
      data: {
        originName,
        destinationName,
        distance,
        duration,
        origin,
        destination,
        originNeighborhood,
        originNeighborhoodSlug: originNeighborhood.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ").join("-")
      }
    });
    return route;
  }
  async listAll() {
    const routes = await _prisma.prisma.route.findMany();
    return routes;
  }
  async delete(id) {
    await _prisma.prisma.route.delete({
      where: {
        id
      }
    });
  }
}
exports.PrismaRoutesRepository = PrismaRoutesRepository;