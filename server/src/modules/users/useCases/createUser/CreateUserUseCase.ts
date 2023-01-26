import { inject, injectable } from "tsyringe"
import * as brcypt from "bcryptjs"
import { AppError } from "@shared/errors/AppError"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { IMailAdapter } from "@shared/adapters/mail-adapter"

interface IRequest {
  email: string,
  name: string,
  enrollment: string,
  password: string,
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("MailAdapter")
    private mailAdapter: IMailAdapter
  ) { }
  async execute({ email, name, enrollment, password }: IRequest) {
    if (!email || !name || !enrollment || !password) {
      throw new AppError("Missing parameters")
    }

    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)) {
      throw new AppError("Password must contain at least 8 characters, one capital letter and one number")
    }

    const domain = email.split("@")[1]

    if (domain !== "aluno.unb.br" && domain !== "unb.br") {
      throw new AppError("Cannot create e-mail from outside UnB.")
    }
    const userExists = await this.usersRepository.findUser(email)

    if (userExists) {
      throw new AppError("User already exists!")
    }

    const verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0")

    const hashedPassword = await brcypt.hash(password, 10)

    console.log("Tentando enviar o e-mail")

    await this.mailAdapter.sendMail!({
      subject: "Seja bem-vindo(a) ao Vambora!",
      body: [
        "<body style=\"background-color: #8257e6; padding: 50px; color: #ffffff\">",
        "<div style=\"text-align: center;\">",
        `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Olá ${name.split(" ")[0]}, seja bem-vindo(a) ao Vambora!</h1>`,
        "<h2>Seu código de verificação é:</h2>",
        `<h2><strong>${verificationCode}</strong></h2>`,
        "</div>",
        "</body>",
      ].join("\n"),
      user_email: email
    })

    console.log("E-mail enviado com sucesso!")

    const user = await this.usersRepository.create({
      email,
      name,
      enrollment,
      password: hashedPassword,
      verificationCode: parseInt(verificationCode)
    })

    return user
  }
}

export { CreateUserUseCase }