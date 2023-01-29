import { container } from "tsyringe"
import "@modules/users/container"
import "@modules/routes/container"
import "@modules/cars/container"
import { IMailAdapter } from "../adapters/mail-adapter"
import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter"

container.registerSingleton<IMailAdapter>("MailAdapter", NodemailerMailAdapter)
