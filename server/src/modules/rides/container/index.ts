import { container } from "tsyringe"
import { IRidesRepository } from "../repositories/IRidesRepository"

container.registerSingleton<IRidesRepository>("RidesRepository", PrismaRidesRepository)