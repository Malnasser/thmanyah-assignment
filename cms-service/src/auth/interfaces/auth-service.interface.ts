// auth/interfaces/i-auth-service.ts
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

export interface IAuthService {
  register(dto: RegisterDto): Promise<AuthResponseDto>;
  login(dto: LoginDto): Promise<AuthResponseDto>;
  logout(userId: string): Promise<void>;
  getUserProfile(userId: string): Promise<any>; // User or DTO
  getUsersCount(): Promise<number>;
}
