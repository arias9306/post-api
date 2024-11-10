import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EnvironmentVariables } from './enviroment-variables';

export const typeOrmConfig = (
  configService: ConfigService<EnvironmentVariables>,
): TypeOrmModuleOptions => ({
  type: 'postgres', // Usar Oracle aca..
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  logging: true,
  synchronize: true, // Solo en dev
  entities: [User],
});
