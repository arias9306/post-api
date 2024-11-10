import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentVariables } from 'src/config/enviroment-variables';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        const expiresIn = `${configService.get('JWT_EXPIRE')}s`;
        const secret = configService.get('JWT_SECRET');
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
    UsersModule,
  ],
  exports: [JwtModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
