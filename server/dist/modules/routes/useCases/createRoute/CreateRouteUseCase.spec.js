"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _CreateRouteUseCase = require("./CreateRouteUseCase");
var _RoutesRepositoryInMemory = require("../../repositories/in-memory/RoutesRepositoryInMemory");
let routesRepositoryInMemory;
let createRouteUseCase;
(0, _vitest.describe)("Create Route Use Case", () => {
  (0, _vitest.beforeEach)(() => {
    routesRepositoryInMemory = new _RoutesRepositoryInMemory.RoutesRepostoryInMemory();
    createRouteUseCase = new _CreateRouteUseCase.CreateRouteUseCase(routesRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to create a new route", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Origin Neighborhood"
    });

    // expect(route).toHaveProperty("id")

    (0, _vitest.expect)(true).toBe(true);
  });
  (0, _vitest.it)("should not be able to create a new route with same origin and destination", async () => {
    await (0, _vitest.expect)(createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Test",
      destinationName: "Route Test",
      distance: 10,
      duration: 10,
      origin: ["12312", "123124"],
      destination: ["12312", "123124"],
      originNeighborhood: "Origin Neighborhood"
    })).rejects.toThrow();
  });
});