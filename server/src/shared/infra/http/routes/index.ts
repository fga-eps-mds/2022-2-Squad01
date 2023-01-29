import { Router } from "express"
import { userRoutes } from "./user.routes"
import { routesRoutes } from "./routes.routes"
import { carsRoutes } from "./cars.routes"

const router = Router()

router.use("/user", userRoutes)
router.use("/route", routesRoutes)
router.use("/car", carsRoutes)

export { router }