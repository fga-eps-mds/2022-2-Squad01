import { Router } from "express"
import { userRoutes } from "./user.routes"
import { routesRoutes } from "./routes.routes"

const router = Router()

router.use("/user", userRoutes)
router.use("/route", routesRoutes)

export { router }