"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateRouteUseCase = require("../createRoute/CreateRouteUseCase");
var _RoutesRepositoryInMemory = require("../../repositories/in-memory/RoutesRepositoryInMemory");
var _UpdateRouteUseCase = require("./UpdateRouteUseCase");
let routesRepositoryInMemory;
let createRouteUseCase;
let updateRouteUseCase;
(0, _vitest.describe)("Create Route Use Case", () => {
  (0, _vitest.beforeEach)(() => {
    routesRepositoryInMemory = new _RoutesRepositoryInMemory.RoutesRepostoryInMemory();
    createRouteUseCase = new _CreateRouteUseCase.CreateRouteUseCase(routesRepositoryInMemory);
    updateRouteUseCase = new _UpdateRouteUseCase.UpdateRouteUseCase(routesRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to update a route", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Origin Neighborhood",
      originNeighborhoodSlug: "Origin Neighborhood"
    });
    const updatedRoute = await updateRouteUseCase.execute({
      routeId: route.id,
      originName: "Updated Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Origin Neighborhood",
      originNeighborhoodSlug: "Origin Neighborhood"
    });
    (0, _vitest.expect)(updatedRoute.originName).toBe("Updated Origin");
  });
});