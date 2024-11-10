import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/models/create-user.dto';
import { CrytoUtils } from 'src/utils/cryto.utils';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const salt = await bcryptjs.genSalt();

    const hashedPassword = await CrytoUtils.hashPassword(password, salt);
    this.logger.log(hashedPassword);

    try {
      await this.userRepository.save({
        username,
        password: hashedPassword,
        isActive: true,
        firstName: 'Andres',
        lastName: 'Arias',
      });
      this.logger.debug('New User Created');
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'I was not possible to create the user',
      );
    }
  }
}
