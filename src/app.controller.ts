import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetUser } from './auth/get-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getHello(@GetUser() user: User): string {
    console.log(user);
    return this.appService.getHello(user.firstName);
  }
}
