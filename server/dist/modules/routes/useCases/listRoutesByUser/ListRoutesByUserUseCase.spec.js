"use strict";

require("reflect-metadata");
var _vitest = require("vitest");
var _ListRoutesByUserUseCase = require("./ListRoutesByUserUseCase");
var _RoutesRepositoryInMemory = require("../../repositories/in-memory/RoutesRepositoryInMemory");
var _CreateRouteUseCase = require("../createRoute/CreateRouteUseCase");
let routesRepositoryInMemory;
let listRoutesByUserUseCase;
let createRouteUseCase;
(0, _vitest.describe)("Create Route Use Case", () => {
  (0, _vitest.beforeEach)(() => {
    routesRepositoryInMemory = new _RoutesRepositoryInMemory.RoutesRepostoryInMemory();
    listRoutesByUserUseCase = new _ListRoutesByUserUseCase.ListRoutesByUserUseCase(routesRepositoryInMemory);
    createRouteUseCase = new _CreateRouteUseCase.CreateRouteUseCase(routesRepositoryInMemory);
  });
  (0, _vitest.it)("should be able to list routes by user", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Jardim Botanico",
      originNeighborhoodSlug: "Jardim Botanico"
    });
    const routes = await listRoutesByUserUseCase.execute("fixed");
    (0, _vitest.expect)(routes).toHaveLength(1);
  });
});