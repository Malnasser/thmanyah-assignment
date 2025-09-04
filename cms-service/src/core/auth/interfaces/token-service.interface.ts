import { User } from 'src/collections/users/entities/user.entity';

export interface ITokenService {
  generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  verifyRefreshToken(token: string): Promise<{ userId: string }>;
}
