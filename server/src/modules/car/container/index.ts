import { container } from "tsyringe"
import { ICarsRepository } from "../repositories/ICarsRepository"
import { PrismaCarsRepository } from "../repositories/infra/PrismaCarsRepository"

container.registerSingleton<ICarsRepository>("CarsRepository", PrismaCarsRepository)
