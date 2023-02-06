"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutesRepostoryInMemory = void 0;
class RoutesRepostoryInMemory {
  constructor() {
    this.routesRepository = [];
  }
  async create(data) {
    const {
      originName,
      destinationName,
      originNeighborhoodSlug,
      destination,
      distance,
      duration,
      origin,
      originNeighborhood
    } = data;
    const route = Object.assign({
      id: Math.random().toString(36).substr(2, 9),
      userId: "fixed",
      createdBy: "fixed",
      originName,
      destinationName,
      originNeighborhoodSlug,
      origin,
      destination,
      duration,
      distance,
      originNeighborhood
    });
    this.routesRepository.push(route);
    return route;
  }
  async findById(id) {
    const route = this.routesRepository.find(route => {
      return route.id === id;
    });
    if (route) return route;else return null;
  }
  async listAll() {
    return this.routesRepository;
  }
  async listByUser(userId) {
    const routes = this.routesRepository.filter(route => {
      return route.createdBy === userId;
    });
    if (routes) return routes;else return null;
  }
  async listByNeighborhood(neighbordhoodSlug) {
    const routes = this.routesRepository.filter(route => {
      return route.originNeighborhoodSlug === neighbordhoodSlug;
    });
    if (routes) return routes;else return null;
  }
  async updateRoute(id, originName, destinationName, distance, duration, origin, destination, originNeighborhood, originNeighborhoodSlug) {
    const newRoute = this.routesRepository.find(route => {
      if (route.id === id) {
        route.originName = originName || route.originName;
        route.destinationName = destinationName || route.destinationName;
        route.distance = distance || route.distance;
        route.duration = duration || route.duration;
        route.origin = origin || route.origin;
        route.destination = destination || route.destination;
        route.originNeighborhood = originNeighborhood || route.originNeighborhood;
        route.originNeighborhoodSlug = originNeighborhoodSlug || route.originNeighborhoodSlug;
      }
      return route;
    });
    return newRoute || null;
  }
}
exports.RoutesRepostoryInMemory = RoutesRepostoryInMemory;