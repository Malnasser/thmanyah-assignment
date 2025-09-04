// auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import * as bcrypt from 'bcrypt';
import { IAuthService } from './interfaces/auth-service.interface';
import { ITokenService } from './interfaces/token-service.interface';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.authRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.authRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const tokens = await this.tokenService.generateTokens(user);
    await this.authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: this.mapUserToDto(user),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.authRepository.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokenService.generateTokens(user);
    await this.authRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      user: this.mapUserToDto(user),
    };
  }

  async logout(userId: string): Promise<void> {
    await this.authRepository.removeRefreshToken(userId);
  }

  async getUserProfile(userId: string) {
    const user = await this.authRepository.findById(userId);
    return user;
  }

  async getUsersCount(): Promise<number> {
    return this.authRepository.countUsers();
  }

  private mapUserToDto(user: any) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
  }
}
