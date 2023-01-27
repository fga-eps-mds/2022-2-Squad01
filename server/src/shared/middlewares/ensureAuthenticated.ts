import { AppError } from "@shared/errors/AppError"
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
interface IJWTPayload {
  id: string
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Unauthorized", 401)
  }

  const [scheme, token] = authHeader.split(" ")

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError("Unauthorized", 401)
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err , decoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        throw new AppError("Expired Token", 401)
      } else {
        throw new AppError("Invalid Token", 401)
      }
    }

    req.user = (decoded as IJWTPayload).id

    return next()
  })
}