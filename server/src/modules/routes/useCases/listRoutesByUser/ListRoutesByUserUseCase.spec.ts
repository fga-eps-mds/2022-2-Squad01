import 'reflect-metadata'
import { beforeEach, describe, expect, it } from "vitest";
import { ListRoutesByUserUseCase } from "./ListRoutesByUserUseCase";
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { RoutesRepostoryInMemory } from "@modules/routes/repositories/in-memory/RoutesRepositoryInMemory";
import { CreateRouteUseCase } from '../createRoute/CreateRouteUseCase';

let routesRepositoryInMemory: IRoutesRepository
let listRoutesByUserUseCase: ListRoutesByUserUseCase
let createRouteUseCase: CreateRouteUseCase

describe("Create Route Use Case", () => {
  beforeEach(() => {
    routesRepositoryInMemory = new RoutesRepostoryInMemory()
    listRoutesByUserUseCase = new ListRoutesByUserUseCase(routesRepositoryInMemory)
    createRouteUseCase = new CreateRouteUseCase(routesRepositoryInMemory)
  })

  it("should be able to list routes by user", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Jardim Botanico",
      originNeighborhoodSlug: "Jardim Botanico",
    })

    const routes = await listRoutesByUserUseCase.execute("fixed")

    expect(routes).toHaveLength(1)
  })
})