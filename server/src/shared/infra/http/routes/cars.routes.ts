import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { DeleteCarController } from "@modules/cars/useCases/deleteCar/DeleteCarController";
import { ListCarByUserController } from "@modules/cars/useCases/listCarByUser/ListCarByUserController";
import { UpdateCarController } from "@modules/cars/useCases/updateCar/UpdateCarController";
import ensureAuthenticated from "@shared/middlewares/ensureAuthenticated";
import { Router } from "express";

export const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarByUseController = new ListCarByUserController()
const updateCarController = new UpdateCarController()
const deleteCarController = new DeleteCarController()

carsRoutes.post("/", ensureAuthenticated, createCarController.handle)
carsRoutes.get("/", ensureAuthenticated, listCarByUseController.handle)
carsRoutes.patch("/", ensureAuthenticated, updateCarController.handle)
carsRoutes.delete("/", ensureAuthenticated, deleteCarController.handle)
