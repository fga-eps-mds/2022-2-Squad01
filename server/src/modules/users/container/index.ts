import { container } from "tsyringe"
import { IUsersRepository } from "../repositories/IUsersRepository"
import { PrismaUsersRepository } from "../repositories/infra/prisma/PrismaUsersRepository"
import { JwtTokenAdapter } from "../adapters/jwt/jwt-token-adapter"
import { ITokenAdapter } from "../adapters/token-adapter"

container.registerSingleton<IUsersRepository>("UsersRepository", PrismaUsersRepository)
container.registerSingleton<ITokenAdapter>("TokenAdapter", JwtTokenAdapter)