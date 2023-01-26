import { ITokenAdapter } from "../token-adapter";
import * as jwt from "jsonwebtoken"
import dayjs from "dayjs";
import { prisma } from "prisma";
import { RefreshToken } from "@prisma/client";

class JwtTokenAdapter implements ITokenAdapter {
  generateToken(user_id: string): string {
    const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET || "fake jwt secret for testing", {
      subject: user_id,
      expiresIn: "1d"
    })

    return token
  }

  async generateRefreshToken(user_id: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, "second").unix()

    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId: user_id,
        expiresIn
      }
    })

    return refreshToken
  }

  async findRefreshToken(refresh_token: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    return refreshToken
  }

  async deleteUserRefreshToken(user_id: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        userId: user_id
      }
    })
  }
}

export { JwtTokenAdapter };