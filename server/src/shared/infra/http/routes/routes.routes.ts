
import { CreateRouteController } from "@modules/routes/useCases/createRoute/CreateRouteController";
import { UpdateRouteController } from "@modules/routes/useCases/updateRoute/UpdateRouteController";
import { ListRoutesByNeighborhoodController } from "@modules/routes/useCases/listRoutesByNeighborhoodUseCase/ListRoutesByNeighborhoodController";
import { ListRoutesByUserController } from "@modules/routes/useCases/listRoutesByUser/ListRoutesByUserController";
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated";
import { Router } from "express";
import { DeleteRouteController } from "@modules/routes/useCases/deleteRoute/DeleteRouteController";


export const routesRoutes = Router()

const createRouteController = new CreateRouteController()
const listRoutesByUserController = new ListRoutesByUserController()
const listRoutesByNeighborhoodController = new ListRoutesByNeighborhoodController()
const updateRouteController = new UpdateRouteController()
const deleteRouteController = new DeleteRouteController()

routesRoutes.post("/", ensureAuthenticated, createRouteController.handle)
routesRoutes.get("/user", ensureAuthenticated, listRoutesByUserController.handle)
routesRoutes.get("/neighborhood", ensureAuthenticated, listRoutesByNeighborhoodController.handle)
routesRoutes.patch("/:id", ensureAuthenticated, updateRouteController.handle)
routesRoutes.delete("/:id", ensureAuthenticated, deleteRouteController.handle)

