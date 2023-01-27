import { container } from "tsyringe"
import { IRoutesRepository } from "../repositories/IRoutesRepository"
import { PrismaRoutesRepository } from "../repositories/infra/prisma/PrismaRoutesRepository"

container.registerSingleton<IRoutesRepository>("RoutesRepository", PrismaRoutesRepository)
