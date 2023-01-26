import { AppError } from "@shared/errors/AppError"
import nodemailer from "nodemailer"
import { IMailAdapter, SendMailData } from "../mail-adapter"

import "dotenv/config"

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export class NodemailerMailAdapter implements IMailAdapter {
  async sendMail({ subject, body, user_email }: SendMailData) {
    try {
      await transport.sendMail({
        from: "Equipe Vambora <vamboramds@gmail.com>",
        to: user_email,
        subject: subject,
        html: body,
      })
    } catch (error) {
      throw new AppError("Error sending email")
    }
  }
}