import { container } from "tsyringe"
import { IRidesRepository } from "../repositories/IRideRepository"

container.registerSingleton<IRidesRepository>("RidesRepository", PrismaRidesRepository)