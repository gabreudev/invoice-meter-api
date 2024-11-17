import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private expirationTimeInSeconds: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.expirationTimeInSeconds = +this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }
  signIn(username: string, password: string): AuthResponseDto {
    const found = this.usersService.findByUsername(username);
    if (!found || !bcryptCompareSync(password, found.password)) {
      throw new UnauthorizedException('usuario não autorizado');
    }
    const payload = { sub: found.id, username: found.username };
    const token = this.jwtService.sign(payload);
    return { token, expiresIn: this.expirationTimeInSeconds };
  }
}
