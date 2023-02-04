import { Router } from "express"
import { CreateRideController } from "@modules/rides/useCases/createRide/CreateRideController"
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated"
import { ListRideByUserController } from "@modules/rides/useCases/listRideByUser/ListRideByUserController"
import { FindRideByIdController } from "@modules/rides/useCases/findRideById/FindRideByIdController"
import { SubscribeUserToRideController } from "@modules/rides/useCases/subscribeUserToRide/SubscribeUserToRideController"
import { DeleteRideController } from "@modules/rides/useCases/deleteRide/DeleteRideController"
import { ListRideByRangeController } from "@modules/rides/useCases/listRideByRange/ListRideByRangeController"
import { ListRideByNeighborhoodController } from "@modules/rides/useCases/listByNeighborhood/ListRideByNeighborhoodController"
import { ListAllRidesController } from "@modules/rides/useCases/listAllRides/ListAllRidesController"

export const ridesRoutes = Router()

const createRideController = new CreateRideController()
const listRidesController = new ListRideByUserController()
const findRideByIdController = new FindRideByIdController()
const subscribeUserToRideController = new SubscribeUserToRideController()
const deleteRideController = new DeleteRideController()
const listRideByNeighborhoodController = new ListRideByNeighborhoodController()
const listRideByRangeController = new ListRideByRangeController()
const listAllRidesController = new ListAllRidesController()

ridesRoutes.post("/", ensureAuthenticated, createRideController.handle)
ridesRoutes.get("/user", ensureAuthenticated, listRidesController.handle)
ridesRoutes.get("/all", ensureAuthenticated, listAllRidesController.handle)
ridesRoutes.get("/", ensureAuthenticated, findRideByIdController.handle)
ridesRoutes.patch("/", ensureAuthenticated, subscribeUserToRideController.handle)
ridesRoutes.delete("/", ensureAuthenticated, deleteRideController.handle)
ridesRoutes.get("/neighborhood", ensureAuthenticated, listRideByNeighborhoodController.handle)
ridesRoutes.get("/range", ensureAuthenticated, listRideByRangeController.handle)