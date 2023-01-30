import { container } from "tsyringe"
import { IRidesRepository } from "../repositories/IRidesRepository"
import { PrismaRidesRepository } from "../repositories/prisma/PrismaRidesRepository"

container.registerSingleton<IRidesRepository>("RidesRepository", PrismaRidesRepository)