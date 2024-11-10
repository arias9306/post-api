import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from 'src/models/auth-credentials.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() authCredentials: AuthCredentialsDto) {
    this.logger.debug('New Login');
    return await this.authService.login(authCredentials);
    // response.cookie('jwt_access_token', token.access_token, {
    //   httpOnly: true,
    //   maxAge: token.expiresIn,
    // });
    // response.send();
  }
}
