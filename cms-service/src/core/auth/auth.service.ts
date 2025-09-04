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
import { IUserRepository } from 'src/collections/users/interfaces/user-repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ITokenService') private readonly tokenService: ITokenService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(
      registerDto.email,
    );
    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.userRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    const tokens = await this.tokenService.generateTokens(user);
    return {
      access_token: tokens.accessToken,
      user: this.mapUserToDto(user),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokenService.generateTokens(user);
    return {
      access_token: tokens.accessToken,
      user: this.mapUserToDto(user),
    };
  }

  private mapUserToDto(user: any) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
