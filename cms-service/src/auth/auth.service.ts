import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.authRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.authRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const authResponse = await this.generateTokens(user);
    await this.cacheManager.set(`user_profile_${user.id}`, user, 60 * 60 * 1000); // Cache user profile for 1 hour
    return authResponse;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const authResponse = await this.generateTokens(user);
    await this.cacheManager.set(`user_profile_${user.id}`, user, 60 * 60 * 1000); // Cache user profile for 1 hour
    return authResponse;
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.authRepository.findById(payload.sub);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const authResponse = await this.generateTokens(user);
      await this.cacheManager.set(`user_profile_${user.id}`, user, 60 * 60 * 1000); // Cache user profile for 1 hour
      return authResponse;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.removeRefreshToken(userId);
    await this.cacheManager.del(`user_profile_${userId}`); // Invalidate cached user profile
  }

  async getUsersCount(): Promise<number> {
    return this.authRepository.countUsers();
  }

  async getUserProfile(userId: string): Promise<User | null> {
    const cachedUser = await this.cacheManager.get<User>(`user_profile_${userId}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.authRepository.findById(userId);
    if (user) {
      await this.cacheManager.set(`user_profile_${userId}`, user, 60 * 60 * 1000); // Cache user profile for 1 hour
    }
    return user;
  }

  private async generateTokens(user: any): Promise<AuthResponseDto> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
    });

    await this.authRepository.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      },
    };
  }
}
