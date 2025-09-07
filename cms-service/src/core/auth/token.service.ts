import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenService } from './interfaces/token-service.interface';
import { User } from '@cms/users/entities/user.entity';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('app.jwt.accessSecret'),
      expiresIn: this.config.get<string>('app.jwt.accessExpiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get<string>('app.jwt.refreshExpiresIn'),
    });

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string): Promise<{ userId: string }> {
    try {
      const payload: any = this.jwtService.verify(token, {
        secret: this.config.get<string>('app.jwt.refreshSecret'),
      });
      return { userId: payload.sub };
    } catch {
      throw new Error('Invalid refresh token');
    }
  }
}
