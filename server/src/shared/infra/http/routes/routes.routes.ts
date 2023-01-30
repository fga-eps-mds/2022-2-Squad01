import { Router } from "express"
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated"

import { CreateRouteController } from "@modules/routes/useCases/createRoute/CreateRouteController"
import { ListRoutesController } from "@modules/routes/useCases/listRoutes/ListRoutesController"
import { UpdateRouteController } from "@modules/routes/useCases/updateRoute/UpdateRouteController"
import { ListRoutesByUserController } from "@modules/routes/useCases/listRoutesByUser/ListRoutesByUserController"
import { DeleteRouteController } from "@modules/routes/useCases/deleteRoute/DeleteRouteController"
import { ListRoutesByNeighborhoodController } from "@modules/routes/useCases/listRoutesByNeighborhood/ListRoutesByNeighborhoodController"

export const routesRoutes = Router()

const createRouteController = new CreateRouteController()
const listRoutesController = new ListRoutesController()
const listRoutesByUserController = new ListRoutesByUserController()
const listRoutesByNeighborhoodController = new ListRoutesByNeighborhoodController()
const updateRouteController = new UpdateRouteController()
const deleteRouteController = new DeleteRouteController()

routesRoutes.post("/", ensureAuthenticated, createRouteController.handle)
routesRoutes.get("/neighborhood", ensureAuthenticated, listRoutesByNeighborhoodController.handle)
routesRoutes.get("/all", ensureAuthenticated, listRoutesController.handle)
routesRoutes.get("/user", ensureAuthenticated, listRoutesByUserController.handle)
routesRoutes.patch("/", ensureAuthenticated, updateRouteController.handle)
routesRoutes.delete("/", ensureAuthenticated, deleteRouteController.handle)