import { CreateRouteController } from "@modules/routes/useCases/createRoute/CreateRouteController";
import { ListRoutesController } from "@modules/routes/useCases/listRoutes/ListRoutesController";
import { ListRoutesByNeighborhoodController } from "@modules/routes/useCases/listRoutesByNeighborhoodUseCase/ListRoutesByNeighborhoodController";
import { ListRoutesByUserController } from "@modules/routes/useCases/listRoutesByUser/ListRoutesByUserController";
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated";
import { Router } from "express";

export const routesRoutes = Router()

const createRouteController = new CreateRouteController()
const listRoutesByUserUseCase = new ListRoutesByUserController()
const listRoutesByNeighborhoodUseCase = new ListRoutesByNeighborhoodController()
const listRoutesController = new ListRoutesController()

routesRoutes.post("/", ensureAuthenticated, createRouteController.handle)
routesRoutes.get("/user", ensureAuthenticated, listRoutesByUserUseCase.handle)
routesRoutes.get("/neighborhood/:neighborhood", ensureAuthenticated, listRoutesByNeighborhoodUseCase.handle)
routesRoutes.get("/all", ensureAuthenticated, listRoutesController.handle)