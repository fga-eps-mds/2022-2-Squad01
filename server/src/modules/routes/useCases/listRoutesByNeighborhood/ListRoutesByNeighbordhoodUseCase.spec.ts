import 'reflect-metadata'
import { beforeEach, describe, expect, it } from "vitest";
import { ListRoutesByNeighborhoodUseCase } from "./ListRoutesByNeighborhoodUseCase";
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { RoutesRepostoryInMemory } from "@modules/routes/repositories/in-memory/RoutesRepositoryInMemory";
import { CreateRouteUseCase } from '../createRoute/CreateRouteUseCase';

let routesRepositoryInMemory: IRoutesRepository
let listRoutesByNeighborhoodUseCase: ListRoutesByNeighborhoodUseCase
let createRouteUseCase: CreateRouteUseCase

describe("Create Route Use Case", () => {
  beforeEach(() => {
    routesRepositoryInMemory = new RoutesRepostoryInMemory()
    listRoutesByNeighborhoodUseCase = new ListRoutesByNeighborhoodUseCase(routesRepositoryInMemory)
    createRouteUseCase = new CreateRouteUseCase(routesRepositoryInMemory)
  })

  it("should be able to list routes by their neighborhood of origin", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Jardim Botanico",
    })

    const routes = await listRoutesByNeighborhoodUseCase.execute("jardim-botanico")

    expect(routes).toHaveLength(1)
  })
})