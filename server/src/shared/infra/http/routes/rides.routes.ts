import { Router } from "express"
import { CreateRideController } from "@modules/rides/useCases/createRide/CreateRideController"
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated"
import { ListRideByUserController } from "@modules/rides/useCases/listRideByUser/ListRideByUserController"
import { FindRideByIdController } from "@modules/rides/useCases/findRideById/FindRideByIdController"
import { SubscribeUserToRideController } from "@modules/rides/useCases/subscribeUserToRide/SubscribeUserToRideController"
import { DeleteRideController } from "@modules/rides/useCases/deleteRide/DeleteRideController"

export const ridesRoutes = Router()

const createRideController = new CreateRideController()
const listRidesController = new ListRideByUserController()
const findRideByIdController = new FindRideByIdController() 
const subscribeUserToRideController = new SubscribeUserToRideController()
const deleteRideController = new DeleteRideController()

ridesRoutes.post("/", ensureAuthenticated, createRideController.handle)
ridesRoutes.get("/user", ensureAuthenticated, listRidesController.handle)
ridesRoutes.get("/all", ensureAuthenticated, listRidesController.handle)
ridesRoutes.get("/", ensureAuthenticated, findRideByIdController.handle)
ridesRoutes.patch("/", ensureAuthenticated, subscribeUserToRideController.handle)
ridesRoutes.delete("/", ensureAuthenticated, deleteRideController.handle)