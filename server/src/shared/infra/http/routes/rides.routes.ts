import { Router } from "express"
import { CreateRideController } from "@modules/rides/useCases/createRide/CreateRideController"
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated"

export const ridesRoutes = Router()

const createRideController = new CreateRideController()

ridesRoutes.post("/", ensureAuthenticated, createRideController.handle)