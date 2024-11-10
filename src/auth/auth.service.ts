import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EnvironmentVariables } from 'src/config/enviroment-variables';
import { User } from 'src/entities/user.entity';
import { AuthCredentialsDto } from 'src/models/auth-credentials.dto';
import { CrytoUtils } from 'src/utils/cryto.utils';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async login(authCredentials: AuthCredentialsDto) {
    authCredentials.username = authCredentials.username.toLowerCase();

    const userDb = await this.validateUserPassword(authCredentials);

    let access_token = '';
    let expiresIn = this.configService.get('JWT_EXPIRE');

    if (!userDb) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (userDb && !userDb.isActive) {
      throw new UnauthorizedException(
        'The user is not active, please contact your administrator',
      );
    }

    const user = {
      firstname: userDb.firstName,
      lastname: userDb.lastName,
      id: userDb.id,
    };

    try {
      const payload: { usename: string; firstname: string; id: number } = {
        usename: userDb.username,
        firstname: userDb.firstName,
        id: userDb.id,
      };

      access_token = this.jwtService.sign(payload);
      this.logger.debug('Generated JWT Token');
    } catch (error) {
      this.logger.error(error);
      expiresIn = 0;
    }

    return { access_token, expiresIn, user };
  }

  private async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<User> | null {
    const { username, password } = authCredentials;
    try {
      const user = await this.userRepository.findOne({ where: { username } });

      if (
        user &&
        (await CrytoUtils.validatePassword(password, user.password))
      ) {
        return user;
      }
    } catch (error) {
      this.logger.error(error);
    }

    return null;
  }
}
