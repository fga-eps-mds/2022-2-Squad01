import { CreateRouteController } from "@modules/routes/useCases/createRoute/CreateRouteController";
import { UpdateRouteController } from "@modules/routes/useCases/updateRoute/UpdateRouteController";
import { ListRoutesByNeighborhoodController } from "@modules/routes/useCases/listRoutesByNeighborhoodUseCase/ListRoutesByNeighborhoodController";
import { ListRoutesByUserController } from "@modules/routes/useCases/listRoutesByUser/ListRoutesByUserController";
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated";
import { Router } from "express";

export const routesRoutes = Router()

const createRouteController = new CreateRouteController()
const listRoutesByUserUseCase = new ListRoutesByUserController()
const listRoutesByNeighborhoodUseCase = new ListRoutesByNeighborhoodController()
const updateRouteController = new UpdateRouteController()

routesRoutes.post("/", ensureAuthenticated, createRouteController.handle)
routesRoutes.get("/user", ensureAuthenticated, listRoutesByUserUseCase.handle)
routesRoutes.get("/:neighborhood", ensureAuthenticated, listRoutesByNeighborhoodUseCase.handle)
routesRoutes.patch("/:id", ensureAuthenticated, updateRouteController.handle)