import 'reflect-metadata'
import { beforeEach, describe, expect, it } from "vitest";
import { CreateRouteUseCase } from "../createRoute/CreateRouteUseCase";
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository";
import { RoutesRepostoryInMemory } from "@modules/routes/repositories/in-memory/RoutesRepositoryInMemory";
import { UpdateRouteUseCase } from './UpdateRouteUseCase';

let routesRepositoryInMemory: IRoutesRepository
let createRouteUseCase: CreateRouteUseCase
let updateRouteUseCase: UpdateRouteUseCase

describe("Create Route Use Case", () => {
  beforeEach(() => {
    routesRepositoryInMemory = new RoutesRepostoryInMemory()
    createRouteUseCase = new CreateRouteUseCase(routesRepositoryInMemory)
    updateRouteUseCase = new UpdateRouteUseCase(routesRepositoryInMemory)
  })

  it("should be able to update a route", async () => {
    const route = await createRouteUseCase.execute({
      userId: "fixed",
      originName: "Route Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Origin Neighborhood",
      originNeighborhoodSlug: "Origin Neighborhood",
    })

    const updatedRoute = await updateRouteUseCase.execute({
      routeId: route.id,
      originName: "Updated Origin",
      destinationName: "Route Destination",
      distance: 10,
      duration: 10,
      origin: ["4321", "4321"],
      destination: ["123123", "1234124"],
      originNeighborhood: "Origin Neighborhood",
      originNeighborhoodSlug: "Origin Neighborhood",
    })

    expect(updatedRoute!.originName).toBe("Updated Origin")
  })
})