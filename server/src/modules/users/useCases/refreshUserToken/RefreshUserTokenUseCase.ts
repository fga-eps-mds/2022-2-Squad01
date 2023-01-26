import { ITokenAdapter } from "@modules/users/adapters/token-adapter"
import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { inject, injectable } from "tsyringe"

@injectable()
class RefreshUserTokenUseCase {
  constructor(
    @inject("TokenAdapter")
    private tokenAdapter: ITokenAdapter
  ) { }
  async execute(refresh_token: string) {
    const refreshToken = await this.tokenAdapter.findRefreshToken(refresh_token)

    if (!refreshToken) {
      throw new AppError("Invalid refresh token")
    }

    const token = this.tokenAdapter.generateToken(refreshToken.userId)
    const isTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    if (isTokenExpired) {
      await this.tokenAdapter.deleteUserRefreshToken(refreshToken.userId)

      const newRefreshToken = this.tokenAdapter.generateRefreshToken(refreshToken.userId)

      return { token, refreshToken: newRefreshToken }
    }

    return { token }
  }
}

export { RefreshUserTokenUseCase }