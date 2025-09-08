import { LoginDto } from '@core/auth/dto/login.dto';
import { RegisterDto } from '@core/auth/dto/register.dto';
import { AuthResponseDto } from '@core/auth/dto/auth-response.dto';

export interface IAuthService {
  register(dto: RegisterDto): Promise<AuthResponseDto>;
  login(dto: LoginDto): Promise<AuthResponseDto>;
}
