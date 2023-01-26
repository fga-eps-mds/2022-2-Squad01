import { RefreshToken } from "@prisma/client";

export interface ITokenAdapter {
  generateToken(user_id: string): string;
  generateRefreshToken(user_id: string): Promise<RefreshToken>;
  findRefreshToken(refresh_token: string): Promise<RefreshToken | null>
  deleteUserRefreshToken(user_id: string): Promise<void>
}