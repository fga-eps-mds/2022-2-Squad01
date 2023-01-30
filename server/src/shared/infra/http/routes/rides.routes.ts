import { Router } from "express"
import { CreateRideController } from "@modules/rides/useCases/createRide/CreateRideController"
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated"
import { ListRideByUserController } from "@modules/rides/useCases/listRideByUser/ListRideByUserController"
import { FindRideByIdController } from "@modules/rides/useCases/findRideById/FindRideByIdController"
import { SubscribeUserToRideController } from "@modules/rides/useCases/subscribeUserToRide/SubscribeUserToRideController"

export const ridesRoutes = Router()

const createRideController = new CreateRideController()
const listRidesController = new ListRideByUserController()
const findRideByIdController = new FindRideByIdController() 
const subscribeUserToRideController = new SubscribeUserToRideController()

ridesRoutes.post("/", ensureAuthenticated, createRideController.handle)
ridesRoutes.get("/user", ensureAuthenticated, listRidesController.handle)
ridesRoutes.get("/", ensureAuthenticated, findRideByIdController.handle)
ridesRoutes.patch("/", ensureAuthenticated, subscribeUserToRideController.handle)