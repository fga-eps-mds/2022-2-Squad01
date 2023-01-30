import { Router } from "express"
import { userRoutes } from "./user.routes"
import { routesRoutes } from "./routes.routes"
import { carsRoutes } from "./cars.routes"
import { ridesRoutes } from "./rides.routes"

const router = Router()

router.use("/user", userRoutes)
router.use("/route", routesRoutes)
router.use("/car", carsRoutes)
router.use("/ride", ridesRoutes)

export { router }