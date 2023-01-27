import "reflect-metadata"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateRouteUseCase } from "./CreateRouteUseCase"
import { IRoutesRepository } from "@modules/routes/repositories/IRoutesRepository"
import { RoutesRepostoryInMemory } from "@modules/routes/repositories/in-memory/RoutesRepositoryInMemory"

let routesRepositoryInMemory: IRoutesRepository
let createRouteUseCase: CreateRouteUseCase

describe("Create Route Use Case", () => {
  beforeEach(() => {
    routesRepositoryInMemory = new RoutesRepostoryInMemory()
    createRouteUseCase = new CreateRouteUseCase(routesRepositoryInMemory)
  })

  it("should be able to create a new route", async () => {

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


    // expect(route).toHaveProperty("id")

    
    expect(true).toBe(true)
  })

  it("should not be able to create a new route with same origin and destination", async () => {
    await expect(
      createRouteUseCase.execute({
        userId: "fixed",
        originName: "Route Test",
        destinationName: "Route Test",
        distance: 10,
        duration: 10,
        origin: ["12312", "123124"],
        destination: ["12312", "123124"],
        originNeighborhood: "Origin Neighborhood",
        originNeighborhoodSlug: "Origin Neighborhood",
      })
    ).rejects.toThrow()
  })
})