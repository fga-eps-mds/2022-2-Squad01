import { Router } from "express"
import { CreateRideController } from "@modules/rides/useCases/createRide/CreateRideController"

export const ridesRoutes = Router()

const createRideController = new CreateRideController()

ridesRoutes.post("/", createRideController.handle)