import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true, // Torna o JWT disponível globalmente, se necessário
      imports: [ConfigModule], // Importa o ConfigModule para acessar as variáveis de ambiente
      inject: [ConfigService], // Injeta o ConfigService para uso no useFactory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Obtém o segredo do JWT
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'), // Configura o tempo de expiração
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController], // Define o controlador de autenticação
  providers: [AuthService], // Define o serviço de autenticação
})
export class AuthModule {}
